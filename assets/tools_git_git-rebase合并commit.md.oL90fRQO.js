import{_ as e,o,c as s,R as a,a_ as t,a$ as c,b0 as l,b1 as i,b2 as p}from"./chunks/framework.AonOEUEq.js";const f=JSON.parse('{"title":"git rebase 合并commit","description":"","frontmatter":{},"headers":[],"relativePath":"tools/git/git-rebase合并commit.md","filePath":"tools/git/git-rebase合并commit.md","lastUpdated":1701688734000}'),d={name:"tools/git/git-rebase合并commit.md"},r=a('<h1 id="git-rebase-合并commit" tabindex="-1">git rebase 合并commit <a class="header-anchor" href="#git-rebase-合并commit" aria-label="Permalink to &quot;git rebase 合并commit&quot;">​</a></h1><ul><li><strong>使用背景</strong></li></ul><p>一个repo通常是由一个team中的多个人共同维护，如果需要增加新feature，那么就是一个feature分支了。由于开发中各种修改，本feature分支多次commit。最后提交master后，会看到乱七八糟的所有增量修改历史。其实对别人来说，我们的改动应该就是增加或者删除，给别人看开发过程的增量反而太乱。于是我们可以将feature分支的提交合并后然后再merge到主干这样看起来就清爽多了。</p><h3 id="rebase-简介" tabindex="-1">rebase 简介 <a class="header-anchor" href="#rebase-简介" aria-label="Permalink to &quot;rebase 简介&quot;">​</a></h3><p><code>git rebase</code>是Git中用于将一个分支的提交应用到另一个分支上的命令。它主要作用是将一个分支上的修改“衍合”(rebase) 到另一个分支上， 使得目标分支上的提交历史变得整洁和线性。</p><div class="danger custom-block"><p class="custom-block-title">DANGER</p><p>⚠️ 不要通过rebase对任何已经提交到公共仓库中的commit进行修改（个人分支除外）</p></div><h3 id="操作步骤" tabindex="-1">操作步骤 <a class="header-anchor" href="#操作步骤" aria-label="Permalink to &quot;操作步骤&quot;">​</a></h3><p>假设我们做了一下三个commit，想把前两个提交也就是 <code>commit 7131a52</code>和 <code>commit 0d11e74</code>合并到<code>commit a2406db</code>中， 合并成一个提交:</p><img src="'+t+'" alt="log信息"><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>如果使用 <code>git log</code>可以按下<code>s</code>向下翻看<code>log</code></p><p><code>git log --oneline</code> 可以一行展现</p></div><p>我们使用命令：</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#C3E88D;"> rebase</span><span style="color:#C3E88D;"> -i</span><span style="color:#BABED8;">  [startpoint] </span><span style="color:#89DDFF;">[</span><span style="color:#BABED8;">endpoint</span><span style="color:#89DDFF;">]</span></span></code></pre></div><p>其中 <code>-i</code>的意思是 <code>--interractive</code>, 即弹出交互式页面让用户编辑完成合并操作；</p><p><code>[startpoint]</code>和 <code>[endpoint]</code>则指定了一个编辑的区间， <code>[endpoint]</code>是可选的， 如果不指定，则该区间默认终点是当前分支HEAD所指向的commit(注：该区间指定的是一个前开后闭的区间), 针对与我们之前创建的提交, 具体执行以下命令:</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#C3E88D;"> rebase</span><span style="color:#C3E88D;"> -i</span><span style="color:#F78C6C;"> 77663</span><span style="color:#C3E88D;">d6</span></span></code></pre></div><p>或者</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight vp-code"><code><span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#C3E88D;"> rebase</span><span style="color:#C3E88D;"> -i</span><span style="color:#C3E88D;"> HEAD~3</span></span></code></pre></div><p>执行完命令后， 我们可以看到终端变成如下界面：</p><img src="'+c+'" alt="rebase操作"><p>其中， commands表示了可以进行的指令的类型：</p><ul><li><p><code>p</code>: 即为 <code>pick</code>， 表示保留这一个commitID</p></li><li><p><code>r</code>: 即为 <code>reword</code>, 表示保留着一个commitID， 但是需要修改commit的注释</p></li><li><p><code>e</code>: 即为 <code>edit</code>, 表示保留这一个commitID， 但是要停止rebase操作来进行这次提交的修改(即修改变更的代码与commit与注释)</p></li><li><p><code>s</code>: 即为 <code>squash</code>, 表示将这个commitID与前一个commitID合并</p></li><li><p><code>f</code>: 即为 <code>fixup</code>, 表示将这个commitID与前一个commitID合并， 但是不保留该提交的注释信息</p></li><li><p><code>x</code>: 即为 <code>exec</code>, 表示执行shell命令</p></li><li><p><code>d</code>: 即为 <code>drop</code>, 表示丢弃这条commitID</p><p>根据我们的需求， 我们需要讲第二三次提交合并到第一次提交上去， 最终只形成一个提交</p><div class="info custom-block"><p class="custom-block-title">提交信息</p><blockquote><p>pick a2406db feat(test):第一次提交 <br> s 0d11e74 feat(test):第二次提交 <br> s 7131a52 feat(test):第三次提交</p></blockquote></div><p>编辑后 输入wq保存退出， 会得到如下页面： <img src="'+l+'" alt="rebase squash"></p><p>在这里，我们需要进入编辑状态， 删掉或者注释掉第二次提交和第三次提交的信息， 这样最终只留下了第一次提交, 输入wq命令保存</p><img src="'+i+'" alt="rebase squash"><p>通过<code>git log</code>查看一下最终的提交信息：</p><img src="'+p+'" alt="git log提交信息"><p>可以看到， 现在只留下第一次提交的信息了, 之后就可以正常合并到主分支上了.</p></li></ul>',21),n=[r];function m(b,g,h,u,_,D){return o(),s("div",null,n)}const C=e(d,[["render",m]]);export{f as __pageData,C as default};
