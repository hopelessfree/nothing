import { BubbleItem } from '@/typings/Sort';

/**
 * 创建一个随机数组
 * @param length 长度
 * @returns number[]
 */
export function createNumbers(length: number = 10): BubbleItem[] {
  if (length > 15) {
    length = 0;
  }

  const numbers: BubbleItem[] = Array.from({ length }, (_, i) => ({
    num: ++i,
    next: false,
    finish: false,
    current: false,
  }));

  for (let index = 0; index < length * 5; index++) {
    const index_1 = Math.floor(Math.random() * length);
    const index_2 = Math.floor(Math.random() * length);

    const num = numbers[index_1];
    numbers[index_1] = numbers[index_2];
    numbers[index_2] = num;
  }

  return numbers;
}

/**
 * 冒泡排序
 * @param arr
 * @returns
 */
export function sortBubble(arr: BubbleItem[]) {
  for (let length = 0; length < arr.length; length++) {
    for (let index = 0; index < length; index++) {
      const currentNum = { ...arr[index] };
      const nextNum = { ...arr[index + 1] };

      currentNum.current = true;
      nextNum.next = true;

      if (currentNum.num > nextNum.num) {
        arr[index] = nextNum;
        arr[index + 1] = currentNum;
      }

      return [...arr];
    }

    arr[arr.length - 1 - length]['finish'] = true;
  }

  return [...arr];
}

// // 冒泡排序
// function bubbleSort(arr: SortArr) {
//   const sortArr = arr.map((item) => ({
//     ...item,
//     currentNum: false,
//     contrastNum: false,
//   }));

//   for (let length = 0; length < sortArr.length; length++) {
//     for (let index = length; index < sortArr.length - length - 1; index++) {
//       if (index > 1) {
//         sortArr[index - 1]['currentNum'] = false;
//       }

//       const currentItem = sortArr[index];
//       currentItem['currentNum'] = true;
//       currentItem['contrastNum'] = false;

//       const nextItem = sortArr[index + 1];
//       nextItem['contrastNum'] = true;

//       if (
//         currentItem.num > nextItem.num &&
//         currentItem.index < nextItem.index
//       ) {
//         // [sortArr[index], sortArr[index + 1]] = [sortArr[index + 1], sortArr[index]]
//         [sortArr[index]['index'], sortArr[index + 1]['index']] = [
//           sortArr[index + 1]['index'],
//           sortArr[index]['index'],
//         ];
//         return sortArr;
//       }
//     }
//   }

//   return arr;
// }
