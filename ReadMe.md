# 吴乐川的《改良型浏览器存储器》


<link rel="stylesheet" href="./node_modules/@wulechuan/css-stylus-markdown-themes/源代码/发布的源代码/文章排版与配色方案集/层叠样式表/wulechuan-styles-for-html-via-markdown--vscode.default.min.css">



> 中国人——特别是汉族人，理应坚持广泛、规范地使用汉语。凡非必要之情形不说外国话、不用外国字。此乃天经地义！然则每当必要，亦不排斥采用外国之语言。不妨 **博世界之学问，养中国之精神** 。
>
> 本人亦支持少数民族坚持采用自己民族的传统语言。仍须强调，凡中国人，皆应会用汉语、积极使用汉语，此乃中华各民族之大一统之必由。





## NPM 页

<dl>
<dt>NPM 包名</dt>
<dd>

[@wulechuan/controller--enhanced-web-storage](https://www.npmjs.com/package/@wulechuan/controller--enhanced-web-storage)

</dd>
<dt>作者</dt>
<dd><p>南昌吴乐川</p></dd>
</dl>




## 源代码仓库

| <span style="display:inline-block;width:180px;">提供仓库服务之组织</span> | <span style="display:inline-block;width:150px;">仓库组织之国别</span> | 仓库地址 |
| ------------- | :----------: | ------- |
| 码云           | 中华人民共和国 | [https://gitee.com/nanchang-wulechuan/wulechuan--typescript--controller--enhanced-web-storage.git](https://gitee.com/nanchang-wulechuan/wulechuan--typescript--controller--enhanced-web-storage.git) |
| GitHub         | 美           | [https://github.com/wulechuan/wulechuan--typescript--controller--enhanced-web-storage.git](https://github.com/wulechuan/wulechuan--typescript--controller--enhanced-web-storage.git) |


## 介绍

浏览器标准的存储器（`window.localStorage` 与 `window.sessionStorage`）有诸多限制。本品借助 `JSON.stringify` 和 `JSON.parse` 提供改良的存储器，已替代上述两种标准存储器。


## 用法

### 示例

```ts
import {
    改良型浏览器会话存储器,
    改良型浏览器本地存储器,
} from '@wulechuan/controller--enhanced-web-storage'

改良型浏览器本地存储器.保存条目(
    '甲',
    { 条目: '甲', 解释: '天干第一。第一。盔甲。硬壳。旧时户口编制单位。同“胛”。' },
    { 保质期_以秒计: 3 }
)

改良型浏览器会话存储器.保存条目('乙', { 读音: 'yǐ', 笔画数: 1 }, { 保质期_以秒计: 3 })



// 应取得事先存入的值。
console.log('第 1 次取得 `甲`：', 改良型浏览器本地存储器.当即取此条目('甲').原始值)

// 应取得事先存入的值。
console.log('第 1 次取得 `乙`：', 改良型浏览器会话存储器.当即取此条目('乙').原始值)

console.log('请等待大约 3 秒钟。')

setTimeout(() => {
    // 应取得 undefined。因为 '甲' 已过保质期。
    console.log('第 2 次取得 `甲`：', 改良型浏览器本地存储器.当即取此条目('甲').原始值)

    // 应取得 undefined。因为 '乙' 已过保质期。
    console.log('第 2 次取得 `乙`：', 改良型浏览器会话存储器.当即取此条目('乙').原始值)
}, 3001)
```

### 应用编程接口

见《[./源代码/原始的源代码/types.d.ts](./源代码/原始的源代码/types.d.ts)》。
