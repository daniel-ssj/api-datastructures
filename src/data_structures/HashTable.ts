import { _Node } from './Node'

class Data {
  key: string
  value: any

  constructor(key: string, value: any) {
    this.key = key
    this.value = value
  }
}

class HashTable {
  tableSize: number
  hashTable: any[]

  customHash = (key: string): number => {
    let hashValue = 0

    for (let i of key) {
      hashValue += i.charCodeAt(0)
      hashValue = (hashValue * i.charCodeAt(0)) % this.tableSize
    }
    return hashValue
  }

  addKeyValue = (key: string, value: any): void => {
    const hashedKey = this.customHash(key)

    if (!this.hashTable[hashedKey]) {
      this.hashTable[hashedKey] = new _Node(new Data(key, value), null)
    } else {
      let node = this.hashTable[hashedKey]
      while (node.nextNode) {
        node = node.nextNode
      }

      node.nextNode = new _Node(new Data(key, value), null)
    }
  }

  getValue = (key: string): any => {
    const hashedKey = this.customHash(key)

    if (this.hashTable[hashedKey] !== null) {
      let node = this.hashTable[hashedKey]

      if (node?.nextNode === null) return node.data.value

      while (node.nextNode) if (key === node.data.key) return node.data.value
      node = node.nextNode
      if (key === node.data.key) return node.data.value

      return null
    }
  }

  constructor(tableSize: number) {
    this.tableSize = tableSize
    this.hashTable = new Array(this.tableSize)
  }
}

export { HashTable }
