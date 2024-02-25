import{_ as s,o,c as a,R as n}from"./chunks/framework.AonOEUEq.js";const B=JSON.parse('{"title":"Cookie (document.cookie)","description":"","frontmatter":{},"headers":[],"relativePath":"native/javascript/cookie参数.md","filePath":"native/javascript/cookie参数.md","lastUpdated":1700734386000}'),l={name:"native/javascript/cookie参数.md"},e=n(`<h1 id="cookie-document-cookie" tabindex="-1">Cookie (document.cookie) <a class="header-anchor" href="#cookie-document-cookie" aria-label="Permalink to &quot;Cookie (document.cookie)&quot;">​</a></h1><p><code>cookie</code>是直接存储在浏览器的一小串数据， 它们是<code>HTTP</code>协议的一部分，由 <a href="https://datatracker.ietf.org/doc/html/rfc6265" target="_blank" rel="noreferrer">RFC 6265</a> 规范定义。</p><p><code>Cookie</code> 通常是由Web服务器使用响应<code>Set-Cookie</code>HTTP-header设置的。然后浏览器使用<code>Cookie</code> HTTP-header 将它们自动添加到（几乎）每个对相同域的请求中。</p><p>最常见的用处就是用于身份验证：</p><ol><li><p>登录后 服务器在响应中使用 Set-Cookie HTTP-header 来设置具有唯一“会话标识符（session identifier）”的 cookie。</p></li><li><p>下次当请求北方送到同一个域时，浏览器会使用<code>Cookie</code>HTTP-header通过网络发送cookie。</p></li><li><p>所以服务器知道是谁发起了请求。</p></li></ol><p>我们还可以使用<code>document.cookie</code>属性从浏览器访问cookie。</p><h2 id="从document-cookie中读取" tabindex="-1">从document.cookie中读取 <a class="header-anchor" href="#从document-cookie中读取" aria-label="Permalink to &quot;从document.cookie中读取&quot;">​</a></h2><p>你的浏览器是否存储了本网站的任何cookie？ 让我们来看看：</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 在javascript.info 我们使用谷歌分析来统计，</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 所以应该存一些cookie</span></span>
<span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(document</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">cookie)</span></span></code></pre></div><blockquote><p><code>document.cookie</code>的值是由<code>name=value</code>组成，以<code>;</code>分隔， 每一个都是独立的cookie。</p></blockquote><p>为了找到一个特定的cookie， 我们可以以<code>;</code>分隔，将<code>document.cookie</code>分开， 然后找到对应名字， 我们可以使用正则表达式或者函数数组来实现。</p><ul><li>正则表达式</li></ul><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#82AAFF;"> parseCookies</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">cookieString</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#C792EA;">  const</span><span style="color:#BABED8;"> cookies</span><span style="color:#89DDFF;"> =</span><span style="color:#89DDFF;"> {};</span></span>
<span class="line"><span style="color:#C792EA;">  const</span><span style="color:#BABED8;"> cookieArray</span><span style="color:#89DDFF;"> =</span><span style="color:#BABED8;"> cookieString</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">split</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">;</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">  for</span><span style="color:#F07178;"> (</span><span style="color:#C792EA;">let</span><span style="color:#BABED8;"> i</span><span style="color:#89DDFF;"> =</span><span style="color:#F78C6C;"> 0</span><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> i</span><span style="color:#89DDFF;"> &lt;</span><span style="color:#BABED8;"> cookieArray</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">length</span><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> i</span><span style="color:#89DDFF;">++</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#C792EA;">    const</span><span style="color:#BABED8;"> cookieItem</span><span style="color:#89DDFF;"> =</span><span style="color:#BABED8;"> cookieArray</span><span style="color:#F07178;">[</span><span style="color:#BABED8;">i</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">    const</span><span style="color:#BABED8;"> match</span><span style="color:#89DDFF;"> =</span><span style="color:#BABED8;"> cookieItem</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">match</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">/</span><span style="color:#89DDFF;font-style:italic;">^</span><span style="color:#C3E88D;">\\s</span><span style="color:#89DDFF;">*([^</span><span style="color:#C3E88D;">=</span><span style="color:#89DDFF;">]+)</span><span style="color:#C3E88D;">=</span><span style="color:#89DDFF;">(</span><span style="color:#C3E88D;">.</span><span style="color:#89DDFF;">*)</span><span style="color:#89DDFF;font-style:italic;">$</span><span style="color:#89DDFF;">/</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">    if</span><span style="color:#F07178;"> (</span><span style="color:#BABED8;">match</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#C792EA;">      var</span><span style="color:#BABED8;"> key</span><span style="color:#89DDFF;"> =</span><span style="color:#BABED8;"> match</span><span style="color:#F07178;">[</span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">      var</span><span style="color:#BABED8;"> value</span><span style="color:#89DDFF;"> =</span><span style="color:#82AAFF;"> decodeURIComponent</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">match</span><span style="color:#F07178;">[</span><span style="color:#F78C6C;">2</span><span style="color:#F07178;">])</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#BABED8;">      cookies</span><span style="color:#F07178;">[</span><span style="color:#BABED8;">key</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> value</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">    }</span></span>
<span class="line"><span style="color:#89DDFF;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">  return</span><span style="color:#BABED8;"> cookies</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 示例用法</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#BABED8;"> cookieString </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> document</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">cookie</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#BABED8;"> parsedCookies </span><span style="color:#89DDFF;">=</span><span style="color:#82AAFF;"> parseCookies</span><span style="color:#BABED8;">(cookieString)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(parsedCookies)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><ul><li>函数数组</li></ul><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#82AAFF;"> parseCookies</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">cookieString</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#C792EA;">  const</span><span style="color:#BABED8;"> cookies</span><span style="color:#89DDFF;"> =</span><span style="color:#89DDFF;"> {};</span></span>
<span class="line"><span style="color:#C792EA;">  const</span><span style="color:#BABED8;"> cookieArray</span><span style="color:#89DDFF;"> =</span><span style="color:#BABED8;"> cookieString</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">split</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">;</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#BABED8;">  cookieArray</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">forEach</span><span style="color:#F07178;">(</span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">cookie</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#C792EA;">    const</span><span style="color:#BABED8;"> cookieTrimmed</span><span style="color:#89DDFF;"> =</span><span style="color:#BABED8;"> cookie</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">trim</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">    const</span><span style="color:#BABED8;"> cookieParts</span><span style="color:#89DDFF;"> =</span><span style="color:#BABED8;"> cookieTrimmed</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">split</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">=</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">    const</span><span style="color:#BABED8;"> key</span><span style="color:#89DDFF;"> =</span><span style="color:#82AAFF;"> decodeURIComponent</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">cookieParts</span><span style="color:#F07178;">[</span><span style="color:#F78C6C;">0</span><span style="color:#F07178;">])</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">    const</span><span style="color:#BABED8;"> value</span><span style="color:#89DDFF;"> =</span><span style="color:#82AAFF;"> decodeURIComponent</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">cookieParts</span><span style="color:#F07178;">[</span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">])</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#BABED8;">    cookies</span><span style="color:#F07178;">[</span><span style="color:#BABED8;">key</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> value</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">  }</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">  return</span><span style="color:#BABED8;"> cookies</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 示例用法</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#BABED8;"> cookieString </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> document</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">cookie</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#BABED8;"> parsedCookies </span><span style="color:#89DDFF;">=</span><span style="color:#82AAFF;"> parseCookies</span><span style="color:#BABED8;">(cookieString)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(parsedCookies)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><h2 id="写入document-cookie" tabindex="-1">写入document.cookie <a class="header-anchor" href="#写入document-cookie" aria-label="Permalink to &quot;写入document.cookie&quot;">​</a></h2><p>我们可以写入<code>document.cookie</code>。但这不是一个数据属性， 他是一个<a href="https://zh.javascript.info/property-accessors" target="_blank" rel="noreferrer">访问器</a>。对其的赋值操作会被特殊处理。</p><p><strong>对于<code>document.cookie</code>的写入操作只会更新其中提到的cookie，而不会涉及其他cookie。</strong></p><p>例如： 此调用设置了一个名为<code>user</code>并且值为<code>John</code>的cookie</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#BABED8;">document</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">cookie </span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;"> &quot;</span><span style="color:#C3E88D;">user=John</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span><span style="color:#676E95;font-style:italic;"> // 只会更新名称为 user 的 cookie</span></span>
<span class="line"><span style="color:#82AAFF;">alert</span><span style="color:#BABED8;">(document</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">cookie)</span><span style="color:#89DDFF;">;</span><span style="color:#676E95;font-style:italic;"> // 展示所有 cookie</span></span></code></pre></div><p>如果你运行了上面这段代码， 你会看到多个cookie。这是因为<code>document.cookie</code>操作不是重写整个所有的cookie， 他只设置代码中提到的cookie <code>user</code>。</p><p>从技术上讲，cookie的名称和值可以是任意字符。 为了保持有效的格式， 他们应该使用内建的<code>encodeURIComponent</code>函数对其进行转义：</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 特殊字符（空格）， 需要编码</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#BABED8;"> name </span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;"> &#39;</span><span style="color:#C3E88D;">my name</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#BABED8;"> value </span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;"> &#39;</span><span style="color:#C3E88D;">John Smith</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 将cookie编码为 my%20name=John%20Smith</span></span>
<span class="line"><span style="color:#BABED8;">document</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">cookie </span><span style="color:#89DDFF;">=</span><span style="color:#82AAFF;"> encodeURIComponent</span><span style="color:#BABED8;">(name) </span><span style="color:#89DDFF;">+</span><span style="color:#89DDFF;"> &#39;</span><span style="color:#C3E88D;">=</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;"> +</span><span style="color:#82AAFF;"> encodeURIComponent</span><span style="color:#BABED8;">(value)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(document</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">cookie)</span><span style="color:#89DDFF;">;</span><span style="color:#676E95;font-style:italic;"> // ...; my%20name=John%20Smith</span></span></code></pre></div><ul><li>限制</li></ul><blockquote><ul><li>encodeURIComponent 编码后的 name=value 对，大小不能超过 4KB。因此，我们不能在一个 cookie 中保存大的东西。</li><li>每个域的 cookie 总数不得超过 20+ 左右，具体限制取决于浏览器。</li></ul></blockquote><p>Cookie有几个选项，其中很多都很重要，应该设置它 选项在被列在key=value之后，以<code>；</code>分隔，像这样</p><blockquote><p><code>html document.cookie = &quot;user=John; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT&quot;</code></p></blockquote><h3 id="path" tabindex="-1">path <a class="header-anchor" href="#path" aria-label="Permalink to &quot;path&quot;">​</a></h3><ul><li><code>path=/mypath</code></li></ul><p>url路径前缀必须是绝对路径。他使得该路径下的页面可以访问该cookie。默认为当前路径。 如果一个cookie带有<code>path=/mypath</code>设置， 那么该cookie在<code>admin</code>和<code>/admin/something</code>下都是可见的， 但是在<code>/home</code>或<code>/adminpage</code>下不可见。 通常， 我们应该将<code>path</code>设置为根目录： <code>path=/</code>, 以使cookie对此网站所有页面可见。</p><h3 id="domain" tabindex="-1">domain <a class="header-anchor" href="#domain" aria-label="Permalink to &quot;domain&quot;">​</a></h3><ul><li><code>domain=site.com</code> domain控制了可访问cookie的域。但是在实际中，有一些限制。 我们无法设置任何域。 <strong>无法从另一个二级域访问cookie，因此<code>other.com</code>永远不会收到在<code>site.com</code>设置的cookie</strong> 这是一项安全限制，为了允许我们将敏感数据存储在应该仅在一个站点上可用的cookie中。 默认情况下，cookie只有在设置的域下才能被访问到。 请注意， 在默认情况下，cookie也不会共享给子域， 例如<code>forum.site.com</code>。</li></ul><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 如果我们在site.com网站上设置了cookie...</span></span>
<span class="line"><span style="color:#BABED8;">document</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">cookie </span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;"> &#39;</span><span style="color:#C3E88D;">user=Jhon</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//....在forum.site.com 域名下， 我们无法访问它</span></span>
<span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(document</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">cookie) </span><span style="color:#676E95;font-style:italic;">// 没有user</span></span></code></pre></div><p>但这是可以设置的，如果我们想允许像<code>forum.site.com</code>这样的子域在<code>site.com</code>上设置cookie， 也是可以实现的。 为此， 当在<code>site.com</code>设置cookie时，我们应该明确地将<code>domain</code>选项设置为根域：<code>domain=site.com</code>，那么， 所有子域都可以访问到这样的cookie。 例如：</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 在site.com</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 使cookie可以被在任何子域 *.site.com 访问</span></span>
<span class="line"><span style="color:#BABED8;">document</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">cookie</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;"> &#39;</span><span style="color:#C3E88D;">user=John;domain=site.com</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 之后 在forum.site.com </span></span>
<span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(document</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">cookie) </span><span style="color:#676E95;font-style:italic;">// 有cookie user=John</span></span></code></pre></div><p>出于历史原因， <code>domain=.site.com</code>（<code>site.com</code>前面有一个点符号）也以相同的方式工作， 允许从子域访问cookie。 这是一种旧的表示方式， 如果我们需要支持非常旧的浏览器， 那么应该使用它。</p><p><strong>总结一下， 通过domain选项的设置，可以实现允许在子域访问cookie。</strong></p><h3 id="expires-max-age" tabindex="-1">expires max-age <a class="header-anchor" href="#expires-max-age" aria-label="Permalink to &quot;expires  max-age&quot;">​</a></h3><p>默认情况下， 如果一个cookie没有设置这两个参数中的任何一个， 那么在关闭浏览器后，他就会消失。此类cookie被称为“session cookie”。</p><p>为了让cookie在关闭浏览器后仍然存在， 我们可以设置<code>expires</code>或 <code>max-age</code>选项中的一个。</p><ul><li><code>expires=Tue, 19 Jan 2038 03:14:07 GMT</code> cooke的国旗时间定义了浏览器会自动清除该cookie的时间。 日期必须完全采用GMT时区的这种格式。我们可以使用<code>date.toUTCString</code>来获取它。 例如我们可以将cookie设置为一天后过期。</li></ul><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 当前时间+1天</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#BABED8;"> date </span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;"> new</span><span style="color:#82AAFF;"> Date</span><span style="color:#BABED8;">(Date</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">now</span><span style="color:#BABED8;">()</span><span style="color:#89DDFF;">+</span><span style="color:#F78C6C;"> 86400e3</span><span style="color:#BABED8;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#BABED8;">date </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> date</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toUTCString</span><span style="color:#BABED8;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#BABED8;">document</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">cookie</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">user=John;expries</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">+</span><span style="color:#BABED8;"> date</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>如果我们将<code>expries</code>设置为过去的时间，则cookie将会被删除。</p><ul><li><code>max-age=3600</code> 它是<code>expries</code>的替代选项，指明了cookie的过期时间距离当前时间的秒数。 如果将其设置为0或者负数， 则cookie会被删除：</li></ul><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#676E95;font-style:italic;">// cookie 会在一小时后失效</span></span>
<span class="line"><span style="color:#BABED8;">document</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">cookie</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">user=John;max-age=3600</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 删除cookie（让他立即过期）</span></span>
<span class="line"><span style="color:#BABED8;">document</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">cookie </span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;"> &#39;</span><span style="color:#C3E88D;">user=John;max-age=0</span><span style="color:#89DDFF;">&#39;</span></span></code></pre></div><h3 id="secure" tabindex="-1">secure <a class="header-anchor" href="#secure" aria-label="Permalink to &quot;secure&quot;">​</a></h3><ul><li><code>secure</code> cookiey应该只能被通过https传输。</li></ul>`,47),p=[e];function c(t,r,i,y,D,F){return o(),a("div",null,p)}const A=s(l,[["render",c]]);export{B as __pageData,A as default};
