-- Chat History Schema for VoltHub
-- Run this in your Supabase SQL Editor

-- Chat Sessions Table
-- Tracks individual chat sessions (when user opens chat widget)
CREATE TABLE IF NOT EXISTS chat_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT UNIQUE NOT NULL, -- Client-generated session ID (stored in localStorage)
  page_path TEXT, -- Current page path when chat was opened
  product_id TEXT, -- Product ID if on a product page
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_message_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  message_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat Messages Table
-- Stores individual messages within a chat session
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL REFERENCES chat_sessions(session_id) ON DELETE CASCADE,
  sender TEXT NOT NULL CHECK (sender IN ('user', 'support')),
  message TEXT NOT NULL,
  product_id TEXT, -- Product ID if message is related to a product
  page_path TEXT, -- Page path when message was sent
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT fk_chat_session FOREIGN KEY (session_id) REFERENCES chat_sessions(session_id) ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_chat_sessions_session_id ON chat_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_started_at ON chat_sessions(started_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_messages_sender ON chat_messages(sender);

-- Function to update chat session when new message is added
CREATE OR REPLACE FUNCTION update_chat_session_on_message()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the chat_sessions table with the new message info
  UPDATE chat_sessions
  SET 
    updated_at = NOW(),
    last_message_at = NOW(),
    message_count = message_count + 1
  WHERE session_id = NEW.session_id;
  
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update session when new message is added
CREATE TRIGGER update_chat_session_on_message 
  AFTER INSERT ON chat_messages
  FOR EACH ROW
  EXECUTE FUNCTION update_chat_session_on_message();

-- Enable Row Level Security (RLS)
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Policies: Allow public to insert chat sessions and messages
-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Public can insert chat sessions" ON chat_sessions;
DROP POLICY IF EXISTS "Public can insert chat messages" ON chat_messages;
DROP POLICY IF EXISTS "Public can read chat sessions" ON chat_sessions;
DROP POLICY IF EXISTS "Public can read chat messages" ON chat_messages;

CREATE POLICY "Public can insert chat sessions" ON chat_sessions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can insert chat messages" ON chat_messages
  FOR INSERT WITH CHECK (true);

-- Policy: Allow public to read their own chat sessions (by session_id)
-- Note: In production, you might want to add authentication
CREATE POLICY "Public can read chat sessions" ON chat_sessions
  FOR SELECT USING (true);

CREATE POLICY "Public can read chat messages" ON chat_messages
  FOR SELECT USING (true);

-- Optional: Policy to restrict reading to authenticated users only
-- Uncomment if you want to restrict access
-- DROP POLICY IF EXISTS "Public can read chat sessions" ON chat_sessions;
-- DROP POLICY IF EXISTS "Public can read chat messages" ON chat_messages;
-- CREATE POLICY "Authenticated users can read chat sessions" ON chat_sessions
--   FOR SELECT USING (auth.role() = 'authenticated');
-- CREATE POLICY "Authenticated users can read chat messages" ON chat_messages
--   FOR SELECT USING (auth.role() = 'authenticated');

