class PlayersChannel < ApplicationCable::Channel
  def subscribed
    stream_from "player_#{params[:party]}"
  end
end
