class ConversationJob < ApplicationJob
  def perform message, cinema_id
    ActionCable.server.broadcast "conversation_#{cinema_id}", {message: message}
  end
end
