// 请注意在使用前一定要给parentEl加上相对定位或者绝对定位, parentEl为包裹移动框的容器,childEl为需要移动的容器
let _this;
let isMove = false
let overflow,overflowX, overflowY
export class Drag {
  constructor(parentEl,childEl) {
    this.position = {
      x: null,
      y: null
    }
    this.flags = false
    this.maxWidth = null
    this.maxHeight = null
    this.dx = null
    this.dy = null
    this.nx = null
    this.ny = null
    this.xPum = null
    this.yPum = null
    this.parentEl = parentEl
    this.childEl = childEl
    console.log('this.parentEl---', this.parentEl)
    this.maxWidth = parentEl.offsetWidth - childEl.offsetWidth
    this.maxHeight = parentEl.offsetHeight - childEl.offsetHeight
    console.log('移动最大位置---',this.maxWidth, this.maxHeight)
    _this = this
    console.log('this---',this)
    childEl.addEventListener('mousedown',_this.down,false)
    childEl.addEventListener('mouseup',_this.end, false)
  }
  down (e) {
    e = e || window.e
    _this.flags = true;
    e.stopPropagation()
    if(e.buttons == 1) {
      console.log('x--', e.clientX)
      _this.position.x = e.clientX
      _this.position.y = e.clientY
      _this.dx = _this.childEl.offsetLeft
      _this.dy = _this.childEl.offsetTop
      _this.parentEl.addEventListener('mousemove', _this.move, false)
      _this.parentEl.addEventListener('mouseleave', _this.end, false)
    }
  }
  move (e) {
    if(_this.flags){
      console.log('move')
      // if (!isMove){
      //   let positionSty = getComputedStyle(_this.parentEl);
      //   console.log('positionSty---', positionSty)
      //   _this.childEl.style.position = "absolute"
      //   if(positionSty !== 'relative' || positionSty !== 'absolute'){
      //     console.log('添加定位属性')
      //     _this.parentEl.style.position = "relative"
      //   }
      // }
        _this.childEl.style.position = "absolute"
      // 保存好overflow样式
      let positionSty = getComputedStyle(_this.parentEl)
      overflow = positionSty.overflow
      overflowX = positionSty.overflowX
      overflowY = positionSty.overflowY
      // isMove = true

      _this.nx = e.clientX - _this.position.x;
      _this.ny = e.clientY - _this.position.y;
      _this.xPum = _this.dx+_this.nx;
      _this.yPum = _this.dy+_this.ny;
      if (_this.xPum < 0) {
        // _this.xPum = 0
      } else if (_this.xPum > _this.maxWidth) {
        _this.parentEl.style.overflowX = "hidden"
        // _this.xPum = _this.maxWidth
      }
      if (_this.yPum < 0) {
        // _this.yPum = 0
      } else if (_this.yPum > _this.maxHeight) {
        _this.parentEl.style.overflowY = "hidden"
        // _this.yPum = _this.maxHeight
      }
      _this.childEl.style.left = _this.xPum+"px";
      _this.childEl.style.top = _this.yPum +"px";
      //阻止页面的滑动默认事件
      // document.addEventListener("touchmove",function(){
      //     event.preventDefault();
      // },false);
    }
  }
  end (e) {
    console.log('鼠标弹起')
    _this.flags = false;
    if (_this.xPum < 0) {
      _this.xPum = 0
      _this.childEl.style.left = _this.xPum+"px";
      _this.childEl.style.transition = "all 1s ease"
    } else if (_this.xPum > _this.maxWidth) {
      _this.xPum = _this.maxWidth
      console.log('设置隐藏')
      _this.childEl.style.left = _this.xPum+"px";
      _this.childEl.style.transition = "all 1s ease"
    }
    if (_this.yPum < 0) {
      _this.yPum = 0
      _this.childEl.style.top = _this.yPum +"px";
      _this.childEl.style.transition = "all 1s ease"
    } else if (_this.yPum > _this.maxHeight) {
      _this.yPum = _this.maxHeight
      _this.childEl.style.top = _this.yPum +"px";
      _this.childEl.style.transition = "all 1s ease"
    }
    isMove = false
    _this.parentEl.removeEventListener('mousemove', _this.move)
    setTimeout(function(){
      _this.childEl.style.transition = "none"
      _this.parentEl.style.overflowY = overflowY || overflow
      _this.parentEl.style.overflowX = overflowX || overflow
    }, 1000)
  }
}