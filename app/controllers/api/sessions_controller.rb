class Api::SessionsController < Api::BaseApiController
  include Devise::Controllers::SignInOut

  def create
    user = User.where("lower(email) = :name or lower(username) = :name",
      name: params[:email].downcase).first
    if user && user.valid_password?(params[:password])
      sign_in "user", user
      response_success({message: "Login success", user: current_user, session: user_session})
    else
      response_fail({message: "Can't login"})
    end
  end
end
