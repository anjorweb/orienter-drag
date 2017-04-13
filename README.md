### 陀螺仪+拖动

主要做备忘用，平时项目也常用到

采用backbone简版框架，可以拆出来使用

gesture.js  拖动组件

orienter.js 陀螺仪组件



**3D场景采用THREE.js构建**

Bone、旋转、拖动组件使用的是 shrek 提供的，作者地址：https://github.com/shrekshrek

Orienter.js组件默认返回的是角度，gesture.js组件也是，所以和threejs结合旋转的时候，需要将角度转换为弧度。

默认已经限制了上下视角+-90度角度