module Mutations
  module Tasks
    class UpdateTask < BaseMutation
      description "Updates an existing task within a user's project. Returns the updated task or errors if the update fails."
      include Mixins::Authorization

      argument :id, ID, required: true
      argument :title, String, required: false
      argument :description, String, required: false
      argument :status, String, required: false
      argument :assignee_type, String, required: false
      argument :assignee_id, ID, required: false

      field :task, Types::TaskType, null: true
      field :errors, [String], null: false

      def resolve(id:, **args)
        user = require_authentication!(context)

        task = Task.joins(project: :user)
          .where(projects: {user_id: user.id})
          .find_by(id: id)

        return {task: nil, errors: ["Task not found"]} unless task

        if task.update(args.compact)
          {task: task, errors: []}
        else
          {task: nil, errors: task.errors.full_messages}
        end
      end
    end
  end
end
