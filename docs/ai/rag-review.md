# RAG 核心流程与优劣势

> 复习日期：2026-05-25 · 难度：中等 · 类型：AI 相关

## 题目

在 LLM 应用开发中，RAG（Retrieval-Augmented Generation）的核心流程是什么？相比直接使用 Prompt Engineering，RAG 解决了哪些关键问题？引入了哪些新挑战？

## 初次作答

跳过（不清晰）

## 问题所在

对 RAG 整体架构缺乏系统认知，需要梳理：离线索引（分块 → 向量化 → 入库）和在线查询（问题向量化 → 检索 → 拼接 → 生成）两阶段流程，以及与纯 Prompt 方案的对比。

## 参考答案

RAG 核心流程分两阶段：

离线索引：文档分块 → Embedding 向量化 → 存入向量数据库

在线查询：用户问题向量化 → 向量检索召回 Top-K → 拼接 Prompt → LLM 生成答案

解决的问题：

1. 知识时效性（可随时更新知识库）
2. 上下文窗口限制（只召回相关片段）
3. 幻觉问题（有来源支撑可溯源）
4. 私有数据访问（文档入库即可用）
5. Token 成本（只传相关片段）

引入的挑战：

1. 分块策略调优（太大不精准，太小缺上下文）
2. 检索质量（语义不匹配问题）
3. Embedding 模型选择
4. 上下文噪声干扰
5. 多跳推理困难
6. 系统复杂度增加

优化方向：Hybrid Search、Re-ranking、Query Rewriting、Contextual Compression

## 补充知识点

- RAG 本质是给 LLM "开卷考试"
- 前端开发者接触 RAG 的场景：Streaming 渲染、引用来源展示、搜索结果高亮
- 核心公式：检索质量决定最终回答质量（garbage in, garbage out）
- 与 Fine-tuning 的区别：RAG 适合知识密集型场景，Fine-tuning 适合风格/格式调整

## 关联阅读

- [RAG 是什么](./rag-intro)
