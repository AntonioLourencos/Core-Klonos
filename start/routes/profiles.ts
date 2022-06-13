import Route from '@ioc:Adonis/Core/Route'

Route.delete('/profile', 'ProfilesController.Delete').middleware(['auth'])
