Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    resources :appointments, only: [:index, :create]
    resources :patient_users, only: [:index, :show, :update]
    resources :office_users, only: [:index]

    patch "/patient_me/edit", to: "patient_users#update"
    get "/patient_me", to: "patient_users#show"
    post "/patient_signup", to: "patient_users#create"
    get "/office_me", to: "office_users#show"
    post "/patient_login", to: "sessions#create_patient"
    post "/office_login", to: "sessions#create_office"
    delete "/logout", to: "sessions#destroy"
    get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  end
end
