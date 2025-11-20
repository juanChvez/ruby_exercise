module Types
  module Projects
    class ProjectDetailType < Types::BaseObject
      field :id, ID, null: false
      field :title, String, null: false
      field :description, String, null: true
      field :date, String, null: false
      field :tasks, Types::Projects::GroupedTasksType, null: false

      def title
        object.name
      end

      def date
        object.created_at.strftime("%d/%m/%Y")
      end

      def tasks
        tasks = object.tasks.includes(:assignee)

        {
          todo: tasks.where(status: "TODO"),
          in_progress: tasks.where(status: "IN_PROGRESS"),
          done: tasks.where(status: "DONE")
        }
      end
    end
  end
end
