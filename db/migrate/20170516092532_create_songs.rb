class CreateSongs < ActiveRecord::Migration[5.0]
  def change
    create_table :songs do |t|
      t.string :name
      t.string :description
      t.attachment :attachment

      t.timestamps
    end
  end
end
