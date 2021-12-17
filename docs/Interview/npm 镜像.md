---
title: npm 镜像
date: 2021-12-17 17:45:30
permalink: /pages/3d7717/
categories:
  - 面试
tags:
  - 
---
设置淘x,宝的是：  
npm config set registry [https://registry.npm.taobao.org](https://registry.npm.taobao.org/)  


npm config set registry https://registry.npm.taobao.org

不想用他们的，再设置回原来的就可以了：  
npm config set registry [https://registry.npmjs.org](https://registry.npmjs.org/)


npm config set registry https://registry.npmjs.org


试用固定版本的npm
npm install -g npm@7.5.4


 **npm install sass-loader@10.1.1**

npm install sass-loader@8.0.0  node-sass@4.14.1 --registry=https://registry.npm.taobao.org


npm install cnpm -g

 npm install cnpm -g --registry=https://registry.npm.taobao.org
