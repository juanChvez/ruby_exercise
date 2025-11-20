module Queries
  module Projects
    class FetchProject < BaseQuery
      description "Fetches all projects for the authenticated user, ordered by most recently created first."
      include Mixins::Authorization

      argument :id, ID, required: true
      type Types::Projects::ProjectType, null: true

      def resolve(id:)
        user = require_authentication!(context)
        user.projects.find_by(id: id)
      end
    end
  end
end
