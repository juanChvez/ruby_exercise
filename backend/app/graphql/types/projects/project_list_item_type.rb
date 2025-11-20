module Types
  module Projects
    class ProjectListItemType < Types::BaseObject
      field :id, ID, null: false
      field :title, String, null: false
      field :description, String, null: true
      field :tasks, Integer, null: false
      field :date, String, null: false

      def tasks
        user = context[:current_user]

        return object.tasks.count if user.level_admin?

        object.tasks.where(assignee_id: user.id).count
      end

      def title
        object.name
      end

      def date
        object.created_at.strftime("%d/%m/%Y")
      end
    end
  end
end
