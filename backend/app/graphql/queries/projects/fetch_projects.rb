module Queries
  module Projects
    class FetchProjects < Queries::BaseQuery
      description "Fetches all projects for the authenticated user, ordered by most recently created first."
      include Mixins::Authorization

      type [Types::ProjectType], null: false

      def resolve
        user = require_authentication!(context)
        user.projects.order(created_at: :desc)
      end
    end
  end
end
