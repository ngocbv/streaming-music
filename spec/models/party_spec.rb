require "rails_helper"

RSpec.describe Party, type: :model do
  (1..100).each do |n|
    let!("party#{n}") {FactoryGirl.create :party}
  end

  context "assign_unique_token" do
    let(:party) {FactoryGirl.create :party}
    it "get unique token" do
      number_of_parties = Party.where(unique_token: party.unique_token).count
      expect(number_of_parties).to eq(1)
    end
  end
end
