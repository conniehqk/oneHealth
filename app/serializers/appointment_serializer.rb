class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :title, :start, :end, :charge, :confirmed, :completed, :description, :office_user_id, :patient_user_id
  belongs_to :office_user
end
