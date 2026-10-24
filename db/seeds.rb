# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
meals = [
  { name: "Steak Frites", description: "Garlic butter steak, fries", price_cents: 1199, calories: 720 },
  { name: "Keto Chicken Bowl", description: "Grilled chicken, cauliflower rice", price_cents: 1099, calories: 540 },
  { name: "Protein Bowl", description: "Turkey, quinoa, black beans", price_cents: 1349, calories: 610 },
  { name: "Salmon and Greens", description: "Roasted salmon, green beans", price_cents: 1499, calories: 580 }
]

meals.each do |attrs|
  Meal.find_or_create_by!(name: attrs[:name]) do |meal|
    meal.assign_attributes(attrs)
  end
end

puts "Meals: #{Meal.count}"