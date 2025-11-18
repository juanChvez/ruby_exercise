# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    # Users
    field :users, resolver: Queries::Users::FetchUsers
    field :user, resolver: Queries::Users::FetchUser

    # Projects
    field :projects, resolver: Queries::Projects::FetchProjects
    field :project, resolver: Queries::Projects::FetchProject

    # Tasks
    field :task, resolver: Queries::Tasks::FetchTask
    field :tasks, resolver: Queries::Tasks::FetchTasks
  end
end
