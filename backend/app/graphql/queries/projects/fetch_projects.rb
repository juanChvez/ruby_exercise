module Queries
  module Projects
    class FetchProjects < Queries::BaseQuery
      description "Fetches all projects for the authenticated user, ordered by most recently created first."
      include Mixins::Authorization

      type [Types::Projects::ProjectListItemType], null: false

      def resolve
        user = require_authentication!(context)
        if user.level_admin?
          user.projects.order(created_at: :desc)
        else
          Project.joins(:tasks)
            .where(tasks: {assignee_id: user.id})
            .distinct
            .order(created_at: :desc)
        end
      end
    end
  end
end
