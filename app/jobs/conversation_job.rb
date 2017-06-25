class ConversationJob < ApplicationJob
  def perform cinema_id, message
    ActionCable.server.broadcast "conversation_#{cinema_id}", {message: message}
  end
end
