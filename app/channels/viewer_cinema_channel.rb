class ViewerCinemaChannel < ApplicationCable::Channel
  def subscribed
    stream_from "viewer_cinema_#{params[:id]}"
  end
end
