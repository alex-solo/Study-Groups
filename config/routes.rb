Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

root to: 'home#index'

resources :users, to: 'home#index'
resources :groups, to: 'home#index'

namespace :api do
  resources :users
  resources :groups
end

end
