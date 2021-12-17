---
title: vue图片压缩
date: 2021-12-17 10:50:23
permalink: /pages/10c78d/
categories:
  - jinjie
tags:
  - 
---

<h1 id="图片压缩-vue">图片压缩-vue</h1>
<pre><code>&lt;template&gt;
&lt;div  class="idCard"&gt;
&lt;nav-bar  :navParam="navParam"&gt;&lt;/nav-bar&gt;
&lt;div  class="img"&gt;
&lt;van-uploader  capture="camera"  :after-read="afterRead1"  accept="image/*"&gt;
&lt;img  :src="frontFile.content"  alt&gt;
&lt;/van-uploader&gt;
&lt;van-uploader  capture="camera"  :after-read="afterRead2"  accept="image/*"&gt;
&lt;img  :src="backFile.content"  alt&gt;
&lt;/van-uploader&gt;

&lt;span  class="tip"&gt;温馨提示：拍摄您的二代身份证原件时，请确保图片清晰，四角整齐&lt;/span&gt;
&lt;/div&gt;
&lt;div  class="cell"&gt;
&lt;van-field  v-model="frontData.name"  label="姓名"  @input="nameChange" /&gt;
&lt;van-cell  title="身份证号"  :value="frontData.idCard" /&gt;
&lt;van-cell  title="有效期"  :value="backData.validity" /&gt;
&lt;van-cell  title="签发机关"  :value="backData.issue_authority" /&gt;
&lt;/div&gt;

