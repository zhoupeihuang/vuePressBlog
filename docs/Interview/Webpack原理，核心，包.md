---
title: Webpack原理，核心，包
date: 2021-12-17 17:56:19
permalink: /pages/e6fe37/
categories:
  - 面试
tags:
  - 
---

# webpack


```
本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。
```

 
还是以前一样，有些概念面试可能会考，我都用*标记了出来，两句话就总结清楚其余的地方如果你想了解webpack，就仔细看看，虽然本教程不能让你webpack玩的很6，但是懂操作流程够了。面试你一般问你webpack的原理，Loader的原理，你有用那些优化措施
前端开发已经模块化，它改进了代码库的封装和结构。打包工具已经成为了一个项目必不可少的部分，
如今这儿有几种可能的选择，例如webpack，grunt，gulp等。
webpack因为他的功能和扩展性在过去的几年中，受到非常大的欢迎。但是webpack的配置总是让人觉得很困惑，
今天我们将从一个空的配置文件逐步完成一个完整的设置进行打包文件。

概念
clipboard.png

不像大多数的模块打包机，webpack是收把项目当作一个整体，通过一个给定的的主文件，webpack将从这个文件开始找到你的项目的所有依赖文件，使用loaders处理它们，最后打包成一个或多个浏览器可识别的js文件

install
首先添加我们即将使用的包：



npm install webpack webpack-dev-server --save-dev
webpack是我们需要的模块打包机，webpack-dev-server用来创建本地服务器，监听你的代码修改，并自动刷新修改后的结果。这些是有关devServer的配置



contentBase,  // 为文件提供本地服务器
port, // 监听端口，默认8080
inline, // 设置为true,源文件发生改变自动刷新页面
historyApiFallback  // 依赖HTML5 history API,如果设置为true,所有的页面跳转指向index.html
devServer:{
    contentBase: './src' // 本地服务器所加载的页面所在的目录
    historyApiFallback: true, // 不跳转
    inline: true // 实时刷新
}
然后我们在根目录下创建一个'webpack.config.js'，在'package.json'添加两个命令用于本地开发和生产发布
    

"scripts": {
            "start": "webpack-dev-server",
            "build": "webpack"
        }
在使用webpack命令的时候，他将接受webpack的配置文件，除非我们使用其他的操作

entry
entry: 用来写入口文件，它将是整个依赖关系的根



var baseConfig = {
        entry: './src/index.js'
    }
当我们需要多个入口文件的时候，可以把entry写成一个对象



var baseConfig = {
        entry: {
            main: './src/index.js'
        }
    }
我建议使用后面一种方法，因为他的规模会随你的项目增大而变得繁琐

output
output: 即使入口文件有多个，但是只有一个输出配置



var path = require('path')
    var baseConfig = {
        entry: {
            main: './src/index.js'
        },
        output: {
            filename: 'main.js',
            path: path.resolve('./build')
        }
    }
    module.exports = baseConfig
如果你定义的入口文件有多个，那么我们需要使用占位符来确保输出文件的唯一性



output: {
        filename: '[name].js',
        path: path.resolve('./build')
    }
如今这么少的配置，就能够让你运行一个服务器并在本地使用命令npm start或者npm run build来打包我们的代码进行发布

Loader
loader的作用：
1、实现对不同格式的文件的处理，比如说将scss转换为css，或者typescript转化为js
2、转换这些文件，从而使其能够被添加到依赖图中
loader是webpack最重要的部分之一，通过使用不同的Loader，我们能够调用外部的脚本或者工具，实现对不同格式文件的处理，loader需要在webpack.config.js里边单独用module进行配置，配置如下：



test: 匹配所处理文件的扩展名的正则表达式（必须）
    loader: loader的名称（必须）
    include/exclude: 手动添加处理的文件，屏蔽不需要处理的文件（可选）
    query: 为loaders提供额外的设置选项
    ex: 
        var baseConfig = {
            // ...
            module: {
                rules: [
                    {
                        test: /*匹配文件后缀名的正则*/,
                        use: [
                            loader: /*loader名字*/,
                            query: /*额外配置*/
                        ]
                    }
                ]
            }
        }
要是loader工作，我们需要一个正则表达式来标识我们要修改的文件，然后有一个数组表示
我们表示我们即将使用的Loader,当然我们需要的loader需要通过npm 进行安装。例如我们需要解析less的文件，那么webpack.config.js的配置如下：

        

var baseConfig = {
                entry: {
                    main: './src/index.js'
                },
                output: {
                    filename: '[name].js',
                    path: path.resolve('./build')
                },
                devServer: {
                    contentBase: './src',
                    historyApiFallBack: true,
                    inline: true
                },
                module: {
                    rules: [
                        {
                            test: /\.less$/,
                            use: [
                                {loader: 'style-loader'},
                                {loader: 'css-loader'},
                                {loader: 'less-loader'}
                            ],
                            exclude: /node_modules/
                        }
                    ]
                }
            }
