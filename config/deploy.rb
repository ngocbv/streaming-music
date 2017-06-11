# config valid only for current version of Capistrano
lock "3.8.1"

set :application, "streaming-media"
set :repo_url, "git@github.com:NeverSmileK57CLC/streaming-music.git"

set :branch, "master"

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, "/home/deploy/streaming-media"

set :local_user, "bachngoc"


# Default value for :pty is false
set :pty, false

# Default value for :linked_files is []
set :linked_files, fetch(:linked_files, []).push(
  "config/database.yml",
  "config/secrets.yml",
)

# Default value for linked_dirs is []
set :linked_dirs, fetch(:linked_dirs, []).push(
  "log",
  "tmp/pids",
  "tmp/cache",
  "tmp/sockets",
  "node_modules",
  "public/system"
)

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5
set :keep_releases, 10

namespace :deploy do
  task :webpack do
    on roles(:web) do
      within release_path do
        execute "cd '#{release_path}'; npm update && webpack"
      end
    end
  end

  task :run_server do
    on roles(:web) do
      within release_path do
        execute "cd '#{release_path}' && bundle exec rails server --deamon"
      end
    end
  end

  after :updating, "deploy:webpack"
  # after :finished, "deploy:run_server"
end
