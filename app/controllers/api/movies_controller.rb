class Api::MoviesController < Api::BaseApiController
  def play
    MovieJob.perform_later "play"
    response_success
  end

  def pause
    MovieJob.perform_later "pause"
    response_success
  end

  def seek
    seek_value = params[:seek_value]
    MovieJob.perform_later "seek", seek_value
    response_success
  end
end
