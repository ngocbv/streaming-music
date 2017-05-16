class Song < ApplicationRecord
  has_attached_file :attachment
  validates_attachment_content_type :attachment, content_type: []
end
