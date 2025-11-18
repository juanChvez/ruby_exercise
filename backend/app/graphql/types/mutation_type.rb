# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    # Users
    field :create_user, mutation: Mutations::Users::CreateUser
    field :update_user, mutation: Mutations::Users::UpdateUser
    field :delete_user, mutation: Mutations::Users::DeleteUser
    field :login_user, mutation: Mutations::Users::LoginUser
    field :create_user_admin, mutation: Mutations::Users::CreateAdmin

    # Projects
    field :create_project, mutation: Mutations::Projects::CreateProject
    field :update_project, mutation: Mutations::Projects::UpdateProject
    field :delete_project, mutation: Mutations::Projects::DeleteProject

    # Tasks
    field :create_task, mutation: Mutations::Tasks::CreateTask
    field :update_task, mutation: Mutations::Tasks::UpdateTask
    field :delete_task, mutation: Mutations::Tasks::DeleteTask
  end
end
