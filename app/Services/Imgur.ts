import Axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

const Imgur = Axios.create({
  baseURL: 'https://api.imgur.com/3/',
  headers: { Authorization: `Client-ID ${Env.get('SECRET_KEY_IMGUR')}` },
})

export default Imgur
