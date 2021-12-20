class OfficeUserSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :email, :image, :phone, :title, :specialization, :ratings
  has_many :appointments
end
