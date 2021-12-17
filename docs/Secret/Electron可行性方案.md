

# Electron 可行性方案

## 目标替换.net影像平台

## Q/A

  
### 0：什么是Electron ?
它是一个运行时，可以像 node 一样这样执行：electron app.js；也是一个使用 html + css + javascript 构建跨平台原生桌面应用的框架。

本质上，electron 就是一个带了 Chrome 浏览器的壳子（无需考虑兼容性的问题）。

Electron用 web 页面作为它的 GUI，而不是绑定了 GUI 库的 JavaScript。它结合了 Chromium、Node.js 和用于调用操作系统本地功能的 APIs（如打开文件窗口、通知、图标等）。
具有两个进程，分别是主进程，以及渲染进程。

![enter image description here](https://i.loli.net/2019/03/05/5c7de7c296bdd.png)
-   主进程：运行 package.json 里面 main 脚本的进程成为主进程。
-   渲染进程： 每个 electron 的页面都运行着自己的进程，称为渲染进程。

主进程也就是 npm run start 出来的窗口，我们关心的，还是窗口里面的内容，即是渲染进程。

摘自  [Electron的本质](https://segmentfault.com/a/1190000007503495)


### 1：A标签能否调用Electron客户端？
可以 已实现
 ![enter image description here](https://github.com/zhoupeihuang/markdownPic/blob/master/electron.gif?raw=true)
参考链接 https://www.jianshu.com/p/d880c0ca0911

### 2：Electron客户端 是否需要安装？
需要安装成exe  , 现在本地测试是 需要发压缩包，不需要安装
后期测试看下 能不能制作成 exe 安装的那种



### 3：如何打包成exe?

进入项目目录后，
```
//打包
electron-packager . app --win --out presenterTool --arch=x64 --overwrite --ignore=node_modules 
```


即可开始打包
```
electron-packager . 可执行文件的文件名 --win --out 打包成的文件夹名 --arch=x64位还是32位 --version版本号 --overwrite --ignore=node_modules  
```


![](https://img-blog.csdn.net/20170427005337576?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYTcyNzkxMTQzOA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

具体操作 [https://blog.csdn.net/a727911438/article/details/70834467](https://blog.csdn.net/a727911438/article/details/70834467)

### 4：文件上传类型，大小，速率有无限制？


### 5：打印，图片缩略图，预览，左右图切换显示？


### 6：能否上传视频，视频能否播放【本地上传时】，视频流？


### 7：视频播放 是否支持预览，首图？


### 8：Mac OS 是否能使用？

与产品确认过，业务员电脑统一由公司下发，不考虑Mac OS
### 9：如何映射服务器端硬盘的图片？


 
### 10：Electron的底层框架是node，而前端只充当绘制软件界面！
































 


<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEzNTAzNzczM119
-->