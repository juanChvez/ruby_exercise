module Mutations
  module Users
    class CreateUser < BaseMutation
      description "Create a new user. Requires name, email, password, and password confirmation. Returns the created user object if successful, or a list of error messages if creation fails."

      argument :name, String, required: true
      argument :email, String, required: true
      argument :password, String, required: true
      argument :password_confirmation, String, required: true

      field :user, Types::UserType, null: true
      field :errors, [String], null: false

      def resolve(name:, email:, password:, password_confirmation:)
        user = User.new(
          name: name,
          email: email,
          password: password,
          password_confirmation: password_confirmation
        )

        if user.save
          {user: user, errors: []}
        else
          {user: nil, errors: user.errors.full_messages}
        end
      end
    end
  end
end
