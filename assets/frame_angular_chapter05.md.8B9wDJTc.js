import{_ as a,o as e,c as s,R as t}from"./chunks/framework.AonOEUEq.js";const y=JSON.parse('{"title":"深入学习AngularJS - Directive","description":"","frontmatter":{},"headers":[],"relativePath":"frame/angular/chapter05.md","filePath":"frame/angular/chapter05.md","lastUpdated":1704710069000}'),l={name:"frame/angular/chapter05.md"},n=t(`<h1 id="深入学习angularjs-directive" tabindex="-1">深入学习AngularJS - Directive <a class="header-anchor" href="#深入学习angularjs-directive" aria-label="Permalink to &quot;深入学习AngularJS - Directive&quot;">​</a></h1><p>在前一章中，我们学习了AngularJS的基本用法。从本章开始，我们将学习&quot;深入&quot;一些的部分。</p><p>本章将介绍AngularJS的Directive。</p><blockquote><p>有若干AngularJS的中文译文将Directive翻译为&quot;指令&quot;，但是我感觉此翻译很难让读者明确其具体的含义和用法，因此，我在本书中直接应用了英文名。</p></blockquote><p>AngularJS的Directive，从实际用途的理解，可以称之为&quot;自定义HTML标签&quot;。举个例子，AngularJS可以让我们进行如下的HTML编码：</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#676E95;font-style:italic;">&lt;!-- 直接作为标签名 --&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">people</span><span style="color:#89DDFF;">&gt;</span><span style="color:#89DDFF;">    &lt;/</span><span style="color:#F07178;">people</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">&lt;!-- 直接作为标签属性 --&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#C792EA;"> people</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Harry</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#89DDFF;"> &lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">&lt;!-- 作为类属性 --&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#C792EA;"> class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">people:Harry</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#89DDFF;"> &lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><blockquote><p>还有一种比较特殊的放置在注释中生效的表达方式，但是我目前没有理解其实现意义，就不在这里介绍了。</p></blockquote><p>如果我们预先定义好了针对这些标签的处理方式，那么AngularJS将可以把这些标签自动的转化成HTML显示代码。</p><h2 id="directive在系统中的使用" tabindex="-1">Directive在系统中的使用 <a class="header-anchor" href="#directive在系统中的使用" aria-label="Permalink to &quot;Directive在系统中的使用&quot;">​</a></h2><p>其实，Directive作为AngularJS的基本特性，我们已经在前面大量的学习和使用了它。</p><p>在第四章中我们学习的<code>ng-app</code>, <code>ng-controller</code>, <code>ng-model</code>, ng-if等使用方法。如果您现在再仔细看下它们的使用方法，就会发现它们无一例外的都是Directive！</p><h2 id="学习directive的路程" tabindex="-1">学习Directive的路程 <a class="header-anchor" href="#学习directive的路程" aria-label="Permalink to &quot;学习Directive的路程&quot;">​</a></h2><p>本章我们将从最基本的自定义Directive开始，逐渐深入的学习Directive的特性和高级使用方法。由于Directive的特性主要针对展示界面的操作，目的是对界面操作的抽象与解耦。因此，可能像我一样对前端经验不太足的读者们，可能会对Directive的学习或者使用价值感到困难。因此，学习Directive可能会多花您一些时间，但是相信我，这些付出是非常有价值的！</p>`,13),o=[n];function p(r,c,i,D,d,u){return e(),s("div",null,o)}const g=a(l,[["render",p]]);export{y as __pageData,g as default};