-- ==========================================
-- 02_seed.sql
-- Insert initial data if it does not exist
-- ==========================================

-- Users
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM users WHERE email = 'alice@example.com') THEN
    INSERT INTO users (name, email, password_digest, level)
    VALUES
      ('Alice', 'alice@example.com', '123456', 'admin'),
      ('Bob', 'bob@example.com', '123456', 'user');
  END IF;
END$$;

-- Projects
-- Seed projects and associate each to a user (Alice: id=1, Bob: id=2)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM projects WHERE name = 'DevHub Core') THEN
    INSERT INTO projects (user_id, name, description)
    VALUES
      (1, 'DevHub Core', 'Core logic and services'),
      (2, 'Admin Engine', 'Admin dashboard and reports');
  END IF;
END$$;

-- Tasks
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM tasks WHERE title = 'Setup Rails project') THEN
    INSERT INTO tasks (title, description, status, project_id, assignee_type, assignee_id)
    VALUES
      ('Setup Rails project', 'Initialize Rails 7 with engines', 'DONE', 1, 'User', 1),
      ('Add GraphQL API', 'Implement graphql-ruby basics', 'TODO', 1, 'User', 2),
      ('Design admin dashboard', 'Add reports and charts', 'IN_PROGRESS', 2, 'User', 1);
  END IF;
END$$;

-- Activities
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM activities WHERE record_type = 'Task' AND record_id = 1) THEN
    INSERT INTO activities (record_type, record_id, action)
    VALUES
      ('Task', 1, 'created'),
      ('Task', 2, 'assigned'),
      ('Task', 3, 'updated');
  END IF;
END$$;
