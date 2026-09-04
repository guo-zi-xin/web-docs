# Agent框架全景



## 一句话总结

AI Agent 是能自主规划、使用工具、迭代执行任务的 LLM 应用——从单 Agent 的 ReAct 模式到多 Agent 协作框架（LangChain/CrewAI/AutoGen），是当前 AI 应用的核心架构范式。

## 核心原理

### Agent 基本架构

```
用户输入
  → 规划（Planning）：拆解任务步骤
    → 工具调用（Tool Use）：执行具体动作
      → 观察（Observation）：获取执行结果
        → 反思（Reflection）：评估是否完成
          → 输出结果 / 继续迭代
```

### ReAct 模式

ReAct（Reasoning + Acting）是最基础的 Agent 模式：

```
Thought: 我需要查找用户的订单信息
Action: search_orders(user_id="123")
Observation: 找到 3 个订单：[...]
Thought: 用户询问最近的订单，我应该返回第一个
Action: 返回最终答案
```

每一步：思考（Thought）→ 行动（Action）→ 观察（Observation）→ 循环直到完成。

### 主流框架对比

| 框架 | 核心理念 | 适用场景 | 语言 |
|------|---------|---------|------|
| LangChain/LangGraph | 通用 Agent 框架 + 图编排 | 复杂工作流 | Python/JS |
| CrewAI | 角色扮演的多 Agent 协作 | 团队协作模拟 | Python |
| AutoGen (Microsoft) | 多 Agent 对话协作 | 代码生成、研究 | Python |
| Dify | 低代码 Agent 构建平台 | 快速搭建 | SaaS |
| Coze (字节) | 可视化 Agent 构建 | 快速上手 | SaaS |

### LangGraph 编排模式

```
graph TD
  Start --> Plan
  Plan --> Execute
  Execute --> Evaluate
  Evaluate -->|需要继续| Plan
  Evaluate -->|完成| End
```

核心概念：
- State：全局状态（在节点间传递）
- Node：处理节点（LLM 调用、工具调用、条件判断）
- Edge：节点间的连接（包括条件边）
- Checkpoint：状态持久化（支持人工介入、恢复执行）

### 多 Agent 协作模式

| 模式 | 说明 | 示例 |
|------|------|------|
| 顺序（Sequential） | Agent A 完成后交给 Agent B | 研究员 → 写手 |
| 监督（Supervisor） | 主 Agent 分配任务给子 Agent | 项目经理分配任务 |
| 辩论（Debate） | 多个 Agent 讨论得出结论 | 正方/反方/裁判 |
| 层级（Hierarchical） | 多层级管理 | CEO → 经理 → 员工 |

### Agent 关键能力

| 能力 | 实现方式 |
|------|---------|
| 记忆 | 短期（上下文）+ 长期（向量数据库） |
| 规划 | Chain-of-Thought / Tree-of-Thought / 任务分解 |
| 工具使用 | Function Calling / MCP |
| 反思 | Self-critique / Verification loops |
| 协作 | Multi-agent / A2A |

## 代码示例

```python
# LangChain 简单 Agent
from langchain.agents import create_react_agent
from langchain_openai import ChatOpenAI
from langchain.tools import Tool

tools = [
    Tool(name="Search", func=search_api, description="搜索互联网"),
    Tool(name="Calculator", func=calc, description="数学计算"),
]

llm = ChatOpenAI(model="gpt-4")
agent = create_react_agent(llm, tools, prompt)
result = agent.invoke({"input": "北京今天天气如何"})
```

```typescript
// 前端视角：构建 Tool 供 Agent 使用
const browserTool = {
  name: "screenshot",
  description: "Take a screenshot of the current page",
  parameters: {
    type: "object",
    properties: {
      url: { type: "string", description: "Page URL" },
      selector: { type: "string", description: "CSS selector to capture" }
    }
  },
  execute: async ({ url, selector }) => {
    // 使用 Puppeteer 截图
    const page = await browser.newPage();
    await page.goto(url);
    return await page.screenshot({ selector });
  }
};
```

## 易错点

- Agent 的不确定性：相同输入不一定得到相同输出（LLM 的概率特性）
- 工具描述的质量直接决定 Agent 的工具选择准确率
- 多 Agent 系统的调试非常困难，需要完善的日志和追踪
- Token 消耗：Agent 的循环迭代会大幅增加 token 用量
- 安全边界：Agent 有执行代码/访问文件的能力，需要严格的沙箱和权限控制

## 延伸阅读

- [MCP 协议与 A2A](./mcp-and-a2a) — Agent 使用工具和互相协作的标准协议
- [RAG 是什么](./rag-intro) — RAG 是 Agent 记忆系统的一种实现
