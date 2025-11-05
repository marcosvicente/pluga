FactoryBot.define do
  factory :snippet do
    text { Faker::Lorem.paragraph }
    summary { Faker::Lorem.paragraph }
  end
end
