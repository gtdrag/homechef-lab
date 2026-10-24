module Api
  class MeController < ActionController::API
    include ActionController::HttpAuthentication::Token::ControllerMethods

    before_action :require_token

    def show
      render json: { id: @current_user.id, email_address: @current_user.email_address }
    end

    private

    def require_token
      @current_user = authenticate_with_http_token do |token, _options|
        User.find_by(api_token: token)
      end

      render json: { error: "Unauthorized" }, status: :unauthorized unless @current_user
    end
  end
end
