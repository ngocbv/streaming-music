class CreateMovieCategories < ActiveRecord::Migration[5.0]
  def change
    create_table :movie_categories do |t|
      t.references :movie, foreign_key: true
      t.references :category, foreign_key: true

      t.timestamps
    end

    add_column :movies, :background_url, :string
    add_column :movies, :phimmoi_id, :string
  end
end
