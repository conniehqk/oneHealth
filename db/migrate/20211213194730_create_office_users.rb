class CreateOfficeUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :office_users do |t|
      t.string :full_name
      t.string :email
      t.string :password_digest
      t.string :image
      t.string :phone
      t.string :title
      t.string :specialization
      t.float :ratings
      t.timestamps
    end
  end
end
