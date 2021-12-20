class OfficeUserSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :email, :phone, :title, :specialization, :ratings
  has_many :appointments
end
