# 项目简介

一个可在PC和移动端的浏览器中进行前端图片剪裁的库。使用Rollup 和Gulp 自行搭建了一个基于TypeScript、 PostCSS的项目。为了实现前端进行图片剪裁处理，使用了Canvas 。

展示地址：<a href="http://test.leichenlong.com/lcl-image-cropper/" target="_blank">http://test.leichenlong.com/lcl-image-cropper/</a>

## 功能介绍

1. 移动/PC端都可以使用
2. 使用canvas 进行图片剪裁处理
3. 可以处理直接处理图片（即File 类型），也可以处理base64格式的图片
4. 可以获取处理之后的Blob 类型的数据进行其他处理，也可以直接下载
5. 可配置
   - 需要将预览图片插入的位置
   - 输出图片的大小
   - 输出图片的类型
   - 输出图片的名字
   - 初始选择区域的大小
   - 选择区域的最小宽高
   - 选择区域是否可以自由缩放

## 待处理

- 需要重构项目结构

## 安装方法

npm install lcl-image-cropper