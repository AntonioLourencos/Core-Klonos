import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as UUID } from 'uuid'
import Users from './Users'

export default class SocialMidia extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public url: string

  @column()
  public usersId: string

  @belongsTo(() => Users, {
    foreignKey: 'usersId',
  })
  public user: BelongsTo<typeof Users>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async BeforeCreate(socials: SocialMidia) {
    socials.id = UUID()
  }
}
