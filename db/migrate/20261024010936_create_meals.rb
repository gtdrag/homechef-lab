class CreateMeals < ActiveRecord::Migration[8.1]
  def change
    create_table :meals do |t|
      t.string :name
      t.text :description
      t.integer :price_cents
      t.integer :calories

      t.timestamps
    end
  end
end
