module Queries
  module Users
    class ValidateToken < BaseQuery
      description "Validates the authentication token and returns the current user if valid."
      include Mixins::Authorization

      type GraphQL::Types::JSON, null: false

      def resolve
        require_authentication!(context)
        {success: true, errors: []}
      rescue => e
        {success: false, errors: [e.message]}
      end
    end
  end
end
