# frozen_string_literal: true

module Types
  module Projects
    class ProjectType < Types::BaseObject
      field :id, ID, null: false
      field :name, String, null: false
      field :description, String, null: false
      field :user, Types::Users::UserType, null: false
      # TODO: fix to get the task in the project
      # field :task, Types::TaskType, null: false
      field :created_at, GraphQL::Types::ISO8601DateTime
      field :updated_at, GraphQL::Types::ISO8601DateTime
    end
  end
end
