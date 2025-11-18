class User < ApplicationRecord
  has_secure_password
  has_many :projects
  has_many :tasks, as: :assignee

  enum :level, {admin: "admin", user: "user"}, prefix: true

  validates :email, presence: true, uniqueness: true
  validates :name, presence: true
  validates :password, presence: true, length: {minimum: 6}, if: :password_required?
  validates :password_confirmation, presence: true, if: :password_required?
  validates :level, presence: true

  private

  def password_required?
    new_record? || password.present? || password_confirmation.present?
  end
end
