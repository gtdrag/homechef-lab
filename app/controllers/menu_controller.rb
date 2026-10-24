class MenuController < ApplicationController
  allow_unauthenticated_access

  def index
    @meals = Meal.order(:name)
  end
end
