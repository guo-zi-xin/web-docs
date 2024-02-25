import{_ as a,o as s,c as n,R as l}from"./chunks/framework.AonOEUEq.js";const _=JSON.parse('{"title":"基本表达式","description":"","frontmatter":{},"headers":[],"relativePath":"frame/angular/chapter04_1.md","filePath":"frame/angular/chapter04_1.md","lastUpdated":1704710069000}'),p={name:"frame/angular/chapter04_1.md"},e=l(`<h1 id="基本表达式" tabindex="-1">基本表达式 <a class="header-anchor" href="#基本表达式" aria-label="Permalink to &quot;基本表达式&quot;">​</a></h1><p>在第三章的结尾，我们制作了一个基本的Hello World应用。在其中，我们使用了如下的语法：</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;{{</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">Hello World!</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">}}&lt;/</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//上方的{{ 和 }} 既是AngularJS的基本表达式</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//如果AngularJS被成功的引入，那么最终的页面将不会显示双括号，而是直接显示Hello World.</span></span></code></pre></div><p>我们可以尝试下将表达式中的内容替换为如下内容，并观察运行的结果：</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#89DDFF;">{{</span><span style="color:#F78C6C;"> 1</span><span style="color:#89DDFF;">+</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;"> }}</span><span style="color:#676E95;font-style:italic;"> //网页会显示2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">{{</span><span style="color:#89DDFF;"> &#39;</span><span style="color:#C3E88D;">a</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;"> +</span><span style="color:#89DDFF;"> &#39;</span><span style="color:#C3E88D;">bc</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;"> }}</span><span style="color:#676E95;font-style:italic;"> //网页会显示abc</span></span></code></pre></div><p>从上我们可以看出，双括号<code>{ {</code>和<code>} }</code>内的内容，其实是一个JavaScript表达式，并将表达式进行计算的结果显示在此处。这也是AngularJS最吸引人的特性，因为它还支持将JavaScript中的数据显示在此处（我们将在后面的内容中介绍如何操作）。</p><p>并且，如果此处输出的是JavaScript中的变量，此处的显示会<strong>自动</strong>的随JavaScript变量的变化而变化。</p>`,7),t=[e];function o(c,r,i,d,F,D){return s(),n("div",null,t)}const h=a(p,[["render",o]]);export{_ as __pageData,h as default};
