---
title: js获取上传图片真实的尺寸大小和存储大小
date: 2021-12-17 10:50:23
permalink: /pages/d24063/
categories:
  - jinjie
tags:
  - 
---

# js获取上传图片真实的尺寸大小和存储大小

 

    <input id="file" type="file">
    <input id="Button1" type="button" value="button" οnclick="check()">
    <script>
    window.check=function(){
    var input = document.getElementById("file");
    if(input.files){
                    //读取图片数据
      var f = input.files[0];
      var reader = new FileReader();
      reader.onload = function (e) {
          var data = e.target.result;
          //加载图片获取图片真实宽度和高度
          var image = new Image();
          image.οnlοad=function(){
              var width = image.width;
              var height = image.height;
              alert(width+'======'+height+"====="+f.size);
          };
          image.src= data;
      };
          reader.readAsDataURL(f);
      }else{
    	  var image = new Image(); 
    	  image.onload =function(){
    		  var width = image.width;
    		  var height = image.height;
    		  var fileSize = image.fileSize;
    		  alert(width+'======'+height+"====="+fileSize);
    	  }
    	  image.src = input.value;
      }
    }
    </script>

————————————————
版权声明：本文为CSDN博主「奇幻屋」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/u014236259/article/details/52885591
<!--stackedit_data:
eyJoaXN0b3J5IjpbNTU5NTYxOTQwXX0=
-->