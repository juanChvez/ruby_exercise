module Queries
  module Users
    class FetchUser < BaseQuery
      type Types::UserType, null: true
      description "Returns a user by their ID. If a user with the specified ID exists, their information will be returned. Returns null if no user is found."
      include Mixins::Authorization

      def resolve
        require_authentication!(context)
      end
    end
  end
end
