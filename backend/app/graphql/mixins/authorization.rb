module Mixins
  module Authorization
    def require_authentication!(context)
      user = context[:current_user]
      raise GraphQL::ExecutionError, "Unauthorized" unless user
      user
    end

    def require_admin!(context)
      user = require_authentication!(context)
      raise GraphQL::ExecutionError, "Admin only" unless user.level == "admin"
      user
    end

    def is_admin?(user)
      user && user.level == "admin"
    end
  end
end
