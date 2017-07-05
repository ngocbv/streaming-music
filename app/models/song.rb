class Song < ApplicationRecord
  attr_accessor :attachment_id

  has_one :attachment, as: :attachmentable, dependent: :destroy

  after_create :update_attachmentable

  def url
    attachment ? attachment.attachment.url : ""
  end

  private
  def update_attachmentable
    attachment = Attachment.find_by_id attachment_id
    attachment.update_attributes attachmentable_type: "song", attachmentable_id: self.id if attachment
  end
end
