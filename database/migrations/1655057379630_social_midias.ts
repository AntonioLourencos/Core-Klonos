import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import optionsSocial from 'App/Helpers/socialValid'

export default class extends BaseSchema {
  protected tableName = 'social_midias'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id')
      table.uuid('users_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.enu('name', optionsSocial).unique()
      table.string('url').notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
