# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    # Users
    field :users, resolver: Queries::Users::FetchUsers
    field :user, resolver: Queries::Users::FetchUser
  end
end
