'use strict';

const input1 = ["c", "a", "b", "c", "b", "d"];
const input2 = ["a", "b", "a", "b", "c", "d"];
// const expect = ["a", "b", "c"];

const findDuplicateSubString = (input1, input2) => {

    // �O���[�s���O
    const groupedId1 = input1.reduce(
        (acc, str, i) => {
            if (!acc[str]) {
                acc[str] = []
            }
            acc[str].push(i)
            return acc;
        },
        {}
    );

    // input2�Ƌ��ʂ��Ă���str����������Aid���y�A�ɂ���Set��
    const idPairSet = input2.reduce(
        (set, str2, i2) => {
            if (groupedId1[str2]) {
                groupedId1[str2].forEach(i1 => set.add(JSON.stringify([i1, i2]))); // �I�u�W�F�N�g��set����Ɏg������Jsonstringfy�͗v��񂩂��A�������ꂪ�炢
            }
            return set;
        },
        new Set()
    );

    // �d�����������̃C���f�b�N�X�����g���āA�Œ��̏d������Substring�𐶐�
    const strs = [...idPairSet].reduce(
        (array, strIdPair) => {
            const idPair = JSON.parse(strIdPair);
            let [i1, i2] = idPair;
            // �C���f�b�N�X+1���ꂽid�́A�����I�ɂ͒���̕���
            while (idPairSet.has(JSON.stringify([++i1, ++i2]))) {
                if (i1 - idPair[0] + 1 > array.length) {
                    return input1.slice(idPair[0], i1 + 1);
                }
            }
            return array;
        },
        []
    )

    return strs;
}

console.log(findDuplicateSubString(input1, input2));
