class AddDocNameToAppointments < ActiveRecord::Migration[6.1]
  def change
    add_column :appointments, :docName, :string
  end
end
