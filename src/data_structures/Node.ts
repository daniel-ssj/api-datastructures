class _Node {
  data: any
  nextNode: null | _Node

  constructor(data: any | _Node, nextNode: null | _Node) {
    this.data = data
    this.nextNode = nextNode
  }
}

class BinarySearchTreeNode extends _Node {
  left: null | BinarySearchTreeNode
  right: null | BinarySearchTreeNode

  constructor(data: any, left?: any, right?: any) {
    super(data, null)
    this.left = left
    this.right = right
  }
}

export { _Node, BinarySearchTreeNode }
