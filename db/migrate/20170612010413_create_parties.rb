class CreateParties < ActiveRecord::Migration[5.0]
  def change
    create_table :parties do |t|
      t.string :name
      t.string :unique_token
      t.text :description
      t.integer :creator_id
      t.string :slug

      t.timestamps
    end

    add_index :parties, :slug, unique: true
  end
end
