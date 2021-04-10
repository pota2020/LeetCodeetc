import { assert } from "console"

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {

    const buildTreeSub = (preorder: number[], inorder: number[]): { tree: TreeNode | null, nextPre: number[] } => {
        // �������݂��Ȃ��ꍇ��null�Ƃ���
        if (preorder.length === 0) {
            return { tree: null, nextPre: [] }
        }
        // SubTree�Ƃ��ċ�z�񂪗^�����Ă���ꍇ��preorder��ω��������ɂ�������nullNode��Ԃ�
        if (inorder.length === 0) {
            return { tree: null, nextPre: preorder };
        }

        const [nodeVal, ...nextLeftPreorder] = preorder;  // ���������p����head::tail�`���ɕ�������

        // �ESubTree�ƍ�SubTree��\���z��ւ�inorder�𕪊�����
        // ���Ȃ��A�����head,tail����z�񂾂����ꍇ���������@�\���邪�Anum��������Ȃ��ꍇ�͗�O�𔭐�������͂�
        const splitArrayAt = (array: number[], num: number): { head: number[], tail: number[] } => {
            const mid = array.indexOf(num);
            return { head: array.slice(0, mid), tail: array.slice(mid + 1, array.length) };
        }
        const { head, tail } = splitArrayAt(inorder, nodeVal);

        // �ESubTree�ƍ�SubTree�̐����͍ċA�I�ɔC����
        const { tree: leftSubTree, nextPre: nextRightPreorder } = buildTreeSub(nextLeftPreorder, head);
        const { tree: rightSubTree, nextPre } = buildTreeSub(nextRightPreorder, tail);

        return { tree: new TreeNode(nodeVal, leftSubTree, rightSubTree), nextPre };
    }

    const { tree, ..._ } = buildTreeSub(preorder, inorder);
    return tree;
};

// �f�o�O�p
const preorder = [3, 9, 20, 15, 7];
const inorder = [9, 3, 15, 20, 7];
buildTree(preorder, inorder);