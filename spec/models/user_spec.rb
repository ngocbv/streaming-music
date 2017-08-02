RSpec.describe User, type: :model do
  context '#email_required?' do
    let(:user) {FactoryGirl.create(:user)}
    it 'return false' do
      expect(user.email_required?).to be_falsy
    end
  end
end
