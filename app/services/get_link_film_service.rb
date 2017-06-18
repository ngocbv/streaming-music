require "http"
require "open-uri"
require "nokogiri"
require "aes"

class GetLinkFilmService
  def initialize
    @phimmoi_id = "chua-te-cua-nhung-chiec-nhan-1-hiep-hoi-nhan-than-319"
    @domain = "http://www.phimmoi.net"
  end

  def find_media
    episode_url = get_episode_url
    res = HTTP.get(episode_url)
    json = JSON.parse(res.to_s)
    episode_id = json["episodeId"]
    media = json["medias"].last

    url = media["url"]
    byebug
    password = "PhimMoi.Net@" + episode_id.to_s
  end

  def get_episode_url
    request_url = "#{@domain}/phim/#{@phimmoi_id}/xem-phim.html"
    res = Nokogiri::HTML(open(request_url))
    url = res.xpath("//html//body//script")[10].attributes["src"].value
    url.gsub! "javascript", "json"
  end

  def decodeUrl url, password

  end
end
