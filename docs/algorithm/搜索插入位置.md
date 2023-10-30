# 搜索插入位置

---

**给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引**
**如果目标值不存在于数组中，返回它将会被按顺序插入的位置**

- 示例1

```javascript
var nums = [1, 3, 5, 6], target = 5
输出 2
```

- 示例2

```javascript
var nums =  [1, 3, 5, 6] target = 2
输出 1 （数组中不包含2， 插入进去排序后下标为1）
```

- 示例3

```javascript
var nums = [1, 3, 5, 6] target = 7
输出 4 （数组中不包含2， 插入进去排序后下标为4）
```

求解

- 先将目标值放在数组中，进行去重和排序， 再进行判断下标

```typescript
  const searchInsert = (nums: number[], target: number): number => {
    nums.push(target)
    const newNum: number[] = Array.from(new Set(nums)).sort((a, b) => a - b)
    let numIndex: number = -1
    for(let k = 0; k< newNum.length; k++) {
      if (newNum[k] === target) {
        numIndex = k
        return k
      }
    }
    return numIndex
  }
  const target1 =  5
  const target2 =  2
  const target3 =  7

  console.log(searchInsert([1, 3, 5, 6], target1))
  console.log(searchInsert([1, 3, 5, 6], target2))
  console.log(searchInsert([1, 3, 5, 6], target3))

```

- 使用二分法查找

```typescript
const searchInsert = (nums: number[], target: number): number => {
    const n: number = nums.length;
    let left:number = 0, right:number = n - 1, ans:  number = n;
    while (left <= right) {
        let mid:number = ((right - left) >> 1) + left;
        if (target <= nums[mid]) {
            ans = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return ans;
}
```
