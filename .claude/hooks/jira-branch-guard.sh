#!/usr/bin/env bash
# Jira Branch Guard — PreToolUse hook on Bash
# Validates branch names include Jira ticket ID on creation.
# Exit 0 = allow, JSON with "decision":"block" = block.

set -euo pipefail

INPUT=$(cat)

COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty' 2>/dev/null)
[ -z "$COMMAND" ] && exit 0

# Only intercept branch creation commands
IS_BRANCH_CREATE=false
case "$COMMAND" in
  git\ checkout\ -b\ *|git\ switch\ -c\ *|git\ switch\ --create\ *) IS_BRANCH_CREATE=true ;;
  *) exit 0 ;;
esac

$IS_BRANCH_CREATE || exit 0

# Extract the branch name from the command
BRANCH_NAME=""
case "$COMMAND" in
  git\ checkout\ -b\ *)
    BRANCH_NAME=$(echo "$COMMAND" | sed 's/git checkout -b //' | awk '{print $1}')
    ;;
  git\ switch\ -c\ *|git\ switch\ --create\ *)
    BRANCH_NAME=$(echo "$COMMAND" | sed -E 's/git switch (-c|--create) //' | awk '{print $1}')
    ;;
esac

[ -z "$BRANCH_NAME" ] && exit 0

# Allow exempt branches
case "$BRANCH_NAME" in
  develop|development|staging|production|main|master) exit 0 ;;
esac

# Validate VH-ID prefix
if echo "$BRANCH_NAME" | grep -qE '^VH-[0-9]+/'; then
  exit 0
fi

# Block — branch doesn't have required Jira ticket ID
cat <<EOF
{"decision":"block","reason":"Jira Branch Guard: Branch name must start with a Jira ticket ID.\n\nExpected format: VH-<id>/<type>/<description>\nExamples:\n  VH-42/feature/wallet-topup\n  VH-105/fix/ocpp-reconnect\n  VH-7/chore/update-pulumi\n\nTo get a ticket ID:\n  - Create:  mcp__atlassian__createJiraIssue(cloudId='7c47070c-6963-412e-9fdd-7a9aaba3da33', projectKey='VH', issueTypeName='Task', summary='...')\n  - Search:  mcp__atlassian__searchJiraIssuesUsingJql(cloudId='7c47070c-6963-412e-9fdd-7a9aaba3da33', jql=\\\"project = VH AND status = 'To Do'\\\")\n\nBranch '${BRANCH_NAME}' does not match pattern VH-<number>/...\n\nIf you mistyped a BT- branch here, you are in the wrong worktree — switch to the bticket repo before creating BT- branches."}
EOF
