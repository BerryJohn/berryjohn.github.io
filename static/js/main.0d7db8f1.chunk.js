(this.webpackJsonpberrycinema=this.webpackJsonpberrycinema||[]).push([[0],{28:function(e,t,n){},32:function(e,t,n){},44:function(e,t,n){},70:function(e,t,n){},72:function(e,t,n){},73:function(e,t,n){"use strict";n.r(t);var i,c=n(2),s=n.n(c),a=n(33),l=n.n(a),o=(n(44),n(39)),r=n(7),d=n(26),u=(n(28),n(22)),j=n.n(u),b=(n(70),n(16)),v=n(1),O=function(e){var t,n,s,a,l=Object(c.useRef)(null),o=Object(c.useRef)(null),d=Object(c.useRef)(null),u=Object(c.useState)(!0),j=Object(r.a)(u,2),O=j[0],m=j[1],f=function(){return m(!0)},x=function(){return e.videoStatusHandler()};return Object(v.jsxs)("div",{className:e.videoPlay?"controlsWrapper":"controlsWrapper controlsPaused",onMouseMove:function(){null!=i&&clearTimeout(i),i=setTimeout(f,2e3),m(!1)},onMouseLeave:function(){f()},onClick:function(e){!function(e){e.target===d.current&&x()}(e)},ref:d,children:[Object(v.jsx)("div",{className:O&&e.videoPlay?"videoTitle videoTitleHidden":"videoTitle",children:e.videoTitle}),Object(v.jsx)("div",{className:(O||e.videoPlay)&&e.videoPlay?"midVideoStatus midVideoStatusHidden":"midVideoStatus",onClick:x,children:e.videoPlay?Object(v.jsx)(b.b,{}):Object(v.jsx)(b.c,{})}),Object(v.jsx)("div",{className:O&&e.videoPlay?"smallTimeBar":"smallTimeBar hiddenSmallBar",ref:l,children:Object(v.jsx)("div",{className:"loadedTimeBar",style:{width:"".concat(((null===(t=l.current)||void 0===t?void 0:t.offsetWidth)||0)*e.loaded,"px")},children:Object(v.jsx)("div",{className:"currentTimeBar",style:{width:"".concat(((null===(n=l.current)||void 0===n?void 0:n.offsetWidth)||0)*e.played,"px")}})})}),Object(v.jsxs)("div",{className:O&&e.videoPlay?"bigBar hiddenBigBar":"bigBar",children:[Object(v.jsx)("div",{className:"videoStatus",onClick:x,children:e.videoPlay?Object(v.jsx)(b.b,{}):Object(v.jsx)(b.c,{})}),Object(v.jsx)("div",{className:"timers",children:Object(v.jsx)("span",{children:new Date(1e3*(null===e||void 0===e?void 0:e.playedSeconds)).toISOString().substr(11,8)})}),Object(v.jsx)("div",{className:"bigTimeBar",ref:o,children:Object(v.jsx)("div",{className:"loadedTimeBar",style:{width:"".concat(((null===(s=o.current)||void 0===s?void 0:s.offsetWidth)||0)*e.loaded,"px")},children:Object(v.jsx)("div",{className:"currentTimeBar",style:{width:"".concat(((null===(a=o.current)||void 0===a?void 0:a.offsetWidth)||0)*e.played,"px")}})})}),Object(v.jsx)("div",{className:"timers",children:Object(v.jsx)("span",{children:new Date(1e3*(null===e||void 0===e?void 0:e.videoDuration)).toISOString().substr(11,8)})}),Object(v.jsxs)("div",{className:"volume",children:[0===e.currentVolume?Object(v.jsx)(b.g,{}):e.currentVolume>.75?Object(v.jsx)(b.d,{}):e.currentVolume>.5?Object(v.jsx)(b.f,{}):e.currentVolume>.25?Object(v.jsx)(b.e,{}):Object(v.jsx)(b.h,{}),Object(v.jsx)("div",{className:"volumeSlider",children:Object(v.jsx)("input",{type:"range",min:"0",max:"100",onChange:function(t){return e.inputValueHandler(parseInt(t.target.value))}})})]}),Object(v.jsx)("div",{className:"fullscreen",onClick:e.fullscreenHandler.active?e.fullscreenHandler.exit:e.fullscreenHandler.enter,children:Object(v.jsx)(b.a,{})})]})]})},m=function(e){var t,n,i,s=Object(c.useRef)(null),a=Object(c.useState)(!1),l=Object(r.a)(a,2),o=l[0],d=l[1],u=Object(c.useState)(50),b=Object(r.a)(u,2),m=b[0],f=b[1],x=Object(c.useState)(0),h=Object(r.a)(x,2),p=h[0],g=h[1],N=Object(c.useState)(0),S=Object(r.a)(N,2),V=S[0],k=S[1],C=Object(c.useState)(0),T=Object(r.a)(C,2),B=T[0],P=T[1],H=function(e){!0===e&&w(),d(e)},w=function(){y.emit("get-current-video-data")};return Object(c.useEffect)((function(){y.on("current-video-data",(function(e){var t,n=(null===e||void 0===e?void 0:e.currentTime)||0;null===(t=s.current)||void 0===t||t.seekTo(n),console.log("xD")})),y.on("server-video-stop",(function(){H(!1)})),y.on("server-video-start",(function(){o||H(!0)})),y.on("end-of-queue",(function(){g(0),k(0),P(0)}))}),[]),Object(v.jsxs)("div",{className:"videoContainer",children:[Object(v.jsx)(j.a,{className:"reactVideo",width:"100%",height:"100vh",volume:m,autoPlay:!0,playing:o,ref:s,url:null===(t=e.currentVideo)||void 0===t?void 0:t.link,onProgress:function(e){!function(e){k(e.played),g(e.loaded),P(e.playedSeconds)}(e)}}),Object(v.jsx)(O,{loaded:p,played:V,playedSeconds:B,videoDuration:(null===(n=e.currentVideo)||void 0===n?void 0:n.duration)||0,fullscreenHandler:null===e||void 0===e?void 0:e.fullscreenHandler,videoTitle:(null===(i=e.currentVideo)||void 0===i?void 0:i.title)||"",videoPlay:o,inputValueHandler:function(e){f(e/100)},currentVolume:m,videoStatusHandler:function(){o||w(),d(!o)}})]})},f=function(e){var t=Object(c.useState)(),n=Object(r.a)(t,2),i=n[0],s=n[1];Object(c.useEffect)((function(){y.on("user-change-video",(function(e){s(e)})),y.on("end-of-queue",(function(){s(void 0)}))}),[i]);var a=Object(d.b)();return console.log("xD reload videoplayer"),Object(v.jsx)("div",{className:"videoContainer",children:Object(v.jsx)(d.a,{handle:a,children:Object(v.jsx)(m,{currentVideo:i,fullscreenHandler:a})})})},x=(n(72),n(37)),h=n.n(x),p=(n(32),n(38)),g=function(e){return Object(v.jsxs)("div",{className:"elementWrapper",children:[Object(v.jsx)("div",{className:"image",children:Object(v.jsx)("img",{src:e.thumbnail,alt:"Video thumbnail"})}),Object(v.jsxs)("div",{className:"elementInfo",children:[Object(v.jsx)("div",{className:"title",children:e.title}),Object(v.jsx)("div",{className:"description",children:e.description}),Object(v.jsx)("div",{className:"duration",children:new Date(1e3*e.duration).toISOString().substr(11,8)})]})]})},N=function(e){var t=Object(c.useState)([]),n=Object(r.a)(t,2),i=n[0],s=n[1],a=Object(c.useState)(!1),l=Object(r.a)(a,2),o=l[0],d=l[1],u=Object(c.useState)(!1),b=Object(r.a)(u,2),O=b[0],m=b[1],f=Object(c.useState)(""),x=Object(r.a)(f,2),N=x[0],S=x[1],V=Object(c.useState)(""),k=Object(r.a)(V,2),C=k[0],T=k[1],B=Object(c.useState)(""),P=Object(r.a)(B,2),H=P[0],w=P[1],D=Object(c.useRef)(null),q=Object(c.useRef)(null),I=Object(c.useRef)(null),R=Object(c.useRef)(null);Object(c.useEffect)((function(){y.on("current-video-array",(function(e){s(e)}))}),[i]);var W=function(){d(!o),O&&m(!1)},F=function(){!function(){var e=N;if(j.a.canPlay(e)){var t,n,i=h()(e);t=null!==i?"https://img.youtube.com/vi/".concat(i,"/0.jpg"):"https://planasa.com/wp-content/uploads/2017/04/frambuesas-adelita.jpg",n=C.slice(0,50);var c="";0!==H.length&&(c=H.trim().slice(0,500));var s={link:e,thumbnail:t,title:n,description:c,duration:D.current.getDuration()};y.emit("user-add-video",s)}}(),S(""),T(""),w(""),W()},L=function(e){e?y.emit("server-video-start"):y.emit("server-video-stop")};return console.log("xD reload queue"),Object(v.jsxs)("div",{className:"queueWrapper",children:[Object(v.jsxs)("div",{className:O?"controlVideo controlVideoActive":"controlVideo",children:[Object(v.jsx)("input",{type:"range"}),Object(v.jsxs)("div",{className:"buttons",children:[Object(v.jsx)("div",{className:"controlButton",onClick:function(){return L(!0)},children:"play"}),Object(v.jsx)("div",{className:"controlButton",onClick:function(){return L(!1)},children:"stop"}),Object(v.jsx)("div",{className:"controlButton",onClick:function(){return y.emit("user-skip-video")},children:"skip"})]})]}),Object(v.jsxs)("div",{className:o?"addVideoForm addVideoFormActive":"addVideoForm",children:[Object(v.jsxs)("div",{className:"addControls",children:[Object(v.jsxs)("div",{children:[Object(v.jsx)("p",{children:"Link:"}),Object(v.jsx)("input",{type:"text",value:N,onChange:function(e){S(e.target.value)},required:!0,ref:I})]}),Object(v.jsxs)("div",{children:[Object(v.jsx)("p",{children:"Title:"}),Object(v.jsx)("input",{type:"text",value:C,onChange:function(e){T(e.target.value)},required:!0,maxLength:40,ref:q})]}),Object(v.jsxs)("div",{children:[Object(v.jsx)("p",{children:"Description:"}),Object(v.jsx)("input",{type:"text",value:H,onChange:function(e){w(e.target.value)},maxLength:300,ref:R})]})]}),Object(v.jsx)("button",{onClick:function(){return F()},children:"Add"}),Object(v.jsx)(j.a,{style:{display:"none"},url:N,height:"300px",ref:D})]}),Object(v.jsxs)("div",{className:"queueStats",children:[Object(v.jsx)("h1",{children:"Playlista"}),Object(v.jsxs)("div",{className:"buttons",children:[Object(v.jsx)("div",{className:"controlVideoButton",onClick:function(){return m(!O),void(o&&d(!1))},children:"Controls"}),Object(v.jsxs)("div",{className:"addVideo",onClick:function(){return W()},children:["Add Video ",Object(v.jsx)(p.a,{className:"addIcon"})]})]})]}),Object(v.jsx)("div",{className:"line"}),Object(v.jsx)("div",{className:"queueList",children:i.map((function(e){return Object(v.jsx)(g,{title:e.title,link:e.link,duration:e.duration,thumbnail:e.thumbnail,description:e.description||""})}))})]})},y=Object(o.a)("http://kinoharnas.bieda.it:30354"),S=function(){return console.log("app relog"),Object(v.jsxs)("div",{className:"main",children:[Object(v.jsx)(f,{}),Object(v.jsx)(N,{})]})},V=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,74)).then((function(t){var n=t.getCLS,i=t.getFID,c=t.getFCP,s=t.getLCP,a=t.getTTFB;n(e),i(e),c(e),s(e),a(e)}))};l.a.render(Object(v.jsx)(s.a.StrictMode,{children:Object(v.jsx)(S,{})}),document.getElementById("root")),V()}},[[73,1,2]]]);
//# sourceMappingURL=main.0d7db8f1.chunk.js.map