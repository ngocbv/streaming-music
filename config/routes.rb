Rails.application.routes.draw do
  root "react_app#home"
  get "*path", to: "react_app#home"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
