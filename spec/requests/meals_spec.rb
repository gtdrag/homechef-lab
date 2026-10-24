require "rails_helper"

RSpec.describe "Meals API", type: :request do
  describe "POST /api/meals" do
    it "creates a meal" do
      post "/api/meals", params: { meal: { name: "Tofu Stir Fry", price_cents: 1099 } }, as: :json

      expect(response).to have_http_status(:created)
      expect(response.parsed_body["name"]).to eq("Tofu Stir Fry")
    end

    it "rejects a meal with no name" do
      post "/api/meals", params: { meal: { price_cents: 500 } }, as: :json

      expect(response).to have_http_status(422)
      expect(response.parsed_body["errors"]).to include("Name can't be blank")
    end
  end

  describe "GET /api/meals/:id" do
    it "returns 404 for a meal that does not exist" do
      get "/api/meals/999999"

      expect(response).to have_http_status(:not_found)
    end
  end
end
