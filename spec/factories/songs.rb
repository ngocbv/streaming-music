FactoryGirl.define do
  factory :song do
    name "song1"
    association :attachment, factory: :attachment
  end
end
