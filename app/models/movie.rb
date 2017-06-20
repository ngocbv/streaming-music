class Movie < ApplicationRecord
  has_many :movie_categories, dependent: :destroy
  has_many :categories, through: :movie_categories

  has_one :cinema

  validates :phimmoi_id, uniqueness: true

  scope :search_by_query, ->query do
    where "name LIKE ?", "%#{sanitize_sql_like query.strip}%"
  end

  def json_data options = {}
    options = options.merge({methods: [:stream_media]})
    as_json options
  end

  def stream_media
    GetLinkFilmService.new(phimmoi_id).find_media if phimmoi_id.present?
  end
end
