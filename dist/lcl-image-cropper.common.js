"use strict";var t="main__crop-main__2Xu2i",o="main__crop-bottom-box__12vLt",e="main__crop-mask__M2Lxd",i="main__crop-box__3wkxc",n="main__crop-box-img__2qWsz",r="main__crop-box-move__1aJO-",p="main__crop-box-info__1ILcD",a="main__crop-box-point-line-wrapper__289IK",s="main__crop-line__1-vEG",c="main__crop-line-top__2gG5M",l="main__crop-line-right__176v6",m="main__crop-line-bottom__3Ca1o",_="main__crop-line-left__2jeu5",d="main__crop-point__15KQj",h="main__crop-point1__2PZiE",u="main__crop-point2__KsQWe",x="main__crop-point3__3c0so",f="main__crop-point4__3c9hU",v="main__crop-point5__3L_Nc",w="main__crop-point6__3CWwi",g="main__crop-point7__1Ymsl",b="main__crop-point8__3-RHx",y=function(t,o){var e=document.createElement(t);if(o)for(var i=0,n=o;i<n.length;i++){var r=n[i];e.classList.add(r)}return e},L=function(){this.cropBottomBoxMain=y("div",[o]),this.img=y("img"),this.cropBottomBoxMain.append(this.img)},M=function(){this.cropLineTop=y("span",[s,c]),this.cropLineRight=y("span",[s,l]),this.cropLineBottom=y("span",[s,m]),this.cropLineLeft=y("span",[s,_]),this.cropPoint1=y("span",[d,h]),this.cropPoint2=y("span",[d,u]),this.cropPoint3=y("span",[d,x]),this.cropPoint4=y("span",[d,f]),this.cropPoint5=y("span",[d,v]),this.cropPoint6=y("span",[d,w]),this.cropPoint7=y("span",[d,g]),this.cropPoint8=y("span",[d,b]),this.cropBoxPointLineWrapperMain=y("div",[a]),this.cropBoxPointLineWrapperMain.append(this.cropLineTop,this.cropLineRight,this.cropLineBottom,this.cropLineLeft,this.cropPoint1,this.cropPoint2,this.cropPoint3,this.cropPoint4,this.cropPoint5,this.cropPoint6,this.cropPoint7,this.cropPoint8)},B=function(){this.cropBoxImgMain=y("div",[n]),this.img=y("img"),this.cropBoxImgMain.append(this.img)},X=function(){this.cropBoxInfoMain=y("div",[p]),this.infoWidth=y("span"),this.infoHeight=y("span"),this.cropBoxInfoMain.append(this.infoWidth,document.createTextNode(" x "),this.infoHeight)},E=function(){this.cropBoxMain=y("div",[i]),this.cropBoxImgObj=new B,this.cropBoxMove=y("div",[r]),this.cropBoxInfoObj=new X,this.cropBoxPointLineWrapperObj=new M,this.cropBoxMain.append(this.cropBoxImgObj.cropBoxImgMain,this.cropBoxMove,this.cropBoxInfoObj.cropBoxInfoMain,this.cropBoxPointLineWrapperObj.cropBoxPointLineWrapperMain)},P=function(){function o(o,i,n){var r=this;this.cropMainMain=y("div",[t]),this.cropBottomBox=new L,this.cropMask=y("div",[e]),this.cropBox=new E,this.cropMainMain.append(this.cropBottomBox.cropBottomBoxMain,this.cropMask,this.cropBox.cropBoxMain),this.cropBottomBox.img.onload=function(t){var e=r.cropBox.cropBoxMain,p=r.cropBox.cropBoxImgObj.img,a=r.cropBottomBox.img,s=r.cropBox.cropBoxInfoObj.infoWidth,c=r.cropBox.cropBoxInfoObj.infoHeight,l=t.target,m=l.height;o(l.width,l.height);var _=l.height/300,d=l.width/_;e.style.left=Math.floor((500-d)/2)+"px",e.style.width=(i||Math.floor(d/2))+"px",e.style.height=(n||150)+"px",e.style.transform="translate3d(0px, 0px, 0px)",p.style.width=d+"px",p.style.height="300px",p.style.transform="translate3d(0px, 0px, 0px)",a.style.height="300px",c.innerHTML=""+(i||Math.floor(d/2)),s.innerHTML=""+(n||150),r.proportion=l.height/m}}return o.prototype.getProportion=function(){return this.proportion?this.proportion:0},o}(),Y=function(){function t(){}return t.move=function(t,o,e){var i=!1,n={clientX:0,clientY:0},r={clientX:0,clientY:0};function p(t){var p=t;if(i){var a=p.clientX-n.clientX+r.clientX,s=parseFloat(e.style.width)-parseFloat(o.style.width);a>s&&(a=s),a<0&&(a=0);var c=p.clientY-n.clientY+r.clientY,l=parseFloat(e.style.height)-parseFloat(o.style.height);c>l&&(c=l),c<0&&(c=0),e.style.transform="translate3d("+-a+"px, "+-c+"px, 0px)",o.style.transform="translate3d("+a+"px, "+c+"px, 0px)"}}function a(){i=!1,window.removeEventListener("mousemove",p),window.removeEventListener("mouseup",a)}t.addEventListener("mousedown",(function(t){var e=t,s=o.style.transform.match(/[0-9\.-]+/g);i=!0,n.clientX=e.clientX,n.clientY=e.clientY,s&&(r.clientX=Number(s[1]),r.clientY=Number(s[2])),window.addEventListener("mousemove",p),window.addEventListener("mouseup",a)}))},t.lineAndPointTop=function(t,o,e,i,n){void 0===n&&(n=20);var r,p,a=!1,s={clientX:0,clientY:0};function c(){a=!1,window.removeEventListener("mouseup",c),window.removeEventListener("mousemove",l)}function l(t){if(a){var c=-(t.clientY-r),l=c+p,m=parseFloat(e.style.height),_=m-parseFloat(o.style.height),d=s.clientX,h=s.clientY-c;l>m-h&&(l=m-h),(h>=0&&h<=_&&l>=n||l<p&&l>=n)&&(e.style.transform="translate3d("+-d+"px, "+-h+"px, 0px)",o.style.transform="translate3d("+d+"px, "+h+"px, 0px)",o.style.height=l+"px",i.innerHTML=""+Math.round(l))}}t.addEventListener("mousedown",(function(t){var e=o.style.transform.match(/[0-9\.-]+/g);a=!0,r=t.clientY,e&&(s.clientX=Number(e[1]),s.clientY=Number(e[2])),p=parseFloat(o.style.height),window.addEventListener("mouseup",c),window.addEventListener("mousemove",l)}))},t.lineAndPointBottom=function(t,o,e,i,n){void 0===n&&(n=20);var r,p,a=!1,s={clientX:0,clientY:0};function c(){a=!1,window.removeEventListener("mouseup",c),window.removeEventListener("mousemove",l)}function l(t){if(a){var c=-(t.clientY-r),l=p-c,m=parseFloat(e.style.height),_=s.clientY;l>m-_&&(l=m-_),m-_>=l&&l>=n&&(o.style.height=l+"px",i.innerHTML=""+Math.round(l))}}t.addEventListener("mousedown",(function(t){var e=o.style.transform.match(/[0-9\.-]+/g);a=!0,r=t.clientY,e&&(s.clientX=Number(e[1]),s.clientY=Number(e[2])),p=parseFloat(o.style.height),window.addEventListener("mouseup",c),window.addEventListener("mousemove",l)}))},t.lineAndPointLeft=function(t,o,e,i,n){void 0===n&&(n=20);var r,p,a=!1,s={clientX:0,clientY:0};function c(){a=!1,window.removeEventListener("mouseup",c),window.removeEventListener("mousemove",l)}function l(t){if(a){var c=-(t.clientX-r),l=c+p,m=parseFloat(e.style.width),_=m-parseFloat(o.style.width),d=s.clientX-c,h=s.clientY;l>m-d&&(l=m-d),(d>=0&&d<=_&&l>=n||l<p&&l>=n)&&(e.style.transform="translate3d("+-d+"px, "+-h+"px, 0px)",o.style.transform="translate3d("+d+"px, "+h+"px, 0px)",o.style.width=l+"px",i.innerHTML=""+Math.round(l))}}t.addEventListener("mousedown",(function(t){var e=o.style.transform.match(/[0-9\.-]+/g);a=!0,r=t.clientX,e&&(s.clientX=Number(e[1]),s.clientY=Number(e[2])),p=parseFloat(o.style.width),window.addEventListener("mouseup",c),window.addEventListener("mousemove",l)}))},t.lineAndPointRight=function(t,o,e,i,n){void 0===n&&(n=20);var r,p,a=!1,s={clientX:0,clientY:0};function c(){a=!1,window.removeEventListener("mouseup",c),window.removeEventListener("mousemove",l)}function l(t){if(a){var c=-(t.clientX-r),l=p-c,m=parseFloat(e.style.width),_=s.clientX;l>m-_&&(l=m-_),m-_>=l&&l>=n&&(o.style.width=l+"px",i.innerHTML=""+Math.round(l))}}t.addEventListener("mousedown",(function(t){var e=o.style.transform.match(/[0-9\.-]+/g);a=!0,r=t.clientX,e&&(s.clientX=Number(e[1]),s.clientY=Number(e[2])),p=parseFloat(o.style.width),window.addEventListener("mouseup",c),window.addEventListener("mousemove",l)}))},t.pointLeftAndTop=function(t,o,e,i,n,r,p){void 0===p&&(p=20);var a,s,c,l,m,_=!1,d={clientX:0,clientY:0};function h(){_=!1,window.removeEventListener("mouseup",h),window.removeEventListener("mousemove",u)}function u(t){var r=t;if(_){var h=void 0,u=void 0;h=-(r.clientY-a),u=-(r.clientX-s),u=Math.abs(h)>Math.abs(u)?h*m:(h=u/m)*m;var x=h+c,f=u+l,v=parseFloat(e.style.width),w=parseFloat(e.style.height),g=v-parseFloat(o.style.width),b=w-parseFloat(o.style.height),y=d.clientX-u,L=d.clientY-h;if(x>w-L)return;if(f>v-y)return;(L>=0&&L<=b&&x>=p&&y>=0&&y<=g&&f>=p||x<c&&x>=p&&f<l&&f>=p)&&(e.style.transform="translate3d("+-y+"px, "+-L+"px, 0px)",o.style.transform="translate3d("+y+"px, "+L+"px, 0px)",o.style.height=x+"px",o.style.width=f+"px",n.innerHTML=""+Math.round(x),i.innerHTML=""+Math.round(f))}}t.addEventListener("mousedown",(function(t){var e=o.style.transform.match(/[0-9\.-]+/g);_=!0,s=t.clientX,a=t.clientY,e&&(d.clientX=Number(e[1]),d.clientY=Number(e[2])),c=parseFloat(o.style.height),l=parseFloat(o.style.width),m=r||l/c,window.addEventListener("mouseup",h),window.addEventListener("mousemove",u)}))},t.pointRightAndTop=function(t,o,e,i,n,r,p){void 0===p&&(p=20);var a,s,c,l,m=!1,_={clientX:0,clientY:0};function d(){m=!1,window.removeEventListener("mouseup",d),window.removeEventListener("mousemove",h)}function h(t){if(m){var r=-(t.clientY-a),d=r+s,h=r*l+c,u=parseFloat(e.style.width),x=parseFloat(e.style.height),f=u-parseFloat(o.style.width),v=x-parseFloat(o.style.height),w=_.clientX,g=_.clientY-r;if(d>x-g)return;if(h>u-w)return;(g>=0&&g<=v&&d>=p&&w>=0&&w<=f&&h>=p||d<s&&d>=p&&h<c&&h>=p)&&(e.style.transform="translate3d("+-w+"px, "+-g+"px, 0px)",o.style.transform="translate3d("+w+"px, "+g+"px, 0px)",o.style.height=d+"px",o.style.width=h+"px",n.innerHTML=""+Math.round(d),i.innerHTML=""+Math.round(h))}}t.addEventListener("mousedown",(function(t){var e=o.style.transform.match(/[0-9\.-]+/g);m=!0,a=t.clientY,e&&(_.clientX=Number(e[1]),_.clientY=Number(e[2])),s=parseFloat(o.style.height),c=parseFloat(o.style.width),l=r||c/s,window.addEventListener("mouseup",d),window.addEventListener("mousemove",h)}))},t.pointLeftAndBottom=function(t,o,e,i,n,r,p){void 0===p&&(p=20);var a,s,c,l,m=!1,_={clientX:0,clientY:0};function d(){m=!1,window.removeEventListener("mouseup",d),window.removeEventListener("mousemove",h)}function h(t){if(m){var r=t.clientY-a,d=r*l,h=r+s,u=d+c,x=parseFloat(e.style.width),f=parseFloat(e.style.height),v=x-parseFloat(o.style.width),w=f-parseFloat(o.style.height),g=_.clientX-d,b=_.clientY;if(h>f-b)return;if(u>x-g)return;(b>=0&&b<=w&&h>=p&&g>=0&&g<=v&&u>=p||h<s&&h>=p&&u<c&&u>=p)&&(e.style.transform="translate3d("+-g+"px, "+-b+"px, 0px)",o.style.transform="translate3d("+g+"px, "+b+"px, 0px)",o.style.height=h+"px",o.style.width=u+"px",n.innerHTML=""+Math.round(h),i.innerHTML=""+Math.round(u))}}t.addEventListener("mousedown",(function(t){var e=o.style.transform.match(/[0-9\.-]+/g);m=!0,a=t.clientY,e&&(_.clientX=Number(e[1]),_.clientY=Number(e[2])),s=parseFloat(o.style.height),c=parseFloat(o.style.width),l=r||c/s,window.addEventListener("mouseup",d),window.addEventListener("mousemove",h)}))},t.pointRightAndBottom=function(t,o,e,i,n,r,p){void 0===p&&(p=20);var a,s,c,l,m,_=!1,d={clientX:0,clientY:0};function h(){_=!1,window.removeEventListener("mouseup",h),window.removeEventListener("mousemove",u)}function u(t){var r=t;if(_){var h=void 0,u=void 0;u=r.clientY-s,h=r.clientX-a,h=Math.abs(u)>Math.abs(h)?u*m:(u=h/m)*m;var x=u+c,f=h+l,v=parseFloat(e.style.width),w=parseFloat(e.style.height),g=v-parseFloat(o.style.width),b=w-parseFloat(o.style.height),y=d.clientX,L=d.clientY;if(x>w-L)return;if(f>v-y)return;(L>=0&&L<=b&&x>=p&&y>=0&&y<=g&&f>=p||x<c&&x>=p&&f<l&&f>=p)&&(e.style.transform="translate3d("+-y+"px, "+-L+"px, 0px)",o.style.transform="translate3d("+y+"px, "+L+"px, 0px)",o.style.height=x+"px",o.style.width=f+"px",n.innerHTML=""+Math.round(x),i.innerHTML=""+Math.round(f))}}t.addEventListener("mousedown",(function(t){var e=o.style.transform.match(/[0-9\.-]+/g);_=!0,a=t.clientX,s=t.clientY,e&&(d.clientX=Number(e[1]),d.clientY=Number(e[2])),c=parseFloat(o.style.height),l=parseFloat(o.style.width),m=r||l/c,window.addEventListener("mouseup",h),window.addEventListener("mousemove",u)}))},t}(),F=function(){function t(){}return t.move=function(t,o,e){var i=!1,n={clientX:0,clientY:0},r={clientX:0,clientY:0};function p(t){var p=t;if(i){var a=p.touches[0].clientX-n.clientX+r.clientX,s=parseFloat(e.style.width)-parseFloat(o.style.width);a>s&&(a=s),a<0&&(a=0);var c=p.touches[0].clientY-n.clientY+r.clientY,l=parseFloat(e.style.height)-parseFloat(o.style.height);c>l&&(c=l),c<0&&(c=0),e.style.transform="translate3d("+-a+"px, "+-c+"px, 0px)",o.style.transform="translate3d("+a+"px, "+c+"px, 0px)"}}function a(){i=!1,window.removeEventListener("touchmove",p),window.removeEventListener("touchend",a)}t.addEventListener("touchstart",(function(t){var e=t,s=o.style.transform.match(/[0-9\.-]+/g);i=!0,n.clientX=e.touches[0].clientX,n.clientY=e.touches[0].clientX,s&&(r.clientX=Number(s[1]),r.clientY=Number(s[2])),window.addEventListener("touchmove",p),window.addEventListener("touchend",a)}),{passive:!0})},t.selectArea=function(o,e,i,n,r,p){var a,s,c,l,m=!1;function _(t){var o=t;if(m){var p=c,a=l,_=o.touches[0].pageX-s.left,d=o.touches[0].pageY-s.top;d<0&&(a=l-(d=-d)),_<0&&(p=c-(_=-_));var h=parseFloat(i.style.width)-p,u=parseFloat(i.style.height)-a;if(_>h||d>u)return;if(p<0||a<0)return;i.style.transform="translate3d("+-p+"px, "+-a+"px, 0px)",e.style.transform="translate3d("+p+"px, "+a+"px, 0px)",e.style.height=d+"px",e.style.width=_+"px",n.innerHTML=""+Math.round(d),r.innerHTML=""+Math.round(_)}}function d(){m=!1,window.addEventListener("touchmove",_),window.addEventListener("touchend",d)}i.onload=function(){a=function(t){for(var o=0,e=0;t;)o+=t.offsetTop,e+=t.offsetLeft,t=t.parentElement;return{top:o,left:e}}(e)},o.addEventListener("touchstart",(function(o){var e=o,i={top:e.touches[0].pageY,left:e.touches[0].pageX};t.isInRange(a,i)&&(m=!0,s=i,c=i.left-a.left,l=i.top-a.top,window.addEventListener("touchmove",_),window.addEventListener("touchend",d))}),{passive:!0})},t.isInRange=function(t,o){return!(o.left<t.left)&&!(o.top<t.top)},t}(),T=function(){function t(){}return t.clear=function(t,o,e){t.style.height="0px",t.style.width="0px",t.style.transform="translate3d(0px, 0px, 0px)",o.innerHTML="0",e.innerHTML="0"},t.selectAll=function(t,o,e,i){var n=Math.round(parseFloat(i.style.width)),r=Math.round(parseFloat(i.style.height));t.style.height=r+"px",t.style.width=n+"px",t.style.transform="translate3d(0px, 0px, 0px)",i.style.transform="translate3d(0px, 0px, 0px)",o.innerHTML=""+r,e.innerHTML=""+n},t}();function I(t,o){void 0===o&&(o={});var e=o.insertAt;if(t&&"undefined"!=typeof document){var i=document.head||document.getElementsByTagName("head")[0],n=document.createElement("style");n.type="text/css","top"===e&&i.firstChild?i.insertBefore(n,i.firstChild):i.appendChild(n),n.styleSheet?n.styleSheet.cssText=t:n.appendChild(document.createTextNode(t))}}I('a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:"";content:none}table{border-collapse:collapse;border-spacing:0}');I(".main__crop-main__2Xu2i{position:relative;height:400px;width:500px;overflow:hidden}.main__crop-main__2Xu2i .main__crop-bottom-box__12vLt{position:absolute;background:#000;height:100%;width:100%}.main__crop-main__2Xu2i .main__crop-bottom-box__12vLt img{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.main__crop-main__2Xu2i .main__crop-mask__M2Lxd{position:absolute;top:0;left:0;height:100%;width:100%;background:rgba(0,0,0,.5)}.main__crop-main__2Xu2i .main__crop-box__3wkxc{position:absolute;top:50px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.main__crop-main__2Xu2i .main__crop-box__3wkxc .main__crop-box-img__2qWsz{overflow:hidden;height:100%}.main__crop-main__2Xu2i .main__crop-box__3wkxc .main__crop-box-move__1aJO-{position:absolute;top:0;left:0;width:100%;height:100%;cursor:move}.main__crop-main__2Xu2i .main__crop-box__3wkxc .main__crop-box-info__1ILcD{position:absolute;left:0;top:-21px;cursor:default;min-width:65px;text-align:center;color:#fff;line-height:20px;background-color:rgba(0,0,0,.8);font-size:12px}.main__crop-main__2Xu2i .main__crop-box__3wkxc .main__crop-box-point-line-wrapper__289IK .main__crop-line__1-vEG{position:absolute;display:block;width:100%;height:100%;opacity:.1}.main__crop-main__2Xu2i .main__crop-box__3wkxc .main__crop-box-point-line-wrapper__289IK .main__crop-line-top__2gG5M{top:-3px;left:0;height:5px;cursor:n-resize}.main__crop-main__2Xu2i .main__crop-box__3wkxc .main__crop-box-point-line-wrapper__289IK .main__crop-line-right__176v6{top:0;right:-3px;width:5px;cursor:e-resize}.main__crop-main__2Xu2i .main__crop-box__3wkxc .main__crop-box-point-line-wrapper__289IK .main__crop-line-bottom__3Ca1o{bottom:-3px;left:0;height:5px;cursor:s-resize}.main__crop-main__2Xu2i .main__crop-box__3wkxc .main__crop-box-point-line-wrapper__289IK .main__crop-line-left__2jeu5{top:0;left:-3px;width:5px;cursor:w-resize}.main__crop-main__2Xu2i .main__crop-box__3wkxc .main__crop-box-point-line-wrapper__289IK .main__crop-point__15KQj{position:absolute;width:8px;height:8px;opacity:.75;background-color:#39f;border-radius:100%}.main__crop-main__2Xu2i .main__crop-box__3wkxc .main__crop-box-point-line-wrapper__289IK .main__crop-point1__2PZiE{top:-4px;left:-4px;cursor:nw-resize;z-index:10}.main__crop-main__2Xu2i .main__crop-box__3wkxc .main__crop-box-point-line-wrapper__289IK .main__crop-point2__KsQWe{top:-5px;left:50%;margin-left:-3px;cursor:n-resize;z-index:10}.main__crop-main__2Xu2i .main__crop-box__3wkxc .main__crop-box-point-line-wrapper__289IK .main__crop-point3__3c0so{top:-4px;right:-4px;cursor:ne-resize;z-index:10}.main__crop-main__2Xu2i .main__crop-box__3wkxc .main__crop-box-point-line-wrapper__289IK .main__crop-point4__3c9hU{top:50%;left:-4px;margin-top:-3px;cursor:w-resize;z-index:10}.main__crop-main__2Xu2i .main__crop-box__3wkxc .main__crop-box-point-line-wrapper__289IK .main__crop-point5__3L_Nc{top:50%;right:-4px;margin-top:-3px;cursor:e-resize;z-index:10}.main__crop-main__2Xu2i .main__crop-box__3wkxc .main__crop-box-point-line-wrapper__289IK .main__crop-point6__3CWwi{bottom:-5px;left:-4px;cursor:sw-resize;z-index:10}.main__crop-main__2Xu2i .main__crop-box__3wkxc .main__crop-box-point-line-wrapper__289IK .main__crop-point7__1Ymsl{bottom:-5px;left:50%;margin-left:-3px;cursor:s-resize;z-index:10}.main__crop-main__2Xu2i .main__crop-box__3wkxc .main__crop-box-point-line-wrapper__289IK .main__crop-point8__3-RHx{bottom:-5px;right:-4px;cursor:se-resize;z-index:10}");var k=function(){function t(t,o,e,i,n,r,p,a,s,c){var l=this;if(void 0===s&&(s=!0),void 0===c&&(c=20),this.resultWidth=e,this.resultHeight=i,this.fileType=p,this.fileName=a,this.cropMain=new P((function(t,o){l.bindEvent(c,s,t/o)}),n,r),o instanceof File){this.fileType=o.type,this.fileName=o.name;var m=new FileReader;m.readAsDataURL(o),m.onload=function(o){o.target&&o.target.result&&(l.cropMain.cropBottomBox.img.src=o.target.result,l.cropMain.cropBox.cropBoxImgObj.img.src=o.target.result,l.cropMain.cropBottomBox.cropBottomBoxMain.style.height="",t.append(l.cropMain.cropMainMain))}}else this.cropMain.cropBottomBox.img.src=o,this.cropMain.cropBox.cropBoxImgObj.img.src=o,this.cropMain.cropBottomBox.cropBottomBoxMain.style.height="",t.append(this.cropMain.cropMainMain)}return t.prototype.bindEvent=function(t,o,e){var i=this.cropMain.cropBox.cropBoxMain,n=this.cropMain.cropBox.cropBoxImgObj.img,r=this.cropMain.cropBox.cropBoxInfoObj.infoHeight,p=this.cropMain.cropBox.cropBoxInfoObj.infoWidth,a=this.cropMain.cropBox.cropBoxPointLineWrapperObj;o?(Y.move(this.cropMain.cropBox.cropBoxMove,i,n),Y.lineAndPointTop(a.cropLineTop,i,n,r,t),Y.lineAndPointTop(a.cropPoint2,i,n,r,t),Y.lineAndPointBottom(a.cropLineBottom,i,n,r,t),Y.lineAndPointBottom(a.cropPoint7,i,n,r,t),Y.lineAndPointLeft(a.cropLineLeft,i,n,p,t),Y.lineAndPointLeft(a.cropPoint4,i,n,p,t),Y.lineAndPointRight(a.cropLineRight,i,n,p,t),Y.lineAndPointRight(a.cropPoint5,i,n,p,t),Y.pointLeftAndTop(a.cropPoint1,i,n,p,r,e,t),Y.pointRightAndTop(a.cropPoint3,i,n,p,r,e,t),Y.pointLeftAndBottom(a.cropPoint6,i,n,p,r,e,t),Y.pointRightAndBottom(a.cropPoint8,i,n,p,r,e,t)):(Y.move(this.cropMain.cropBox.cropBoxMove,i,n),Y.pointLeftAndTop(a.cropPoint1,i,n,p,r,e,t),Y.pointLeftAndTop(a.cropLineLeft,i,n,p,r,e,t),Y.pointLeftAndTop(a.cropPoint4,i,n,p,r,e,t),Y.pointRightAndTop(a.cropPoint3,i,n,p,r,e,t),Y.pointRightAndTop(a.cropLineTop,i,n,p,r,e,t),Y.pointRightAndTop(a.cropPoint2,i,n,p,r,e,t),Y.pointLeftAndBottom(a.cropPoint6,i,n,p,r,e,t),Y.pointLeftAndBottom(a.cropLineBottom,i,n,p,r,e,t),Y.pointLeftAndBottom(a.cropPoint7,i,n,p,r,e,t),Y.pointRightAndBottom(a.cropPoint8,i,n,p,r,e,t),Y.pointRightAndBottom(a.cropLineRight,i,n,p,r,e,t),Y.pointRightAndBottom(a.cropPoint5,i,n,p,r,e,t)),F.move(this.cropMain.cropBox.cropBoxMove,i,n),F.selectArea(this.cropMain.cropMask,i,n,p,r,e)},t.prototype.download=function(t,o){var e=document.createElement("a");e.download=o,e.href=t,e.click()},t.prototype.getResult=function(t,o){var e=this,i=this.cropMain.cropBox.cropBoxMain,n=this.cropMain.getProportion(),r=this.cropMain.cropBox.cropBoxImgObj.img,p=document.createElement("canvas"),a=p.getContext("2d");if(a){p.width=this.resultWidth,p.height=this.resultHeight,a.clearRect(0,0,this.resultWidth,this.resultHeight);var s=parseFloat(i.style.width)/n,c=parseFloat(i.style.height)/n,l=i.style.transform.match(/[0-9\.-]+/g);if(l){var m=Number(l[1])/n,_=Number(l[2])/n;a.drawImage(r,m,_,s,c,0,0,this.resultWidth,this.resultHeight),p.toBlob((function(i){if(i&&(t(i),o)){var n=window.URL.createObjectURL(i);e.download(n,e.fileName||(new Date).getTime().toString())}}),this.fileType||"image/jpeg")}}return this},t.prototype.destroy=function(){this.cropMain.cropMainMain.remove()},t.prototype.clear=function(){var t=this.cropMain.cropBox.cropBoxMain,o=this.cropMain.cropBox.cropBoxInfoObj.infoHeight,e=this.cropMain.cropBox.cropBoxInfoObj.infoWidth;return T.clear(t,o,e),this},t.prototype.selectAll=function(){var t=this.cropMain.cropBox.cropBoxMain,o=this.cropMain.cropBox.cropBoxImgObj.img,e=this.cropMain.cropBox.cropBoxInfoObj.infoHeight,i=this.cropMain.cropBox.cropBoxInfoObj.infoWidth;return T.selectAll(t,e,i,o),this},t}();module.exports=function(t,o,e,i,n,r,p,a,s,c){return void 0===s&&(s=!0),void 0===c&&(c=20),new k(t,o,e,i,n,r,p,a,s,c)};
//# sourceMappingURL=lcl-image-cropper.common.js.map
