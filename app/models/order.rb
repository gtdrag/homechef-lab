class Order < ApplicationRecord
  belongs_to :customer
  has_many :order_items, dependent: :destroy
  has_many :meals, through: :order_items

  scope :recent, -> { order(delivery_date: :desc, id: :desc) }
  scope :for_week, ->(date) { where(delivery_date: date.all_week) }
end