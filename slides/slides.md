---
# try also 'default' to start simple
theme: seriph
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://source.unsplash.com/collection/94734566/1920x1080
# apply any windi css classes to the current slide
class: 'text-center'
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# show line numbers in code blocks
lineNumbers: false
# some information about the slides, markdown enabled
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
# persist drawings in exports and build
drawings:
  persist: false
---

# 由规格SKU引起的思考


<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space for next page <carbon:arrow-right class="inline"/>
  </span>
</div>

<div class="abs-br m-6 flex gap-2">
  <button @click="$slidev.nav.openInEditor()" title="Open in Editor" class="text-xl icon-btn opacity-50 !border-none !hover:text-white">
    <carbon:edit />
  </button>
  <a href="https://github.com/slidevjs/slidev" target="_blank" alt="GitHub"
    class="text-xl icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>



---

# 商品规格

<div style="display: flex">
<img style="width: 250px; height: 450px" src="https://lf3-cm.ecombdstatic.com/obj/ecom-ecop/1658372292c7bfedefbdc7e48cf4e39ebf8f3dc4b7aba445ca.png">
<span style="margin: 0 12px" />
<img style="width: 250px; height: 450px" src="https://lf3-cm.ecombdstatic.com/obj/ecom-ecop/1658372292dfb4c479267dd29f32ba7de0da740b4b4858d883.png">

- 📝 商品规格（Product specifications），是指一些足以反映商品品质的主要指标，如化学成分、含量、纯度、性能、容量、长短、粗细等。

</div>

<br>

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent; 
  -moz-text-fill-color: transparent;
}
</style>

---

# 笛卡尔乘积

笛卡尔乘积是指在数学中，两个集合X和Y的笛卡尔积（Cartesian product），又称直积，表示为X × Y，第一个对象是X的成员而第二个对象是Y的所有可能有序对的其中一个成员 [1]  。引申到SKU中，SKU列表就是由商品规格通过笛卡尔积的形式得到的；

<img style="width: 450px; height: 340px" src="https://img-blog.csdnimg.cn/48ae7720d1624b14b6784e3b7dd48320.png">

---
layout: image-right
image: https://source.unsplash.com/collection/94734566/1920x1080
---

# 理想与现实

我期望超越需求，得到：

1. 流畅自由的商品规格组件 
2. 丝滑美观的联动SKU列表 
3. 整体简洁直观 

现实上：

1. 完成度50%，自由，但不够流畅
2. 完成度50%，联动，但不够丝滑
3. 简洁直观

[^1]: [Learn More](https://sli.dev/guide/syntax.html#line-highlighting)

<style>
.footnotes-sep {
  @apply mt-20 opacity-10;
}
.footnotes {
  @apply text-sm opacity-75;
}
.footnote-backref {
  display: none;
}
</style>

---

# 艺术上的事需要”灵感“

> 各大平台调研 😏 


|  平台 | 测试数量 | 自由度 |  体验|
| -- | --| --| --|
| 淘宝 | SKU300情况 |创建规格/规格值 + 可选规格、规格值 | 输入、滚动卡顿|
| 抖店 | SKU100情况 |无限制自定义规格/规格值 | 输入、滚动卡顿|
| pdd | SKU100情况 |无限制自定义规格/规格值 | 输入、滚动卡顿|
| 商品中台⭐️ | SKU100情况 |无限制自定义规格/规格值 | 输入、滚动卡顿|
  
简单的体验过，发现大SKU的商品是可以用的，只不过体验性会变差，当然大SKU数的商品一般都在某些特殊的分类。

因为中台是多平台聚合，同一商品支持6各平台自己修改分类，很容易出现这种大数据的情况，所以期望它性能下限不要太低。

---

# 我想做什么（demo）

> 页面卡顿的罪魁祸首是因为v-model，相信每一个处理过类似批量修改的同学都有体会

页面挂载了太多的表单组件，响应式的同时导致整个页面，输入、点击等绝大部分交互都受到影响，那么我们应该从这方便入手。

---
preload: false
---

# 如果确认优化效果？

> 借助谷歌浏览器 performance 选项卡

---

<img style="width: 600px" alt="在这里插入图片描述" src="https://img-blog.csdnimg.cn/20200116113703372.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDEzNTEyMQ==,size_16,color_FFFFFF,t_70">

---

# 网页性能总览图

总览图包含 FPS（每秒帧数情况）、CPU（CPU占用情况）、NET（网络资源情况）、HEAP（JS占用情况）一共四项指标。

* FPS：全称 Frames Per Second，表示每秒传输帧数，如下图所示，绿色竖线越高，FPS 越高。 红色表示长时间帧，可能出现卡顿。

不同帧的体验：
帧率能够达到 50 ～ 60 FPS 的动画将会相当流畅，让人倍感舒适；
帧率在 30 ～ 50 FPS 之间的动画，因各人敏感程度不同，舒适度因人而异；
帧率在 30 FPS 以下的动画，让人感觉到明显的卡顿和不适感；
帧率波动很大的动画，亦会使人感觉到卡顿。

---

<img alt="在这里插入图片描述" src="https://img-blog.csdnimg.cn/20200116133307949.png">

* CPU 资源。此面积图指示消耗 CPU 资源的事件类型。

下图中颜色分别为（与数据统计中的颜色数据表示一致）：
* 蓝色(Loading)：表示网络通信和 HTML 解析时间。
* 黄色(Scripting)：表示 JavaScript 执行时间。
* 紫色(Rendering)：表示样式计算和布局（重排）时间。
* 绿色(Painting)：表示重绘时间。
* 灰色(other)：表示其它事件花费的时间。
* 白色(Idle)：表示空闲时间。

---
# 各项指标的区块图

<img alt="在这里插入图片描述" src="https://img-blog.csdnimg.cn/20200116140237757.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDEzNTEyMQ==,size_16,color_FFFFFF,t_70">

* Network：表示每个服务器资源的加载情况。
* Frames：表示每幅帧的运行情况。
* Timings：绘制时间，暂不展开

---

# 转至demo

---
# QA
