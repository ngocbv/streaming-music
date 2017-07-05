require "rails_helper"

RSpec.describe Movie, type: :model do
  let(:movie) {FactoryGirl.create :movie}
  let(:movie_build) {FactoryGirl.build :movie}

  context "stream_media" do
    it "return a not null string" do
      expect(movie.stream_media.length).to be > 0
    end
  end

  context "json_data" do
    it "contains method stream_media" do
      expect(movie.json_data["stream_media"].present?).to eq(true)
    end
  end

  context "scope search_by_query" do
    let!(:movie) {FactoryGirl.create :movie, name: "abc"}
    it "returns right results" do
      movies = Movie.search_by_query("  A  ")
      expect(movies.count).to eq(1)
    end
  end
end
