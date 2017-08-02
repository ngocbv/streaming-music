class CreateCinemaUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :cinema_users do |t|
      t.references :user, foreign_key: true
      t.references :cinema, foreign_key: true

      t.timestamps
    end
  end
end
