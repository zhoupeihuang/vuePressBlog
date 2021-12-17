---
title: npm run 自动化任务
date: 2021-12-17 17:37:38
permalink: /pages/1f6bab/
categories:
  - 面试
tags:
  - 
---



 # 用npm-run自动化任务
 ## script

[npm](https://npmjs.org/) 会在项目的 `package.json` 文件中寻找 `scripts` 区域，其中包括`npm test`和`npm start`等命令。

其实`npm test`和`npm start`是`npm run test`和`npm run start`的简写。事实上，你可以使用`npm run`来运行`scripts`里的任何条目。

使用`npm run`的方便之处在于，npm会自动把`node_modules/.bin`加入`$PATH`，这样你可以直接运行依赖程序和开发依赖程序，不用全局安装了。只要npm上的包提供命令行接口，你就可以直接使用它们，方便吧？当然，你总是可以自己写一个简单的小程序。

## 构建javascript

为了便于组织代码和利用npm上的包，写代码的时候往往使用`module.exports`和`require()`。[browserify](https://segmentfault.com/a/1190000002681628)可以将这些一起打包成单一的脚本。使用browserify很简单，只需在`package.json`中加入一个`['build-js']`条目，类似这样：

    "build-js": "browserify browser/main.js > static/bundle.js"

如果是用于生产环境，还需要压缩一下。我们只需要将`uglify-js`加入devDependency，然后直接通过管道传递一下即可：

    "build-js": "browserify browser/main.js | uglifyjs -mc > static/bundle.js"

## 监视 javascript

为了能在修改文件之后自动重新生成javascript文件，只需将上面的browserify命令换成[watchify](https://npmjs.org/package/watchify)并加上一些参数。

    "watch-js": "watchify browser/main.js -o static/bundle.js -dv"

这里加了`-d`和`-v`两个参数，这样就可以看到详细的调试信息。

## 构建CSS

用`cat`就可以搞定：

    "build-css": "cat static/pages/*.css tabs/*/*.css > static/bundle.css"

## 监视CSS

和上面用 watchify 监视 javascript 类似，我们用[catw](https://npmjs.org/package/catw)监视CSS文件的改动：

    "watch-css": "catw static/pages/*.css tabs/*/*.css -o static/bundle.css -v"

## 序列化子任务

很简单，`npm run`每个子任务，然后用`&&`连接起来就成。

    "build": "npm run build-js && npm run build-css"

## 并行子任务

类似地，我们用`&`并行子任务：

    "watch": "npm run watch-js & npm run watch-css"

## 完整的package.json例子

将上面提到的内容组合起来，`package.json`大致就是这个样子：

    {
	  "name": "my-silly-app",
	  "version": "1.2.3",
	  "private": true,
	  "dependencies": {
	    "browserify": "~2.35.2",
	    "uglifyjs": "~2.3.6" },
	  "devDependencies": {
	    "watchify": "~0.1.0",
	    "catw": "~0.0.1",
	    "tap": "~0.4.4" },
	  "scripts": {
	    "build-js": "browserify browser/main.js | uglifyjs -mc > static/bundle.js",
	    "build-css": "cat static/pages/*.css tabs/*/*.css",
	    "build": "npm run build-js && npm run build-css",
	    "watch-js": "watchify browser/main.js -o static/bundle.js -dv",
	    "watch-css": "catw static/pages/*.css tabs/*/*.css -o static/bundle.css -v",
	    "watch": "npm run watch-js & npm run watch-css",
	    "start": "node server.js",
	    "test": "tap test/*.js" 
	    } 
	    }
    

生产环境下，只需运行`npm run build`。如果是本地开发，就用`npm run watch`。

你也可以坐下扩展。比方说，如果你希望在运行`start`前先运行`build`，那么你只需写上这么一行：

``` 
"start": "npm run build && node server.js"
```

也许你想同时启动watcher？

``` 
"start-dev": "npm run watch & npm start"
```

## 当事情变得非常复杂的时候

如果你发现在单个`scripts`条目中塞了一大堆命令，那你可以考虑重构一下，把一些命令放到别的地方，比如`/bin`。

你可以用任何语言编写这个脚本，比如`bash`、`node`或`perl`。只需要在脚本上加上合适的`#!`行。还有，别忘了`chmod +x`。

```
#!/bin/bash
(cd site/main; browserify browser/main.js | uglifyjs -mc > static/bundle.js)
(cd site/xyz; browserify browser.js > static/bundle.js)
```
```
"build-js": "bin/build.sh"
```

## Windows

你可能会吃惊的是，[相当多的类bash语法可以在Windows上工作](https://github.com/isaacs/npm/pull/4058#issuecomment-27439737)。不过我们至少还需要让`;`和`&`可以正常工作。

James Halliday分享过[一些在Windows兼容的经验](https://npmjs.org/package/bashful)，这些经验也适用于本文的主题，可以参考。此外要推荐下[win-bash](http://win-bash.sourceforge.net/)，这是一个很方便的Windows平台上的bash实现。

## 总结

James Halliday希望这个使用`npm run`的方式能吸引一部人对现有的前端自动化任务工具不满意的人。James Halliday比较偏好unix体系下的那些学习曲线陡峭的工具，比如`git`，或者类似 npm 这种在 bash 的基础上提供极简界面的工具。也就是说，不需要很多仪式化操作和配合的工具。非常简单的工具，已经足够胜任通常的任务。

如果你对`npm run`风格不感冒。你也许可以考虑下`Makefiles`，一个稳定而简单，不过多少有点怪异的替代品。

原文 [task automation with npm run](http://substack.net/task_automation_with_npm_run)

