class Movie < ApplicationRecord
  has_many :movie_categories, dependent: :destroy
  has_many :categories, through: :movie_categories

  validates :phimmoi_id, uniqueness: true

  scope :search_by_query, ->query do
    where "name LIKE ?", "%#{sanitize_sql_like query.strip}%"
  end
end
