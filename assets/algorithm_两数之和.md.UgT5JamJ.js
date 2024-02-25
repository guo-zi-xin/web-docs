import{_ as s,o as n,c as a,R as l}from"./chunks/framework.AonOEUEq.js";const A=JSON.parse('{"title":"两数之和","description":"","frontmatter":{},"headers":[],"relativePath":"algorithm/两数之和.md","filePath":"algorithm/两数之和.md","lastUpdated":1698662919000}'),p={name:"algorithm/两数之和.md"},o=l(`<h1 id="两数之和" tabindex="-1">两数之和 <a class="header-anchor" href="#两数之和" aria-label="Permalink to &quot;两数之和&quot;">​</a></h1><hr><p><strong>给定一个整数数组<code>nums</code>和一个目标值 <code>target</code> ，请你在该数组中找出和为目标值的那 <code>两个</code> 整数，并返回他们的数组下标。</strong></p><blockquote><p>你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。</p></blockquote><ul><li>示例</li></ul><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 给定 </span></span>
<span class="line"><span style="color:#BABED8;">nums </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> [</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;"> 7</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;"> 11</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;"> 15</span><span style="color:#BABED8;">]</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> target </span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;"> 9</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 因为 </span></span>
<span class="line"><span style="color:#BABED8;">nums[</span><span style="color:#F78C6C;">0</span><span style="color:#BABED8;">] </span><span style="color:#89DDFF;">+</span><span style="color:#BABED8;"> nums[</span><span style="color:#F78C6C;">1</span><span style="color:#BABED8;">] </span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;"> 2</span><span style="color:#89DDFF;"> +</span><span style="color:#F78C6C;"> 7</span><span style="color:#89DDFF;"> =</span><span style="color:#F78C6C;"> 9</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 所以返回 </span></span>
<span class="line"><span style="color:#BABED8;">[</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;"> 1</span><span style="color:#BABED8;">]</span></span></code></pre></div><ul><li>遍历两次求和，过滤出符合条件的下标拼接成数组</li></ul><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#C792EA;">  const</span><span style="color:#BABED8;"> getAddIndex </span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;"> (</span><span style="color:#BABED8;font-style:italic;">nums</span><span style="color:#89DDFF;">:</span><span style="color:#FFCB6B;"> number</span><span style="color:#BABED8;">[]</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;font-style:italic;"> target</span><span style="color:#89DDFF;">:</span><span style="color:#FFCB6B;"> number</span><span style="color:#89DDFF;">):</span><span style="color:#FFCB6B;"> number</span><span style="color:#BABED8;">[] </span><span style="color:#C792EA;">=&gt;</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#C792EA;">    const</span><span style="color:#BABED8;"> newArr</span><span style="color:#89DDFF;">:</span><span style="color:#FFCB6B;"> number</span><span style="color:#F07178;">[] </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> []</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">    for</span><span style="color:#F07178;"> (</span><span style="color:#C792EA;">let</span><span style="color:#BABED8;"> j</span><span style="color:#89DDFF;"> =</span><span style="color:#BABED8;"> nums</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">length</span><span style="color:#89DDFF;"> -</span><span style="color:#F78C6C;"> 1</span><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> j</span><span style="color:#89DDFF;"> &gt;=</span><span style="color:#F78C6C;"> 0</span><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> j</span><span style="color:#89DDFF;">--</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">      for</span><span style="color:#F07178;"> (</span><span style="color:#C792EA;">let</span><span style="color:#BABED8;"> k</span><span style="color:#89DDFF;"> =</span><span style="color:#F78C6C;"> 0</span><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> k</span><span style="color:#89DDFF;"> &lt;</span><span style="color:#BABED8;"> nums</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">length</span><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> k</span><span style="color:#89DDFF;">++</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">        if</span><span style="color:#F07178;"> (</span><span style="color:#BABED8;">nums</span><span style="color:#F07178;">[</span><span style="color:#BABED8;">j</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">+</span><span style="color:#BABED8;"> nums</span><span style="color:#F07178;">[</span><span style="color:#BABED8;">k</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">===</span><span style="color:#BABED8;"> target</span><span style="color:#89DDFF;"> &amp;&amp;</span><span style="color:#BABED8;"> j</span><span style="color:#89DDFF;"> !==</span><span style="color:#BABED8;"> k</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">          newArr</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">push</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">...</span><span style="color:#F07178;">[</span><span style="color:#BABED8;">j</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> k</span><span style="color:#F07178;">])</span></span>
<span class="line"><span style="color:#89DDFF;">        }</span></span>
<span class="line"><span style="color:#89DDFF;">      }</span></span>
<span class="line"><span style="color:#89DDFF;">    }</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">    return</span><span style="color:#BABED8;"> Array</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">from</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">new</span><span style="color:#82AAFF;"> Set</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">newArr</span><span style="color:#F07178;">))</span></span>
<span class="line"><span style="color:#89DDFF;">  }</span></span>
<span class="line"><span style="color:#C792EA;">  const</span><span style="color:#BABED8;"> arr</span><span style="color:#89DDFF;">:</span><span style="color:#FFCB6B;"> number</span><span style="color:#BABED8;">[] </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> [</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;"> 7</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;"> 11</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;"> 15</span><span style="color:#BABED8;">]</span></span>
<span class="line"><span style="color:#C792EA;">  const</span><span style="color:#BABED8;"> target</span><span style="color:#89DDFF;">:</span><span style="color:#FFCB6B;"> number</span><span style="color:#89DDFF;"> =</span><span style="color:#F78C6C;"> 26</span></span>
<span class="line"><span style="color:#BABED8;">  console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(</span><span style="color:#82AAFF;">getAddIndex</span><span style="color:#BABED8;">(arr</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> target))</span></span></code></pre></div><ul><li>利用map的特性去处理 新建一个<code>Map</code>, ， 然后遍历数组， 将差值记录在<code>Map</code>中， 最后通过<code>Map</code>的<code>get</code>方法得到下标</li></ul><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#C792EA;">  const</span><span style="color:#BABED8;"> getAddIndex </span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;"> (</span><span style="color:#BABED8;font-style:italic;">nums</span><span style="color:#89DDFF;">:</span><span style="color:#FFCB6B;"> number</span><span style="color:#BABED8;">[]</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;font-style:italic;"> target</span><span style="color:#89DDFF;">:</span><span style="color:#FFCB6B;"> number</span><span style="color:#89DDFF;">):</span><span style="color:#FFCB6B;"> number</span><span style="color:#BABED8;">[] </span><span style="color:#C792EA;">=&gt;</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#C792EA;">    const</span><span style="color:#BABED8;"> map</span><span style="color:#89DDFF;"> =</span><span style="color:#89DDFF;"> new</span><span style="color:#82AAFF;"> Map</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">    for</span><span style="color:#F07178;"> (</span><span style="color:#C792EA;">let</span><span style="color:#BABED8;"> k</span><span style="color:#89DDFF;"> =</span><span style="color:#F78C6C;"> 0</span><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> k</span><span style="color:#89DDFF;">&lt;</span><span style="color:#BABED8;"> nums</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">length</span><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> k</span><span style="color:#89DDFF;">++</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">      // j为 target 与数组每一项的差值 </span></span>
<span class="line"><span style="color:#C792EA;">      const</span><span style="color:#BABED8;"> j</span><span style="color:#89DDFF;">:</span><span style="color:#FFCB6B;"> number</span><span style="color:#89DDFF;"> =</span><span style="color:#BABED8;"> target</span><span style="color:#89DDFF;"> -</span><span style="color:#BABED8;"> nums</span><span style="color:#F07178;">[</span><span style="color:#BABED8;">k</span><span style="color:#F07178;">]</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">      // 判断map中是否包含着这个差值的项，如果包含， 则这个时候这个差值与nums[k]之和等于target</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">      if</span><span style="color:#F07178;"> (</span><span style="color:#BABED8;">map</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">has</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">j</span><span style="color:#F07178;">)) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        // 利用 map 的 get 方法， 获取存储的差值类型的key(下标)，然后与当遍历的次数k一起返回</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">          return</span><span style="color:#F07178;"> [</span><span style="color:#BABED8;">map</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">get</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">j</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> k</span><span style="color:#F07178;">]</span></span>
<span class="line"><span style="color:#89DDFF;">      }</span></span>
<span class="line"><span style="color:#BABED8;">      map</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">set</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">nums</span><span style="color:#F07178;">[</span><span style="color:#BABED8;">k</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> k</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">    }</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">    return</span><span style="color:#F07178;"> []</span></span>
<span class="line"><span style="color:#89DDFF;">  }</span></span></code></pre></div>`,10),e=[o];function t(c,r,y,F,D,B){return n(),a("div",null,e)}const E=s(p,[["render",t]]);export{A as __pageData,E as default};
