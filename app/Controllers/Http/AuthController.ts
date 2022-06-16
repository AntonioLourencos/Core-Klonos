import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Users from 'App/Models/Users'
import SignInValidator from 'App/Validators/Auth'
import Hash from '@ioc:Adonis/Core/Hash'
import Imgur from 'App/Helpers/imgur'
import GenerateImage from 'App/Helpers/generateImage'

export default class AuthController {
  public async SignUp(ctx: HttpContextContract) {
    const bodyValidate = await SignInValidator.SignUp.validate(ctx.request.body())

    if (bodyValidate.error) {
      return ctx.response.badRequest({ message: bodyValidate.error.message })
    }
    if (await Users.findBy('email', bodyValidate.value.email)) {
      return ctx.response.badRequest({ message: 'User already exists' })
    }

    const userDefaultImage = await GenerateImage(bodyValidate.value.nickname)
    const uploadImage = await Imgur.create(userDefaultImage)

    const user = await Users.create({
      ...bodyValidate.value,
      description: 'I no have description yet',
      avatarKey: uploadImage.key,
      avatarKeyDelete: uploadImage.keyDelete,
    })

    const logged = await ctx.auth.use('api').login(user, {
      expiresIn: '1d',
    })

    return ctx.response.ok({
      profile: {
        avatar: uploadImage.url,
        nickname: user.nickname,
      },
      session: {
        expiresAt: logged.expiresAt,
        token: logged.token,
      },
    })
  }

  public async SignIn(ctx: HttpContextContract) {
    const bodyValidate = await SignInValidator.SignIn.validate(ctx.request.body())

    if (bodyValidate.error) {
      return ctx.response.badRequest({ message: bodyValidate.error.message })
    }

    const user = await Users.findBy('email', bodyValidate.value.email)

    if (!user) {
      return ctx.response.badRequest({ message: 'User not found' })
    }

    if (!(await Hash.verify(user.password, bodyValidate.value.password))) {
      return ctx.response.badRequest('Invalid credentials')
    }

    const logged = await ctx.auth.use('api').login(user, {
      expiresIn: '1d',
    })

    return ctx.response.ok({
      profile: {
        avatar: await Imgur.find(user.avatarKey),
        nickname: user.nickname,
      },
      session: {
        expiresAt: logged.expiresAt,
        token: logged.token,
      },
    })
  }
}
