module Services
  module Projects
    class DashboardFetcher
      include Mixins::Authorization

      def self.call(current_user)
        new(current_user).call
      end

      def initialize(current_user)
        @user = current_user
      end

      def call
        total_projects = 0
        total_tasks = 0
        in_progress = 0
        already_complet = 0
        to_do = 0

        if is_admin?(@user)
          total_projects = @user.projects.count
          total_tasks = Task.joins(:project).where(projects: {user_id: @user.id}).count
          already_complet = Task.joins(:project).where(projects: {user_id: @user.id}, status: "DONE").count
          to_do = Task.joins(:project).where(projects: {user_id: @user.id}, status: "TODO").count
          in_progress = Task.joins(:project).where(projects: {user_id: @user.id}, status: "IN_PROGRESS").count
        else
          total_projects = Project
            .joins(:tasks)
            .where(tasks: {assignee_id: @user.id})
            .distinct
            .count
          total_tasks = Task.where({assignee_id: @user.id}).count
          already_complet = Task.where(assignee_id: @user.id, status: "DONE").count
          to_do = Task.where(assignee_id: @user.id, status: "TODO").count
          in_progress = Task.where(assignee_id: @user.id, status: "IN_PROGRESS").count
        end

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
