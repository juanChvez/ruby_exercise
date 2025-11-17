module Mutations
  module Users
    class UpdateUser < BaseMutation
      description "Update an existing user. Takes an ID and any fields to update. Returns the updated user object if successful, or a list of error messages if the update fails."
      include Mixins::Authorization

      argument :id, ID, required: true
      argument :name, String, required: false
      argument :email, String, required: false
      argument :current_password, String, required: false
      argument :password, String, required: false
      argument :password_confirmation, String, required: false

      # The return type of the mutation
      field :user, Types::UserType, null: true
      field :errors, [String], null: false

      def resolve(id:, name: nil, email: nil, current_password: nil, password: nil, password_confirmation: nil)
        user = require_authentication!(context)
        return {user: nil, errors: ["User not found"]} unless user

        # Only update attributes that are provided
        attrs = {}
        attrs[:name] = name if name
        attrs[:email] = email if email

        # If either password or password_confirmation is provided,
        # handle password change logic including verification of current password.
        if password.present? || password_confirmation.present?
          # Must provide current password
          if current_password.blank?
            return {user: nil, errors: ["Current password is required to change password"]}
          end

          # Validate actual current password
          unless user.authenticate(current_password)
            return {user: nil, errors: ["Current password is incorrect"]}
          end

          # Apply new password + confirmation
          attrs[:password] = password
          attrs[:password_confirmation] = password_confirmation
        end

        if user.update(attrs)
          {user: user, errors: []}
        else
          {user: nil, errors: user.errors.full_messages}
        end
      end
    end
  end
end
