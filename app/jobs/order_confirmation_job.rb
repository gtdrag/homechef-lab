class OrderConfirmationJob < ApplicationJob
  queue_as :default

  retry_on Net::OpenTimeout, wait: :polynomially_longer, attempts: 5
  discard_on ActiveRecord::RecordNotFound

  def perform(order_id)
    order = Order.find(order_id)
    return if order.confirmation_sent_at.present?

    sleep 2 # pretend this is a slow email service
    Rails.logger.info "[OrderConfirmation] emailed #{order.customer.email} about order #{order.id}"
    order.update!(confirmation_sent_at: Time.current)
  end
end