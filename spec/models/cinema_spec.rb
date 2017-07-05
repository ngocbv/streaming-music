require "rails_helper"

RSpec.describe Cinema, type: :model do
  (1..100).each do |n|
    let!("cinema#{n}") {FactoryGirl.create :cinema}
  end

  context "assign_unique_token" do
    let!(:cinema) {FactoryGirl.create :cinema}
    it "get unique token" do
      number_of_cinemas = Cinema.where(unique_token: cinema.unique_token).count
      expect(number_of_cinemas).to eq(1)
    end
  end
end
