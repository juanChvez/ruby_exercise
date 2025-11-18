module Queries
  class BaseQuery < GraphQL::Schema::Resolver
    argument_class Types::BaseArgument
  end
end
