FactoryGirl.define do
  factory :song do
    name "Factory Song"
    association :attachment, factory: :attachment
  end
end
