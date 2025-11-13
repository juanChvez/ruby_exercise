##
# Base error class for custom application errors.
#
# Extend this class to create specific error types
# with custom messages and optional HTTP status codes.
#
# @attr_reader [Integer] status The HTTP status code associated with the error.
# @example
#   raise CustomError.new("Something bad happened", 400)
#
# See also: InvalidPasswordError, other custom error subclasses.
#

class CustomError < StandardError
  attr_reader :status, :messages

  def initialize(message = "Something went wrong", status = :unprocessable_entity)
    @status = normalize_status(status)
    @messages = message.is_a?(Array) ? message : [message]
    super(@messages.join(", "))
  end

  private

  def normalize_status(status)
    case status
    when Symbol
      Rack::Utils::SYMBOL_TO_STATUS_CODE.fetch(status, 422)
    when Integer
      status
    else
      begin
        Integer(status)
      rescue
        422
      end
    end
  end
end
