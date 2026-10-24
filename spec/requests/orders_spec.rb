require "rails_helper"

RSpec.describe "Orders API", type: :request do
  it "pages through orders with no repeats and no gaps" do
    customer = Customer.create!(email: "pager@example.com", name: "Pager")
    25.times { Order.create!(customer: customer, delivery_date: Date.new(2026, 1, 5), status: "delivered") }

    get "/api/orders", params: { page: 1 }
    page1 = response.parsed_body["orders"].map { |o| o["id"] }

    get "/api/orders", params: { page: 2 }
    page2 = response.parsed_body["orders"].map { |o| o["id"] }

    expect(page1.size).to eq(20)
    expect(page2.size).to eq(5)
    expect((page1 + page2).sort).to eq(Order.pluck(:id).sort)
  end
end