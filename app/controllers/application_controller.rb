class ApplicationController < ActionController::API
    before_action :authenticate_user
    include ActionController::Cookies
    include ActionController::Serialization
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :invalid_record

    private

    def current_user
        if session[:user_type]=="p"
            @current_user = PatientUser.find_by_id(session[:user_id])
        else
            @current_user = OfficeUser.find_by_id(session[:user_id])
        end
    end

    def record_not_found(errors)
        render json: { errors: ["Not authorized"] }, status: :not_found
    end

    def invalid_record(invalid)
        render json: { errors: invalid_record.errors.full_messages }, status: :unprocessable_entity
    end

    def authenticate_user
        render json: "Not authorized", status: :unauthorized unless current_user
    end
end
