class AddInfoToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :image_url, :string
    add_column :users, :name, :string
    add_column :users, :role, :integer
  end
end
