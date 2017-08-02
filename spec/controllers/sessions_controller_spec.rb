require 'rails_helper'
RSpec.describe Api::SessionsController, type: :controller do
  context '#create' do
    let(:email) { Faker::Internet.email }
    let(:password) { Faker::Lorem.characters(10) }
    let!(:user) { FactoryGirl.create(:user, email: email, password: password) }

    it 'response fail with wrong arguments' do
      post :create, params: { email: 'test@email.com', password: '123123' }
      expect(response).to have_http_status(200)
      expect(response.body).to match(/Can't login/)
    end

    it 'response success with valid arguments' do
      post :create, params: { email: email, password: password }
      expect(response).to have_http_status(200)
      expect(response.body).to match(/Login success/)
    end
  end
end
