FactoryGirl.define do
  factory :message do
    content Faker::Lorem.sentence
    image File.open("#{Rails.root}/public/images/Usagi_render_03.png")
    user
    group
  end
end

