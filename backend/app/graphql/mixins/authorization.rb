module Mixins
  module Authorization
    def require_authentication!(context)
      user = context[:current_user]
      raise GraphQL::ExecutionError, "Unauthorized" unless user
      user
    end

    def require_admin!(context)
      user = require_authentication!(context)
      raise GraphQL::ExecutionError, "Admin only" unless user.level_admin?
      user
    end
  end
end
