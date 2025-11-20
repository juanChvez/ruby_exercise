module Queries
  module Projects
    class FetchProject < BaseQuery
      description "Fetches project for the authenticated user, ordered by most recently created first."
      include Mixins::Authorization

      argument :id, ID, required: true
      type Types::Projects::ProjectDetailType, null: true

      def resolve(id:)
        user = require_authentication!(context)
        if user.level_admin?
          user.projects.find_by(id: id)
        else
          Project.joins(:tasks)
            .where(id: id, tasks: {assignee_id: user.id})
            .distinct
            .first
        end
      end
    end
  end
end
