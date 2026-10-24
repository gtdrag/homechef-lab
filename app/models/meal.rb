class Meal < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  validates :price_cents, numericality: { only_integer: true, greater_than: 0 }
  validates :calories, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
end