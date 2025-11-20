module Mutations
  module Users
    class LoginUser < BaseMutation
      description "Login a user and return a JWT token"

      argument :email, String, required: true
      argument :password, String, required: true

      field :token, String, null: true
      field :user, Types::Users::UserType, null: true
      field :errors, [String], null: false

      def resolve(email:, password:)
        user = User.find_by(email: email)

        # Email no existe
        return {token: nil, user: nil, errors: ["Invalid email or password"]} unless user

        # Password incorrecto
        unless user.authenticate(password)
          return {token: nil, user: nil, errors: ["Invalid email or password"]}
        end

        # Generar JWT
        token = JwtService.encode({user_id: user.id})

        {
          token: token,
          user: user,
          errors: []
        }
      end
    end
  end
end
