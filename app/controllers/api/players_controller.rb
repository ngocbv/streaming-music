class Api::PlayersController < Api::BaseApiController
  def play
    PlayerJob.perform_later "play"
    response_success
  end

  def pause
    PlayerJob.perform_later "pause"
    response_success
  end

  def seek
    seek_value = params[:seek_value]
    PlayerJob.perform_later "seek", seek_value
    response_success
  end

  def change_song
  	song = Song.find_by_id params[:song_id]
    PlayerJob.perform_later "change_song", {id: song.id, url: song.url}
    response_success
  end
end
