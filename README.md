gesture.js  拖动组件

orienter.js 陀螺仪组件

3D场景采用THREE.js构建

旋转和拖动组件使用的是 shrek 提供的，作者地址：https://github.com/shrekshrek

Orienter.js组件默认返回的是角度，gesture.js组件也是，所以和threejs结合旋转的时候，需要将角度转换为弧度。

默认已经限制了上下视角+-90度角度