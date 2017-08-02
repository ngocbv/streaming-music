require "rails_helper"

RSpec.describe Movie, type: :model do
  let(:movie) { FactoryGirl.create :movie }
  let(:movie_build) { FactoryGirl.build :movie }
  let(:mock_data) { double() }

  context "#stream_media" do
    it "return a not null string" do
      allow_any_instance_of(GetLinkFilmService).to receive(:find_media).and_return(nil)
      allow(movie).to receive(:stream_media).and_call_original
    end
  end

  context "#json_data" do
    it "contains method stream_media" do
      allow(movie).to receive(:stream_media).and_return("test")
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
