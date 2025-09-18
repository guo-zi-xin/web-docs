# 移除元素

---

**给你一个数组 `nums` 和一个值 `val`，你需要 *原地* 移除所有数值等于`val`的元素，并返回移除后数组的新长度。**

**不要使用额外的数组空间，你必须仅使用`O(1)` 额外空间并 原地 修改输入数组。**

**元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。**

- 示例1

```javascript
  const nums = [3,2,2,3]
  const val = 3
  输出 2, 并且nums数组变更为 [2,2]
```

- 示例2

```javascript
  const nums = [0,1,2,2,3,0,4,2]
  const val = 2
  输出 5, 并且nums数组变更为 [0,1,4,0,3]
```

- 求解

> 主要是通过双指针存储临时变量来求解

::: danger 注意！
下面第一个方法执行完成后， 返回的数字是正确的， 但数组可能不会修改成我们所需要的数组
:::

```typescript
  const removeEle = (nums: number[], val:number): number =>  {
    const len = nums.length;
    let index  = 0
    for (let k = 0; k < len; k++ ) {
      if(nums[k] !== val) {
        nums[index] = nums[k]
        index++
      }
    }
    return index
  }
```

```typescript
  const removeEle = (nums: number[], val: number): number => {
    let index: number = 0;
    let len: number = nums.length;
    while (index < len) {
      if (nums[index] === val) {
        nums[index] = nums[len - 1];
        len--;
      } else {
        index++;
      }
    }
    return index;
  };
```
