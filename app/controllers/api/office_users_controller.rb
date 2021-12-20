class Api::OfficeUsersController < ApplicationController
    skip_before_action :authenticate_user

    def show
        if session[:user_type]=="o" and current_user
            render json: current_user, status: :ok
        else
            render json: "Not authenticated", status: :unauthorized
        end
    end

    def create
        user = OfficeUser.create(user_params)
        if user.valid?
            session[:user_id] = user.id
            session[:user_type] = "o"
            render json: user, status: :created
        else
            render json: user.errors.full_messages, status: :unprocessable_entity
        end
    end

    private

    def user_params
        params.permit(:email, :password, :password_confirmation, :name, :phone, :title, :specialization)
    end
end
