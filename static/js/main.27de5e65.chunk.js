(this.webpackJsonptestly=this.webpackJsonptestly||[]).push([[0],{23:function(e,n,t){e.exports=t(34)},28:function(e,n,t){},34:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(17),l=t.n(u),c=(t(28),t(29),t(2)),o=t(6),i=t(7),s=t(4),f=t(3),d=t(35),m=function(e){var n=e.setQuestions,t=Object(a.useState)({id:0,label:"Select...",path:null}),u=Object(s.a)(t,2),l=u[0],c=u[1],i=Object(a.useState)([{id:0,label:"Select...",path:null},{id:1,label:"IO",path:"io.json"},{id:2,label:"PSK",path:"psk.json"}]),f=Object(s.a)(i,1)[0];Object(a.useEffect)((function(){null!=l.path&&fetch("data/".concat(l.path)).then((function(e){return e.json()})).then((function(e){return e.map((function(e){var n=e.c.trim().toLowerCase().charCodeAt(0)-97;return Object(o.a)({},e,{c:n})}))})).then((function(e){return n(e)}))}),[l]);return r.a.createElement("div",null,r.a.createElement(d.a,{type:"select",onChange:function(e){var n=e.target.value;c(f.find((function(e){return e.label===n})))},value:l.label},f.map((function(e){return r.a.createElement("option",{value:e.label,key:e.id,disabled:null==e.path},e.label)}))))},v=t(36);function b(){var e=Object(c.a)(["\n  display: flex;\n"]);return b=function(){return e},e}var p="Q_ORDERED_A_RANDOM",E="Q_RANDOM_A_ORDERED",O="Q_RANDOM_A_RANDOM",h=[{id:0,label:"Questions Ordered - Answers Ordered",value:"Q_ORDERED_A_ORDERED"},{id:1,label:"Questions Ordered - Answers Random",value:p},{id:2,label:"Questions Random - Answers Ordered",value:E},{id:3,label:"Questions Random - Answers Random",value:O}],j=f.a.div(b()),w=function(e){var n=e.runTest,t=Object(a.useState)({id:3,label:"Questions Random - Answers Random",value:O}),u=Object(s.a)(t,2),l=u[0],c=u[1];return r.a.createElement(j,null,r.a.createElement(d.a,{type:"select",onChange:function(e){var n=e.target.value;c(h.find((function(e){return e.value===n})))},value:l.value},h.map((function(e){return r.a.createElement("option",{value:e.value,key:e.id},e.label)}))),r.a.createElement(v.a,{color:"success",onClick:function(){return n(l.value)}},"Run"))};function g(){var e=Object(c.a)(["\n    background-color: ",";\n"]);return g=function(){return e},e}function y(){var e=Object(c.a)(["\n    list-style-type: lower-alpha;\n"]);return y=function(){return e},e}function Q(){var e=Object(c.a)(["\n    font-weight: bold;\n"]);return Q=function(){return e},e}function R(){var e=Object(c.a)(["\n    padding: 10px;\n"]);return R=function(){return e},e}var k=f.a.div(R()),x=f.a.p(Q()),A=f.a.ul(y()),q=f.a.li(g(),(function(e){return e.correct?"green":"none"})),D=function(e){var n=e.number,t=e.question,a=e.answers,u=e.correct;return r.a.createElement(k,null,r.a.createElement(x,null,"".concat(n,". ").concat(t)),r.a.createElement(A,null,a.map((function(e,n){return r.a.createElement(q,{correct:n===u,key:n},e)}))))},_=function(e){var n=e.questions;return r.a.createElement("div",null,n.map((function(e,n){return r.a.createElement(D,{key:n,number:n+1,question:e.q,answers:e.a,correct:e.c})})))};function C(){var e=Object(c.a)(["\n  \n"]);return C=function(){return e},e}var S=f.a.div(C()),M=function(e){var n=e.testQuestions,t=e.setTestQuestions,u=e.currentQuestion,l=e.setCurrentQuestion,c=e.setEndTest,s=n.slice(u,u+1).pop(),f=s.q,d=s.a,m=s.c,v=function(e){var a,r=e.keyCode;if(r>=49&&r<=57)a=r-49;else if(r>=65&&r<=90)a=r-65;else{if(!(r>=97&&r<=122))return;a=r-97}if(!(a>=d.length))if(m===a)u+1<n.length?l(u+1):(l(0),c(!0));else{var s=Object(i.a)(n),f=s[u];s.splice(u,1,Object(o.a)({},f,{fails:f.fails+1})),t(s)}};return Object(a.useEffect)((function(){return window.addEventListener("keypress",v),function(){return window.removeEventListener("keypress",v)}}),[v]),r.a.createElement(S,null,r.a.createElement("p",null,u+1,"/",n.length),r.a.createElement(D,{number:u+1,answers:d,question:f}))};function T(){var e=Object(c.a)(["\n  margin-left: 35px;\n"]);return T=function(){return e},e}var F=f.a.p(T()),N=function(e){var n=e.testQuestions,t=n.filter((function(e){return e.fails>0})).sort((function(e,n){return e.index-n.index}));return r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"Failed questions: ",t.length,"/",n.length),r.a.createElement("div",null,t.map((function(e){var n=e.index,t=e.q,a=e.a,u=e.c,l=e.fails;return r.a.createElement(r.a.Fragment,null,r.a.createElement(D,{key:n,number:n+1,question:t,answers:a,correct:u}),r.a.createElement(F,null,"Fails: ",l))}))))},B=function(e){for(var n,t,a=e.length,r=Object(i.a)(e);0!==a;)t=Math.floor(Math.random()*a),n=r[a-=1],r[a]=r[t],r[t]=n;return r};function I(){var e=Object(c.a)(["\n    display: flex;\n    flex-direction: column;\n    max-width: 900px;\n    width: 100%;\n"]);return I=function(){return e},e}function L(){var e=Object(c.a)(["\n    display: flex;\n    justify-content: space-between;\n"]);return L=function(){return e},e}function J(){var e=Object(c.a)(["\n    display: flex;\n    justify-content: center;\n    background-color: #1f1f1f;\n    color: #e2e2e2;\n    min-height: 100vh;\n"]);return J=function(){return e},e}var W=f.a.div(J()),K=f.a.div(L()),P=f.a.div(I()),$=function(){var e=Object(a.useState)(null),n=Object(s.a)(e,2),t=n[0],u=n[1],l=Object(a.useState)(null),c=Object(s.a)(l,2),f=c[0],d=c[1],b=Object(a.useState)(0),h=Object(s.a)(b,2),j=h[0],g=h[1],y=Object(a.useState)(!1),Q=Object(s.a)(y,2),R=Q[0],k=Q[1];return r.a.createElement(W,null,r.a.createElement(P,null,r.a.createElement(K,null,r.a.createElement(v.a,{color:"danger",onClick:function(){return d(null)}},"Back"),r.a.createElement(m,{setQuestions:u}),r.a.createElement(w,{runTest:function(e){if(null!=t){var n=t.map((function(e,n){var t=e.q,a=e.a,r=e.c;return{index:n,q:t,a:a.map((function(e,n){return{a:e,c:n===r}})),fails:0}}));n=e===E||e===O?B(n):Object(i.a)(n),e!==p&&e!==O||(n=n.map((function(e){return Object(o.a)({},e,{a:B(e.a)})}))),n=n.map((function(e){var n=e.a.findIndex((function(e){return e.c}));return Object(o.a)({},e,{a:e.a.map((function(e){return e.a})),c:n})})),k(!1),d(n)}}})),null==t&&null==f&&r.a.createElement("p",null,"Choose questions"),null!=t&&null==f&&r.a.createElement(_,{questions:t}),null!=f&&!1===R&&r.a.createElement(M,{testQuestions:f,setTestQuestions:d,currentQuestion:j,setCurrentQuestion:g,setEndTest:k}),R&&r.a.createElement(N,{testQuestions:f})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement($,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[23,1,2]]]);
//# sourceMappingURL=main.27de5e65.chunk.js.map