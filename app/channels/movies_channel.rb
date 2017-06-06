class MoviesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "movie_1"
  end
end
