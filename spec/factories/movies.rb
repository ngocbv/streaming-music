FactoryGirl.define do
  factory :movie do
    name Faker::Lorem.words(5).join(' ')
    url Faker::Internet.url
    sequence(:phimmoi_id) { |n| Faker::Lorem.words(n).join('/') }
  end
end
