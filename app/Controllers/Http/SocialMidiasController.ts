import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import SocialMidia from 'App/Models/SocialMidia'
import SocialMidiasValidator from 'App/Validators/SocialMidias'

export default class SocialMidiasController {
  public async Create(ctx: HttpContextContract) {
    const bodyValidate = await SocialMidiasValidator.Create.validate(ctx.request.body())

    if (bodyValidate.error) {
      return ctx.response.badRequest({ message: bodyValidate.error.message })
    }

    if (await SocialMidia.findBy('name', bodyValidate.value.name)) {
      return ctx.response.badRequest({ message: 'This Social Midia Already Exits' })
    }

    const social = await ctx.auth.user!.related('SociaMidia').create({
      ...bodyValidate.value,
    })

    return ctx.response.ok({
      id: social.id,
      name: social.name,
      url: social.url,
    })
  }

  public async Edit(ctx: HttpContextContract) {
    const bodyValidate = await SocialMidiasValidator.Edit.validate(ctx.request.body())

    if (bodyValidate.error) {
      return ctx.response.badRequest({ message: bodyValidate.error.message })
    }

    const social = await SocialMidia.findBy('id', bodyValidate.value.id)

    if (!social) {
      return ctx.response.badRequest({ message: 'Social Not Found' })
    }

    social.merge(bodyValidate.value)
    await social.save()

    return ctx.response.ok({
      id: social.id,
      name: social.name,
      url: social.url,
    })
  }

  public async Delete(ctx: HttpContextContract) {
    const qsValidated = await SocialMidiasValidator.Delete.validate(ctx.request.qs())

    if (qsValidated.error) {
      return ctx.response.badRequest({ message: qsValidated.error.message })
    }

    const social = await SocialMidia.findBy('id', qsValidated.value.id)

    if (!social) {
      return ctx.response.badRequest({ message: 'Social Not Found' })
    }

    await social.delete()

    return ctx.response.ok({
      message: 'sucess',
    })
  }

  public async All(ctx: HttpContextContract) {
    const socials = (
      await Database.rawQuery(
        `select id,name, url FROM social_midias where users_id = '${ctx.auth.user!.id}'`
      )
    ).rows

    if (!socials) {
      return ctx.response.badRequest({ message: 'Social Not Found' })
    }

    return ctx.response.ok({
      socials: socials || [],
    })
  }
}
