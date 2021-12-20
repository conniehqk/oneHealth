class PatientUser < ApplicationRecord
    has_secure_password

    has_many :appointments
    has_many :office_users, through: :appointments

    before_save :normalize_phone
    validates :email, presence: true, uniqueness: true
    validates :full_name, presence: true
    validates :phone, phone: { possible: true, allow_blank: true }
    validates :password, presence: true, confirmation: true, length: { in: 10..40 },
    :if => :password_validation_required?
    validate :password_lower_case,
    :if => :password_validation_required?
    validate :password_uppercase,
    :if => :password_validation_required?
    validate :password_special_char,
    :if => :password_validation_required?
    validate :password_contains_number,
    :if => :password_validation_required?
    validate :validate_age


    def password_validation_required?
        password_digest.blank?
    end


    def password_uppercase
        return if !!password.match(/\p{Upper}/)
        errors.add :password, ' must contain at least 1 uppercase '
    end

    def password_lower_case
        return if !!password.match(/\p{Lower}/)
        errors.add :password, ' must contain at least 1 lowercase '
    end

    def password_special_char
        special = "?<>',?[]}{=-)(*&^%$#`~{}!"
        regex = /[#{special.gsub(/./){|char| "\\#{char}"}}]/
        return if password =~ regex
        errors.add :password, ' must contain special character'
    end

    def password_contains_number
        return if password.count("0-9") > 0
        errors.add :password, ' must contain at least one number'
    end
    private

    def normalize_phone
        self.phone = Phonelib.parse(phone).full_e164.presence
    end

    def validate_age
        if dob.present? && dob > 16.years.ago
            errors.add :dob, 'You should be over 16 years old.'
        end
    end
end
