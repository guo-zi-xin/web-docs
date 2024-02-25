import{_ as o}from"./chunks/CustomLink.YXjObPrq.js";import{_ as t,o as e,c,k as l,a as s,I as p,R as a}from"./chunks/framework.AonOEUEq.js";const r="/web-docs/assets/0411_ngclass.adJkikPw.png",F="/web-docs/assets/0412_ngclass.lWUoN_Kk.png",D="/web-docs/assets/0413_ngclass.MJMeyGen.png",y="/web-docs/assets/0414_ngclass._JtqpLd-.png",i="/web-docs/assets/0415_ngclass.KWv77dLa.png",g="/web-docs/assets/0416_ngclass.MTSEMCgd.png",u="/web-docs/assets/0417.lsJE9Ji6.png",S=JSON.parse('{"title":"样式选择器 ng-class/ng-style","description":"","frontmatter":{},"headers":[],"relativePath":"frame/angular/chapter04_8.md","filePath":"frame/angular/chapter04_8.md","lastUpdated":1704710069000}'),d={name:"frame/angular/chapter04_8.md"},C=a(`<h1 id="样式选择器-ng-class-ng-style" tabindex="-1">样式选择器 <code>ng-class</code>/<code>ng-style</code> <a class="header-anchor" href="#样式选择器-ng-class-ng-style" aria-label="Permalink to &quot;样式选择器 \`ng-class\`/\`ng-style\`&quot;">​</a></h1><h2 id="ng-class" tabindex="-1"><code>ng-class</code> <a class="header-anchor" href="#ng-class" aria-label="Permalink to &quot;\`ng-class\`&quot;">​</a></h2><p>通过<code>ng-class</code>，我们可以对界面元素的css样式进行控制。下面，让我们通过示例来看看功能如何实现：</p><blockquote><p>此示例来源于官网的<a href="./">ngClass介绍界面</a>,我进行了一些加工。</p></blockquote><p>首先，我们先创建一个<code>style.css</code>文件。</p><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#676E95;font-style:italic;">/* 删除线 */</span></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">strike</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#B2CCD6;">    text-decoration</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> line-through</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/* 粗体 */</span></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">bold</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#B2CCD6;">    font-weight</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> bold</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/* 红色 */</span></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">red</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#B2CCD6;">    color</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> red</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/* 错误 */</span></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">has-error</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#B2CCD6;">    color</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> red</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#B2CCD6;">    background-color</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> yellow</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/* 橙色 */</span></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">orange</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#B2CCD6;">    color</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> orange</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>修改<code>FirstCtrl</code>为如下代码：</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#676E95;font-style:italic;">//app.js</span></span>
<span class="line"><span style="color:#BABED8;">App</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">controller</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">FirstCtrl</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#C792EA;"> function</span><span style="color:#89DDFF;"> (</span><span style="color:#BABED8;font-style:italic;">$scope</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#BABED8;">    $scope</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">data</span><span style="color:#89DDFF;"> =</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#F07178;">        deleted</span><span style="color:#89DDFF;">:</span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">        important</span><span style="color:#89DDFF;">:</span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">        error</span><span style="color:#89DDFF;">:</span><span style="color:#FF9CAC;">false</span></span>
<span class="line"><span style="color:#89DDFF;">    };</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#BABED8;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>并在<code>index.html</code>的<code>&lt;head&gt;</code>部分将css文件引入，并加入对应的代码。全部代码如下：</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#89DDFF;">&lt;!</span><span style="color:#F07178;">DOCTYPE</span><span style="color:#C792EA;"> html</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">html</span><span style="color:#C792EA;"> lang</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">zh</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;"> ng-app</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">App</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">head</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">    &lt;</span><span style="color:#F07178;">meta</span><span style="color:#C792EA;"> charset</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">UTF-8</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">    &lt;</span><span style="color:#F07178;">title</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;">{{&quot;学习AngularJS 1.x&quot;}}</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">title</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    &lt;!-- 此处引入style.css样式文件--&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">    &lt;</span><span style="color:#F07178;">link</span><span style="color:#C792EA;"> type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">text/css</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;"> rel</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">stylesheet</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;"> href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">css/style.css</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">head</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">body</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#C792EA;"> ng-controller</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">FirstCtrl</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    &lt;!-- 此处放置了ng-class，并设定了每个样式激活时的条件（对应下方3个复选框）--&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">    &lt;</span><span style="color:#F07178;">p</span><span style="color:#C792EA;"> ng-class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">{strike: data.deleted, bold: data.important, &#39;has-error&#39;: data.error}</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;">示例文字</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">p</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">    &lt;</span><span style="color:#F07178;">input</span><span style="color:#C792EA;"> type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">checkbox</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;"> ng-model</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">data.deleted</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#BABED8;">        选中后上方文字将加上删除线（style中加上strike类） </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">br</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">    &lt;</span><span style="color:#F07178;">input</span><span style="color:#C792EA;"> type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">checkbox</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;"> ng-model</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">data.important</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#BABED8;">        选中后上方文字将变化为粗体（style中加上bold类） </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">br</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">    &lt;</span><span style="color:#F07178;">input</span><span style="color:#C792EA;"> type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">checkbox</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;"> ng-model</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">data.error</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#BABED8;">        选中后上方文字将变红，背景变黄（style中加上has-error类）</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#C792EA;"> type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">text/javascript</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;"> src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">components/angular/angular.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#C792EA;"> type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">text/javascript</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;"> src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">js/app.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">body</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">html</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>运行效果：</p><p>未选中时效果</p><img src="`+r+'" alt="图4-11 ngClass运行效果"><p>选中第一个的效果</p><img src="'+F+'" alt="图4-12 ngClass运行效果"><p>选中第二个的效果</p><img src="'+D+'" alt="图4-13 ngClass运行效果"><p>选中第三个的效果</p><img src="'+y+'" alt="图4-14 ngClass运行效果"><p>全部选中的效果</p><img src="'+i+`" alt="图4-15 ngClass运行效果"><h3 id="动态化的样式输入" tabindex="-1">动态化的样式输入 <a class="header-anchor" href="#动态化的样式输入" aria-label="Permalink to &quot;动态化的样式输入&quot;">​</a></h3><p>在上方的示例中，我们是针对提前设定好的样式进行是否生效的判断。除了这种使用方式，ng-class还支持直接传入字符串的方式进行样式调整。</p><p>比如如下示例：</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#BABED8;">App</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">controller</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">FirstCtrl</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#C792EA;"> function</span><span style="color:#89DDFF;"> (</span><span style="color:#BABED8;font-style:italic;">$scope</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#BABED8;">    $scope</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">data</span><span style="color:#89DDFF;"> =</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#F07178;">        style</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;"> &quot;&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">    };</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#BABED8;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#C792EA;"> ng-controller</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">FirstCtrl</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">    &lt;</span><span style="color:#F07178;">p</span><span style="color:#C792EA;"> ng-class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">data.style</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;">直接使用字符串作为样式</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">p</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">    &lt;</span><span style="color:#F07178;">input</span><span style="color:#C792EA;"> type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">text</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;"> ng-model</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">data.style</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>运行效果</p><img src="`+g+`" alt="图4-16 ngClass运行效果（使用文本作为样式）"><h3 id="结合两种模式的应用示例" tabindex="-1">结合两种模式的应用示例 <a class="header-anchor" href="#结合两种模式的应用示例" aria-label="Permalink to &quot;结合两种模式的应用示例&quot;">​</a></h3><p>这两种模式也可以结合使用，示例如下：</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">p</span><span style="color:#C792EA;"> ng-class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">[data.style, {orange: warning}]</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;">同时应用两种样式</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">p</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>此示例可举一反三，比如加入多个文本输入（对应多个来源），以及多个设定好的样式开关。</p><blockquote><p>此示例就不进行具体的运行效果展示了，请读者自行测试效果。</p></blockquote><h3 id="css动画效果应用" tabindex="-1">CSS动画效果应用 <a class="header-anchor" href="#css动画效果应用" aria-label="Permalink to &quot;CSS动画效果应用&quot;">​</a></h3><p>我们先在_style.css_中加入css的动画效果代码：</p><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">base-class</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#B2CCD6;">    transition</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;">all </span><span style="color:#82AAFF;">cubic-bezier</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">0.250</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;"> 0.460</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;"> 0.450</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;"> 0.940</span><span style="color:#89DDFF;">)</span><span style="color:#F78C6C;"> 0.5s</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">base-class</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">animate</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#B2CCD6;">    color</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> red</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#B2CCD6;">    font-size</span><span style="color:#89DDFF;">:</span><span style="color:#F78C6C;">3em</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>修改HTML代码如下：</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#C792EA;"> ng-controller</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">FirstCtrl</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">    &lt;</span><span style="color:#F07178;">input</span><span style="color:#C792EA;"> type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">button</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;"> value</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">开始动画</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;"> ng-click</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">data.style=&#39;animate&#39;</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">    &lt;</span><span style="color:#F07178;">br</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">    &lt;</span><span style="color:#F07178;">input</span><span style="color:#C792EA;"> type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">button</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;"> value</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">恢复原始</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;"> ng-click</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">data.style=&#39;&#39;</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">    &lt;</span><span style="color:#F07178;">br</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">    &lt;</span><span style="color:#F07178;">span</span><span style="color:#C792EA;"> class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">base-class</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;"> ng-class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">data.style</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;">示例文本</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">span</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>运行之后，点击上面的按钮，则文字放大变红。点击第二个按钮，则文本变回原来的样子。</p><p>由于动画效果无法通过截图表示，还请读者自行测试。</p><h2 id="ng-style" tabindex="-1"><code>ng-style</code> <a class="header-anchor" href="#ng-style" aria-label="Permalink to &quot;\`ng-style\`&quot;">​</a></h2><p><code>ng-style</code>提供的功能比<code>ng-class</code>要少一些，只支持样式的传入。我们可以使用以下两种模式：</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">span</span><span style="color:#C792EA;"> ng-style</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">{&#39;background-color&#39;:data.colorInput}</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;">示例文本</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">span</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#BABED8;">//colorInput为$scope中的对象，传入文本即可</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">span</span><span style="color:#C792EA;"> ng-style</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">data.styleText</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;">示例文本</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">span</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#BABED8;">//styleText为样式为 &#39;{&#39;color&#39;:red}&#39;类型的文本</span></span></code></pre></div><p>通过样式传入，我们可以直接向元素传入对应的样式，实现样式动态化的效果。</p>`,44),E=a(`<div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#BABED8;">data-ng-style=&quot;{&#39;background-image&#39;:&#39;url(img/products/{{product.img}})&#39;}&quot;</span></span></code></pre></div><p>也可以传入一个函数(主要用于解决IE11中背景图片不显示的问题)：</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#C792EA;"> ng-style</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">getBackgroundStyle(imagepath)</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#C792EA;"> type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">text/javascript</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    //代码放置在ng-controller中</span></span>
<span class="line"><span style="color:#BABED8;">    $scope</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getBackgroundStyle</span><span style="color:#89DDFF;"> =</span><span style="color:#C792EA;"> function</span><span style="color:#89DDFF;"> (</span><span style="color:#BABED8;font-style:italic;">imagepath</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">        return</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#89DDFF;">            &#39;</span><span style="color:#F07178;">background-image</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;"> &#39;</span><span style="color:#C3E88D;">url(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;"> +</span><span style="color:#BABED8;"> imagepath</span><span style="color:#89DDFF;"> +</span><span style="color:#89DDFF;"> &#39;</span><span style="color:#C3E88D;">)</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">        }</span></span>
<span class="line"><span style="color:#89DDFF;">    }</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div>`,3),h=a(`<div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">input</span><span style="color:#C792EA;"> type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">button</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;"> value</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">设置字体颜色为红色</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;"> ng-click</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">data.myStyle={color:&#39;red&#39;}</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">input</span><span style="color:#C792EA;"> type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">button</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;"> value</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">设置背景颜色</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;"> ng-click</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">data.myStyle={&#39;background-color&#39;:&#39;blue&#39;}</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">input</span><span style="color:#C792EA;"> type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">button</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;"> value</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">清除样式</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;"> ng-click</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">data.myStyle={}</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">br</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">span</span><span style="color:#C792EA;"> ng-style</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">data.myStyle</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;">示例文本</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">span</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">pre</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;">当前样式为{{data.myStyle}}</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">pre</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>运行效果为：</p><img src="`+u+'" alt="图4-17 ng-style运行效果"><p>在下一节中，我们还将看到约束为只设置背景颜色的示例。</p>',4);function q(A,m,B,_,b,v){const n=o;return e(),c("div",null,[C,l("p",null,[s("一个比较主要的用途是向元素传入动态的背景图片，例子如下（以下两个示例来自于"),p(n,{title:"StackOverflow",href:"http://stackoverflow.com/questions/17252546/angularjs-ng-style-background-image-isnt-working"}),s(")：")]),E,l("p",null,[s("下面，我们通过官网的"),p(n,{title:"示例",href:"https://docs.angularjs.org/api/ng/directive/ngStyle"}),s("来看看如何传入文本：")]),h])}const T=t(d,[["render",q]]);export{S as __pageData,T as default};
