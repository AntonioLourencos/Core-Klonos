import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Imgur from 'App/Helpers/imgur'

export default class ProfilesController {
  public async Delete(ctx: HttpContextContract) {
    await Imgur.delete(ctx.auth.user!.avatarKeyDelete)
    await ctx.auth.user!.delete()
    return ctx.response.ok({
      message: 'Sucess',
    })
  }
}
