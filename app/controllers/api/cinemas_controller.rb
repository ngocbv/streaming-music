class Api::CinemasController < Api::BaseApiController
  def index

  end

  def create
    cinema = Cinema.new cinema_params
    if cinema.save
      response_success cinema: cinema
    else
      response_fail
    end
  end

  def show
    cinema = Cinema.find_by unique_token: params[:id]
    if cinema
      json = cinema.as_json
      json["movie"] = cinema.movie&.json_data
      response_success cinema: json
    else
      response_fail
    end
  end

  private
  def cinema_params
    params.require(:cinema).permit(:name, :movie_id, :description)
  end
end
