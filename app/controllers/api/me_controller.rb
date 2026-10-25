module Api
  class MeController < BaseController
    before_action :require_token

    def show
      render json: { id: @current_user.id, email_address: @current_user.email_address }
    end
  end
end
