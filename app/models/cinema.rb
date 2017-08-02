class Cinema < ApplicationRecord
  extend FriendlyId
  friendly_id :unique_token, use: :slugged

  belongs_to :movie
  has_many :cinema_users, dependent: :destroy
  has_many :users, through: :cinema_users

  before_create :assign_unique_token

  private
  def assign_unique_token
    self.unique_token = SecureRandom.hex(15) until unique_token?
  end

  def unique_token?
    Cinema.where(unique_token: unique_token).count == 0
  end
end
