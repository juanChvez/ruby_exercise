module Mutations
  module Users
    class DeleteUser < BaseMutation
      description "Delete a user by ID. Returns true if the user is deleted, or a list of error messages if deletion fails."
      include Mixins::Authorization

      argument :id, ID, required: true

      field :success, Boolean, null: false
      field :errors, [String], null: false

      def resolve(id:)
        user = require_authentication!(context)

        unless user
          return {
            success: false,
            errors: ["User not found"]
          }
        end

        if user.destroy
          {
            success: true,
            errors: []
          }
        else
          {
            success: false,
            errors: user.errors.full_messages
          }
        end
      end
    end
  end
end
