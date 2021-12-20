class OfficeUser < ApplicationRecord
    has_secure_password
    before_save :normalize_phone
    has_many :appointments
    has_many :patient_users, through: :appointments
    validates :phone, phone: { possible: true, allow_blank: true }

    private

    def normalize_phone
        self.phone = Phonelib.parse(phone).full_e164.presence
    end
end
