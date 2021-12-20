class Appointment < ApplicationRecord
  belongs_to :patient_user
  belongs_to :office_user
end
