require "rails_helper"

RSpec.describe User, type: :model do
  let(:user) {FactoryGirl.create :user}

  context "email_required?" do
    let!(:user) {FactoryGirl.create :user}
    it "doesn't require" do
      expect(user.email_required?).to eq(false)
    end
  end
end
