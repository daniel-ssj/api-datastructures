import { _Node } from './Node'

class Queue {
  head: null | _Node = null
  tail: null | _Node = null

  enqueue = (data: any): void => {
    if (this.head === null && this.tail === null) {
      this.head = this.tail = new _Node(data, null)
      this.head.nextNode = null
      this.tail.nextNode = null
      return
    }

    this.tail!.nextNode = new _Node(data, null)
    this.tail = this.tail!.nextNode
    return
  }

  dequeue = (): null | _Node => {
    if (this.head === null) {
      return null
    }

    const removed = this.head
    this.head = this.head.nextNode
    if (this.head === null) this.tail === null

    return removed
  }
}

export { Queue }
