import { _Node } from './Node'

class Stack {
  top: null | _Node = null

  peek = (): null | _Node => {
    return this.top
  }

  push = (data: any): void => {
    const nextNode = this.top
    const newNode = new _Node(data, nextNode)
    this.top = newNode
  }

  pop = (): null | _Node => {
    if (this.top === null) return null

    const removed = this.top
    this.top = this.top.nextNode

    return removed
  }
}

export { Stack }
