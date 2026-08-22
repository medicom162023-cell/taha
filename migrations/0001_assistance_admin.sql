CREATE TABLE IF NOT EXISTS assistance_form_fields (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  field_key TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  field_type TEXT NOT NULL CHECK (field_type IN ('text','number','date','textarea','select','radio','checkbox')),
  help_text TEXT NOT NULL DEFAULT '',
  options_json TEXT NOT NULL DEFAULT '[]' CHECK (json_valid(options_json)),
  is_required INTEGER NOT NULL DEFAULT 0 CHECK (is_required IN (0,1)),
  is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0,1)),
  sort_order INTEGER NOT NULL DEFAULT 100,
  is_core INTEGER NOT NULL DEFAULT 0 CHECK (is_core IN (0,1)),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS assistance_admin_audit (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  details_json TEXT NOT NULL DEFAULT '{}' CHECK (json_valid(details_json)),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_assistance_fields_order ON assistance_form_fields(is_active, sort_order, id);
CREATE INDEX IF NOT EXISTS idx_assistance_audit_created ON assistance_admin_audit(created_at DESC);

INSERT OR IGNORE INTO assistance_form_fields
  (field_key, label, field_type, help_text, options_json, is_required, is_active, sort_order, is_core)
VALUES
  ('nationalId', 'رقم الهوية', 'text', 'الحقل الأساسي للطلب ولا يمكن حذفه.', '[]', 1, 1, 10, 1);
