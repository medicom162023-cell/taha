CREATE TABLE IF NOT EXISTS homepage_content (
  section_key TEXT PRIMARY KEY,
  content_json TEXT NOT NULL CHECK (json_valid(content_json)),
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_homepage_content_updated ON homepage_content(updated_at DESC);
