Rails.application.routes.draw do
  root "react_app#home"
  mount ActionCable.server => "/cable"

  namespace :api do
    resources :songs do
      collection do
        post "import"
      end
    end

    resources :movies
    resources :players do
      collection do
        post "play"
        post "pause"
        post "seek"
        post "change_song"
      end
    end
    resources :attachments, only: [:create, :destroy]
  end

  get "*path", to: "react_app#home"
end
