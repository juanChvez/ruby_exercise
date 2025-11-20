module Types
  module Tasks
    class TaskItemType < Types::BaseObject
      field :id, ID, null: false
      field :title, String, null: false
      field :description, String, null: true
      field :status, String, null: false
      field :date, String, null: false
      field :assigned, String, null: true

      def date
        object.created_at.strftime("%d/%m/%Y")
      end

      def assigned
        object.assignee&.name
      end
    end
  end
end
