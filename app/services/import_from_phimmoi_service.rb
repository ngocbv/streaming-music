require "nokogiri"
require "open-uri"

class ImportFromPhimmoiService
  def initialize
    @domain = "www.phimmoi.net"
    @categories = ["phim-vien-tuong", "phim-hanh-dong", "phim-chien-tranh", "phim-hinh-su",
      "phim-phieu-luu", "phim-hai-huoc", "phim-vo-thuat", "phim-kinh-di", "phim-hoi-hop-gay-can",
      "phim-bi-an-sieu-nhien", "phim-co-trang", "phim-than-thoai", "phim-tam-ly",
      "phim-tai-lieu", "phim-tinh-cam-lang-man", "phim-chinh-kich-drama", "phim-gia-dinh",
      "phim-the-thao-am-nhac", "phim-hoat-hinh"]
  end

  def import
    @categories.each do |category|
      import_from_category category
    end
  end

  def import_from_category category
    page = 1
    while true
      html = Nokogiri::HTML(open("http://www.phimmoi.net/the-loai/#{category}/page-#{page}.html"))

      films_info = html.css("//div[class='movie-list-index']//ul[class='list-movie']/li")
      break if films_info.blank?

      films_info.each do |f|
        film_info = f.children[1]
        film_name = film_info.attributes["title"].value
        background_url = film_info.children[1].attributes["style"].value.scan(/http\:\/\/phimmoi.+\)/)[0].chop

        url = film_info.attributes["href"].value

        cate = Category.find_or_create_by name: category
        movie = Movie.create name: film_name, background_url: background_url, phimmoi_id: url
        MovieCategory.find_or_create_by movie: movie, category: cate
      end
      page += 1
    end
  end
end
