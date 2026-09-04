# Prompt Engineering



## 一句话总结

Prompt Engineering 是通过精心设计输入提示来引导 LLM 产生高质量输出的工程实践——包括角色设定、少样本示例、思维链推理、输出格式约束等核心技巧。

## 核心原理

### 提示词结构

一个完整的 Prompt 通常包含：

| 组件 | 作用 | 示例 |
|------|------|------|
| System Prompt | 定义模型角色和行为规范 | "你是一个资深前端工程师" |
| Context | 提供背景信息和约束 | 项目技术栈、代码规范 |
| Few-shot Examples | 输入输出示例 | 2-3 个示例对 |
| Instruction | 具体任务指令 | "请审查以下代码" |
| Output Format | 期望的输出格式 | JSON Schema / Markdown |

### 核心技巧

**Chain-of-Thought (CoT) 思维链：**

让模型"展示思考过程"，大幅提升推理类任务准确率：

```
普通 Prompt: "17 * 24 等于多少？"
CoT Prompt: "17 * 24 等于多少？请一步步思考。"

模型输出：
- 17 * 24 = 17 * (20 + 4)
- = 17 * 20 + 17 * 4
- = 340 + 68
- = 408
```

**Few-shot Learning 少样本学习：**

```
请将以下英文翻译为简洁的中文技术术语：

Input: "Garbage Collection" → Output: "垃圾回收"
Input: "Virtual DOM" → Output: "虚拟DOM"
Input: "Closure" → Output: "闭包"
Input: "Hydration" → Output: ?
```

**Self-Consistency 自洽性：**

多次采样同一问题，取多数一致的答案（提升推理可靠性）。

**Structured Output 结构化输出：**

```
请以 JSON 格式输出代码审查结果，包含以下字段：
{
  "issues": [{ "line": number, "severity": "high|medium|low", "description": string }],
  "suggestions": string[],
  "overall_score": number
}
```

### 高级技巧

| 技巧 | 原理 | 适用场景 |
|------|------|---------|
| Role Playing | 赋予模型专家身份 | 提升领域准确性 |
| Step-by-step | 分步骤指导 | 复杂多步任务 |
| Constraints | 明确禁止/限制 | 控制输出边界 |
| Template Fill | 给出模板让模型填空 | 格式化输出 |
| Meta-prompting | 让模型优化自己的 Prompt | Prompt 迭代 |
| Tree-of-Thought | 多条推理路径并行探索 | 复杂决策 |

### 常见反模式

| 反模式 | 问题 | 改进 |
|--------|------|------|
| 模糊指令 | "写得好一点" | 明确评判标准 |
| 过长 Prompt | Token 浪费、注意力分散 | 精简、分层 |
| 无约束输出 | 格式不稳定 | 指定 Schema |
| 忽略 Negative Prompt | 模型容易犯的错 | "不要做 X" |
| 单次尝试 | 结果不稳定 | 迭代优化 |

### 与前端开发的结合

- AI Code Review：设计 Prompt 让模型审查代码质量
- 代码生成：约束技术栈、编码风格、错误处理模式
- 测试用例生成：给出代码 + 预期行为 → 生成测试
- 文档生成：代码 → 注释/README/API 文档

## 代码示例

```javascript
// 结构化的代码审查 Prompt
const reviewPrompt = `
你是一位资深前端工程师，请审查以下 Vue 3 代码。

## 审查标准
- 响应式数据使用是否正确
- 组件生命周期资源是否正确清理
- TypeScript 类型是否完备
- 性能隐患（不必要的重渲染、内存泄漏）

## 输出格式
以 JSON 数组输出，每项包含：
- line: 行号
- severity: "critical" | "warning" | "suggestion"
- issue: 问题描述
- fix: 修复建议

## 代码
\`\`\`vue
${code}
\`\`\`
`;
```

```python
# 使用 OpenAI API 的 Structured Output
response = client.chat.completions.create(
    model="gpt-4o",
    response_format={"type": "json_schema", "json_schema": schema},
    messages=[
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_input}
    ]
)
```

## 易错点

- 模型对 Prompt 末尾的内容注意力更强（近因效应），重要指令放后面
- Few-shot 示例的质量比数量重要，2-3 个高质量示例优于 10 个粗糙示例
- 中文 Prompt 用中文指令、英文 Prompt 用英文指令，混合语言效果不稳定
- Temperature 影响创造性：代码/数据类任务用 0，创意类任务用 0.7+
- 长上下文中的"Lost in the Middle"现象：中间位置的信息容易被忽略

## 延伸阅读

- [Agent 框架全景](./agent-framework) — Agent 的每一步决策都依赖于精心设计的 Prompt
- [RAG 是什么](./rag-intro) — RAG 本质是动态构造 Prompt 的上下文部分
