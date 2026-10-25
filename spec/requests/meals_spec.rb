require "rails_helper"

RSpec.describe "Meals API", type: :request do
  let(:user) { User.create!(email_address: "cook@example.com", password: "secret123") }
  let(:auth) { { "Authorization" => "Bearer #{user.api_token}" } }

  describe "POST /api/meals" do
    it "creates a meal" do
      post "/api/meals", params: { meal: { name: "Tofu Stir Fry", price_cents: 1099 } }, headers: auth, as: :json

      expect(response).to have_http_status(:created)
      expect(response.parsed_body["name"]).to eq("Tofu Stir Fry")
    end

    it "rejects a meal with no name" do
      post "/api/meals", params: { meal: { price_cents: 500 } }, headers: auth, as: :json

      expect(response).to have_http_status(422)
      expect(response.parsed_body["errors"]).to include("Name can't be blank")
    end

    it "rejects requests without a token" do
      expect {
        post "/api/meals", params: { meal: { name: "Vandal Tacos", price_cents: 1 } }, as: :json
      }.not_to change(Meal, :count)

      expect(response).to have_http_status(:unauthorized)
    end

    it "rejects an invalid token" do
      post "/api/meals", params: { meal: { name: "Vandal Tacos", price_cents: 1 } },
        headers: { "Authorization" => "Bearer not-a-real-token" }, as: :json

      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe "GET /api/meals" do
    it "stays public" do
      get "/api/meals"

      expect(response).to have_http_status(:ok)
    end
  end

  describe "GET /api/meals/:id" do
    it "returns 404 for a meal that does not exist" do
      get "/api/meals/999999"

      expect(response).to have_http_status(:not_found)
    end
  end
end
