source "https://rubygems.org"

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem "rails", "~> 5.0.3"
gem "mysql2"
gem "puma", "~> 3.0"
gem "sass-rails", "~> 5.0"
gem "uglifier", ">= 1.3.0"
gem "coffee-rails", "~> 4.2"

gem "jquery-rails"
gem "turbolinks", "~> 5"
gem "jbuilder", "~> 2.5"
gem "paperclip", "~> 5.0.0"
gem "redis"
gem "friendly_id", "~> 5.1.0"
gem "bootstrap-sass", "~> 3.3.6"
gem "http"
gem "nokogiri"
gem "gibberish"
gem "devise"
gem "active_model_serializers", "~> 0.10.0"

group :development, :test do
  gem "byebug", platform: :mri
  gem 'rspec-rails', '~> 3.5'
  gem 'faker'
  gem 'factory_girl_rails'
  gem 'simplecov', require: false
  gem 'rails-controller-testing'
end

group :test do
  gem 'pg'
  gem 'database_cleaner'
  gem 'cucumber-rails', :require => false
  gem 'selenium-webdriver'
  gem 'launchy' # to use save_and_open_page
  gem 'capybara', '~> 2.7', '>= 2.7.1'
  gem 'capybara-screenshot'
  gem 'fuubar' # progress bar when run rspec
end

gem "listen", "~> 3.0.5"
group :development do
  gem "web-console", ">= 3.3.0"
  gem "spring"
  gem "spring-watcher-listen", "~> 2.0.0"
  gem "capistrano", "~> 3.8"
  gem "capistrano3-puma"
  gem "capistrano-rbenv"
end

group :production do
  gem "rails_12factor"
end

gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]
