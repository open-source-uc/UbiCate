var K=Object.defineProperty,Q=Object.defineProperties;var W=Object.getOwnPropertyDescriptors;var B=Object.getOwnPropertySymbols;var x=Object.prototype.hasOwnProperty,ee=Object.prototype.propertyIsEnumerable;var O=(o,e,n)=>e in o?K(o,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):o[e]=n,T=(o,e)=>{for(var n in e||(e={}))x.call(e,n)&&O(o,n,e[n]);if(B)for(var n of B(e))ee.call(e,n)&&O(o,n,e[n]);return o},U=(o,e)=>Q(o,W(e));import{S as te,i as re,s as se,e as h,k as C,w as V,X as ne,c as g,a as $,d as u,m as I,x as Y,L,b as _,J as w,g as p,y as j,q as X,o as Z,B as F,U as oe,v as ie,Y as ae,O as D,l as M,Z as le,t as y,h as k,E as ce,j as ue}from"../chunks/index-3df697d8.js";import{g as fe}from"../chunks/navigation-0e6511d1.js";import{C as pe}from"../chunks/CenteredCard-4071331b.js";import{C as de}from"../chunks/CenteredCardContainer-b5098ce6.js";import{u as N}from"../chunks/userStore-dea8160d.js";import"../chunks/singletons-d1fb5791.js";import"../chunks/index-2eb24d17.js";function H(o){this.message=o}H.prototype=new Error,H.prototype.name="InvalidCharacterError";var J=typeof window!="undefined"&&window.atob&&window.atob.bind(window)||function(o){var e=String(o).replace(/=+$/,"");if(e.length%4==1)throw new H("'atob' failed: The string to be decoded is not correctly encoded.");for(var n,i,t=0,s=0,r="";i=e.charAt(s++);~i&&(n=t%4?64*n+i:i,t++%4)?r+=String.fromCharCode(255&n>>(-2*t&6)):0)i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(i);return r};function me(o){var e=o.replace(/-/g,"+").replace(/_/g,"/");switch(e.length%4){case 0:break;case 2:e+="==";break;case 3:e+="=";break;default:throw"Illegal base64url string!"}try{return function(n){return decodeURIComponent(J(n).replace(/(.)/g,function(i,t){var s=t.charCodeAt(0).toString(16).toUpperCase();return s.length<2&&(s="0"+s),"%"+s}))}(e)}catch{return J(e)}}function q(o){this.message=o}function _e(o,e){if(typeof o!="string")throw new q("Invalid token specified");var n=(e=e||{}).header===!0?0:1;try{return JSON.parse(me(o.split(".")[n]))}catch(i){throw new q("Invalid token specified: "+i.message)}}q.prototype=new Error,q.prototype.name="InvalidTokenError";const{document:R}=ae;function he(o){let e,n,i,t,s,r,l;return{c(){e=h("h1"),n=y("Inicia Sesi\xF3n"),i=C(),t=h("h2"),s=y("Hola! Loggueate con Google"),r=C(),l=h("div"),this.h()},l(a){e=g(a,"H1",{});var d=$(e);n=k(d,"Inicia Sesi\xF3n"),d.forEach(u),i=I(a),t=g(a,"H2",{class:!0});var v=$(t);s=k(v,"Hola! Loggueate con Google"),v.forEach(u),r=I(a),l=g(a,"DIV",{class:!0}),$(l).forEach(u),this.h()},h(){_(t,"class","svelte-3zp40n"),_(l,"class","sign-in-buttom svelte-3zp40n")},m(a,d){p(a,e,d),w(e,n),p(a,i,d),p(a,t,d),w(t,s),p(a,r,d),p(a,l,d),o[5](l)},p:ce,d(a){a&&u(e),a&&u(i),a&&u(t),a&&u(r),a&&u(l),o[5](null)}}}function ge(o){let e,n,i,t,s,r,l=o[1].given_name+"",a,d,v,f,E,S,b,G;return{c(){e=h("div"),n=h("img"),t=C(),s=h("h2"),r=y("Hola "),a=y(l),d=y(" \u{1F44B}"),v=C(),f=h("p"),E=y("Ser\xE1s redirigido en unos segundos..."),S=C(),b=h("a"),G=y("Puedes hacer click aqu\xED si no funciona"),this.h()},l(c){e=g(c,"DIV",{});var m=$(e);n=g(m,"IMG",{class:!0,src:!0,alt:!0}),m.forEach(u),t=I(c),s=g(c,"H2",{class:!0});var z=$(s);r=k(z,"Hola "),a=k(z,l),d=k(z," \u{1F44B}"),z.forEach(u),v=I(c),f=g(c,"P",{});var P=$(f);E=k(P,"Ser\xE1s redirigido en unos segundos..."),P.forEach(u),S=I(c),b=g(c,"A",{class:!0,href:!0});var A=$(b);G=k(A,"Puedes hacer click aqu\xED si no funciona"),A.forEach(u),this.h()},h(){_(n,"class","user-image svelte-3zp40n"),L(n.src,i=o[1].picture)||_(n,"src",i),_(n,"alt","Yourserf!"),_(s,"class","svelte-3zp40n"),_(b,"class","back svelte-3zp40n"),_(b,"href",o[0])},m(c,m){p(c,e,m),w(e,n),p(c,t,m),p(c,s,m),w(s,r),w(s,a),w(s,d),p(c,v,m),p(c,f,m),w(f,E),p(c,S,m),p(c,b,m),w(b,G)},p(c,m){m&2&&!L(n.src,i=c[1].picture)&&_(n,"src",i),m&2&&l!==(l=c[1].given_name+"")&&ue(a,l),m&1&&_(b,"href",c[0])},d(c){c&&u(e),c&&u(t),c&&u(s),c&&u(v),c&&u(f),c&&u(S),c&&u(b)}}}function ve(o){let e;function n(s,r){return s[1]?ge:he}let i=n(o),t=i(o);return{c(){t.c(),e=M()},l(s){t.l(s),e=M()},m(s,r){t.m(s,r),p(s,e,r)},p(s,r){i===(i=n(s))&&t?t.p(s,r):(t.d(1),t=i(s),t&&(t.c(),t.m(e.parentNode,e)))},d(s){t.d(s),s&&u(e)}}}function be(o){let e,n,i,t,s;return t=new pe({props:{$$slots:{default:[ve]},$$scope:{ctx:o}}}),{c(){e=h("img"),i=C(),V(t.$$.fragment),this.h()},l(r){e=g(r,"IMG",{src:!0,alt:!0}),i=I(r),Y(t.$$.fragment,r),this.h()},h(){L(e.src,n="assets/logo.svg")||_(e,"src",n),_(e,"alt","Icono de busqueda con una capa de graduaci\xF3n en vez de un circulo")},m(r,l){p(r,e,l),p(r,i,l),j(t,r,l),s=!0},p(r,l){const a={};l&263&&(a.$$scope={dirty:l,ctx:r}),t.$set(a)},i(r){s||(X(t.$$.fragment,r),s=!0)},o(r){Z(t.$$.fragment,r),s=!1},d(r){r&&u(e),r&&u(i),F(t,r)}}}function we(o){let e,n,i,t,s;return t=new de({props:{$$slots:{default:[be]},$$scope:{ctx:o}}}),{c(){e=h("script"),i=C(),V(t.$$.fragment),this.h()},l(r){const l=ne('[data-svelte="svelte-1d6uxhr"]',R.head);e=g(l,"SCRIPT",{src:!0});var a=$(e);a.forEach(u),l.forEach(u),i=I(r),Y(t.$$.fragment,r),this.h()},h(){L(e.src,n="https://accounts.google.com/gsi/client")||_(e,"src",n),e.async=!0,e.defer=!0},m(r,l){w(R.head,e),o[4](e),p(r,i,l),j(t,r,l),s=!0},p(r,[l]){const a={};l&263&&(a.$$scope={dirty:l,ctx:r}),t.$set(a)},i(r){s||(X(t.$$.fragment,r),s=!0)},o(r){Z(t.$$.fragment,r),s=!1},d(r){u(e),o[4](null),r&&u(i),F(t,r)}}}function $e(o,e,n){let i;oe(o,N,f=>n(1,i=f));let t,s;const r=async({credential:f})=>{const E=_e(f);console.log(E),le(N,i=U(T({},E),{token:f}),i)},l=()=>{window.google.accounts.id.initialize({client_id:{}.PUBLIC_GOOGLE_CLIENT_ID,callback:r}),window.google.accounts.id.renderButton(t,{theme:"outline",type:"standard"})};ie(()=>{i||(window.google?l():s.addEventListener("load",l,{once:!0}))});let a;function d(f){D[f?"unshift":"push"](()=>{s=f,n(3,s)})}function v(f){D[f?"unshift":"push"](()=>{t=f,n(2,t)})}return o.$$.update=()=>{if(o.$$.dirty&3&&i){const{referrer:f}=document;console.log(f),n(0,a=f&&!f.includes("login")?f:"/map"),setTimeout(()=>fe(a||"/map"),3e3)}},[a,i,t,s,d,v]}class qe extends te{constructor(e){super(),re(this,e,$e,we,se,{})}}export{qe as default};
