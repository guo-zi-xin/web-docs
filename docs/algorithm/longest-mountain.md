# 寻找数组中最长驼峰

**给定一个纯数字数组，原地生成一个最长驼峰子数组（`元素大小从中间向两侧递减`）**

- 示例
  
```javascript
// 原数组
const arr = [14,7,3,4,8,5,3,2,10,12,9,13,-1,1]
// 输出数组
result = [3,4,8,5,3,2]
```

- 如何理解
  1. 首先， 我们需要找到数组中最长的驼峰，但由于这个驼峰数组长度不确定， 但我们可以利用驼峰的性质(从中间向两边递减)。从数组中间向两边查找最常的递减序列；
  2. 为了确保找到的是最长的递减序列，可以采用贪心算法，即只要当前元素大于前一个元素，就将当前元素加入递减序列。
  3. 当找到递减序列结束时，比较当前递减序列的长度与之前记录的最长递减序列的长度，选择较长的一个作为结果。

- **求解**

```typescript
const getLongestHump = (arr:Array<number>):Array<number> => {
  let maxLength: number = 0;
  let result: number[] = [];
  for (let k = arr.length / 2; k >= 0; k--) {
    let leftIndex:number = i
    let rightIndex:number = i

    //寻找左边递减序列
    while (leftIndex > 0 && arr[leftIndex] > arr[leftIndex - 1]) {
      leftIndex--
    }

    // 寻找右边递减序列
    while(rightIndex < arr.length - 1 && arr[rightIndex] > arr[rightIndex + 1]) {
      rightIndex++
    }

    //计算递减序列的长度
    let currentLength = rightIndex - leftIndex + 1

    // 更新最长递减序列的信息
    if (currentLength > maxLength) {
      maxLength = currentLength;
      result = arr.slice(leftIndex, rightIndex + 1)
    }
  }
  return result
}
```
