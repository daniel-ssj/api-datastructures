import { BinarySearchTreeNode as _Node } from './Node'

class BinarySearchTree {
  root: null | _Node = null

  private insertRecursive = (
    data: { [id: string]: any },
    node: _Node
  ): void => {
    if (data.date < node.data.date) {
      if (node.left === null) {
        node.left = new _Node(data)
        node.left.left = null
        node.left.right = null
      } else this.insertRecursive(data, node.left)
    } else if (data.date > node.data.date) {
      if (node.right === null) {
        node.right = new _Node(data)
        node.right.left = null
        node.right.right = null
      } else this.insertRecursive(data, node.right)
    } else {
      return
    }
  }

  insert = (data: { [id: string]: any }): void => {
    if (this.root === null) {
      this.root = new _Node(data)
      this.root.left = null
      this.root.right = null
    } else this.insertRecursive(data, this.root)
  }

  private searchRecursive = (data: string, node: _Node): any => {
    if (data === node.data.id) return node.data

    if (data < node.data.id && node.left !== null) {
      if (data === node.left.data.id) return node.left.data
      return this.searchRecursive(data, node.left)
    }

    if (data > node.data.id && node.right !== null) {
      if (data === node.right.data.id) return node.right.data
      return this.searchRecursive(data, node.right)
    }
    return false
  }

  search = (data: string) => {
    if (this.root === null) return false

    return this.searchRecursive(data, this.root)
  }
}

export { BinarySearchTree }
