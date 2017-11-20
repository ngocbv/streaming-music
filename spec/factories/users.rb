FactoryGirl.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@factory.com"}
    password Faker::Lorem.characters(10)
    first_name Faker::Name.first_name
    last_name Faker::Name.last_name
  end
end
