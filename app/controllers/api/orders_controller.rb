module Api
  class OrdersController < ActionController::API
    def show
      order = Order.includes(:customer, order_items: :meal).find(params[:id])

      items = order.order_items.map do |item|
        { meal: item.meal.name, quantity: item.quantity, unit_price_cents: item.unit_price_cents }
      end

      render json: {
        id: order.id,
        delivery_date: order.delivery_date,
        status: order.status,
        customer: { id: order.customer.id, name: order.customer.name },
        items: items,
        total_cents: order.order_items.sum { |item| item.unit_price_cents * item.quantity }
      }
    end
  end
end