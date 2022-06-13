import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('', 'SocialMidiasController.All')
  Route.post('', 'SocialMidiasController.Create')
  Route.put('', 'SocialMidiasController.Edit')
  Route.delete('', 'SocialMidiasController.Delete')
})
  .prefix('socials')
  .middleware(['auth'])
