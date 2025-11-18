module Mutations
  module Tasks
    class CreateTask < BaseMutation
      description "Creates a new task within a project. Allows an optional description, status, and assignee (by type and ID). Returns the created task or errors if creation fails."
      include Mixins::Authorization

      argument :project_id, ID, required: true
      argument :title, String, required: true
      argument :description, String, required: false
      argument :status, String, required: false
      argument :assignee_type, String, required: false
      argument :assignee_id, ID, required: false

      field :task, Types::TaskType, null: true
      field :errors, [String], null: false

      def resolve(project_id:, title:, description: nil, status: "pending", assignee_type: nil, assignee_id: nil)
        user = require_authentication!(context)

        project = user.projects.find_by(id: project_id)
        return {task: nil, errors: ["Project not found"]} unless project

        task = project.tasks.new(
          title: title,
          description: description,
          status: status,
          assignee_type: assignee_type,
          assignee_id: assignee_id
        )

        if task.save
          {task: task, errors: []}
        else
          {task: nil, errors: task.errors.full_messages}
        end
      end
    end
  end
end
