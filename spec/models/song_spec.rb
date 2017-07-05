require "rails_helper"

RSpec.describe Song, type: :model do
  let!(:song) {FactoryGirl.create :song}
  let!(:song1) {FactoryGirl.create :song, attachment: nil}

  context "url" do
    it "show right url when attachment present" do
      expect(!!song.url).to eq(true)
    end

    it "show right url when attachment doesn't present" do
      expect(!!song1.url).to eq(true)
    end
  end
end
