const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const addWithin = (node, data) => {
      if (node === null) {
        return new Node(data);
      }

      if (data < node.data) {
        node.left = addWithin(node.left, data);
      } else if (data > node.data) {
        node.right = addWithin(node.right, data);
      }

      return node;
    };

    this.rootNode = addWithin(this.rootNode, data);
  }

  has(data) {
    const searchData = (node, data) => {
      if (node === null) return false
      if (node.data === data) return true
      return data < node.data
        ? searchData(node.left, data)
        : searchData(node.right, data)
    }
    return searchData(this.rootNode, data)
  }

  find(data) {
    const searchData = (node, data) => {
      if (node === null) return null
      if (node.data === data) return node
      return data < node.data
        ? searchData(node.left, data)
        : searchData(node.right, data)
    }
    return searchData(this.rootNode, data)
  }

  remove(data) {
    const removeNode = (node, data) => {
      if (node === null) return null;

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      }

      if (node.left === null && node.right === null) {
        return null;
      }
      if (node.left === null) {
        return node.right;
      }
      if (node.right === null) {
        return node.left;
      }

      let minRight = node.right;
        while (minRight.left !== null) {
          minRight = minRight.left;
        }

        node.data = minRight.data;
        node.right = removeNode(node.right, minRight.data);
        return node;
    }

    this.rootNode = removeNode(this.rootNode, data);
  }

  min() {
    if (this.rootNode === null) return null;

    let currenNode = this.rootNode;

    while (currenNode && currenNode.left !== null) {
      currenNode = currenNode.left
    }

    return currenNode.data;
  }

  max() {
    if (this.rootNode === null) return null;

    let currenNode = this.rootNode;

    while (currenNode && currenNode.right !== null) {
      currenNode = currenNode.right
    }

    return currenNode.data;
  }
}

module.exports = {
  BinarySearchTree
};