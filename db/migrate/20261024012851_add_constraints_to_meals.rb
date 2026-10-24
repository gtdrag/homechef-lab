class AddConstraintsToMeals < ActiveRecord::Migration[8.1]
  def change
    change_column_null :meals, :name, false
    change_column_null :meals, :price_cents, false
    add_index :meals, :name, unique: true
  end
end