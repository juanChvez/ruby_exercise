module Mutations
  module Tasks
    class DeleteTask < BaseMutation
      description "Deletes a task by ID, ensuring the user owns the parent project. Returns success status and any errors encountered."
      include Mixins::Authorization

      argument :id, ID, required: true

      field :success, Boolean, null: false
      field :errors, [String], null: false

      def resolve(id:)
        user = require_authentication!(context)

        task = Task.joins(project: :user)
          .where(projects: {user_id: user.id})
          .find_by(id: id)

        return {success: false, errors: ["Task not found"]} unless task

        if task.destroy
          {
            success: true,
            errors: []
          }
        else
          {
            success: false,
            errors: project.errors.full_messages
          }
        end
      end
    end
  end
end
