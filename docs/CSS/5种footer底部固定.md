页脚置底（Sticky Footer）就是让网页的 footer 部分始终在浏览器窗口的底部。

当网页内容足够长以至超出浏览器可视高度时，页脚会随着内容被推到网页底部；但如果网页内容不够长，置底的页脚就会保持在浏览器窗口底部。

#### 方法一：将 .content 的 margin-bottom 设为负数

```
 页脚置底（Sticky Footer）就是让网页的 footer 部分始终在浏览器窗口的底部。

当网页内容足够长以至超出浏览器可视高度时，页脚会随着内容被推到网页底部；但如果网页内容不够长，置底的页脚就会保持在浏览器窗口底部。

#### 方法一：将 .content 的 margin-bottom 设为负数

```
 
```

#### 方法二：将 .footer 的 margin-top 设为负数

```
<!DOCTYPE html><html lang="en">  <head>    <meta charset="UTF-8" />    <meta name="viewport" content="width=device-width, initial-scale=1.0" />    <meta http-equiv="X-UA-Compatible" content="ie=edge" />    <title>Sticky Footer</title>    <style>      html,      body {        margin: 0;        padding: 0;        height: 100%;        text-align: center;      }      .content {        min-height: 100%;      }      .content-inside {        background-color: #c2ffa9;      }      .footer {        height: 50px;        line-height: 50px; /* 实现文字垂直居中 */        background-color: #3ba4f9;        margin-top: -50px; /* 等于 .footer 高度的相反数 */      }    </style>  </head>  <body>    <div class="content">      <!-- div.content-inside 的高度可以随意设置，亦可根据内容高度自适应 -->      <div class="content-inside">        <!-- content -->        <div>Content</div>        <div>Content</div>        <div>Content</div>      </div>    </div>    <div class="footer">Sticky Footer</div>  </body></html>复制代码
```

#### 方法三：使用 calc() 设置 .content 的高度

```
<!DOCTYPE html><html lang="en">  <head>    <meta charset="UTF-8" />    <meta name="viewport" content="width=device-width, initial-scale=1.0" />    <meta http-equiv="X-UA-Compatible" content="ie=edge" />    <title>Sticky Footer</title>    <style>      html,      body {        margin: 0;        padding: 0;        height: 100%;        text-align: center;      }      .content {        /* 如果 .content 与 .footer 之间有间距，记得减去 */        min-height: calc(100vh - 50px);      }      .content-inside {        background-color: #c2ffa9;      }      .footer {        height: 50px;        line-height: 50px; /* 实现文字垂直居中 */        background-color: #3ba4f9;      }    </style>  </head>  <body>    <div class="content">      <div class="content-inside">        <!-- content -->        <div>Content</div>        <div>Content</div>        <div>Content</div>      </div>    </div>    <div class="footer">Sticky Footer</div>  </body></html>复制代码
```

#### 方法四：使用 Flexbox 弹性布局

```
<!DOCTYPE html><html lang="en">  <head>    <meta charset="UTF-8" />    <meta name="viewport" content="width=device-width, initial-scale=1.0" />    <meta http-equiv="X-UA-Compatible" content="ie=edge" />    <title>Sticky Footer</title>    <style>      html,      body {        margin: 0;        padding: 0;        height: 100%;        text-align: center;      }      body {        min-height: 100%;        display: flex;        flex-direction: column;      }      .content {        flex: 1;      }      .content-inside {        background-color: #c2ffa9;      }      .footer {        /* 这种方案不需要固定 .footer 的高度 */        background-color: #3ba4f9;      }    </style>  </head>  <body>    <div class="content">      <div class="content-inside">        <!-- content -->        <div>Content</div>        <div>Content</div>        <div>Content</div>      </div>    </div>    <div class="footer">Sticky Footer</div>  </body></html>复制代码
```

#### 方法五：使用 Grid 网格布局

```
<!DOCTYPE html><html lang="en">  <head>    <meta charset="UTF-8" />    <meta name="viewport" content="width=device-width, initial-scale=1.0" />    <meta http-equiv="X-UA-Compatible" content="ie=edge" />    <title>Sticky Footer</title>    <style>      html,      body {        margin: 0;        padding: 0;        height: 100%;        text-align: center;      }      body {        min-height: 100%;        display: grid;        grid-template-rows: 1fr auto;      }      .content-inside {        background-color: #c2ffa9;      }      .footer {        grid-row-start: 2;        grid-row-end: 3;        background-color: #3ba4f9;      }    </style>  </head>  <body>    <div class="content">      <div class="content-inside">        <!-- content -->        <div>Content</div>        <div>Content</div>        <div>Content</div>      </div>    </div>    <div class="footer">Sticky Footer</div>  </body></html>复制代码
```

> 转自：https://juejin.cn/post/6966242630795689992
```

#### 方法二：将 .footer 的 margin-top 设为负数

```
<!DOCTYPE html><html lang="en">  <head>    <meta charset="UTF-8" />    <meta name="viewport" content="width=device-width, initial-scale=1.0" />    <meta http-equiv="X-UA-Compatible" content="ie=edge" />    <title>Sticky Footer</title>    <style>      html,      body {        margin: 0;        padding: 0;        height: 100%;        text-align: center;      }      .content {        min-height: 100%;      }      .content-inside {        background-color: #c2ffa9;      }      .footer {        height: 50px;        line-height: 50px; /* 实现文字垂直居中 */        background-color: #3ba4f9;        margin-top: -50px; /* 等于 .footer 高度的相反数 */      }    </style>  </head>  <body>    <div class="content">      <!-- div.content-inside 的高度可以随意设置，亦可根据内容高度自适应 -->      <div class="content-inside">        <!-- content -->        <div>Content</div>        <div>Content</div>        <div>Content</div>      </div>    </div>    <div class="footer">Sticky Footer</div>  </body></html>复制代码
```

#### 方法三：使用 calc() 设置 .content 的高度

```
<!DOCTYPE html><html lang="en">  <head>    <meta charset="UTF-8" />    <meta name="viewport" content="width=device-width, initial-scale=1.0" />    <meta http-equiv="X-UA-Compatible" content="ie=edge" />    <title>Sticky Footer</title>    <style>      html,      body {        margin: 0;        padding: 0;        height: 100%;        text-align: center;      }      .content {        /* 如果 .content 与 .footer 之间有间距，记得减去 */        min-height: calc(100vh - 50px);      }      .content-inside {        background-color: #c2ffa9;      }      .footer {        height: 50px;        line-height: 50px; /* 实现文字垂直居中 */        background-color: #3ba4f9;      }    </style>  </head>  <body>    <div class="content">      <div class="content-inside">        <!-- content -->        <div>Content</div>        <div>Content</div>        <div>Content</div>      </div>    </div>    <div class="footer">Sticky Footer</div>  </body></html>复制代码
```

#### 方法四：使用 Flexbox 弹性布局

```
<!DOCTYPE html><html lang="en">  <head>    <meta charset="UTF-8" />    <meta name="viewport" content="width=device-width, initial-scale=1.0" />    <meta http-equiv="X-UA-Compatible" content="ie=edge" />    <title>Sticky Footer</title>    <style>      html,      body {        margin: 0;        padding: 0;        height: 100%;        text-align: center;      }      body {        min-height: 100%;        display: flex;        flex-direction: column;      }      .content {        flex: 1;      }      .content-inside {        background-color: #c2ffa9;      }      .footer {        /* 这种方案不需要固定 .footer 的高度 */        background-color: #3ba4f9;      }    </style>  </head>  <body>    <div class="content">      <div class="content-inside">        <!-- content -->        <div>Content</div>        <div>Content</div>        <div>Content</div>      </div>    </div>    <div class="footer">Sticky Footer</div>  </body></html>复制代码
```

#### 方法五：使用 Grid 网格布局

```
<!DOCTYPE html><html lang="en">  <head>    <meta charset="UTF-8" />    <meta name="viewport" content="width=device-width, initial-scale=1.0" />    <meta http-equiv="X-UA-Compatible" content="ie=edge" />    <title>Sticky Footer</title>    <style>      html,      body {        margin: 0;        padding: 0;        height: 100%;        text-align: center;      }      body {        min-height: 100%;        display: grid;        grid-template-rows: 1fr auto;      }      .content-inside {        background-color: #c2ffa9;      }      .footer {        grid-row-start: 2;        grid-row-end: 3;        background-color: #3ba4f9;      }    </style>  </head>  <body>    <div class="content">      <div class="content-inside">        <!-- content -->        <div>Content</div>        <div>Content</div>        <div>Content</div>      </div>    </div>    <div class="footer">Sticky Footer</div>  </body></html>复制代码
```

> 转自：https://juejin.cn/post/6966242630795689992
