module Types
  module Tasks
    class UpdateTaskInput < Types::BaseInputObject
      argument :id, ID, required: true
      argument :title, String, required: false
      argument :description, String, required: false
      argument :status, String, required: false
      argument :assignee_id, ID, required: false
      argument :assignee_type, String, required: false
    end
  end
end
