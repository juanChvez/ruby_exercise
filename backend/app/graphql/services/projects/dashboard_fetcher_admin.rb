module Services
  module Projects
    class DashboardFetcherAdmin
      def self.call(current_user)
        new(current_user).call
      end

      def initialize(current_user)
        @user = current_user
      end

      def call
        total_projects = @user.projects.count
        total_tasks = Task.joins(:project).where(projects: {user_id: @user.id}).count
        already_complet = Task.joins(:project).where(projects: {user_id: @user.id}, status: "DONE").count
        to_do = Task.joins(:project).where(projects: {user_id: @user.id}, status: "TODO").count
        in_progress = Task.joins(:project).where(projects: {user_id: @user.id}, status: "IN_PROGRESS").count

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