这里介绍几个常用的loader：
babel-loader： 让下一代的js文件转换成现代浏览器能够支持的JS文件。
babel有些复杂，所以大多数都会新建一个.babelrc进行配置
css-loader,style-loader:两个建议配合使用，用来解析css文件，能够解释@import,url()如果需要解析less就在后面加一个less-loader
file-loader: 生成的文件名就是文件内容的MD5哈希值并会保留所引用资源的原始扩展名
url-loader: 功能类似 file-loader,但是文件大小低于指定的限制时，可以返回一个DataURL事实上，在使用less,scss,stylus这些的时候，npm会提示你差什么插件，差什么，你就安上就行了

Plugins
plugins和loader很容易搞混，说都是外部引用有什么区别呢？ 事实上他们是两个完全不同的东西。这么说loaders负责的是处理源文件的如css、jsx，一次处理一个文件。而plugins并不是直接操作单个文件，它直接对整个构建过程起作用下面列举了一些我们常用的plugins和他的用法
ExtractTextWebpackPlugin: 它会将入口中引用css文件，都打包都独立的css文件中，而不是内嵌在js打包文件中。下面是他的应用

    

var ExtractTextPlugin = require('extract-text-webpack-plugin')
        var lessRules = {
            use: [
                {loader: 'css-loader'},
                {loader: 'less-loader'}
            ]
        }
        
        var baseConfig = {
            // ... 
            module: {
                rules: [
                    // ...
                    {test: /\.less$/, use: ExtractTextPlugin.extract(lessRules)}
                ]
            },
            plugins: [
                new ExtractTextPlugin('main.css')
            ]
        }
HtmlWebpackPlugin:
作用： 依据一个简单的index.html模版，生成一个自动引用你打包后的js文件的新index.html

        

var HTMLWebpackPlugin = require('html-webpack-plugin')
            var baseConfig = {
                // ...
                plugins: [
                    new HTMLWebpackPlugin()
                ]
            }
HotModuleReplacementPlugin: 它允许你在修改组件代码时，自动刷新实时预览修改后的结果注意永远不要在生产环境中使用HMR。这儿说一下一般情况分为开发环境，测试环境，生产环境。
用法如 new webpack.HotModuleReplacementPlugin()

    webapck.config.js的全部内容
    

const webpack = require("webpack")
        const HtmlWebpackPlugin = require("html-webpack-plugin")
        var ExtractTextPlugin = require('extract-text-webpack-plugin')
        var lessRules = {
            use: [
                {loader: 'css-loader'},
                {loader: 'less-loader'}
            ]
        }
        module.exports = {
            entry: {
                    main: './src/index.js'
                },
                output: {
                    filename: '[name].js',
                    path: path.resolve('./build')
                },
                devServer: {
                    contentBase: '/src',
                    historyApiFallback: true,
                    inline: true,
                    hot: true
                },
                module: {
                    rules: [
                        {test: /\.less$/, use: ExtractTextPlugin.extract(lessRules)}
                    ]
                },
                plugins: [
                new ExtractTextPlugin('main.css')
            ]
        }
    
产品阶段的构建
目前为止，在开发阶段的东西我们已经基本完成了。但是在产品阶段，还需要对资源进行别的
处理，例如压缩，优化，缓存，分离css和js。首先我们来定义产品环境



var ENV = process.env.NODE_ENV
    var baseConfig = {
        // ... 
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(ENV)
            })
        ]
    }
然后还需要修改我们的script命令

    

"scripts": {
            "start": "NODE_ENV=development webpack-dev-server",
            "build": "NODE_ENV=production webpack"
        }
process.env.NODE_ENV 将被一个字符串替代，它运行压缩器排除那些不可到达的开发代码分支。
当你引入那些不会进行生产的代码，下面这个代码将非常有用。

    

if (process.env.NODE_ENV === 'development') {
            console.warn('这个警告会在生产阶段消失')
        }
优化插件
下面介绍几个插件用来优化代码
OccurenceOrderPlugin: 为组件分配ID,通过这个插件webpack可以分析和优先考虑使用最多 的模块，然后为他们分配最小的ID
UglifyJsPlugin: 压缩代码
下面是他们的使用方法
var baseConfig = {

// ...
 new webpack.optimize.OccurenceOrderPlugin()
 new webpack.optimize.UglifyJsPlugin()
}
然后在我们使用npm run build会发现代码是压缩的

总结
webpack的配置文件的复杂度，依赖于你项目的需要。小心的运用他们。因为随着项目的增长，它们会变得很难驯服。内容有点多，事实上总结起来也不是特别多，也就Loader，plugins。其他的地方都比较简单。这篇文章大概花了我三天的时间，网上看各种教程，然后看官网，真挺累的。这儿写完我就去睡觉