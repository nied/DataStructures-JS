/*
    Binary-tree in JavaScript. Currently only supports adding and removing.
    Much inspiration from http://en.wikipedia.org/wiki/Binary_search_tree 
    and http://www.algolist.net/Data_structures/Binary_search_tree.

    Usage:

    var myTree = new Tree();

    var a = new Node(2);
    var b = new Node(5);

    myTree.addNode(new Node(1));
    myTree.addNode(new Node(3));
    myTree.addNode(a);
    myTree.addNode(b);
    myTree.addNode(new Node(4));

    myTree.deleteNode(a);
    myTree.deleteNode(b);

    console.log(myTree);
*/

Node = function (value) {
    var self = this;

    self.parent = null,
    self.left = null,
    self.right = null;

    self.value = value;
};

Tree = function () {
    var self = this;
    self.root = null;

    /*
        Public functions
    */
    self.addNode = function (node) {

        if (self.root == null) {
            self.root = node;
            return;
        }

        var current = self.root;

        do {
            if (current.value == node.value)
                break;

            if (current.value > node.value) {
                if (current.left == null) {
                    current.left = node;
                    node.parent = current;

                    break;
                } else {
                    current = current.left;
                }
            } else if (current.value < node.value) {
                if (current.right == null) {
                    current.right = node;
                    node.parent = current;

                    break;
                } else {
                    current = current.right;
                }
            }
        } while (true);
    };

    self.deleteNode = function (node) {
        var current = self.root;

        if (node.right && node.left) { // Two children. FFFFUUUUUUUU
            var next = findSmallestChild(node.right);

            replaceNodeValues(node, next);

            self.deleteNode(node);
        }
        else if (node.right || node.left) // One child
        {
            if (node == node.parent.right) {
                node.parent.right = node.right || node.left;
            } else {
                node.parent.left = node.right || node.left;
            }
        }
        else // No children
        {
            if (node == node.parent.left) {
                node.parent.left = null;
            } else {
                node.parent.right = null;
            }
        }
    };

    /*
    Private functions
    */
    var replaceNodeValues = function (oldNode, newNode) {
        var temp = oldNode.value;
        oldNode.value = newNode.value;
        newNode.value = temp;
    };

    var findSmallestChild = function (node) {
        var current = node;

        if (current.left) {
            current = findSmallestChild(node.left);
        }

        return current;
    }

    var deleteLeaf = function (node) {
        if (node.parent != null) {
            if (node.parent.left == node) {
                node.parent.left = null;
            } else {
                node.parent.right = null;
            }

            node.parent = null;
        }

        node = null;
    };
};