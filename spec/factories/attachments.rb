include ActionDispatch::TestProcess

FactoryGirl.define do
  factory :attachment do
    attachmentable_type "song"
    attachment_file_name "factory_song.mp3"
    attachment_content_type "audio/mp3"
    attachment { fixture_file_upload(Rails.root.join('features/support/song.mp3'), 'audio/mp3') }
  end
end
