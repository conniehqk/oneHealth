class CreateAppointments < ActiveRecord::Migration[6.1]
  def change
    create_table :appointments do |t|
      t.datetime :start
      t.datetime :end
      t.string :title
      t.belongs_to :patient_user
      t.belongs_to :office_user, null: false
      t.boolean :confirmed
      t.boolean :completed
      t.text :description
      t.float :charge
      t.timestamps
    end
  end
end
