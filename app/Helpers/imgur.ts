import Services from 'App/Services'
import FormData from 'form-data'

class Imgur {
  public async create(img: Buffer) {
    const body = new FormData()
    body.append('image', img)
    const { data } = await Services.Imgur.post('image', body)
    return { key: data.data.id, keyDelete: data.data.deletehash, url: data.data.link }
  }

  public async find(key: string) {
    const { data } = await Services.Imgur.get(`image/${key}`)
    return data.data.link
  }

  public async delete(key: string) {
    await Services.Imgur.delete(`image/${key}`)
    return true
  }

  public async update(key: string, img: Buffer) {
    await this.delete(key)
    return await this.create(img)
  }
}

export default new Imgur()
