class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :title, :start, :end, :charge, :confirmed, :completed, :description, :office_user_id, :patient_user_id, :rating, :review
  belongs_to :office_user
  belongs_to :patient_user
end
