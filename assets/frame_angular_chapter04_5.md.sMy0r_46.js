import{_ as s,o as a,c as n,R as o}from"./chunks/framework.AonOEUEq.js";const l="/web-docs/assets/0405_ng-if_true.KNmKYzBO.png",p="/web-docs/assets/0406_ng-if_false.9y8wX9XH.png",f=JSON.parse('{"title":"条件判断 ng-if / ng-show / ng-hide","description":"","frontmatter":{},"headers":[],"relativePath":"frame/angular/chapter04_5.md","filePath":"frame/angular/chapter04_5.md","lastUpdated":1704710069000}'),e={name:"frame/angular/chapter04_5.md"},t=o(`<h1 id="条件判断-ng-if-ng-show-ng-hide" tabindex="-1">条件判断 <code>ng-if</code> / <code>ng-show</code> / <code>ng-hide</code> <a class="header-anchor" href="#条件判断-ng-if-ng-show-ng-hide" aria-label="Permalink to &quot;条件判断 \`ng-if\` / \`ng-show\` / \`ng-hide\`&quot;">​</a></h1><p>本节我们将学习的是如何通过变量来控制HTML是否显示。</p><p>这三个语句具体的用法如下：</p><p>在<code>$scope.data</code>中添加<code>flag</code>变量，设置默认值为<code>true</code></p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#676E95;font-style:italic;">//app.js</span></span>
<span class="line"><span style="color:#BABED8;">$scope</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">data </span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#F07178;">    message</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;"> &quot;</span><span style="color:#C3E88D;">Hello</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    flag</span><span style="color:#89DDFF;">:</span><span style="color:#FF9CAC;"> true</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span></code></pre></div><p>将以下代码放置在FirstCtrl中</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">input</span><span style="color:#C792EA;"> type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">checkbox</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;"> ng-model</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">data.flag</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">/&gt;</span><span style="color:#BABED8;">通过复选框来控制文字是否显示</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">&lt;!-- 如果data.flag == true,则显示此段文字--&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#C792EA;"> ng-if</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">data.flag</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">    &lt;</span><span style="color:#F07178;">p</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;">ng-if中的文字</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">p</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">&lt;!-- 如果data.flag == true,则显示此段文字--&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#C792EA;"> ng-show</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">data.flag</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">    &lt;</span><span style="color:#F07178;">p</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;">ng-show中的文字</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">p</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">&lt;!-- 如果data.flag == false,则显示此段文字--&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#C792EA;"> ng-hide</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">data.flag</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">    &lt;</span><span style="color:#F07178;">p</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;">ng-hide中的文字</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">p</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>运行结果</p><img src="`+l+'" alt="图4-5 ng-if为真时界面"><img src="'+p+'" alt="图4-6 ng-if为假时界面"><p>从上面的例子可以看出，如果复选框打勾，则界面只显示了前两行文字；而取消复选框的打勾，则显示了最后的一行文字。这个特性可以用于展示界面上的某些信息或者按钮。</p><h2 id="ng-if与ng-show-ng-hide的区别" tabindex="-1"><code>ng-if</code>与<code>ng-show</code>/<code>ng-hide</code>的区别 <a class="header-anchor" href="#ng-if与ng-show-ng-hide的区别" aria-label="Permalink to &quot;`ng-if`与`ng-show`/`ng-hide`的区别&quot;">​</a></h2><p>虽然效果看起来类似，但<code>ng-if</code>的工作模式与<code>ng-show</code>/<code>ng-hide</code>不一样。</p><p>如果使用<code>ng-if</code>来控制元素是否显示，则在不显示的情况下，<code>ng-if</code>中包含的内容，会被全部从HTML中移除掉。</p><p>而如果使用<code>ng-show</code>/<code>ng-hide</code>，AngularJS只是使用CSS控制将内容隐藏起来。</p><p>这两者可以应用于不同的场景，如果内容较多，且之后不会使用到，那么可以使用<code>ng-if</code>；如果之后还可能会显示出来，那么可以使用<code>ng-show</code>/<code>ng-hide</code>。</p><h2 id="冒号中的表达式" tabindex="-1">冒号中的表达式 <a class="header-anchor" href="#冒号中的表达式" aria-label="Permalink to &quot;冒号中的表达式&quot;">​</a></h2><p>例子中使用了<code>data.flag</code>直接作为判断依据，但是以上三个标签都支持传入表达式。</p><p>比如以下的表达式都可以作为冒号中的表达方式：</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#BABED8;">data</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">flag </span><span style="color:#89DDFF;">&gt;=</span><span style="color:#F78C6C;"> 1</span></span>\n<span class="line"><span style="color:#BABED8;">data</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">flag </span><span style="color:#89DDFF;">==</span><span style="color:#FF9CAC;"> true</span></span></code></pre></div><p>但是请<strong>注意</strong>，在<code>ng-model</code>,<code>ng-if</code>等标签中传入参数时，是不需要双括号<code>{ {</code>与<code>} }</code>将参数包裹起来的。</p>',21),c=[t];function r(F,i,d,D,y,g){return a(),n("div",null,c)}const u=s(e,[["render",r]]);export{f as __pageData,u as default};
