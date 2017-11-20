set :stage, :production

server "128.199.123.74", user: "deploy", roles: %w{app web}

if ENV["branch"] || ENV["tag"]
  set :branch, ENV["branch"] || ENV["tag"]
end

set :assets_roles, [:web, :app]

set :unicorn_rack_env, "production"
