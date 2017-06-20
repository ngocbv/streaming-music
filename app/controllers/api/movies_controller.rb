class Api::MoviesController < Api::BaseApiController
  def index
    if params["query"]
      movies = Movie.search_by_query(params["query"]).limit(50)
    else
      movies = Movie.all.limit(50)
    end
    response_success movies: movies
  end

  def create
    movie = Movie.new movie_params
    if movie.save
      response_success movie: movie
    else
      response_fail movie.errors
    end
  end

  def show
    movie = Movie.find_by_id params[:id]
    if movie
      response_success movie: movie.as_json
    else
      response_fail
    end
  end

  private
  def movie_params
    params.require(:movie).permit(:name, :description, :url)
  end
end
