require "rails_helper"

RSpec.describe "Token auth", type: :request do
  let!(:user) { User.create!(email_address: "app@example.com", password: "secret123") }

  it "rejects requests without a token" do
    get "/api/me"
    expect(response).to have_http_status(:unauthorized)
  end

  it "logs in and uses the token" do
    post "/api/session", params: { email_address: "app@example.com", password: "secret123" }, as: :json
    token = response.parsed_body["token"]

    get "/api/me", headers: { "Authorization" => "Bearer #{token}" }
    expect(response.parsed_body["email_address"]).to eq("app@example.com")
  end
end
