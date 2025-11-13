##
# Controller for managing Users within API v1 namespace.
#
# Handles listing, displaying, creating, and updating User resources.
#
class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: [:show, :update]

  ##
  # GET /api/v1/users
  #
  # Returns a list of all users.
  #
  # @return [JSON] List of users
  def index
    users = User.all
    render json: users, status: :ok
  end

  ##
  # GET /api/v1/users/:id
  #
  # Returns a specific user by id.
  #
  # @return [JSON] User object or error if not found
  def show
    render json: @user, status: :ok
  end

  ##
  # POST /api/v1/users
  #
  # Creates a new user with provided parameters.
  #
  # @return [JSON] Created user object or errors
  def create
    valid_password
    user = User.new(user_params)
    if user.save
      render json: user, status: :created
    else
      raise CustomError.new(user.errors.full_messages, :conflict)
    end
  rescue CustomError => e
    render json: {
      status: e.status,
      errors: e.messages
    }, status: e.status
  end

  ##
  # PATCH/PUT /api/v1/users/:id
  #
  # Updates an existing user with provided parameters.
  #
  # @return [JSON] Updated user object or errors
  def update
    valid_password(false)
    if @user.update(user_params)
      render json: @user, status: :ok
    else
      raise CustomError.new(@user.errors.full_messages, :conflict)
    end
  rescue CustomError, InvalidPasswordError => e
    render json: {status: e.status, errors: e.messages}, status: e.status
  end

  private

  ##
  # Sets the user instance variable for show and update actions.
  #
  # @raise [ActiveRecord::RecordNotFound] if user does not exist
  def set_user
    @user = User.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: {error: "User not found"}, status: :not_found
  end

  ##
  # Strong parameters: only allow permitted fields for user.
  #
  # @return [ActionController::Parameters] Allowed user params
  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

  ##
  # Validates the password and password confirmation from user_params.
  #
  # Checks whether both password and password_confirmation are present,
  # ensures they match, and verifies the password length is at least 6 characters.
  # If any of these validations fail, renders a JSON error response and halts further execution.
  #
  # @return [void] Renders JSON and returns early if validation fails.
  def valid_password(required: true)
    password = user_params[:password]
    password_confirmation = user_params[:password_confirmation]

    return unless required || password.present? || password_confirmation.present?

    raise CustomError.new("Password must be present") unless password.present?
    raise CustomError.new("Password confirmation must be present") unless password_confirmation.present?
    raise CustomError.new("Password and confirmation do not match") unless password == password_confirmation
    raise CustomError.new("Password must be at least 6 characters long") unless password.length >= 6
  end
end
