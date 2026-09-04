# MCP协议与A2A



## 一句话总结

MCP（Model Context Protocol）是 Anthropic 提出的模型-工具标准化协议，定义了 LLM 如何发现和调用外部工具；A2A（Agent-to-Agent）是 Google 提出的 Agent 间协作协议——两者共同构成 AI Agent 生态的基础设施层。

## 核心原理

### MCP 协议

**解决的问题：** 每个 AI 应用都要单独对接各种工具/API，导致 M*N 的集成爆炸。MCP 将其标准化为 M+N（类似 USB-C 之于外设）。

**架构：**

```
AI 应用（Host）
  ├── MCP Client（协议客户端）
  │     ↕ JSON-RPC 2.0
  ├── MCP Server A（文件系统工具）
  ├── MCP Server B（数据库工具）
  └── MCP Server C（API 工具）
```

**核心概念：**

| 概念 | 说明 | 举例 |
|------|------|------|
| Tools | 模型可调用的函数 | 搜索、执行代码、查数据库 |
| Resources | 提供上下文数据的端点 | 文件内容、文档、配置 |
| Prompts | 预定义的提示模板 | 代码审查模板、总结模板 |
| Sampling | Server 请求 LLM 做推理 | 嵌套 Agent 调用 |

**通信方式：**
- stdio：本地进程间通信（子进程标准输入输出）
- SSE（Server-Sent Events）：远程 HTTP 流式通信
- Streamable HTTP：新版远程传输（替代 SSE）

**工具定义示例：**

```json
{
  "name": "search_files",
  "description": "Search for files matching a pattern",
  "inputSchema": {
    "type": "object",
    "properties": {
      "pattern": { "type": "string", "description": "Glob pattern" },
      "path": { "type": "string", "description": "Directory to search" }
    },
    "required": ["pattern"]
  }
}
```

### A2A 协议（Agent-to-Agent）

**解决的问题：** 不同框架构建的 Agent 之间如何协作、任务分配、结果传递。

**核心概念：**

| 概念 | 说明 |
|------|------|
| Agent Card | Agent 的能力描述文件（类似 API 文档） |
| Task | 协作的基本单元，有状态机 |
| Message/Part | 通信消息和多模态内容块 |
| Artifact | Agent 产出的结果文件 |

**与 MCP 的关系：**
- MCP：模型 ↔ 工具（垂直方向，能力扩展）
- A2A：Agent ↔ Agent（水平方向，协作编排）

两者互补，不是竞争关系。一个 Agent 可以通过 MCP 使用工具，同时通过 A2A 与其他 Agent 协作。

### 对前端的影响

- AI 驱动的开发工具（Copilot、Cursor、CatDesk）都基于类似 MCP 的工具调用机制
- 前端应用可以作为 MCP Server 暴露能力（如浏览器操作、UI 测试）
- 理解 Tool Use/Function Calling 是构建 AI 应用的基础能力

## 代码示例

```typescript
// 实现一个简单的 MCP Server（Node.js）
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new Server({
  name: 'my-tools',
  version: '1.0.0',
}, {
  capabilities: { tools: {} }
});

server.setRequestHandler('tools/list', async () => ({
  tools: [{
    name: 'get_weather',
    description: 'Get weather for a city',
    inputSchema: {
      type: 'object',
      properties: { city: { type: 'string' } },
      required: ['city']
    }
  }]
}));

server.setRequestHandler('tools/call', async (request) => {
  if (request.params.name === 'get_weather') {
    const city = request.params.arguments.city;
    return { content: [{ type: 'text', text: `${city}: 25C, sunny` }] };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
```

## 易错点

- MCP 不是 LLM 本身的能力，而是 LLM 应用层的协议（模型需要支持 Tool Use 才能配合）
- MCP Server 运行在本地（stdio）时有完整的文件系统访问权限，安全边界需谨慎
- A2A 还处于早期阶段，生态远不如 MCP 成熟
- Function Calling（OpenAI）和 Tool Use（Anthropic）是模型层能力，MCP 是应用层标准

## 延伸阅读

- [RAG 是什么](./rag-intro) — RAG 可以作为 MCP Server 的一种实现
- [Agent 框架全景](./agent-framework) — Agent 框架如何集成 MCP
