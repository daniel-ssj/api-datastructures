import { _Node } from './Node'

class LinkedList {
  head: any = null
  lastNode: null | _Node = null

  toArray = (): any => {
    let arr: any = []
    if (!this.head) return arr

    let node = this.head
    while (node) {
      arr.push(node.data)
      node = node.nextNode
    }
    arr = new Set(arr)
    return Array.from(arr)
  }

  insertBeginning = (data: any): void => {
    if (this.head === null) {
      this.head = new _Node(data, null)
      this.lastNode = this.head
    }

    const newNode = new _Node(data, this.head)
    this.head = newNode
  }

  insertEnd = (data: any): void => {
    if (!this.head) this.insertBeginning(data)

    this.lastNode!.nextNode = new _Node(data, null)
    this.lastNode = this.lastNode!.nextNode
  }

  getUserById = (userId: string) => {
    let node = this.head

    while (node) {
      if (node.data.id === userId) return node.data
      node = node.nextNode
    }
    return null
  }
}

export { LinkedList }
