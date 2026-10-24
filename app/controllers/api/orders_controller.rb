module Api
  class OrdersController < ActionController::API
    PER_PAGE = 20

    def index
      page = [ params.fetch(:page, 1).to_i, 1 ].max
      orders = Order.recent.includes(:customer).limit(PER_PAGE).offset((page - 1) * PER_PAGE)

      rows = orders.map do |order|
        { id: order.id, delivery_date: order.delivery_date, status: order.status, customer: order.customer.name }
      end

      render json: { page: page, per_page: PER_PAGE, orders: rows }
    end

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
