# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_12_21_164100) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "appointments", force: :cascade do |t|
    t.datetime "start"
    t.datetime "end"
    t.string "title"
    t.bigint "patient_user_id"
    t.bigint "office_user_id", null: false
    t.boolean "confirmed"
    t.boolean "completed"
    t.text "description"
    t.float "charge"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "docName"
    t.index ["office_user_id"], name: "index_appointments_on_office_user_id"
    t.index ["patient_user_id"], name: "index_appointments_on_patient_user_id"
  end

  create_table "office_users", force: :cascade do |t|
    t.string "full_name"
    t.string "email"
    t.string "password_digest"
    t.string "image"
    t.string "phone"
    t.string "title"
    t.string "specialization"
    t.float "ratings"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "patient_users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.string "full_name"
    t.date "dob"
    t.string "gender"
    t.string "address"
    t.string "phone"
    t.string "insurance"
    t.string "insurance_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
