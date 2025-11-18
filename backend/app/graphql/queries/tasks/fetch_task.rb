module Queries
  module Tasks
    class FetchTask < BaseQuery
      description "Fetches a single task by ID, ensuring the task belongs to a project owned by the authenticated user."
      include Mixins::Authorization

      argument :id, ID, required: true
      type Types::TaskType, null: true

      def resolve(id:)
        user = require_authentication!(context)

        Task.joins(project: :user)
          .where(projects: {user_id: user.id})
          .find_by(id: id)
      end
    end
  end
end
