# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    # Users
    field :create_user, mutation: Mutations::Users::CreateUser
    field :update_user, mutation: Mutations::Users::UpdateUser
    field :delete_user, mutation: Mutations::Users::DeleteUser
    field :login_user, mutation: Mutations::Users::LoginUser
  end
end
