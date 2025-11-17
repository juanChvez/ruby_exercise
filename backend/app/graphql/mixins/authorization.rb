module Mixins
  module Authorization
    def require_authentication!(context)
      user = context[:current_user]
      raise GraphQL::ExecutionError, "Unauthorized" unless user
      user
    end
  end
end
