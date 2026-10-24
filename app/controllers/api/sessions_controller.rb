module Api
  class SessionsController < ActionController::API
    rate_limit to: 10, within: 3.minutes, only: :create,
      with: -> { render json: { error: "Too many attempts. Try again later." }, status: :too_many_requests }

    def create
      user = User.authenticate_by(email_address: params[:email_address], password: params[:password])

      if user
        user.regenerate_api_token if user.api_token.blank?
        render json: { token: user.api_token }, status: :created
      else
        render json: { error: "Invalid email or password" }, status: :unauthorized
      end
    end
  end
end
