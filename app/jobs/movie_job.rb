class MovieJob < ApplicationJob
  def perform type, value = nil
    ActionCable.server.broadcast "movie_1", {type: type, value: value}
  end
end
