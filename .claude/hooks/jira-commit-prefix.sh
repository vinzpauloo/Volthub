#!/usr/bin/env bash
# Jira Commit Prefix — PreToolUse hook on Bash
# Ensures commit messages include Jira ticket ID from branch name.
# Soft enforcement via systemMessage (does not block).

set -euo pipefail

INPUT=$(cat)

COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty' 2>/dev/null)
[ -z "$COMMAND" ] && exit 0

# Only intercept git commit commands
case "$COMMAND" in
  git\ commit*) ;;
  *) exit 0 ;;
esac

# Must be in a git repo
git rev-parse --show-toplevel &>/dev/null || exit 0

# Get current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")
[ -z "$CURRENT_BRANCH" ] && exit 0

# Extract VH-XXX from branch name (-oE works on BSD + GNU grep)
TICKET_ID=$(echo "$CURRENT_BRANCH" | grep -oE '^VH-[0-9]+' || echo "")
[ -z "$TICKET_ID" ] && exit 0

# Extract -m "message" or -m 'message' from the command using bash regex
# (Portable across BSD and GNU; avoids `grep -oP` lookbehinds which BSD grep
# doesn't support — that's why bticket's hook silently never matches and always
# emits the systemMessage. This is the corrected version.)
COMMIT_MSG=""
if [[ "$COMMAND" =~ -m[[:space:]]+\"([^\"]*)\" ]]; then
  COMMIT_MSG="${BASH_REMATCH[1]}"
elif [[ "$COMMAND" =~ -m[[:space:]]+\'([^\']*)\' ]]; then
  COMMIT_MSG="${BASH_REMATCH[1]}"
fi

# If commit message already contains the ticket ID, allow silently
if [ -n "$COMMIT_MSG" ] && [[ "$COMMIT_MSG" == *"$TICKET_ID"* ]]; then
  exit 0
fi

# Soft enforcement — remind Claude to prefix with ticket ID
cat <<'TEMPLATE' | sed "s/{{TICKET_ID}}/${TICKET_ID}/g"
{"systemMessage":"Jira commit prefix: Current branch is on ticket {{TICKET_ID}}. Ensure the commit message starts with '{{TICKET_ID}}: ' followed by the conventional commit format.\n\nExample: {{TICKET_ID}}: feat(mobile): add wallet top-up screen\n\nIf the commit message does not already include {{TICKET_ID}}, prepend it."}
TEMPLATE
