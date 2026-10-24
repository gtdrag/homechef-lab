class MenuController < ApplicationController
  def index
    @meals = Meal.order(:name)
  end
end