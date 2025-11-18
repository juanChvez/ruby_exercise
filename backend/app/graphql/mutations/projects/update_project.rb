module Mutations
  module Projects
    class UpdateProject < BaseMutation
      description "Updates an existing project for the authenticated user. Returns the updated project if successful, or error messages if the update fails."
      include Mixins::Authorization

      argument :id, ID, required: true
      argument :name, String, required: false
      argument :description, String, required: false

      field :project, Types::ProjectType, null: true
      field :errors, [String], null: false

      def resolve(id:, name: nil, description: nil)
        user = require_authentication!(context)
        raise GraphQL::ExecutionError, "Not authenticated" unless user

        project = user.projects.find_by(id: id)
        raise GraphQL::ExecutionError, "Project not found" unless project

        attrs = {}
        attrs[:name] = name unless name.nil?
        attrs[:description] = description unless description.nil?

        if project.update(attrs)
          {project: project, errors: []}
        else
          {project: nil, errors: project.errors.full_messages}
        end
      end
    end
  end
end
