class CreatePatientUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :patient_users do |t|
      t.string :email
      t.string :password_digest
      t.string :full_name
      t.date :dob
      t.string :gender
      t.string :address
      t.string :phone
      t.string :insurance
      t.string :insurance_id
      t.timestamps
    end
  end
end
