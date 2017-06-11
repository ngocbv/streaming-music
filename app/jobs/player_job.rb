class PlayerJob < ApplicationJob
  def perform type, value = nil
    ActionCable.server.broadcast "player_1", {type: type, value: value}
  end
end
