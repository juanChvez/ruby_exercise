module Queries
  module Projects
    class FetchDashboard < GraphQL::Schema::Resolver
      description "Fetches metrics and recent projects for the current user's dashboard"
      include Mixins::Authorization

      type GraphQL::Types::JSON, null: false

      def resolve
        user = require_authentication!(context)
        if user.level_admin?
          Services::Projects::DashboardFetcherAdmin.call(user)
        else
          Services::Projects::DashboardFetcherUser.call(user)
        end
      rescue => e
        raise GraphQL::ExecutionError, "Error al obtener datos del dashboard: #{e.message}"
      end
    end
  end
end
