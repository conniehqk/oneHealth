# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

OfficeUser.destroy_all;

PatientUser.destroy_all;

(1..500).each do |id|
PatientUser.create!(
    full_name: Faker::Name.name,
    email: Faker::Internet.email,
    phone: Faker::PhoneNumber.cell_phone,
    dob: Faker::Date.birthday(min_age: 16),
    gender: Faker::Gender.binary_type,
    address: Faker::Address.full_address,
    password: "Password123@!",
    password_confirmation: "Password123@!"
)
end


OfficeUser.create(
    full_name: "Donald Webb",
    email: "dwebb@onehealth.org",
    password: "oneHealth123!",
    password_confirmation: "oneHealth123!",
    image: Faker::Avatar.image,
    phone: "(641)937-4451",
    title: "MD",
    specialization: "Internal Medicine",
);

OfficeUser.create(
    full_name: "Clare Gould",
    email: "cgould@onehealth.org",
    password: "oneHealth123!",
    password_confirmation: "oneHealth123!",
    image: Faker::Avatar.image,
    phone: "(337)269-4110",
    title: "MD",
    specialization: "Internal Medicine",
);

OfficeUser.create(
    full_name: "Clement Dean",
    email: "cdean@onehealth.org",
    password: "oneHealth123!",
    password_confirmation: "oneHealth123!",
    image: Faker::Avatar.image,
    phone: "(213)356-2697",
    title: "MD",
    specialization: "Internal Medicine",
);

OfficeUser.create(
    full_name: "Kayla Salter",
    email: "ksalter@onehealth.org",
    password: "oneHealth123!",
    password_confirmation: "oneHealth123!",
    image: Faker::Avatar.image,
    phone: "(551)900-9927",
    title: "MD",
    specialization: "Pediatrics",
);

OfficeUser.create(
    full_name: "Jimi Roche",
    email: "jroche@onehealth.org",
    password: "oneHealth123!",
    password_confirmation: "oneHealth123!",
    image: Faker::Avatar.image,
    phone: "(202)508-1727",
    title: "MD",
    specialization: "Internal Medicine",
);

OfficeUser.create(
    full_name: "Ed Hail",
    email: "ehail@onehealth.org",
    password: "oneHealth123!",
    password_confirmation: "oneHealth123!",
    image: Faker::Avatar.image,
    phone: "(386)397-5610",
    title: "MD",
    specialization: "Pediatrics",
);

OfficeUser.create(
    full_name: "Jeanne Ratcliffe",
    email: "jratcliffe@onehealth.org",
    password: "oneHealth123!",
    password_confirmation: "oneHealth123!",
    image: Faker::Avatar.image,
    phone: "(228)271-9044",
    title: "MD",
    specialization: "Family Medicine",
);

OfficeUser.create(
    full_name: "Ryan Dodd",
    email: "rdodd@onehealth.org",
    password: "oneHealth123!",
    password_confirmation: "oneHealth123!",
    image: Faker::Avatar.image,
    phone: "(412)595-2974",
    title: "MD",
    specialization: "OB/GYN",
);

OfficeUser.create(
    full_name: "Harlow Slater",
    email: "hslater@onehealth.org",
    password: "oneHealth123!",
    password_confirmation: "oneHealth123!",
    image: Faker::Avatar.image,
    phone: "(631)672-2397",
    title: "MD",
    specialization: "OB/GYN",
);

OfficeUser.create(
    full_name: "Susan Kim",
    email: "skim@onehealth.org",
    password: "oneHealth123!",
    password_confirmation: "oneHealth123!",
    image: Faker::Avatar.image,
    phone: "(214)416-4239",
    title: "MD",
    specialization: "Oncology",
);

OfficeUser.create(
    full_name: "Karol Hampton",
    email: "khampton@onehealth.org",
    password: "oneHealth123!",
    password_confirmation: "oneHealth123!",
    image: Faker::Avatar.image,
    phone: "(630)895-3730",
    title: "MD",
    specialization: "Radiology",
);

OfficeUser.create(
    full_name: "Alana Colon",
    email: "acolon@onehealth.org",
    password: "oneHealth123!",
    password_confirmation: "oneHealth123!",
    image: Faker::Avatar.image,
    phone: "(720)253-6963",
    title: "MD",
    specialization: "Psychiatry",
);

OfficeUser.create(
    full_name: "Courtney Lin",
    email: "clin@onehealth.org",
    password: "oneHealth123!",
    password_confirmation: "oneHealth123!",
    image: Faker::Avatar.image,
    phone: "(734)904-8373",
    title: "MD",
    specialization: "Cardiology",
);

OfficeUser.create(
    full_name: "Jade Wallis",
    email: "jwallis@onehealth.org",
    password: "oneHealth123!",
    password_confirmation: "oneHealth123!",
    image: Faker::Avatar.image,
    phone: "(657)238-1106",
    title: "MD",
    specialization: "Urology",
);

OfficeUser.create(
    full_name: "Khia Gordon",
    email: "kgordon@onehealth.org",
    password: "oneHealth123!",
    password_confirmation: "oneHealth123!",
    image: Faker::Avatar.image,
    phone: "(443)458-1989",
    title: "NP",
    specialization: "Nurse Practitioner",
);

OfficeUser.create(
    full_name: "Vicki Lewis",
    email: "vlewis@onehealth.org",
    password: "oneHealth123!",
    password_confirmation: "oneHealth123!",
    image: Faker::Avatar.image,
    phone: "(737)777-1539",
    title: "NP",
    specialization: "Nurse Practitioner",
);

OfficeUser.create(
    full_name: "Karson Craig",
    email: "kcraig@onehealth.org",
    password: "oneHealth123!",
    password_confirmation: "oneHealth123!",
    image: Faker::Avatar.image,
    phone: "(671)989-9210",
    title: "PA",
    specialization: "Physician Assistant",
);

OfficeUser.create(
    full_name: "Chelsea Fischer",
    email: "cfischer@onehealth.org",
    password: "oneHealth123!",
    password_confirmation: "oneHealth123!",
    image: Faker::Avatar.image,
    phone: "(508)568-9483",
    title: "",
    specialization: "Office Manager",
);

puts "Done Seeding Items!";