&lt;van-button  round  type="default"  size="large"  :disabled="btnDisabled"  class="btn mainBtn"	@click="identityImageSave"&gt;提交&lt;/van-button&gt;
&lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
import navBar from  '@/components/navBar.vue'
import {
mapMutations,
mapState
} from  'vuex'
import {
getCarouselFigure,
getProductList,
identityImageGet,
identityImageSave,
parse_ocr_card
} from  '@/api/api'
import {
location
} from  '@/utils/locationUtil'
import lrz from  'lrz'
import {
EXIF
} from  'exif-js'
export  default {
components: {
navBar
},
data() {
return {
idCard1: require('@/assets/img/idCard1.png'),
idCard2: require('@/assets/img/idCard2.png'),
navParam: {
title: '证件照片',
leftTxt: '',
rightTxt: ''
},
disabled1: false,
disabled2: false,
btnDisabled: true,
frontData: {
address: '',
birthday: '',
idCard: '',
name: '',
people: '',
sex: '',
type: ''
},
backData: {
issue_authority: '',
type: '',
validity: ''
},
frontFile: {
file: {},
content: ''
},
backFile: {
file: {},
content: ''
},

files: {
name: '',
type: ''
},
headerImage: null,
upImgUrl: '',
size: '',
sex: ''
}
},
computed: {
...mapState([
'userInformation'  // this.userInformation.userId
])
},

created() {
this.frontFile.content = this.idCard1
this.backFile.content = this.idCard2
this.identityImageGet()
localStorage.getItem('userMsg') &amp;&amp;
this.$store.replaceState(
Object.assign(
this.$store.state,
JSON.parse(localStorage.getItem('userMsg'))
)
)
},

methods: {
identityImageGet() {
const param = {
appType: '3',
userId: this.userInformation.userId,
checkPhoto: '1'
}

identityImageGet(param).then(res  =&gt; {
if (res.code ===  '0000') {
if (Object.keys(res.data).length &gt;  0) {
this.frontFile.content =  'data:image/jpeg;base64,'  + res.data.imageStreamA
this.backFile.content =  'data:image/jpeg;base64,'  + res.data.imageStreamB
this.unQualificate =  false
this.frontData.name = res.data.name
this.frontFile.file.type =  'image/jpeg'
this.backFile.file.type =  'image/jpeg'
this.isMan = res.data.sex ==  1
this.frontData.idCard = res.data.idCard
// this.frontData.idCard = res.data.idCard.replace(
// /(\d{3})\d{11}(\d{4})/,
// '$1********$2'
// )
this.backData.validity =
res.data.idCardStartTime +  '-'  + res.data.idCardEndTime
this.backData.issue_authority = res.data.issuedDep
this.btnDisabled =  false
} else {}
}
})
},

parse_ocr_card(file, imageType) {

// this.fileSrc1 = file;
const param = {
size: this.size,
userId: this.userInformation.userId,
imageStream: file.replace('data:image/jpeg;base64,', '')
}
parse_ocr_card(param).then(res  =&gt; {
this.$toast.clear()
this.$toast(res.message)
if (res.code ==  '0000') {
this.$toast.clear()
if (imageType ==  'FRONT') {
this.frontData = res.data
this.sex = res.data.sex
} else {
this.backData = res.data
}
if (
this.frontData.name &amp;&amp;
this.frontData.idCard &amp;&amp;
this.backData.validity &amp;&amp;
this.backData.issue_authority
) {
this.btnDisabled =  false
} else {
this.btnDisabled =  true
}
} else {
this.$toast(res.message)
}
})
},
nameChange() {
if (
this.frontData.name &amp;&amp;

this.frontData.idCard &amp;&amp;

this.backData.validity &amp;&amp;

this.backData.issue_authority

) {

this.btnDisabled =  false

} else {

this.btnDisabled =  true

}

},


identityImageSave() {

const time = this.backData.validity.split('-')

const idCardStartTime = time[0].replace(/\./g, '-')

const idCardEndTime = time[1].replace(/\./g, '-')

console.log(idCardEndTime, new Date())

const day =  parseInt((new Date(Date.parse(idCardEndTime.replace(/-/g, '/'))).getTime() -  new Date().getTime()) /

(1000  *  60  *  60  *  24))

console.log(day)

if (day &lt;=  30) {

this.$toast('您的身份证有效期小于等于30天，暂时无法进行认证哟！')

return

}

const paramFront = {

userId: this.userInformation.userId,

idCard: this.frontData.idCard,

name: this.frontData.name,

sex: this.frontData.sex.toString(),

liveAddress: this.frontData.address,

birthday: this.frontData.birthday,

imageStream: this.frontFile.content.replace(

'data:image/jpeg;base64,',

''

),

imageFormat: this.frontFile.file.type,

imageType: 'FRONT',

sex: this.sex

}

identityImageSave(paramFront).then(res  =&gt; {

if (res.code ==  '0000') {

const paramBack = {

userId: this.userInformation.userId,

idCardStartTime: idCardStartTime,

idCardEndTime: idCardEndTime,

issuedDep: this.backData.issue_authority,

imageStream: this.backFile.content.replace(

'data:image/jpeg;base64,',

''

),

imageFormat: this.backFile.file.type,

imageType: 'BACK',

sex: this.sex

}

console.log(paramBack)

identityImageSave(paramBack).then(res  =&gt; {

this.$toast(res.message)

if (res.code ==  '0000') {

this.$router.push({

name: 'realName'

})

}

// else this.$toast(res.message)

})

} else this.$toast(res.message)

})

},

  

async  afterRead1(file) {

this.files.name = file.file.name // 获取文件名

this.files.type = file.file.type // 获取类型

this.imgPreview(file.file, 'FRONT')

this.frontFile = file

this.$toast.loading({

mask: true,

duration: 0,

message: '身份证信息识别中...'

})

},

async  afterRead2(file) {

this.files.name = file.file.name // 获取文件名

this.files.type = file.file.type // 获取类型

this.imgPreview(file.file, 'BACK')

this.backFile = file

this.$toast.loading({

mask: true,

duration: 0,

message: '身份证信息识别中...'

})

},

// 处理图片

imgPreview(file, imgType) {

const self = this

let Orientation

// 去获取拍照时的信息，解决拍出来的照片旋转问题

EXIF.getData(file, function () {

Orientation = EXIF.getTag(this, 'Orientation')

})

// 看支持不支持FileReader

if (!file ||  !window.FileReader) return

if (/^image/.test(file.type)) {

// 创建一个reader

const reader =  new FileReader()

// 将图片2将转成 base64 格式

reader.readAsDataURL(file)

// 读取成功后的回调

reader.onloadend  =  function () {

// console.log(this.result);

const result = this.result

const img =  new Image()

img.src = result

// 判断图片是否大于500K,是就直接上传，反之压缩图片

if (this.result.length &lt;=  500  *  1024) {

self.headerImage = this.result

self.parse_ocr_card(self.headerImage, imgType)

} else {

img.onload  =  function () {

const data = self.compress(img, Orientation)

self.headerImage = data

self.showSize(self.headerImage)

self.parse_ocr_card(self.headerImage, imgType)

}

}

}

}

},

// 压缩图片

compress(img, Orientation) {

// this.$toast(img.src.length/1024+'k');

const canvas = document.createElement('canvas')

const ctx = canvas.getContext('2d')

// 瓦片canvas

const tCanvas = document.createElement('canvas')

const tctx = tCanvas.getContext('2d')

// let initSize = img.src.length;

let width = img.width

let height = img.height

// 如果图片大于四百万像素，计算压缩比并将大小压至400万以下

let ratio

if ((ratio = (width * height) /  4000000) &gt;  1) {

// console.log("大于400万像素");

ratio =  Math.sqrt(ratio)

width /= ratio

height /= ratio

} else {

ratio =  1

}

canvas.width = width

canvas.height = height

// 铺底色

ctx.fillStyle =  '#fff'

ctx.fillRect(0, 0, canvas.width, canvas.height)

// 如果图片像素大于100万则使用瓦片绘制

let count

if ((count = (width * height) /  1000000) &gt;  1) {

// console.log("超过100W像素");

count =  ~~(Math.sqrt(count) +  1) // 计算要分成多少块瓦片

// 计算每块瓦片的宽和高

const nw =  ~~(width / count)

const nh =  ~~(height / count)

tCanvas.width = nw

tCanvas.height = nh

for (let i =  0; i &lt; count; i++) {

for (let j =  0; j &lt; count; j++) {

tctx.drawImage(

img,

i * nw * ratio,

j * nh * ratio,

nw * ratio,

nh * ratio,

0,

0,

nw,

nh

)

ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)

}

}

} else {

ctx.drawImage(img, 0, 0, width, height)

}

// 修复ios上传图片的时候 被旋转的问题

if (Orientation !=  ''  &amp;&amp; Orientation !=  1) {

switch (Orientation) {

case  6: // 需要顺时针（向左）90度旋转

this.rotateImg(img, 'left', canvas)

break

case  8: // 需要逆时针（向右）90度旋转

this.rotateImg(img, 'right', canvas)

break

case  3: // 需要180度旋转

this.rotateImg(img, 'right', canvas) // 转两次

this.rotateImg(img, 'right', canvas)

break

}

}

// 进行最小压缩

const ndata = canvas.toDataURL('image/jpeg', 0.5)

tCanvas.width = tCanvas.height = canvas.width = canvas.height =  0

// console.log('ndata',ndata);

return ndata

},

// 旋转图片

rotateImg(img, direction, canvas) {

// 最小与最大旋转方向，图片旋转4次后回到原方向

const min_step =  0

const max_step =  3

if (img ==  null) return

// img的高度和宽度不能在img元素隐藏后获取，否则会出错

const height = img.height

const width = img.width

let step =  2

if (step ==  null) {

step = min_step

}

if (direction ==  'right') {

step++

// 旋转到原位置，即超过最大值

step &gt; max_step &amp;&amp; (step = min_step)

} else {

step--

step &lt; min_step &amp;&amp; (step = max_step)

}

// 旋转角度以弧度值为参数

const degree = (step *  90  *  Math.PI) /  180

const ctx = canvas.getContext('2d')

switch (step) {

case  0:

canvas.width = width

canvas.height = height

ctx.drawImage(img, 0, 0)

break

case  1:

canvas.width = height

canvas.height = width

ctx.rotate(degree)

ctx.drawImage(img, 0, -height)

break

case  2:

canvas.width = width

canvas.height = height

ctx.rotate(degree)

ctx.drawImage(img, -width, -height)

break

case  3:

canvas.width = height

canvas.height = width

ctx.rotate(degree)

ctx.drawImage(img, -width, 0)

break

}

},

// 将base64转换为文件

dataURLtoFile(dataurl) {

var arr = dataurl.split(','),

bstr =  atob(arr[1]),

n = bstr.length,

u8arr =  new Uint8Array(n)

while (n--) {

u8arr[n] = bstr.charCodeAt(n)

}

return  new File([u8arr], this.files.name, {

type: this.files.type

})

},

async  postImg() {

const file = this.dataURLtoFile(this.headerImage)

const formData =  new window.FormData()

formData.append('file', file)

toast_loding(this, '图片上传中···')

try {

const res =  await util.ajax.post(this.upImgUrl, formData, {

headers: {

'Content-Type': 'multipart/form-data'

}

})

} catch (e) {

console.log(e)

}

},

showSize(base64url) {

// 获取base64图片大小，返回MB数字

var str = base64url.replace('data:image/jpeg;base64,', '')

var equalIndex = str.indexOf('=')

if (str.indexOf('=') &gt;  0) {

str = str.substring(0, equalIndex)

}

var strLength = str.length

var fileLength =  parseInt(strLength - (strLength /  8) *  2)

// 由字节转换为MB

var size =  ''

size = (fileLength /  1024).toFixed(2)

var sizeStr = size +  ''  // 转成字符串

var index = sizeStr.indexOf('.') // 获取小数点处的索引

var dou = sizeStr.substr(index +  1, 2) // 获取小数点后两位的值

if (dou ==  '00') {

// 判断后两位是否为00，如果是则删除00

return sizeStr.substring(0, index) + sizeStr.substr(index +  3, 2)

}

this.size =  parseInt(size)

return  parseInt(size)

},

// 连接摄像头

connectCamera() {

navigator.getMedia =

navigator.getUserMedia ||

navigator.webkitGetUserMedia ||

navigator.mozGetUserMeddia ||

navigator.msGetUserMedia

const that = this

if (navigator.mediaDevices &amp;&amp; navigator.mediaDevices.getUserMedia) {

navigator.mediaDevices

.getUserMedia({

video: true,

audio: true

})

.then(function (stream) {

console.log(stream)

that.stream = stream

that.cameraState =  true

that.stream =

typeof stream.stop ===  'function'  ?

stream :

stream.getTracks()[1]

console.log(that.stream)

var smallVideo =  $('.smallVideo')[0]

var bigVideo =  $('.bigVideo')[0]

smallVideo.src = (window.URL || window.webkitURL).createObjectURL(

stream

)

bigVideo.src = (window.URL || window.webkitURL).createObjectURL(

stream

)

smallVideo.play()

bigVideo.play()

})

.catch(function (err) {

console.log(err)

})

}

// 使用旧方法打开摄像头

else  if (navigator.getMedia) {

navigator.getMedia({

video: true

},

function (stream) {

console.log(stream)

that.stream = stream

that.cameraState =  true

that.stream = stream.getTracks()[0]

console.log(that.stream)

var smallVideo =  $('.smallVideo')[0]

var bigVideo =  $('.bigVideo')[0]

smallVideo.src = (window.URL || window.webkitURL).createObjectURL(

stream

)

bigVideo.src = (window.URL || window.webkitURL).createObjectURL(

stream

)

smallVideo.play()

bigVideo.play()

},

function (err) {

console.log(err)

}

)

}

},

  

// 关闭摄像头

closeCamera() {

this.cameraState =  false

this.stream &amp;&amp; this.stream.stop()

},

  

// 点击拍摄或集鸽拍摄

reCamera(foot_ring_sn) {

console.log('拍照调用')

var smallCanvas =  $('.smallCanvas')[0]

var smallContext = smallCanvas.getContext('2d')

const smallVideo =  $('.smallVideo')[0]

smallContext.drawImage(smallVideo, 0, 0, 270, 200)

// 拍好的图片显示

// smallCanvas.toDataURL('image/png').split(",")[1]

}

}

}

&lt;/script&gt;

&lt;style  lang="less"&gt;

.idCard {

padding-bottom: 20px;

  

img {

display: block;

width: 100%;

margin: 0  auto;

}

  

.img {

width: 80%;

margin: 0  auto;

padding: 20px  0;

  

img {

margin-bottom: 20px;

}

  

.tip {

color: #999;

font-size: 13px;

display: block;

}

}

  

.cell {

background: #fff;

  

.van-cell {

padding: 20px  15px;

  

.van-field__control {

text-align: right;

}

  

.van-cell__value {

color: #323233;

}

}

}

  

.btn {

width: 80%;

margin-top: 50px;

}

}

&lt;/style&gt;
</code></pre>

