class AddNameIndexToSongs < ActiveRecord::Migration[5.0]
  def change
    add_index :songs, :name, unique: true
  end
end
