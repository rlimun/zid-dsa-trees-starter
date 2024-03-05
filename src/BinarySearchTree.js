class BinarySearchTree {
  constructor(key = null, value = null, parent = null){
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value){
    // If tree is empty, then this key being inserted is the root node
    if(this.key == null){
      this.key = key;
      this.value = value;
    }
    /**
     * If the tree already exists, then start at the root,
     * and compare it to the key that you want to insert.
     * If the new key is less than the node's key,
     * then the new node needs to live in the left-hand branch.
     */
    else if(key < this.key){
      /**
       * If the existing node does n ot have a left child (left pointer is empty),
       * create a new node and insert it as the left child
       */
      if(this.left == null){
        this.left = new BinarySearchTree(key, value, this);
      }
      /**
       * If the node does have an existing left child, then recursively call insert() method
       * so that the node is added further down the tree
       */
      else {
        this.left.insert(key, value);
      }
    }
    /**
     * If the new key is greater than the node's key, then do the same thing, but on the right side
     */
    else {
      if(this.right == null){
        this.right = new BinarySearchTree(key, value, this);
      }
      else{
        this.right.insert(key, value);
      }
    }
  }

  find(key){
    /**
     * If the item is found at the root, then return that value
     */
    if(this.key == key){
      return this.value;
    }
    /**
     * Else if the key is less than this node's key, recursively call find() on the left subtree
     */
    else if(key < this.key && this.left){
      return this.left.find(key);
    }
    /**
     * Else if the key is greater than this node's key, recursively call find() on the right subtree
     */
    else if(key > this.key && this.right){
      return this.right.find(key);
    }
    /**
     * You have searched the tree and the item is not found in the tree
     */
    else {
      throw new Error('Key not found');
    }
  }

  remove(key){
    /**
     * If the current node's key matches the keey that needs to be removed
     */
    if (this.key == key){ 
      /**
       * If the node has both left and right children, replace it with its successor
       */
      if (this.left && this.right) {
        const successor = this.right._findMin(); // this finds the sucessor (_findMin() recursively finds the min node in the subtree)
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      /**
       * If the node only has a left child, then you replace the node with its left child
       */
      else if (this.left) {
        this._replaceWith(this.left);
      }
      /**
       * If the node only has a right child, then you replace the node with its right child
       */
      else if (this.right){
        this._replaceWith(this.right);
      }
      /**
       * If the node has no children, simply remove it
       */
      else {
        this._replaceWith(null);
      }
    }
    /**
     * Else if the node has a left child, recursively call remove on the left subtree
     */
    else if (key < this.key && this.right) {
      this.left.remove(key);
    }
    /**
     * Else if the node has a right child, recursively call remove on the right subtree
     */
    else if (key > this.key && this.left) { 
      this.right.remove(key);
    }
    /**
     * Else key has not been found
     */
    else {
      throw new Error('Key not found');
    }
  }

  _replaceWith(node) {
    /**
     * If current node being removed has a parent (meaning that it is not the root of the tree)
     */
    if (this.parent) {
      /**
       * If the node to be removed is a left child, left pointer of its parent is updated 
       * to point to node
       */
        if (this == this.parent.left) {
            this.parent.left = node;
        }
        /**
         * Or if the node to be removed is a right child, right pointer of its parent is updated
         * to point to node
         */
        else if (this == this.parent.right) {
            this.parent.right = node;
        }
        /**
         * The parent pointer of the replacing node (`node`)
         * points to the parent of the removed node (`this`)
         */
        if (node) {
            node.parent = this.parent;
        }
    }
    /**
     * If the node being removed is the root of the tree
     */
    else {
        /**
         * the root node is being replaced, so set the root to the replacing node
         */
        if (node) {
            this.key = node.key;
            this.value = node.value;
            this.left = node.left;
            this.right = node.right;
        }
        /**
         * Else if no replacing node exists, the root node is cleared 
         * and tree becomes empty
         */
        else {
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
