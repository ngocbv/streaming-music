require 'net/http'
require 'rails'

doc_ids = [
  "0B-QNS1qOmKkmYlkycjdrcE9naTg"
]

doc_ids.each do |id|
  url = "https://drive.google.com/get_video_info?docid=#{id}"
  uri = URI(url)
  res = Net::HTTP.get(uri)
  response = Rack::Utils.parse_nested_query(res)

  film_links = response["fmt_stream_map"]

end
