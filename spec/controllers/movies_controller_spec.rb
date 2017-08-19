require 'rails_helper'

RSpec.describe Api::MoviesController, type: :controller do
  context "#index" do
    let!(:movie) { FactoryGirl.create(:movie, name: "movie 1") }
    let!(:movie2) { FactoryGirl.create(:movie, name: "movie 2") }
    it 'return all movies with no params query' do
      get :index
      expect(assigns(:movies).count).to eq(2)
    end

    it 'return matching movies with query string' do
      get :index, params: { query: '1' }
      expect(assigns(:movies).count).to eq(1)
    end

    it 'return empty movies with no matching query string' do
      get :index, params: { query: 'test' }
      expect(assigns(:movies).count).to eq(0)
    end
  end

  context '#create' do
    let(:phimmoi_id) { 'Phimmoi ID' }
    let!(:movie) { FactoryGirl.create(:movie, phimmoi_id: phimmoi_id) }

    it 'response success when valid parameters' do
      post :create, params: { movie: { phimmoi_id: 'valid phimmoi id' } }
      expect(response).to have_http_status(200)
      expect(JSON.parse(response.body)['data']['movie']).not_to be_nil
      expect(assigns(:movie).errors.messages).to eq({})
    end

    it 'response fail when invalid parameters' do
      post :create, params: { movie: { phimmoi_id: phimmoi_id } }
      expect(response).to have_http_status(200)
      expect(JSON.parse(response.body)['data']).to eq({ "phimmoi_id"=>["has already been taken"] })
      expect(assigns(:movie).errors.messages).not_to be({})
    end
  end

  context '#show' do
    let!(:movie) { FactoryGirl.create(:movie, id: 100) }
    it 'response success when valid movie id' do
      get :show, params: { id: 100 }
      expect(response).to have_http_status(200)
      expect(JSON.parse(response.body)['data']['movie']).not_to be_nil
    end

    it 'response fail when invalid movie id' do
      get :show, params: { id: 101}
      expect(response).to have_http_status(200)
      expect(JSON.parse(response.body)['data']).to be_nil
    end
  end
end
