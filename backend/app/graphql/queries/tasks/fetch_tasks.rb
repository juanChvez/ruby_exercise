module Queries
  module Tasks
    class FetchTasks < BaseQuery
      description "Fetches all tasks from a specific project belonging to the authenticated user, ordered by most recently created first."
      include Mixins::Authorization

      argument :project_id, ID, required: false
      type [Types::TaskType], null: false

      def resolve(project_id: nil)
        user = require_authentication!(context)

        if project_id.present?
          project = user.projects.find_by(id: project_id)
          return [] unless project

          project.tasks.order(created_at: :desc)
        else
          Task.joins(:project)
            .where(projects: {user_id: user.id})
            .order(created_at: :desc)
        end
      end
    end
  end
end
