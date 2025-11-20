class Task < ApplicationRecord
  belongs_to :project

  # Polymorphic assignee (User | Admin)
  belongs_to :assignee, polymorphic: true, optional: true

  validates :title, presence: true
  validates :status, inclusion: {in: %w[TODO IN_PROGRESS DONE]}
end
