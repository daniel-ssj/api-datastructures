import { Options } from '@mikro-orm/core'
import { User, BlogPost } from './entities'
import { SqlHighlighter } from '@mikro-orm/sql-highlighter'

const config: Options = {
  type: 'sqlite',
  dbName: 'sqlite.db',
  entities: [User, BlogPost],
  highlighter: new SqlHighlighter(),
  debug: true,
}

export default config
