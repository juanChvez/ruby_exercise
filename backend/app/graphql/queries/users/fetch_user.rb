module Queries
  module Users
    class FetchUser < BaseQuery
      type Types::UserType, null: true
      description "Returns a user by their ID. If a user with the specified ID exists, their information will be returned. Returns null if no user is found."

      argument :id, ID, required: true

      def resolve(id:)
        User.find_by(id: id)
      end
    end
  end
end
