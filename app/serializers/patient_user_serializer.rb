class PatientUserSerializer < ActiveModel::Serializer
  attributes :id, :email, :full_name, :dob, :phone, :insurance, :insurance_id, :gender, :address
end
