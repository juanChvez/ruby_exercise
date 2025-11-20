module Queries
  module Projects
    class FetchDashboard < GraphQL::Schema::Resolver
      description "Fetches metrics and recent projects for the current user's dashboard"
      include Mixins::Authorization

      type GraphQL::Types::JSON, null: false

      def resolve
        Services::Projects::DashboardFetcher.call(context[:current_user])
      rescue => e
        raise GraphQL::ExecutionError, "Error al obtener datos del dashboard: #{e.message}"
      end
    end
  end
end
