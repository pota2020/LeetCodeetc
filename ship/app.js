
'use strict';
/**
 * @param {number[]} weights
 * @param {number} days
 * @return {number}
 */
var shipWithinDays = function (weights, days) {
    const min = Math.ceil((weights.reduce((acc, x) => acc + x)) / days - 1); // ��΂Ɏ��s����l 10

    // ��΂ɐ�������l�����߂�
    let mod = getModulam(weights, days, min);
    const max = mod; // 27

    // min��max�̊Ԃɓ����͂��� 
    function getModulam(weights, days, containerLength) {
        let lastBox = 0;
        let cnt = 1;
        let tmpBox = 0;
        for (const elem of weights) {
            if (cnt >= days) {
                lastBox += elem;
            }
            if (tmpBox + elem > containerLength && cnt + 1 === days) {
                lastBox = elem;
                cnt++;
            }
            if (tmpBox + elem > containerLength) {
                tmpBox = elem;
                cnt++;
            } else {
                tmpBox += elem;
            }
        }
        return lastBox;
    }


    // �O�̂��ߗ]���Ɏ���Ă���
    const getResult = () => {
        if (getModulam(weights, days, max) > max) {
            return max - 1;
        } else {
            return max;
        }
    }

    let tmpMax = max;
    let tmpMin = mid;
    while (tmpMax - tmpMin > 0) {
        const mid = (tmpMin + tmpMax) / 2;
        const mod = getModulam(weights, days, mid);
        if (mod > mid) {
            tmpMax = mid;
        } else {
            tmpMin = mid;
        }
    }

    return getResult();

};


min = 1;
max = 500;

1                   500
�~�~�~...�~�Z.....�Z�Z

