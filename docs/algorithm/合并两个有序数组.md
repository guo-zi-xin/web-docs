# 合并两个有序数组

---

**给你两个有序整数数组`nums1`和`nums2`，请你将`nums2`合并到`nums1`中，使`num1`成为一个有序数组。**

> 说明:
> 初始化`nums1`和`nums2`需要合并的元素数量分别为 `m`和 `n` 。
> 你可以假设`nums1` 有足够的空间（空间大小大于或等于 `m + n` ）来保存 `nums2` 中的元素。

- 示例

```javascript
// 输入:
const nums1 = [1,2,3,0,0,0], m = 3
const nums2 = [2,5,6],       n = 3
// 输出: [1,2,2,3,5,6]
```

```typescript
  const getConcatArr = (nums1: number[], nums2: number[], m: number, n: number): void => {
    nums1.splice(m, n, ...nums2)
    nums1.sort((a,b)=> a - b)
    return nums1
  }
  getConcatArr(nums1, nums2)
```

```typescript
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
const getConcatArr = (nums1:number[], m:number, nums2:number[], n: number) => {
    let index1 = m - 1
    let index2 = n - 1
    let tail = m + n - 1
    while (index2 >= 0) {
        if (nums1[index1] > nums2[index2]) {
            nums1[tail] = nums1[index1]
            index1--
            tail--
        } else {
            nums1[tail] = nums2[index2]
            index2--
            tail--
        }
    }
}

let nums1 = [1, 2, 3];
let nums2 = [2, 5, 6];
getConcatArr(nums1, 3, nums2, 3)
console.log(nums1)
```

```typescript
const getConcatArr = function(nums1:number[], m: number, nums2: number[], n: number):void {
    let len1:number = m - 1,
        len2:number = n - 1,
        len: number = m + n - 1
    while(len2 >= 0) {
        if(len1 < 0) {
            nums1[len--] = nums2[len2--]
            continue
        }
        nums1[len--] = nums1[len1] >= nums2[len2] ? nums1[len1--]: nums2[len2--]
    }
};
```
