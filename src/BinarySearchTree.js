const Queue = require("./Queue");

class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    if (this.key == null) {
      this.key = key;
      this.value = value;
    } else if (key < this.key) {
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    } else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    if (this.key == key) {
      return this.value;
    } else if (key < this.key && this.left) {
      return this.left.find(key);
    } else if (key > this.key && this.right) {
      return this.right.find(key);
    } else {
      throw new Error("Key Not Found");
    }
  }

  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      } else if (this.left) {
        this._replaceWith(this.left);
      } else if (this.right) {
        this._replaceWith(this.right);
      } else {
        this._replaceWith(null);
      }
    } else if (key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error("Key Not Found");
    }
  }

  // Left branch visited first, then current node, then right branch
  dfsInOrder(values = []) {
    if (this.left) {
      values = this.left.dfsInOrder(values);
    }
    values.push(this.value);
    if (this.right) {
      values = this.right.dfsInOrder(values);
    }
    return values;
  }

  dfsPreOrder(values = []) {
    values.push(this.value);
    if (this.left) {
      values = this.left.dfsPreOrder(values);
    }
    if (this.right) {
      values = this.right.dfsPreOrder(values);
    }
    return values;
  }

  dfsPostOrder(values = []) {
    if (this.left) {
      values = this.left.dfsPostOrder(values);
    }
    if (this.right) {
      values = this.right.dfsPostOrder(values);
    }
    values.push(this.values);
    return values;
  }

  bfs(tree, values = []) {
    const queue = new Queue();
    queue.enqueue(tree);
    let node = queue.dequeue();
    while (node) {
      values.push(node.value);

      if (node.left) {
        queue.enqueue(node.left);
      }

      if (node.right) {
        queue.enqueue(node.right);
      }
      node = queue.dequeue();
    }

    return values;
  }

  getHeight(currentHeight = 0) {
    // if there is no left and right child return currentHeight, which is 0
    if (!this.left && !this.right) return currentHeight;

    // if there is only left child return left height + 1
    const newHeight = currentHeight + 1;

    // if there is no left child, recursively call getHeight on right child with newHeight
    if (!this.left) return this.right.getHeight(newHeight);

    // if there is no right child, recursively call getHeight on left child with newHeight
    if (!this.right) return this.left.getHeight(newHeight);

    // recursively call getHeight on left and right child with newHeight
    const leftHeight = this.left.getHeight(newHeight);
    const rightHeight = this.right.getHeight(newHeight);

    // return maximum of left and right height
    return Math.max(leftHeight, rightHeight);
  }

  /**
   * BST - Binary Search Tree
   * - Each node has at most two children
   * - All nodes in left subtree have values less than node's value
   * - All nodes in right subtree have values greater than node's value
   * @returns 
   */
  isBST() {
    // perform dfs in order traversal and set values in array
    const values = this.dfsInOrder();
    // go through the values array and check if any element is less than the previous element
    for (let i = 1; i < values.length; i++) {
      if (values[i] < values[i - 1]) {
        return false; // if the element is less than previous element, return false
      }
    }
    return true; // else, return true that it is a BST
  }

  findKthLargestValue(k) {
    // perform in-order traversal and store values in array
    const values = this.dfsInOrder();
    // set the kthIndex as the length of values - k
    const kthIndex = values.length - k;

    // if kthIdex is greater than or equal to 0
    if (kthIndex >= 0) {
      return values[kthIndex]; // return the kth largest value
    } else {  // else k exceeds size
      console.error("k value exceeds the size of the BST.");
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      } else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    } else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }
}
