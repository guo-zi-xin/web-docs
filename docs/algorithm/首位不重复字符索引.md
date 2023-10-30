# 首位不重复字符索引

---

**给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。**

- 示例

```javascript
  let str1 = 'leetcode'
  输出 0
  let str2 = "loveleetcode"
  输出 2
```

求解

```typescript
  const firstUniqChar = (str: string): number => {
    const map = {}
    for (let i of str) {
      map[i] = (map[i] || 0) + 1
    }
    for (let k = 0; k < str.length; k++)if (map[str[k]] === 1) return k
    return -1
  }
  firstUniqChar(str2)
```
