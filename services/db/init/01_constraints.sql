-- ==========================================
-- 01_constraints.sql
-- Create types and relationships if they do not exist
-- ==========================================

-- Create ENUM type 'task_status' if it does not exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'task_status') THEN
        CREATE TYPE task_status AS ENUM ('pending', 'in_progress', 'completed', 'archived');
    END IF;
END
$$;

-- Change status column to use ENUM type only if it is not already user-defined
DO $$
DECLARE
    current_type text;
BEGIN
    SELECT data_type INTO current_type
    FROM information_schema.columns
    WHERE table_name = 'tasks' AND column_name = 'status';

    IF current_type IS NOT NULL AND current_type <> 'USER-DEFINED' THEN
        -- Remove any existing DEFAULT constraint
        EXECUTE 'ALTER TABLE tasks ALTER COLUMN status DROP DEFAULT';

        -- Change column type with a safe cast
        EXECUTE 'ALTER TABLE tasks ALTER COLUMN status TYPE task_status USING status::text::task_status';

        -- Restore default with ENUM type
        EXECUTE 'ALTER TABLE tasks ALTER COLUMN status SET DEFAULT ''pending''::task_status';
    END IF;
END
$$;

-- Add foreign key constraint on project_id referencing projects.id if it does not exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_tasks_projects'
    ) THEN
        ALTER TABLE tasks
            ADD CONSTRAINT fk_tasks_projects
            FOREIGN KEY (project_id) REFERENCES projects(id)
            ON DELETE CASCADE;
    END IF;
END
$$;

-- Create indexes if they do not exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tasks_project_id') THEN
        CREATE INDEX idx_tasks_project_id ON tasks(project_id);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tasks_assignee') THEN
        CREATE INDEX idx_tasks_assignee ON tasks(assignee_type, assignee_id);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_activities_record') THEN
        CREATE INDEX idx_activities_record ON activities(record_type, record_id);
    END IF;
END
$$;

-- Create trigger function and trigger for updating updated_at column if it does not exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger WHERE tgname = 'update_timestamp'
    ) THEN
        -- Use a different delimiter for the function body so it doesn't close this DO block
        EXECUTE $fn$
            CREATE OR REPLACE FUNCTION set_updated_at()
            RETURNS TRIGGER AS $_$
            BEGIN
                NEW.updated_at = NOW();
                RETURN NEW;
            END;
            $_$ LANGUAGE plpgsql;
        $fn$;

        CREATE TRIGGER update_timestamp
        BEFORE UPDATE ON tasks
        FOR EACH ROW
        EXECUTE FUNCTION set_updated_at();
    END IF;
END
$$;
