class PlayerJob < ApplicationJob
  def perform type, party_id, value = nil
    ActionCable.server.broadcast "player_#{party_id}", {type: type, value: value}
  end
end
