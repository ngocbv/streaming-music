Rails.application.routes.draw do
  root "react_app#home"
  get "*path", to: "react_app#home"
  mount ActionCable.server => "/cable"

  namespace :api do
    resources :movies do
      collection do
        post "play"
        post "pause"
        post "seek"
      end
    end
  end
end
