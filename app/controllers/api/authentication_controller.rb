class Api::AuthenticationController < Api::BaseApiController
  def index
    if current_user
      response_success AuthenticationSerializer.new current_user
    else
      response_success({id: nil})
    end
  end
end
