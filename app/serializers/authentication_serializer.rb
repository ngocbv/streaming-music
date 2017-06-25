class AuthenticationSerializer < ActiveModel::Serializer
  attributes :id, :email, :username

  def initialize user = {}
    super
  end
end
