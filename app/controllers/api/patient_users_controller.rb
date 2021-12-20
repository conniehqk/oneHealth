class Api::PatientUsersController < ApplicationController
    skip_before_action :authenticate_user

    def index
        users = PatientUser.all
        render json: users
    end

    def show
        if session[:user_type]=="p" and current_user
            render json: current_user, status: :ok
        else
            render json: "Not authenticated", status: :unauthorized
        end
    end

    def create
        user = PatientUser.create(user_params)
        if user.valid?
            session[:user_id] = user.id
            session[:user_type] = "p"
            render json: user, status: :created
        else
            render json: user.errors.full_messages, status: :unprocessable_entity
        end
    end

    def update
        if current_user
            current_user.update(user_edit_params)
            render json: current_user
        else
            render json: "Not authenticated", status: :unauthorized
        end
    end

    private

    def user_params
        params.permit(:email, :password, :password_confirmation, 
            :full_name, :dob, :phone, :insurance, :insurance_id)
    end

    def user_edit_params
        params.permit(:gender, :full_name, :dob, :phone, :address, :insurance, :insurance_id)
    end
end
