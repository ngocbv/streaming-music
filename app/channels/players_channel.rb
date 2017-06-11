class PlayersChannel < ApplicationCable::Channel
  def subscribed
    stream_from "player_1"
  end
end
