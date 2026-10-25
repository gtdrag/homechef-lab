module Api
  class BaseController < ActionController::API
    include ActionController::HttpAuthentication::Token::ControllerMethods

    private

    def require_token
      @current_user = authenticate_with_http_token do |token, _options|
        User.find_by(api_token: token)
      end

      render json: { error: "Unauthorized" }, status: :unauthorized unless @current_user
    end
  end
end
