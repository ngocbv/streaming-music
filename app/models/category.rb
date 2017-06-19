class Category < ApplicationRecord
  has_many :movie_categories, dependent: :destroy
  has_many :movies
end
