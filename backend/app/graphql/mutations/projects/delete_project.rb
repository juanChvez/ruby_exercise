module Mutations
  module Projects
    class DeleteProject < BaseMutation
      description "Deletes a project by its ID. Returns success as true if the project was deleted, otherwise returns errors."
      include Mixins::Authorization

      argument :id, ID, required: true

      field :success, Boolean, null: false
      field :errors, [String], null: false

      def resolve(id:)
        user = require_authentication!(context)
        unless user
          return {
            success: false,
            errors: ["User not found"]
          }
        end

        project = user.projects.find_by(id: id)
        if project.destroy
          {
            success: true,
            errors: []
          }
        else
          {
            success: false,
            errors: project.errors.full_messages
          }
        end
      end
    end
  end
end
