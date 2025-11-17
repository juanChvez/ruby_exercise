module Queries
  module Users
    class FetchUsers < BaseQuery
      type [Types::UserType], null: false
      description "Returns all users. You can optionally filter by name and/or email. Performs a case-insensitive search."

      # Optional arguments for filtering
      argument :name, String, required: false
      argument :email, String, required: false

      def resolve(name: nil, email: nil)
        users = User.all
        # Filter by name if provided
        users = users.where("name ILIKE ?", "%#{name}%") if name.present?
        # Filter by email if provided
        users = users.where("email ILIKE ?", "%#{email}%") if email.present?
        users
      end
    end
  end
end
