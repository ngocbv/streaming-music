class Cinema < ApplicationRecord
  extend FriendlyId
  friendly_id :unique_token, use: :slugged

  belongs_to :movie

  before_create :assign_unique_token

  private
  def assign_unique_token
    self.unique_token = SecureRandom.hex(15) until unique_token?
  end

  def unique_token?
    Cinema.where(unique_token: unique_token).count == 0
  end
end
