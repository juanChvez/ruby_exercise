# frozen_string_literal: true

module Types
  module Users
    class UserType < Types::BaseObject
      field :id, ID, null: false
      field :name, String, null: false
      field :email, String, null: false
      field :created_at, String, null: false
      field :updated_at, String, null: false
      field :level, String, null: false
      field :projects, [Types::Projects::ProjectType], null: true

      def created_at
        object.created_at.strftime("%d/%m/%Y")
      end

      def updated_at
        object.updated_at.strftime("%d/%m/%Y")
      end
    end
  end
end
