module Services
  module Projects
    class DashboardFetcherUser
      def self.call(current_user)
        new(current_user).call
      end

      def initialize(current_user)
        @user = current_user
      end

      def call
        total_projects = Project
          .joins(:tasks)
          .where(tasks: {assignee_id: @user.id})
          .distinct
          .count
        total_tasks = Task.where({assignee_id: @user.id}).count
        already_complet = Task.where(assignee_id: @user.id, status: "DONE").count
        to_do = Task.where(assignee_id: @user.id, status: "TODO").count
        in_progress = Task.where(assignee_id: @user.id, status: "IN_PROGRESS").count

        {
          totalProjects: total_projects,
          totalTasks: total_tasks,
          completed: already_complet,
          inProgress: in_progress,
          toDo: to_do
        }
      end
    end
  end
end
