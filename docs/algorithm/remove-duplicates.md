# 删除有序数组中的重复项

---

**给你一个 *非严格递增排列* 的数组 `nums` ，请你 *原地* 删除重复出现的元素，使每个元素 *只出现一次* ，返回删除后数组的新长度。元素的 相对顺序 应该保持 一致 。然后返回 `nums` 中唯一元素的个数。**

**考虑 `nums` 的唯一元素的数量为 `k` ，你需要做以下事情确保你的题解可以被通过：**

**更改数组 `nums` ，使 `nums` 的前 `k` 个元素包含唯一元素，并按照它们最初在 `nums` 中出现的顺序排列。`nums` 的其余元素与 `nums`的大小不重要。**

**返回 `k`。**

- 示例1

```javascript
const nums = [1,1,2]
输出：2, nums = [1,2,_]
解释：函数应该返回新的长度 2 ，并且原数组 nums 的前两个元素被修改为 1, 2 。不需要考虑数组中超出新长度后面的元素。
```

- 示例2

```javascript
const nums = [0,0,1,1,1,2,2,3,3,4]
输出：5, nums = [0,1,2,3,4]
解释：函数应该返回新的长度 5 ， 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4 。不需要考虑数组中超出新长度后面的元素。
```

- 求解

> 通过判断与前一项是否相等，在通过指针重新指向

```typescript
  const removeDuplicates = (nums:number[]):number => {
    let len:number = nums.length
    let index:number = 1
    for (let k = 1; k< len; k++) {
      if (nums[k] !== nums[k - 1]) {
        nums[index] = nums[k]
        index++
      }
    }
  }
```

> 通过两个指针一快一慢来限定重复项目

```typescript
  const removeDuplicates = (nums:number[]):number => {
    let len:number = nums.length;
    let fast: number = 1
    let slow: number = 0
    while (fast < len) {
      if (nums[fast] !== nums[fast - 1])  {
        nums[slow] = nums[fast]
        ++slow
      }
      ++fast
    }
    return slow
  }
```
