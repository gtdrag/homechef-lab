require "rails_helper"

RSpec.describe OrderItem, type: :model do
  it "keeps the price it was ordered at when the menu price changes" do
    meal = Meal.create!(name: "Steak Frites", price_cents: 1400)
    customer = Customer.create!(email: "snap@example.com", name: "Snap")
    order = Order.create!(customer: customer, delivery_date: Date.new(2026, 1, 5), status: "pending")
    item = OrderItem.create!(order: order, meal: meal, quantity: 2)

    meal.update!(price_cents: 1600)

    expect(item.reload.unit_price_cents).to eq(1400)
  end
end
