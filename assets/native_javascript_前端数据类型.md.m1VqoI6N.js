import{_ as e,o as t,c as l,R as o}from"./chunks/framework.AonOEUEq.js";const u=JSON.parse('{"title":"前端数据类型","description":"","frontmatter":{},"headers":[],"relativePath":"native/javascript/前端数据类型.md","filePath":"native/javascript/前端数据类型.md","lastUpdated":1709646188000}'),a={name:"native/javascript/前端数据类型.md"},s=o(`<h1 id="前端数据类型" tabindex="-1">前端数据类型 <a class="header-anchor" href="#前端数据类型" aria-label="Permalink to &quot;前端数据类型&quot;">​</a></h1><p><code>JavaScript</code> 是一种有着<strong>动态类型</strong>的<strong>动态语言</strong>。<code>JavaScript</code> 中的变量与任何特定值类型没有任何关联，任何变量都可以被赋予（和重新赋予）各种类型的值</p><p>JavaScript 也是一个弱类型语言，这意味着当操作涉及不匹配的类型时，它允许隐式类型转换，而不是抛出类型错误。</p><p>前端数据类型分为<code>基本数据类型</code>和<code>复杂数据类型</code></p><ul><li><p>除了 <code>Object</code> 以外，所有类型都定义了表示在语言最低层面的不可变值。我们将这些值称为原始值。</p></li><li><p>除了 <code>null</code> 和 <code>undefined</code>，所有原始类型都有它们相应的对象包装类型，这为处理原始值提供可用的方法。例如，<code>Number</code> 对象提供像 <code>toExponential()</code> 这样的方法。 当在原始值上访问属性时，<em>JavaScript</em> 会自动将值包装到相应的包装对象中，并访问对 象上的属性。然而，在 <code>null</code> 或 <code>undefined</code> 上访问属性时，会抛出 <code>TypeError</code> 异常，这需要采用可选链运算符。</p></li></ul><h2 id="基本数据类型" tabindex="-1">基本数据类型 <a class="header-anchor" href="#基本数据类型" aria-label="Permalink to &quot;基本数据类型&quot;">​</a></h2><table><thead><tr><th style="text-align:left;">类型</th><th style="text-align:left;">typeof返回值</th><th style="text-align:left;">对象包装器</th></tr></thead><tbody><tr><td style="text-align:left;">Null</td><td style="text-align:left;"><code>object</code></td><td style="text-align:left;">不适用</td></tr><tr><td style="text-align:left;">Undefined</td><td style="text-align:left;"><code>undefined</code></td><td style="text-align:left;">不适用</td></tr><tr><td style="text-align:left;">Boolean</td><td style="text-align:left;"><code>boolean</code></td><td style="text-align:left;">Boolean</td></tr><tr><td style="text-align:left;">Number</td><td style="text-align:left;"><code>number</code></td><td style="text-align:left;">Number</td></tr><tr><td style="text-align:left;">String</td><td style="text-align:left;"><code>string</code></td><td style="text-align:left;">String</td></tr><tr><td style="text-align:left;">Symbol</td><td style="text-align:left;"><code>Symbol</code></td><td style="text-align:left;">Symbol</td></tr><tr><td style="text-align:left;">BigInt[1]</td><td style="text-align:left;"><code>bigint</code></td><td style="text-align:left;">BigInt</td></tr></tbody></table><ul><li><strong>BigInt类型</strong></li></ul><p><code>BigInt</code>类型在 Javascript 中是一个数字的原始值，它可以表示任意大小的整数。使用 <code>BigInt</code>，你可以安全地存储和操作巨大的整数，甚至超过 <code>Number</code> 的安全整数限制</p><ul><li><strong>Symbol类型</strong></li></ul><p><code>Symbol</code> 是唯一并且不可变的原始值并且可以用来作为对象属性的键（如下）。在某些程序语言当中，<code>Symbol</code> 也被称作“原子（atom）类型”。<code>symbol</code> 的目的是去创建一个唯一属性键，保证不会与其他代码中的键产生冲突。</p><h2 id="复杂数据类型" tabindex="-1">复杂数据类型 <a class="header-anchor" href="#复杂数据类型" aria-label="Permalink to &quot;复杂数据类型&quot;">​</a></h2><h3 id="object" tabindex="-1">Object <a class="header-anchor" href="#object" aria-label="Permalink to &quot;Object&quot;">​</a></h3><p>在计算机科学中，对象（object）是指内存中的可以被标识符引用的一块区域。在 JavaScript 中，对象是唯一可变的值。事实上，<strong>函数</strong>也是具有额外可调用能力的对象。</p><p><strong>属性</strong> 在 JavaScript 中，对象可以被看作是一组属性的集合。用对象字面量语法来定义一个对象时，会自动初始化一组有限的属性；然后，这些属性还可以被添加和移除。对象属性等价于键值对。属性键要么是字符串类型，要么是 symbol。属性值可以是任何类型的值，包括其他对象，从而可以构建复杂的数据结构。</p><p>有两种对象属性的类型：数据属性和访问器属性。每个属性都有对应的特性（attribute）。JavaScript 引擎可在内部访问每个属性，但是你可以通过 <code>Object.defineProperty()</code> 设置它们，或通过<code>Object.getOwnPropertyDescriptor()</code> 读取它们。</p><ul><li><p>数据属性 数据属性将键与值相关联。它可以通过以下属性来描述</p><ul><li><code>value</code> 通过属性访问其获取值， 可以是任意的 Javascript的值</li><li><code>writable</code> 一个布尔值， 表示是否可以通过赋值来改变属性</li><li><code>enumerable</code> 一个布尔值，表示是否可以通过 <code>for...in</code> 循环来枚举属性</li><li><code>configurable</code> 一个布尔值，表示该属性是否可以删除，是否可以更改为访问器属性，并可以更改其特性</li></ul></li><li><p>访问器属性 将键与两个访问器函数（get 和 set）相关联，以获取或者存储值。</p><ul><li><code>get</code> 该函数使用一个空的参数列表，以便有权对值执行访问时，获取属性值</li><li><code>set</code> 使用包含分配值的参数调用的函数。每当尝试更改指定属性时执行</li><li><code>enumerable</code> 一个布尔值，表示是否可以通过 <code>for...in</code> 循环来枚举属性</li><li><code>configurable</code> 一个布尔值，表示该属性是否可以删除，是否可以更改为访问器属性，并可以更改其特性</li></ul></li></ul><h2 id="判断数据类型的方式" tabindex="-1">判断数据类型的方式 <a class="header-anchor" href="#判断数据类型的方式" aria-label="Permalink to &quot;判断数据类型的方式&quot;">​</a></h2><ul><li><code>typeof</code> 操作符 <code>typeof</code>运算符返回一个字符串，表示操作数的类型 <ul><li>除了 <code>null</code>，所有原始类型都可以使用<code>typeof</code> 运算符进行测试。<code>typeof null</code> 返回 <code>&quot;object&quot;</code>，因此必须使用 <code>=== null</code> 来测试 <code>null</code>。</li></ul></li><li><code>instanceof</code>操作符 用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。</li></ul><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#82AAFF;"> Car</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">make</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;font-style:italic;"> model</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;font-style:italic;"> year</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#89DDFF;">  this.</span><span style="color:#BABED8;">make</span><span style="color:#89DDFF;"> =</span><span style="color:#BABED8;"> make</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">  this.</span><span style="color:#BABED8;">model</span><span style="color:#89DDFF;"> =</span><span style="color:#BABED8;"> model</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">  this.</span><span style="color:#BABED8;">year</span><span style="color:#89DDFF;"> =</span><span style="color:#BABED8;"> year</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#BABED8;"> auto </span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;"> new</span><span style="color:#82AAFF;"> Car</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Honda</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#89DDFF;"> &#39;</span><span style="color:#C3E88D;">Accord</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;"> 1998</span><span style="color:#BABED8;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(auto </span><span style="color:#89DDFF;">instanceof</span><span style="color:#FFCB6B;"> Car</span><span style="color:#BABED8;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// Expected output: true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(auto </span><span style="color:#89DDFF;">instanceof</span><span style="color:#FFCB6B;"> Object</span><span style="color:#BABED8;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// Expected output: true</span></span></code></pre></div><ul><li><p><code>Object.prototype.toString.call()</code> 该方法可以返回一个<code>[object &lt;具体类型&gt;]</code>的格式 例如 <code>Object.prototype.toString.call(&#39;aaa&#39;)</code>就会返回<code>[object String]</code></p></li><li><p><code>Array.isArray()</code> 该方法会返回一个布尔值表示该值是否为数组</p></li></ul>`,21),n=[s];function c(p,d,r,i,y,D){return t(),l("div",null,n)}const g=e(a,[["render",c]]);export{u as __pageData,g as default};
