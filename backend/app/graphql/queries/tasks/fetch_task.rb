module Queries
  module Tasks
    class FetchTask < BaseQuery
      description "Fetches a single task by ID. Admins may access any task. Non-admins may only fetch tasks that belong to projects they own."
      include Mixins::Authorization

      argument :id, ID, required: true
      type Types::TaskType, null: true

      def resolve(id:)
        user = require_authentication!(context)

        if user.level == "admin"
          Task.find_by(id: id)
        else
          Task.joins(:project)
            .where(projects: {user_id: user.id})
            .find_by(id: id)
        end
      end
    end
  end
end
