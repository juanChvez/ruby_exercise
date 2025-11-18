# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2025_11_13_181609) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  # Custom types defined in this database.
  # Note that some types may not work with other database engines. Be careful if changing database.
  create_enum "task_status", ["pending", "in_progress", "completed", "archived"]
  create_enum "user_level", ["admin", "user"]

  create_table "activities", id: :serial, force: :cascade do |t|
    t.string "action", limit: 50
    t.datetime "created_at", precision: nil, default: -> { "now()" }
    t.integer "record_id"
    t.string "record_type", limit: 50
    t.index ["record_type", "record_id"], name: "idx_activities_record"
  end

  create_table "projects", id: :serial, force: :cascade do |t|
    t.datetime "created_at", precision: nil, default: -> { "now()" }
    t.text "description"
    t.string "name", limit: 100, null: false
    t.datetime "updated_at", precision: nil, default: -> { "now()" }
    t.integer "user_id", null: false
    t.index ["user_id"], name: "idx_projects_user_id"
  end

  create_table "tasks", id: :serial, force: :cascade do |t|
    t.integer "assignee_id"
    t.string "assignee_type", limit: 50
    t.datetime "created_at", precision: nil, default: -> { "now()" }
    t.text "description"
    t.integer "project_id", null: false
    t.enum "status", default: "pending", enum_type: "task_status"
    t.string "title", limit: 100, null: false
    t.datetime "updated_at", precision: nil, default: -> { "now()" }
    t.index ["assignee_type", "assignee_id"], name: "idx_tasks_assignee"
    t.index ["project_id"], name: "idx_tasks_project_id"
  end

  create_table "users", id: :serial, force: :cascade do |t|
    t.datetime "created_at", precision: nil, default: -> { "now()" }
    t.string "email", limit: 100, null: false
    t.enum "level", default: "user", null: false, enum_type: "user_level"
    t.string "name", limit: 50, null: false
    t.string "password_digest", limit: 255, null: false
    t.datetime "updated_at", precision: nil, default: -> { "now()" }
    t.index ["email"], name: "index_users_on_email", unique: true
    t.unique_constraint ["email"], name: "users_email_key"
  end

  add_foreign_key "projects", "users", name: "fk_projects_users", on_delete: :cascade
  add_foreign_key "projects", "users", name: "projects_user_id_fkey", on_delete: :cascade
  add_foreign_key "tasks", "projects", name: "fk_tasks_projects", on_delete: :cascade
end
