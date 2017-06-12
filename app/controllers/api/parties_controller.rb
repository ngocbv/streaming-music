class Api::PartiesController < Api::BaseApiController
  def index

  end

  def create
    party = Party.new party_params
    if party.save
      response_success party: party
    else
      response_fail
    end
  end

  def show
    byebug
  end

  private
  def party_params
    params.require(:party).permit(:name, :description)
  end
end
