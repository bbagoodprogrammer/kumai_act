var Rollup = function (options) {
    if (!this instanceof Rollup) {
      return new Rollup();
    }
    this.target = {
      boxNode: document,
      rollupDoms: document.children,
      rollupCount: 0,
      loop: 1, // >= 1
      timeInterval: 0.3, // 间隔
      speed: 300, // px / s（平均速度）
      result: [0, 0, 0, 0, 0]
    }
    this.transitionName = getTransName('transition', true);
    this.transformName = getTransName('transform', true);
    this.boxH = 0;
    this.childH = 0;
    this.dist = 0; // childH * loop
    this.time = 0; // dist / speed
   
    this.copyList = function (rollupDom) {
      var fragment = document.createDocumentFragment();
      var nodes = rollupDom.children;
      for (var j = 0; j < nodes.length; j++) {
        fragment.appendChild(nodes[j].cloneNode(true));
      }
      rollupDom.appendChild(fragment);
    }
    this.init = function (options) {
      this.target = Object.assign({}, this.target, options);
   
      if (this.target.rollupDoms instanceof HTMLCollection) {
        this.target.rollupDoms = Array.prototype.slice.call(this.target.rollupDoms);
      }
      this.target.rollupCount = this.target.rollupDoms.length; // 5
   
      if (this.target.rollupCount === 0) {
        return;
      }
   
      this.boxH = parseInt(getStyle(this.target.boxNode, 'height'));
      this.childH = parseInt(getStyle(this.target.rollupDoms[0], 'height'));
      this.dist = this.childH * this.target.loop;
   
      this.time = this.dist / this.target.speed;
   
      // 添加过渡
      for (var i = 0; i < this.target.rollupCount; i++) {
        // 拷贝
        for (var x = 0; x < this.target.loop; x++) {
          this.copyList(this.target.rollupDoms[i]);
        }
        
      }
    }
    
    this.init(options);
    return this;
  }
   
   
  Rollup.prototype.start = function (result, callback) {
   
    for (var i = 0; i < this.target.rollupDoms.length; i++) {
      var y;
      if (result instanceof Array) {
        y = this.dist + result[i] * this.boxH;
      } else {
        y = this.dist + this.target.result[i] * this.boxH;
      }
      this.target.rollupDoms[i].style[this.transitionName] = this.transformName + ' ' + this.time + 's ease-in-out ' + (this.target.timeInterval * i) + 's';
      this.target.rollupDoms[i].style[this.transformName] = 'translateY(-' + y + 'px)';
    }
   
    // 这里的回调用 transitionend 实现更为合理
    setTimeout(function () {
      callback();
    }, (this.time + this.target.timeInterval * this.target.rollupCount) * 1000);
   
    return this;
  }
   
  Rollup.prototype.reset = function () {
    for (var i = 0; i < this.target.rollupDoms.length; i++) {
      this.target.rollupDoms[i].style[this.transitionName] = '';
      this.target.rollupDoms[i].style[this.transformName] = 'translateY(0px)';
    }
    return this;
  }
   
   
  function getTransName (name, isJs) {
    name = name || 'transform';
    var div = document.createElement('div');
    var jsArr = ['t', 'webkitT', 'msT', 'OT', 'MozT'];
    var cssArr = ['', '-webkit-', '-ms-', '-o-', '-moz-'];
    for (var i = 0; i < jsArr.length; i++) {
      var str = jsArr[i] + '' + name.substring(1);
      if (str in div.style) {
        if (isJs) {
          return jsArr[i] + name.substring(1);
        } else {
          return cssArr[i] + name;
        }
      }
    }
    return false;
  }
   
  function getStyle (ele, attr) {
    if (window.getComputedStyle) {
      return window.getComputedStyle(ele, null)[attr];
    }
    return ele.currentStyle[attr];
}
export default Rollup