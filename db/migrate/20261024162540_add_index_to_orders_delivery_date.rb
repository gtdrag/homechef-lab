class AddIndexToOrdersDeliveryDate < ActiveRecord::Migration[8.1]
  def change
    add_index :orders, :delivery_date
  end
end
