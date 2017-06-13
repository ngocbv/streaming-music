class Api::SongsController < Api::BaseApiController
  def index
    songs = Song.all
    response_success songs: songs.as_json(methods: [:url])
  end

  def create
    song = Song.new song_params
    if song.save
      response_success song: song
    else
      response_fail song.errors
    end
  end

  def import
    song = Song.create! name: params[:attachment].original_filename.gsub("-","@").titleize.gsub("@", "-")
    attachment = Attachment.new attachment: params[:attachment],
      attachmentable_type: "song", attachmentable_id: song.id
    if attachment.save
      response_success attachment: attachment
    else
      response_fail attachment.errors.messages.except :attachment
    end
  end

  private
  def song_params
    params.require(:song).permit(:name, :description, :attachment_id)
  end
end
