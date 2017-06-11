class Api::AttachmentsController < Api::BaseApiController
  def create
    attachment = Attachment.new attachment: params[:attachment]
    if attachment.save
      response_success attachment: attachment
    else
      response_fail attachment.errors.messages.except :attachment
    end
  end
end
