require "http"
require "open-uri"
require "nokogiri"
require "aes"

class GetLinkFilmService
  def initialize phim_id
    @phimmoi_id = phim_id
    @domain = "http://www.phimmoi.net"
  end

  def find_media
    episode_url = get_episode_url
    res = HTTP.get(episode_url)
    json = JSON.parse(res.to_s)
    episode_id = json["episodeId"]
    media = json["medias"].last

    url = media["url"]
    password = "PhimMoi.Net@" + episode_id.to_s

    {
      provider: "phimmoi",
      stream_url: decode_url(url, password),
      resolution: media["resolution"],
    }
  end

  def get_episode_url
    request_url = "#{@domain}/phim/#{@phimmoi_id}/xem-phim.html"
    res = Nokogiri::HTML(open(request_url))
    url = res.xpath("//html//body//script")[10].attributes["src"].value
    url.gsub! "javascript", "json"
  end

  def decode_url url, password
    cipher = Gibberish::AES::CBC.new password
    cipher.decrypt url
  end
end
