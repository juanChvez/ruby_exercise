module Mutations
  module Projects
    class CreateProject < BaseMutation
      description "Creates a new project for the authenticated user."
      include Mixins::Authorization

      argument :name, String, required: true
      argument :description, String, required: false

      field :project, Types::Projects::ProjectListItemType, null: true
      field :errors, [String], null: false

      def resolve(name:, description: nil)
        user = require_admin!(context)

        project = user.projects.build(name:, description:)

        if project.save
          {project: project, errors: []}
        else
          {project: nil, errors: project.errors.full_messages}
        end
      end
    end
  end
end
