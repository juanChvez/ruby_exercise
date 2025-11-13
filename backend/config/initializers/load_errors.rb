Dir[Rails.root.join("app/errors/**/*.rb")].each { |file| require file }
