class AuthenticationSerializer < ActiveModel::Serializer
  attributes :id, :email, :username, :name, :image_url

  def initialize user = {}
    super
  end
end
