class Meal < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  validates :price_cents, numericality: { only_integer: true, greater_than: 0 }
  validates :calories, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true

  after_commit :clear_menu_cache

  private

  def clear_menu_cache
    Rails.cache.delete("meals/menu")
  end
end