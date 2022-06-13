import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
  beforeCreate,
} from '@ioc:Adonis/Lucid/Orm'
import SociaMidia from './SocialMidia'
import { v4 as UUID } from 'uuid'

export default class Users extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public email: string

  @column()
  public nickname: string

  @column()
  public description: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column({ serializeAs: null })
  public avatarKey: string

  @column({ serializeAs: null })
  public avatarKeyDelete: string

  @hasMany(() => SociaMidia, {
    foreignKey: 'usersId',
  })
  public SociaMidia: HasMany<typeof SociaMidia>

  @column.dateTime()
  public rememberMeTokenExpiressAt?: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(users: Users) {
    if (users.$dirty.password) {
      users.password = await Hash.make(users.password)
    }
  }

  @beforeCreate()
  public static async runBeforeCreate(users: Users) {
    users.id = UUID()
  }
}
