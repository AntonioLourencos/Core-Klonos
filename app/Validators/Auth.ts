import Joi from 'joi'

const Auth = {
  SignIn: Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().required(),
  }),

  SignUp: Joi.object({
    email: Joi.string().trim().email().required(),
    nickname: Joi.string().trim().required(),
    password: Joi.string().required(),
  }),
}

export default Auth
