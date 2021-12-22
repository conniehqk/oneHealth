class Api::OfficeUsersController < ApplicationController
    skip_before_action :authenticate_user

    def index
        users = OfficeUser.all
        render json: users
    end

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

    def update
        user = OfficeUser.find_by(id: params[:id])
        if user
            user.update(user_edit_params)
            render json: user
        else  
            render json: "Doctor does not exist", status: :not_found 
        end
    end

    private

    def user_params
        params.permit(:email, :password, :password_confirmation, :name, :phone, :title, :specialization)
    end

    def user_edit_params
        params.permit(:ratings)
    end
end
