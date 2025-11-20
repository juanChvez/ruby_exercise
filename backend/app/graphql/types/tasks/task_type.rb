module Types
  module Tasks
    class TaskType < Types::BaseObject
      field :id, ID, null: false
      field :title, String, null: false
      field :description, String, null: true
      field :status, String, null: false
      field :project, Types::Projects::ProjectType, null: false
      field :assignee_type, String, null: true
      field :assignee_id, Integer, null: true
      field :created_at, GraphQL::Types::ISO8601DateTime
      field :updated_at, GraphQL::Types::ISO8601DateTime
    end
  end
end
