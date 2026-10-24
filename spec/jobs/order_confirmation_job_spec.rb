require "rails_helper"

RSpec.describe OrderConfirmationJob, type: :job do
  let(:customer) { Customer.create!(email: "jobs@example.com", name: "Jobs") }
  let(:order) { Order.create!(customer: customer, delivery_date: Date.new(2026, 1, 5), status: "pending") }

  it "records when the confirmation was sent" do
    described_class.perform_now(order.id)
    expect(order.reload.confirmation_sent_at).to be_present
  end

  it "does nothing when run a second time" do
    described_class.perform_now(order.id)
    first_sent_at = order.reload.confirmation_sent_at

    described_class.perform_now(order.id)
    expect(order.reload.confirmation_sent_at).to eq(first_sent_at)
  end
end