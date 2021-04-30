import {
  Cascade,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core'
import { v4 as uuid } from 'uuid'

@Entity()
class User {
  @PrimaryKey()
  id: string = uuid()

  @Property()
  name: string

  @Property()
  @Unique()
  email: string

  @Property({ nullable: true })
  address?: string

  @Property({ nullable: true })
  phone?: string

  @OneToMany(() => BlogPost, (bp) => bp.user)
  posts = new Collection<BlogPost>(this)

  constructor(name: string, email: string) {
    this.name = name
    this.email = email
  }
}

@Entity()
class BlogPost {
  @PrimaryKey()
  id: string = uuid()

  @Property()
  title: string

  @Property()
  body: string

  @Property()
  date: Date = new Date()

  @ManyToOne(() => User)
  user: User

  constructor(title: string, body: string, user: User) {
    this.title = title
    this.user = user
    this.body = body
  }
}

export { User, BlogPost }
