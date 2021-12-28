class Api::AppointmentsController < ApplicationController
    def index
        appts = current_user.appointments
        render json: appts
    end

    def create
        appointment = Appointment.create(apt_params)
        if appointment.valid?
            render json: appointment, status: :created
        else
            render json: { errors: appointment.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy 
        appointment = Appointment.find_by(id: params[:id])
        if appointment 
            appointment.destroy
            head :no_content 
        else  
            render json: "Appointment does not exist", status: :not_found 
        end
    end

    def update
        appointment = Appointment.find_by(id: params[:id])
        if appointment 
            appointment.update(apt_params)
            render json:appointment
        else  
            render json: { errors: ["Appointment does not exist"]}, status: :not_found 
        end
    end

    private

    def apt_params
        params.permit(:title, :start, :end, :patient_user_id, :office_user_id,
        :confirmed, :completed, :description, :charge, :rating, :review)
    end

end
