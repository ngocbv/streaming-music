FactoryGirl.define do
  factory :attachment do
    attachmentable_type "song"
    attachmentable_id 1
    attachment_file_name "song1.mp3"
    attachment_content_type "music/mp3"
  end
end
