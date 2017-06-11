class Attachment < ActiveRecord::Base
  VIDEO_TYPES = ["video/mp4", "music/mp3"]

  has_attached_file :attachment

  validates_attachment_content_type :attachment,
    content_type: []
end
