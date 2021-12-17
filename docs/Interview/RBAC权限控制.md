---
title: RBAC权限控制
date: 2021-12-17 17:58:24
permalink: /pages/b7327c/
categories:
  - 面试
tags:
  - 
---
# RBAC权限管理

 

#### 简介

RBAC基于角色的权限访问控制（Role-Based Access Control）是商业系统中最常见的权限管理技术之一。RBAC是一种思想，任何编程语言都可以实现，其成熟简单的控制思想 越来越受广大开发人员喜欢。在RBAC中，权限与角色相关联，用户通过成为适当角色的成员而得到这些角色的权限。这就极大地简化了权限的管理。在一个组织中，角色是为了完成各种工作而创造，用户则依据它的责任和资格来被指派相应的角色，用户可以很容易地从一个角色被指派到另一个角色。角色可依新的需求和系统的合并而赋予新的权限，而权限也可根据需要而从某角色中回收。

### 日常生活中的权限

![QQ截图20210914164901.png](https://i.loli.net/2021/09/18/fMchTSHE3Is8NQG4/xG7J9Ya5mQ6hEyF.png)


#### 权限的作用

-   使用者的角度  
    权力：正确的行驶权力  
    限制：在限制范围内使用权力
-   设计者的角度  
    安全：控制不同的角色合理的访问不同的资源  
    对于我们做的web应用系统来讲，就是控制不同的用户访问不同的页面；

#### 权限模型介绍

![2QQ截图20210914164849.png](https://i.loli.net/2021/09/18/Wd3BRVe7SDEvGcC4/XsgoW8Ahv4q2kZE.png)

  

其中ABAC和PBAC在互联网场景中很少使用，ACL是直接关系，RBAC是间接关系；

![3QQ截图20210914164842.png](https://i.loli.net/2021/09/18/M4UBQFNtAVpgvmX4/fytmHceCMUWBsnd.png)

#### RBAC模型的优势

-   简化了用户和权限的关系  
    就是因为多了一个角色属性，通过角色可以对用户进行分组，分组完了就可以很方便的管理用户；
-   易扩展 易于维护
    ![4.png](https://i.loli.net/2021/09/18/AzMIHt8TB7jyQFV.png)
      ![QQ截图20210914164834.png](https://i.loli.net/2021/09/14/1P4BKgfJl5tuwQG.png)
    

#### RBAC流程图

 ![5QQ截图20210914164826.png](https://i.loli.net/2021/09/18/TouyWgJBzMHE1P64/NqlUQIG5Zj2oaSD.png)

  

如上图所示，一个详细完整的RBAC权限管理需要建立5张表，当然3个或4个表也是可以完成；

#### RBAC功能模块

-   功能需求列表：
    
      ![6
    
    ![QQ截图20210914164813.png](https://i.loli.net/2021/09/18/AgPwpzLea2d8fFS4/5ctPjOHksWbU3aB.png)
    
    
    
-   权限控制流程：
![7QQ截图20210914164805.png](https://i.loli.net/2021/09/18/eLZPFaIibokDAhl4/NZyPf1TbAeOKqUQ.png)


#### 实战

主要实现以下5个模块：

-   RBAC之角色管理
-   RBAC之用户管理
-   RBAC之权限管理
-   RBAC模块之验证权限
-   RBAC用户操作记录

#### 技术选型

-   Laravel：PHP MVC设计模式框架
-   Mysql：数据库
-   Bootstrap：前端开发框架
-   jQuery：JavaScript框架

#### 数据库设计


![8QQ截图20210914164736.png](https://i.loli.net/2021/09/18/buT6wliSMtjoayf4/iS19chKP6mQEGT2.png)

 
