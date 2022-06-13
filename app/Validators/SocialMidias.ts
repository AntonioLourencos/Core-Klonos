import Joi from 'joi'

const SocialMidias = {
  Create: Joi.object({
    name: Joi.string().required(),
    url: Joi.string().required(),
  }),

  Edit: Joi.object({
    id: Joi.string().uuid().required(),
    name: Joi.string(),
    url: Joi.string(),
  }),

  Delete: Joi.object({
    id: Joi.string().uuid().required(),
  }),
}

export default SocialMidias
