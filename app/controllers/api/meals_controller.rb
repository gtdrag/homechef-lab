module Api
  class MealsController < ActionController::API
    MEAL_FIELDS = [:id, :name, :description, :price_cents, :calories]

    def index
      render json: Meal.order(:name).as_json(only: MEAL_FIELDS)
    end

    def show
      render json: Meal.find(params[:id]).as_json(only: MEAL_FIELDS)
    end

    def create
      meal = Meal.new(meal_params)
      if meal.save
        render json: meal.as_json(only: MEAL_FIELDS), status: :created
      else
        render json: { errors: meal.errors.full_messages }, status: 422
      end
    end

    private

    def meal_params
      params.expect(meal: [:name, :description, :price_cents, :calories])
    end
  end
end