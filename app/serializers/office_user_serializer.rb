class OfficeUserSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :email, :image, :phone, :title, :specialization
  has_many :appointments
end
