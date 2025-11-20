module Queries
  module Users
    class FetchUser < BaseQuery
      type Types::Users::UserType, null: true
      description "Returns the current user if no ID is specified, or the user by ID if provided. Admins can fetch any user by ID. Returns null if unauthorized or not found."
      include Mixins::Authorization

      argument :id, ID, required: false

      def resolve(id: nil)
        current_user = require_authentication!(context)
        if id.present?
          if current_user.level == "admin"
            User.find_by(id: id)
          else
            (id.to_s == current_user.id.to_s) ? current_user : nil
          end
        else
          current_user
        end
      end
    end
  end
end
