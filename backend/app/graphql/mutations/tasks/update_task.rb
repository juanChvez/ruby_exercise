module Mutations
  module Tasks
    class UpdateTask < BaseMutation
      description "Updates an existing task within a user's project. Returns the updated task or errors if the update fails."
      include Mixins::Authorization

      argument :input, Types::Tasks::UpdateTaskInput, required: true

      field :task, Types::Tasks::TaskItemType, null: true
      field :errors, [String], null: false

      def resolve(input:)
        require_authentication!(context)

        task = Task.find(input[:id])
        return {task: nil, errors: ["Task not found"]} unless task

        if task.update(input.to_h.except(:id))
          {task: task, errors: []}
        else
          {task: nil, errors: task.errors.full_messages}
        end
      end
    end
  end
end
