Rails.application.routes.draw do
  # Redirect raíz a GraphiQL
  post "/graphql", to: "graphql#execute"

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  # Health check
  get "up" => "rails/health#show", :as => :rails_health_check

  # Defines the root path route ("/")
  root to: redirect("/graphiql")
end
