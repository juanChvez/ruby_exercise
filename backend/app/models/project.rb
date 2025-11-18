class Project < ApplicationRecord
  belongs_to :user
  # has_many :tasks, dependent: :destroy #TODO: use when task was incorporated

  validates :name, presence: true, length: {maximum: 100}
  validates :user_id, presence: true
  validates :description, presence: true
end
