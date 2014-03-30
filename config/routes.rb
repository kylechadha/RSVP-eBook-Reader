Spreader::Application.routes.draw do

  root 'welcome#index'

  resources :welcome

end
