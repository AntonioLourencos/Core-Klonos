import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/signin', 'AuthController.SignIn')
  Route.post('/signup', 'AuthController.SignUp')
}).prefix('auth')
