class Api::PlayersController < Api::BaseApiController
  def play
    PlayerJob.perform_later "play", params[:party_id]
    response_success
  end

  def pause
    PlayerJob.perform_later "pause", params[:party_id]
    response_success
  end

  def seek
    seek_value = params[:seek_value]
    PlayerJob.perform_later "seek", params[:party_id], seek_value
    response_success
  end

  def change_song
  	song = Song.find_by_id params[:song_id]
    PlayerJob.perform_later "change_song", params[:party_id], {id: song.id, url: song.url}
    response_success
  end
end
