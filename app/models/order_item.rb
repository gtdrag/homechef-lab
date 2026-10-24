class OrderItem < ApplicationRecord
  belongs_to :order
  belongs_to :meal

  validates :quantity, numericality: { only_integer: true, greater_than: 0 }

  before_validation :copy_current_price, on: :create

  private

  def copy_current_price
    self.unit_price_cents ||= meal&.price_cents
  end
end
