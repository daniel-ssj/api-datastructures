import {
  EntityManager,
  EntityRepository,
  MikroORM,
  QueryOrder,
} from '@mikro-orm/core'
import express from 'express'
import { BlogPost, User } from './entities'
import { LinkedList } from './data_structures/LinkedList'
import { HashTable } from './data_structures/HashTable'
import { BinarySearchTree } from './data_structures/BinarySearchTree'
import { Queue } from './data_structures/Queue'
import { Stack } from './data_structures/Stack'

const DI = {} as {
  orm: MikroORM
  em: EntityManager
  userRepository: EntityRepository<User>
  blogPostRepository: EntityRepository<BlogPost>
}

const app = express()

app.use(express.json())

const init = async () => {
  DI.orm = await MikroORM.init()
  DI.em = DI.orm.em
  DI.userRepository = DI.orm.em.getRepository(User)
  DI.blogPostRepository = DI.orm.em.getRepository(BlogPost)
}

init()

//Create a user
app.post('/user', async (req, res) => {
  try {
    const { email, name } = await req.body

    if (!email || !name) throw new Error('Name and email cannot be empty')

    const userExists = await DI.userRepository.find({ email: req.body.email })

    if (userExists.length !== 0) throw new Error('Email already being used')

    const user = DI.em.create(User, req.body)
    await DI.userRepository.persist(user).flush()

    res.send({ message: 'Succesfully added new user!' })
  } catch (err) {
    res.send({ message: err.message })
  }
})

//Get users by descending name order
app.get('/user/descending_name', async (req, res) => {
  try {
    const users = await DI.userRepository.findAll({ name: QueryOrder.ASC })

    if (users.length === 0) throw new Error('There are no users')

    const allUsersLinkedList = new LinkedList()

    for (let user of users) {
      await user.posts.init()
      allUsersLinkedList.insertBeginning({
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
        posts: user.posts.getItems()
      })
    }

    res.send(allUsersLinkedList.toArray())
  } catch (err) {
    res.send({ message: err.message })
  }
})

//Get users by ascending name order
app.get('/user/ascending_name', async (req, res) => {
  try {
    const users = await DI.userRepository.findAll({ name: QueryOrder.DESC })

    if (users.length === 0) throw new Error('There are no users')

    const allUsersLinkedList = new LinkedList()

    for (let user of users) {
      await user.posts.init()
      allUsersLinkedList.insertEnd({
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
        posts: user.posts.getItems(),
      })
    }

    res.send(allUsersLinkedList.toArray())
  } catch (err) {
    res.send({ message: err.message })
  }
})

//Get one user
app.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params

    const users = await DI.userRepository.findAll()

    const allUsersLinkedList = new LinkedList()

    for (let user of users) {
      allUsersLinkedList.insertBeginning({
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
      })
    }

    const user = allUsersLinkedList.getUserById(userId)

    if (!user) throw new Error('User not found')

    res.send(user)
  } catch (err) {
    res.send({ message: err.message })
  }
})

//Delete a user
app.delete('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params

    const users = await DI.userRepository.findAll()

    const allUsersLinkedList = new LinkedList()

    for (let user of users) {
      allUsersLinkedList.insertBeginning({
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
      })
    }

    const user = allUsersLinkedList.getUserById(userId)

    if (!user) throw new Error('User not found')

    console.log(user.posts)

    await DI.blogPostRepository.nativeDelete({ user: user })
    await DI.userRepository.nativeDelete({ id: user.id })

    res.send({ message: 'User succesfully removed' })
  } catch (err) {
    res.send({ message: err.message })
  }
})

//Create a blog post
app.post('/blog_post/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    const data = req.body

    const user = await DI.userRepository.findOne({ id: userId })

    if (!user) throw new Error('User does not exist')

    const ht = new HashTable(10)

    ht.addKeyValue('title', data.title)
    ht.addKeyValue('body', data.body)
    ht.addKeyValue('user', user)

    const newBlogPost = DI.blogPostRepository.create({
      title: ht.getValue('title'),
      body: ht.getValue('body'),
      user: ht.getValue('user'),
    })

    await DI.blogPostRepository.persist(newBlogPost).flush()

    res.send({ message: 'Blog post succesfully created' })
  } catch (err) {
    res.send({ message: err.message })
  }
})

//Get numeric body of blog post
app.get('/blog_post/numeric_body', async (req, res) => {
  try {
    const blogPosts = await DI.blogPostRepository.findAll()

    const queue = new Queue()

    for (let post of blogPosts) queue.enqueue(post)

    if (queue.head === null) throw new Error('Empty queue')

    const returnList = []

    for (let i = 0; i < blogPosts.length; i++) {
      const post = queue.dequeue()
      let numericBody = 0

      for (let char of post?.data.body) numericBody += char.charCodeAt(0)

      post!.data.body = numericBody

      returnList.push({
        id: post?.data.id,
        title: post?.data.title,
        body: post?.data.body,
        user_id: post?.data.user_id,
      })
    }

    res.send(returnList)
  } catch (err) {
    res.send({ message: err.message })
  }
})

//Delete last 10 posts
app.delete('/blog_post/delete_last_10', async (req, res) => {
  try {
    const blogPosts = await DI.blogPostRepository.findAll()

    const stack = new Stack()

    for (let post of blogPosts) stack.push(post)

    if (stack.top === null) throw new Error('Empty stack')

    for (let i = 0; i < 10; i++) {
      const postToDelete = stack.pop()
      await DI.blogPostRepository.nativeDelete({ id: postToDelete?.data.id })
    }

    res.send({ message: 'Succesfully deleted posts' })
  } catch (err) {
    res.send({ message: err.message })
  }
})

//Get one blog post
app.get('/blog_post/:blogPostId', async (req, res) => {
  try {
    const { blogPostId } = req.params

    const blogPosts = await DI.blogPostRepository.findAll({
      id: QueryOrder.ASC,
    })

    //Randomize blog posts order
    blogPosts.sort(() => Math.random() - 0.5)

    const bst = new BinarySearchTree()

    for (let post of blogPosts) {
      bst.insert({
        id: post.id,
        title: post.title,
        body: post.body,
        date: post.date,
        user_id: post.user.id,
      })
    }

    const post = bst.search(blogPostId)

    if (!post) throw new Error('Post not found')

    res.send(post)
  } catch (err) {
    res.send({ message: err.message })
  }
})

app.listen(1469, () => console.log('listening on port 1469'))
