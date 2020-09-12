(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = "a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:\"\";content:none}table{border-collapse:collapse;border-spacing:0}";
  styleInject(css_248z);

  var css_248z$1 = ".main__crop-main__2Xu2i{position:relative;height:400px;width:500px;overflow:hidden}.main__crop-main__2Xu2i .main__crop-bottom-box__12vLt{position:absolute;background:#000;height:100%;width:100%}.main__crop-main__2Xu2i .main__crop-bottom-box__12vLt img{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.main__crop-main__2Xu2i .main__crop-mask__M2Lxd{position:absolute;top:0;left:0;height:100%;width:100%;background:rgba(0,0,0,.5)}.main__crop-main__2Xu2i .main__crop-box__3wkxc{position:absolute;top:50px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.main__crop-main__2Xu2i .main__crop-box__3wkxc .main__crop-box-img__2qWsz{overflow:hidden;height:100%}.main__crop-main__2Xu2i .main__crop-box__3wkxc .main__crop-box-move__1aJO-{position:absolute;top:0;left:0;width:100%;height:100%;cursor:move}.main__crop-main__2Xu2i .main__crop-box__3wkxc .main__crop-box-info__1ILcD{position:absolute;left:0;top:-21px;cursor:default;min-width:65px;text-align:center;color:#fff;line-height:20px;background-color:rgba(0,0,0,.8);font-size:12px}.main__crop-main__2Xu2i .main__crop-box__3wkxc .main__crop-box-point-line-wrapper__289IK .main__crop-line__1-vEG{position:absolute;display:block;width:100%;height:100%;opacity:.1}.main__crop-main__2Xu2i .main__crop-box__3wkxc .main__crop-box-point-line-wrapper__289IK .main__crop-line-top__2gG5M{top:-3px;left:0;height:5px;cursor:n-resize}.main__crop-main__2Xu2i .main__crop-box__3wkxc .main__crop-box-point-line-wrapper__289IK .main__crop-line-right__176v6{top:0;right:-3px;width:5px;cursor:e-resize}.main__crop-main__2Xu2i .main__crop-box__3wkxc .main__crop-box-point-line-wrapper__289IK .main__crop-line-bottom__3Ca1o{bottom:-3px;left:0;height:5px;cursor:s-resize}.main__crop-main__2Xu2i .main__crop-box__3wkxc .main__crop-box-point-line-wrapper__289IK .main__crop-line-left__2jeu5{top:0;left:-3px;width:5px;cursor:w-resize}.main__crop-main__2Xu2i .main__crop-box__3wkxc .main__crop-box-point-line-wrapper__289IK .main__crop-point__15KQj{position:absolute;width:8px;height:8px;opacity:.75;background-color:#39f;border-radius:100%}.main__crop-main__2Xu2i .main__crop-box__3wkxc .main__crop-box-point-line-wrapper__289IK .main__crop-point1__2PZiE{top:-4px;left:-4px;cursor:nw-resize;z-index:10}.main__crop-main__2Xu2i .main__crop-box__3wkxc .main__crop-box-point-line-wrapper__289IK .main__crop-point2__KsQWe{top:-5px;left:50%;margin-left:-3px;cursor:n-resize;z-index:10}.main__crop-main__2Xu2i .main__crop-box__3wkxc .main__crop-box-point-line-wrapper__289IK .main__crop-point3__3c0so{top:-4px;right:-4px;cursor:ne-resize;z-index:10}.main__crop-main__2Xu2i .main__crop-box__3wkxc .main__crop-box-point-line-wrapper__289IK .main__crop-point4__3c9hU{top:50%;left:-4px;margin-top:-3px;cursor:w-resize;z-index:10}.main__crop-main__2Xu2i .main__crop-box__3wkxc .main__crop-box-point-line-wrapper__289IK .main__crop-point5__3L_Nc{top:50%;right:-4px;margin-top:-3px;cursor:e-resize;z-index:10}.main__crop-main__2Xu2i .main__crop-box__3wkxc .main__crop-box-point-line-wrapper__289IK .main__crop-point6__3CWwi{bottom:-5px;left:-4px;cursor:sw-resize;z-index:10}.main__crop-main__2Xu2i .main__crop-box__3wkxc .main__crop-box-point-line-wrapper__289IK .main__crop-point7__1Ymsl{bottom:-5px;left:50%;margin-left:-3px;cursor:s-resize;z-index:10}.main__crop-main__2Xu2i .main__crop-box__3wkxc .main__crop-box-point-line-wrapper__289IK .main__crop-point8__3-RHx{bottom:-5px;right:-4px;cursor:se-resize;z-index:10}";
  styleInject(css_248z$1);

})));
