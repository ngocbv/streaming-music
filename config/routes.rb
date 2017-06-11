Rails.application.routes.draw do
  root "react_app#home"
  mount ActionCable.server => "/cable"

  namespace :api do
    resources :songs
    resources :movies do
      collection do
        post "play"
        post "pause"
        post "seek"
      end
    end
    resources :attachments, only: [:create, :destroy]
  end

  get "*path", to: "react_app#home"
end
