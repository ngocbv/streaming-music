class AddPhimmoiIdToMovies < ActiveRecord::Migration[5.0]
  def change
    add_column :movies, :phimmoi_id, :string
  end
end
