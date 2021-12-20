class Api::SessionsController < ApplicationController
    skip_before_action :authenticate_user, only: [:create_office, :create_patient]

    def create_patient
        user = PatientUser.find_by(email: params[:email])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            session[:user_type] = "p"
            render json: user, status: :created
        else
            render json: { errors: ["Invalid Credentials. Try again!"]}, status: :unauthorized
        end
    end

    def create_office
        user = OfficeUser.find_by(email: params[:email])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            session[:user_type] = "o"
            render json: user, status: :created
        else
            render json: { errors: ["Invalid Credentials. Try again!"]}, status: :unauthorized
        end
    end

    def destroy
        session.delete :user_id
        head :no_content
    end
end
