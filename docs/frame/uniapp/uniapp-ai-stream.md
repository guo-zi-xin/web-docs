# UniApp 接入AI(流式接口)

> **uni-app 已将常用的组件、API封装到框架中，开发者按照 uni-app 规范开发即可保证多平台兼容，大部分业务均可直接满足。但每个平台有自己的一些特性，因此会存在一些无法跨平台的情况。所以使用条件编译进行区分设备环境。**
[uniapp条件编译](https://uniapp.dcloud.net.cn/tutorial/platform.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E9%80%89%E6%8B%A9%E6%9D%A1%E4%BB%B6%E7%BC%96%E8%AF%91%E5%A4%84%E7%90%86%E8%B7%A8%E7%AB%AF%E5%85%BC%E5%AE%B9)

## 基本思路

基于SSE去实现功能 通过接口或插件功能获取流式数据， 通过轮询流式数据进行拼接回复消息内容， 页面上会同步展示文本数据 实现类似打字机效果功能

::: warning ⚠️注意
**H5**

web端运行在浏览器内核上， SSE支持还是比较完备的， 可以使用`axios`、`@microsoft/fetch-event-source`、`fetch` 等方法进行实现

- `axios`
[axios请求](https://axios-http.com/docs/intro)

- `@microsoft/fetch-event-source`
[@microsoft/fetch-event-source](https://github.com/Azure/fetch-event-source#readme)

- `fetch`
[fetch请求](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch)

**APP端**

由于 `uni.request` 方法不支持SSE 也不支持H5的`fetch`方法， 本地项目暂时使用了 `plus.net.XMLHttpRequest` 方法进行原始的数据传输

- `plus.net.XMLHttpRequest`
[plus.net.XMLHttpRequest](https://www.html5plus.org/doc/zh_cn/xhr.html)

:::

### H5

#### `fetch`方法

作为H5的原生方法， 是可以在代码中直接使用的， 不需要引入

```typescript
// 请求地址
const fetchUrl = 'https://请求地址';
// 请求头
const header = {
  Authorization: '请求智能体的token',
  "Content-Type": "application/json",
  Accept: "application/json",
}
// 请求体结构 基于接入的智能体的传参结构
// coze 智能体参数接口示例
const body = {
  bot_id: "botId", // 智能体ID
  user_id: "userId", // 用户Id
  stream: true / false, // 是否支持流式数据 true: 支持 false: 不支持
  auto_save_history: true / false, // 是否保存历史信息
  additional_messages: [
    {
      role: "user", // 角色 user: 用户  assistant: 智能体
      type: "question", // 消息类型 question: 问题提问  answer: 回答
      content: `${msg}`, // 消息内容
      content_type: "text", // 消息格式
    },
  ],
};
let response;
response = await fetch(fetchUrl, {
  method: "POST",
  headers: header.value,
  body: JSON.stringify(body),
});
```

在fetch接口请求成功后， 由于选择了流式数据返回， 响应类型为Eventsource, 此时需要去处理流式数据:

- 流式数据返回格式

```json
# chat - 开始
event: conversation.chat.created
// 在 chat 事件里，data 字段中的 id 为 Chat ID，即会话 ID。
data: {"id": "123", "conversation_id":"123", "bot_id":"222", "created_at":1710348675,
compleated_at:null, "last_error": null, "meta_data": {}, "status": "created","usage":null}

# chat - 处理中
event: conversation.chat.in_progress
data: {"id": "123", "conversation_id":"123", "bot_id":"222", "created_at":1710348675,
compleated_at: null, "last_error": null,"meta_data": {}, "status": "in_progress","usage":null}

# MESSAGE - 知识库召回
event: conversation.message.completed
data: {"id": "msg_001", "role":"assistant","type":"knowledge","content":"---\nrecall slice 1:xxxxxxx\n",
"content_type":"text","chat_id": "123", "conversation_id":"123", "bot_id":"222"}

# MESSAGE - function_call
event: conversation.message.completed
data: {"id": "msg_002", "role":"assistant","type":"function_call","content":"{\"name\":\"toutiaosousuo-search\",\"arguments\":{\"cursor\":0,\"input_query\":\"今天的体育新闻\",\"plugin_id\":7281192623887548473,\"api_id\":7288907006982012986,\"plugin_type\":1",
"content_type":"text","chat_id": "123", "conversation_id":"123", "bot_id":"222"}

# MESSAGE - toolOutput
event: conversation.message.completed
data: {"id": "msg_003", "role":"assistant","type":"tool_output","content":"........",
"content_type":"card","chat_id": "123", "conversation_id":"123", "bot_id":"222"}

# MESSAGE - answer is card
event: conversation.message.completed
data: {"id": "msg_004", "role":"assistant","type":"answer","content":"{{card_json}}",
"content_type":"card","chat_id": "123", "conversation_id":"123", "bot_id":"222"}

# MESSAGE - answer is normal text
event: conversation.message.delta
data:{"id": "msg_005", "role":"assistant","type":"answer","content":"以下",
"content_type":"text","chat_id": "123", "conversation_id":"123", "bot_id":"222"}

event: conversation.message.delta
data:{"id": "msg_005", "role":"assistant","type":"answer","content":"是",
"content_type":"text","chat_id": "123", "conversation_id":"123", "bot_id":"222"}

...... {{ N 个 delta 消息包}} ......

event: conversation.message.completed
data:{"id": "msg_005", "role":"assistant","type":"answer","content":"{{msg_005 完整的结果。即之前所有 msg_005 delta 内容拼接的结果}}",
"content_type":"text","chat_id": "123", "conversation_id":"123", "bot_id":"222"}


# MESSAGE - 多 answer 的情况,会继续有 message.delta
event: conversation.message.delta
data:{"id": "msg_006", "role":"assistant","type":"answer","content":"你好你好",
"content_type":"text","chat_id": "123", "conversation_id":"123", "bot_id":"222"}

...... {{ N 个 delta 消息包}} ......

event: conversation.message.completed
data:{"id": "msg_006", "role":"assistant","type":"answer",
"content":"{{msg_006 完整的结果。即之前所有 msg_006 delta 内容拼接的结果}}",
"content_type":"text","chat_id": "123", "conversation_id":"123", "bot_id":"222"}

# MESSAGE - Verbose （流式 plugin, 多 answer 结束，Multi-agent 跳转等场景）
event: conversation.message.completed
data:{"id": "msg_007", "role":"assistant","type":"verbose","content":"{\"msg_type\":\"generate_answer_finish\",\"data\":\"\"}",
"content_type":"text","chat_id": "123", "conversation_id":"123", "bot_id":"222"}

# MESSAGE - suggestion
event: conversation.message.completed
data: {"id": "msg_008", "role":"assistant","type":"follow_up","content":"朗尼克的报价是否会成功？",
"content_type":"text","chat_id": "123", "conversation_id":"123", "bot_id":"222"}
event: conversation.message.completed
data: {"id": "msg_009", "role":"assistant","type":"follow_up","content":"中国足球能否出线？","content_type":"text","chat_id": "123",
"conversation_id":"123", "bot_id":"222"}
event: conversation.message.completed
data: {"id": "msg_010", "role":"assistant","type":"follow_up",
"content":"羽毛球种子选手都有谁？","content_type":"text","chat_id": "123", "conversation_id":"123", "bot_id":"222"}

# chat - 完成
event: conversation.chat.completed （chat完成）
data: {"id": "123", "chat_id": "123", "conversation_id":"123", "bot_id":"222", "created_at":1710348675, 
compleated_at:1710348675, "last_error":null, "meta_data": {}, "status": "compleated", "usage":{"token_count":3397,"output_tokens":1173,"input_tokens":2224}}

event: done （stream流结束）
data: [DONE]

# chat - 失败
event: conversation.chat.failed
data: {
    "code":701231,
    "msg":"error"
}

```

在返回的数据结构中 `data`是分为几种类型:

 - `event: conversation.chat.created`: **消息开始回答的标记**

 - `event: conversation.chat.in_progress`: **消息回复中**

 - `event: conversation.message.completed`: **当前一轮对话已经完毕**

 - `event: conversation.message.delta`: **流式数据正式返回的数据信息**

 - `event: conversation.chat.completed`: **消息已经回复完成**

- `event: done`: **本轮消息已经回复完成**

我们需要轮询data返回数据 关于正文内容 只需要去处理`delta`消息包 将回复的消息进行拼接， 直到找到第一个`completed` 消息回复完成的节点停止拼接

针对消息回复完成后的建议 我们需要在`completed`消息中获取到类型为 `follow_up` 的消息体进行渲染

> 针对coze平台的类型定义(type)

  - `question`:  用户输入的内容

  - `answer`: 智能体回复内容
  
  - `follow_up`: 用户问题建议
  
  - `verbose`: 多 answer 场景下，服务端会返回一个 `verbose` 包，对应的 `content` 为JSON格式，
  content.msg_type = generate_answer_finish 代表全部 `answer` 回复完成

## APP

由于 uniapp的`uni.request`方法不支持SSE， 并且APP端不存在`window`、`document` 等浏览器属性，不能直接调用`fetch`方法来实现功能

### `plus.net.XMLHttpRequest`

[《XMLHttpRequest模块管理网络请求》](https://www.html5plus.org/doc/zh_cn/xhr.html)

```typescript
import type { UnCancelTokenListener, UnGenericAbortSignal, UnHeaders } from '@uni-helper/uni-network'  

type onStreamReceivedListener = (text: string) => void  

export class CanceledError extends Error {  
  constructor(message?: string) {  
    super(message ?? 'canceled')  
  }  
}  

export function fetchStreamChatForApp(  
  params: { prompt: string; uuid: string },  
  signal?: UnGenericAbortSignal,  
  listener?: onStreamReceivedListener  
) {  
  return new Promise((resolve, reject) => {  
    // 梳理好请求数据  
    const token =  'your-token'  
    const data = JSON.stringify({  
      content: params.prompt,  
      scene: params.uuid,  
      source: 'gpt3.5',  
    })  
    // 处理资源释放  
    let onCanceled: UnCancelTokenListener  
    const done = () => {  
      signal?.removeEventListener?.('abort', onCanceled)  
    }  

    // 封装请求  
    // @ts-ignore  
    let xhr: plus.net.XMLHttpRequest | undefined  
    // @ts-ignore  
    xhr = new plus.net.XMLHttpRequest()  
    xhr.withCredentials = true  
    // 配置终止逻辑  
    if (signal) {  
      signal.addEventListener?.('abort', () => {  
        console.log('fetchStreamChatForApp signal abort')  
        xhr.abort()  
      })  
    }  
    let nLastIndex = 0  
    xhr.onreadystatechange = function () {  
      console.log(`onreadystatechange(${xhr.readyState}) → `)  
      if (xhr.readyState === 4) {  
        if (nLastIndex < xhr.responseText.length) {  
          const responseText = xhr.responseText as string  
          // 处理 HTTP 数据块  
          if (responseText) {  
            const textLen = responseText.length  
            const chunk = responseText.substring(nLastIndex)  
            nLastIndex = textLen  
            listener?.(chunk)  
          }  
        }  
        if (xhr.status === 200) {  
          resolve({ code: ResultCode.SUCCESS, msg: 'end' })  
          done()  
        } else {  
          reject(new Error(xhr.statusText))  
          done()  
        }  
      }  
    }  
    xhr.onprogress = function (event: any) {  
      const responseText = xhr.responseText  
      if (responseText) {  
        const textLen = responseText.length  
        const chunk = responseText.substring(nLastIndex)  
        nLastIndex = textLen  
        listener?.(chunk)  
        console.log('onprogress ', chunk)  
      }  
    }  

    xhr.onerror = function (error: any) {  
      console.error('Network Error:', error)  
      reject(error)  
      done()  
    }  
    // 配置请求  
    xhr.open('POST', 'https://your-site/api/openai/completions/stream')  
    xhr.setRequestHeader('Accept', 'text/event-stream')  
    xhr.setRequestHeader('token', token)  
    xhr.setRequestHeader('User-Agent', 'Mobile')  
    xhr.setRequestHeader('Content-Type', 'application/json')  
    xhr.setRequestHeader('Host', 'mapi.lawvector.cn')  
    xhr.setRequestHeader('Connection', 'keep-alive')  

    // 处理终止逻辑  
    if (signal) {  
      onCanceled = cancel => {  
        console.log('fetchStreamChatForApp onCanceled ', cancel)  
        if (!xhr) {  
          return  
        }  
        reject(new CanceledError('canceled'))  
        xhr.abort()  
        xhr = undefined  
      }  
      // @ts-expect-error no types  
      signal?.aborted ? onCanceled() : signal?.addEventListener('abort', onCanceled)  
    }  
    xhr.send(data)  
  })  
}
```

数据返回是通过 xhr的 `onreadystatechange` 方法监听 `readyState` 变量的值来进行处理：

**readyState === 3**

 表示接口已经连通， 服务端准备返回响应， 可以在这里去处理流式数据， 具体处理方式跟H5端处理信息接口相同

 **readyState === 4**

 表示接口响应已经完成， 接回返回了全部的流式数据 如果在状态为3的时候APP端获取不到即时的响应数据的话， 可以在数据全部返回后， 通过定时器拼接数据来模拟打字机的功能

### `fetch-event-source`

参考方案：

[Javascript调用SSE客户端](https://www.cnblogs.com/oldweipro/p/17304874.html)

[fetch-event-source源码解析](https://sunra.top/2023/04/15/fetch-event-source-code/)

[ChatGPT-SSE流式响应](https://ext.dcloud.net.cn/plugin?id=12811)

> 经过验证发现单独引入<a target="blank" href="@microsoft/fetch-event-source">`@microsoft/fetch-event-source`</a> 会抛出异常,
从<a target="blank" href="https://ext.dcloud.net.cn/plugin?id=12811" style="color: #4d8dfa">ChatGPT-SSE流式响应</a>
分析应该是需要结合<a target=_blank style="color: #4d8dfa" href="https://zh.uniapp.dcloud.io/tutorial/renderjs.html">renderjs</a>进行使用。
