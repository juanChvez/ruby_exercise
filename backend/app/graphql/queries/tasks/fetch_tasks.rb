module Queries
  module Tasks
    class FetchTasks < BaseQuery
      description "Fetches all tasks assigned to the authenticated user, optionally filtered by project, ordered by most recently created first."
      include Mixins::Authorization

      argument :project_id, ID, required: false
      type [Types::Tasks::TaskItemType], null: false

      def resolve(project_id: nil)
        user = require_authentication!(context)

        if user.level_admin?
          tasks = Task.joins(:project).where(projects: { user_id: user.id })
          tasks = tasks.where(project_id: project_id) if project_id.present?
        else
          tasks = if project_id.present?
            # Only tasks in projects the user is assigned to
            Task.where(assignee_id: user.id, project_id: project_id)
          else
            Task.where(assignee_id: user.id)
          end
        end

        tasks.order(created_at: :desc)
      end
    end
  end
end
