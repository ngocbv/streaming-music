class CreateCinemas < ActiveRecord::Migration[5.0]
  def change
    create_table :cinemas do |t|
      t.string :name
      t.references :movie, index: true
      t.string :unique_token
      t.text :description
      t.integer :host_user_id
      t.string :slug

      t.timestamps
    end

    add_index :cinemas, :slug, unique: true
  end
end
