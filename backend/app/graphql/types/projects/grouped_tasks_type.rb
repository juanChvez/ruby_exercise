module Types
  module Projects
    class GroupedTasksType < Types::BaseObject
      field :todo, [Types::Tasks::TaskItemType], null: false
      field :in_progress, [Types::Tasks::TaskItemType], null: false
      field :done, [Types::Tasks::TaskItemType], null: false
    end
  end
end
