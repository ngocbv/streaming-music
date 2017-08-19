class ViewerCinemaJob < ApplicationJob
  def perform cinema_token
    cinema = Cinema.find_by(unique_token: cinema_token)
    viewers = cinema.users
    # byebug
    ActionCable.server.broadcast "viewer_cinema_#{cinema_token}", {viewers: viewers}
  end
end
