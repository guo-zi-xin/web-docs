# 两数之和

---

**给定一个整数数组`nums`和一个目标值 `target` ，请你在该数组中找出和为目标值的那 `两个` 整数，并返回它们的数组下标。**

> 你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

- 示例

```javascript
// 给定 
nums = [2, 7, 11, 15], target = 9

// 因为 
nums[0] + nums[1] = 2 + 7 = 9
// 所以返回 
[0, 1]
```

- 遍历两次求和，过滤出符合条件的下标拼接成数组

```typescript
  const getAddIndex = (nums: number[], target: number): number[] => {
    const newArr: number[] = []
    for (let j = nums.length - 1; j >= 0; j--) {
      for (let k = 0; k < nums.length; k++) {
        if (nums[j] + nums[k] === target && j !== k) {
          newArr.push(...[j, k])
        }
      }
    }
    return Array.from(new Set(newArr))
  }
  const arr: number[] = [2, 7, 11, 15]
  const target: number = 26
  console.log(getAddIndex(arr, target))
```

- 利用map的特性去处理
  新建一个`Map`, ， 然后遍历数组， 将差值记录在`Map`中， 最后通过`Map`的`get`方法得到下标

```typescript
  const getAddIndex = (nums: number[], target: number): number[] => {
    const map = new Map();
    for (let k = 0; k< nums.length; k++) {
      // j为 target 与数组每一项的差值 
      const j: number = target - nums[k]
      // 判断map中是否包含着这个差值的项，如果包含， 则这个时候这个差值与nums[k]之和等于target
      if (map.has(j)) {
        // 利用 map 的 get 方法， 获取存储的差值类型的key(下标)，然后与当遍历的次数k一起返回
          return [map.get(j), k]
      }
      map.set(nums[k], k)
    }
    return []
  }

```
