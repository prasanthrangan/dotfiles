(window.webpackJsonpwebClient=window.webpackJsonpwebClient||[]).push([[22,43],{1010:function(e,t,r){"use strict";r.r(t);var n=r(1),o=(r(0),r(764)),a=r(10),i=r(770),s=r.n(i),c=r(1291),l=r(836),d=r(13),u={id:0,type:"AddTenPassword",visible:!0,completed:null,seenAt:null,color:c.a.GREY},p={complete:jest.fn(),hideExpandedSkillInDrawer:jest.fn(),openImportPasswords:jest.fn()};jest.mock("../../hooks/use-secondary-onboarding-actions",function(){return{useSecondaryOnboardingActions:function(){return p}}}),it("should shallow render the AddTenPassword component without crashing",function(){var e=s()([])({login:{baseUrl:"https://dummy.com"}}),t=Object(o.shallow)(Object(n.jsx)(a.a,{store:e},Object(n.jsx)(l.default,{skill:u,expanded:!0,fromAllSkillsDialog:!1})));expect(t).toHaveLength(1)}),it("should shallow render the AddTenPassword component and click the Import Password button",function(){var e=s()([])({login:{baseUrl:"https://dummy.com"},vaultData:{passwords:{recordType:d.a.Password,username:"test@test.com",record:{}}}}),t=Object(o.mount)(Object(n.jsx)(a.a,{store:e},Object(n.jsx)(l.default,{skill:u,expanded:!0,fromAllSkillsDialog:!1})));t.find(".action-cta").at(1).simulate("click"),t.unmount(),expect(p.hideExpandedSkillInDrawer).toHaveBeenCalled(),expect(p.openImportPasswords).toHaveBeenCalled()})},765:function(e,t){},766:function(e,t){},767:function(e,t){},768:function(e,t){},770:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};var r=o.applyMiddleware.apply(void 0,function(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}(e))(function(){var e=[],r=[];return{getState:function(){return s(t)?t(e):t},getActions:function(){return e},dispatch:function(t){if(!(0,i.default)(t))throw new Error("Actions must be plain objects. Use custom middleware for async actions.");if("undefined"===typeof t.type)throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant? Action: '+JSON.stringify(t));e.push(t);for(var n=0;n<r.length;n++)r[n]();return t},clearActions:function(){e=[]},subscribe:function(e){return s(e)&&r.push(e),function(){var t=r.indexOf(e);t<0||r.splice(t,1)}},replaceReducer:function(e){if(!s(e))throw new Error("Expected the nextReducer to be a function.")}}});return r()}};var n,o=r(65),a=r(771),i=(n=a)&&n.__esModule?n:{default:n};var s=function(e){return"function"===typeof e}},771:function(e,t){var r="[object Object]";var n,o,a=Function.prototype,i=Object.prototype,s=a.toString,c=i.hasOwnProperty,l=s.call(Object),d=i.toString,u=(n=Object.getPrototypeOf,o=Object,function(e){return n(o(e))});e.exports=function(e){if(!function(e){return!!e&&"object"==typeof e}(e)||d.call(e)!=r||function(e){var t=!1;if(null!=e&&"function"!=typeof e.toString)try{t=!!(e+"")}catch(r){}return t}(e))return!1;var t=u(e);if(null===t)return!0;var n=c.call(t,"constructor")&&t.constructor;return"function"==typeof n&&n instanceof n&&s.call(n)==l}},836:function(e,t,r){"use strict";r.r(t);var n=r(2),o=r(1),a=r(3),i=r(0),s=r.n(i);function c(){return(c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var d=s.a.createElement("path",{d:"M22 3.81157C22 3.36335 22.3634 3 22.8116 3H48.3806C48.8288 3 49.1921 3.36335 49.1921 3.81157V27.8279C49.1921 28.2761 48.8288 28.6395 48.3806 28.6395H22.8116C22.3634 28.6395 22 28.2761 22 27.8279V3.81157Z",fill:"white",stroke:"#D7DBE0",strokeWidth:1.25,strokeLinecap:"round",strokeLinejoin:"round"}),u=s.a.createElement("path",{d:"M19 6.81157C19 6.36335 19.3634 6 19.8116 6H45.3806C45.8288 6 46.1921 6.36335 46.1921 6.81157V30.8279C46.1921 31.2761 45.8288 31.6395 45.3806 31.6395H19.8116C19.3634 31.6395 19 31.2761 19 30.8279V6.81157Z",fill:"white",stroke:"#D7DBE0",strokeWidth:1.25,strokeLinecap:"round",strokeLinejoin:"round"}),p=s.a.createElement("path",{d:"M16 9.81157C16 9.36335 16.3634 9 16.8116 9H42.3806C42.8288 9 43.1921 9.36335 43.1921 9.81157V33.8279C43.1921 34.2761 42.8288 34.6395 42.3806 34.6395H16.8116C16.3634 34.6395 16 34.2761 16 33.8279V9.81157Z",fill:"white",stroke:"#D7DBE0",strokeWidth:1.25,strokeLinecap:"round",strokeLinejoin:"round"}),f=s.a.createElement("path",{d:"M13.0535 12.7291C13.0535 12.2808 13.4168 11.9175 13.865 11.9175H39.434C39.8822 11.9175 40.2456 12.2808 40.2456 12.7291V36.7454C40.2456 37.1936 39.8822 37.557 39.434 37.557H13.865C13.4168 37.557 13.0535 37.1936 13.0535 36.7454V12.7291Z",fill:"white",stroke:"#D7DBE0",strokeWidth:1.25,strokeLinecap:"round",strokeLinejoin:"round"}),h=s.a.createElement("path",{d:"M13.0531 17.834H40.2452",stroke:"#D7DBE0",strokeWidth:1.25,strokeLinecap:"round",strokeLinejoin:"round"}),k=s.a.createElement("path",{d:"M16.9376 21.7788H24.7068V29.6679H16.9376V21.7788Z",fill:"#D7DBE0",stroke:"#D7DBE0",strokeWidth:1.77532,strokeLinecap:"round",strokeLinejoin:"round"}),m=s.a.createElement("path",{d:"M16.8835 33.5278H36.4174",stroke:"#D7DBE0",strokeWidth:1.77532,strokeLinecap:"round",strokeLinejoin:"round"}),j=s.a.createElement("path",{d:"M28.6482 25.8643H36.4187",stroke:"#D7DBE0",strokeWidth:1.77532,strokeLinecap:"round",strokeLinejoin:"round"}),L=s.a.createElement("path",{d:"M28.6482 29.9214H36.4187",stroke:"#D7DBE0",strokeWidth:1.77532,strokeLinecap:"round",strokeLinejoin:"round"}),E=s.a.createElement("path",{d:"M28.6482 21.8071H36.4187",stroke:"#D7DBE0",strokeWidth:1.77532,strokeLinecap:"round",strokeLinejoin:"round"}),b=s.a.createElement("path",{d:"M5.57084 1.91772L3.47067 3.27393L4.85396 5.40116L6.95413 4.04496L5.57084 1.91772Z",stroke:"#D7DBE0",strokeLinecap:"round",strokeLinejoin:"round"}),w=s.a.createElement("path",{d:"M11.5002 2.16442L10.99 4.61182L13.469 5.15353L13.9791 2.70613L11.5002 2.16442Z",stroke:"#D7DBE0",strokeLinecap:"round",strokeLinejoin:"round"}),y=s.a.createElement("path",{d:"M2.26031 10.6338L5.5681 11.3659L2.26031 10.6338Z",fill:"#D7DBE0"}),g=s.a.createElement("path",{d:"M2.26031 10.6338L5.5681 11.3659",stroke:"#D7DBE0",strokeLinecap:"round"}),v=s.a.createElement("path",{d:"M4.18362 9.39186L3.50286 12.6997L4.18362 9.39186Z",fill:"#D7DBE0"}),O=s.a.createElement("path",{d:"M4.18362 9.39186L3.50286 12.6997",stroke:"#D7DBE0",strokeLinecap:"round"}),C=s.a.createElement("path",{d:"M57.471 13.4389L55.6149 11.7642L53.9474 13.613L55.8035 15.2878L57.471 13.4389Z",stroke:"#D7DBE0",strokeLinecap:"round",strokeLinejoin:"round"}),D=s.a.createElement("defs",null,s.a.createElement("clipPath",{id:"clip0"},s.a.createElement("rect",{width:60,height:40,fill:"white"}))),x=function(e){var t=e.svgRef,r=l(e,["svgRef"]);return s.a.createElement("svg",c({width:60,height:40,viewBox:"0 0 60 40",fill:"none",ref:t},r),d,u,p,f,h,k,m,j,L,E,b,w,y,g,v,O,C,D)},M=s.a.forwardRef(function(e,t){return s.a.createElement(x,c({svgRef:t},e))});r.p;function H(){return(H=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function B(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var W=s.a.createElement("g",{clipPath:"url(#clip0_4041_39308)"},s.a.createElement("path",{d:"M37.3501 6.38429C37.3501 5.63352 37.9587 5.0249 38.7095 5.0249H81.5375C82.2883 5.0249 82.8969 5.63352 82.8969 6.38429V46.6117C82.8969 47.3624 82.2883 47.9711 81.5375 47.9711H38.7095C37.9587 47.9711 37.3501 47.3624 37.3501 46.6117V6.38429Z",fill:"#B5D9F1",stroke:"#264887",strokeWidth:2.09375,strokeLinecap:"round",strokeLinejoin:"round"}),s.a.createElement("path",{d:"M32.3252 11.4092C32.3252 10.6584 32.9338 10.0498 33.6846 10.0498H76.5126C77.2634 10.0498 77.872 10.6584 77.872 11.4092V51.6366C77.872 52.3873 77.2634 52.996 76.5126 52.996H33.6846C32.9338 52.996 32.3252 52.3873 32.3252 51.6366V11.4092Z",fill:"#B5D9F1",stroke:"#264887",strokeWidth:2.09375,strokeLinecap:"round",strokeLinejoin:"round"}),s.a.createElement("path",{d:"M27.3003 16.4346C27.3003 15.6838 27.9089 15.0752 28.6597 15.0752H71.4877C72.2385 15.0752 72.8471 15.6838 72.8471 16.4346V56.662C72.8471 57.4127 72.2385 58.0214 71.4877 58.0214H28.6597C27.9089 58.0214 27.3003 57.4127 27.3003 56.662V16.4346Z",fill:"#B5D9F1",stroke:"#264887",strokeWidth:2.09375,strokeLinecap:"round",strokeLinejoin:"round"}),s.a.createElement("path",{d:"M22.3647 21.3203C22.3647 20.5696 22.9734 19.9609 23.7241 19.9609H66.5522C67.3029 19.9609 67.9116 20.5696 67.9116 21.3203V61.5477C67.9116 62.2985 67.3029 62.9071 66.5522 62.9071H23.7241C22.9734 62.9071 22.3647 62.2985 22.3647 61.5477V21.3203Z",fill:"white",stroke:"#264887",strokeWidth:2.09375,strokeLinecap:"round",strokeLinejoin:"round"}),s.a.createElement("path",{d:"M22.3643 29.8721H67.9111",stroke:"#264887",strokeWidth:2.09375,strokeLinecap:"round",strokeLinejoin:"round"}),s.a.createElement("path",{d:"M28.8706 36.4785H41.884V49.6927H28.8706V36.4785Z",fill:"#E78C89",stroke:"#E78C89",strokeWidth:2.97366,strokeLinecap:"round",strokeLinejoin:"round"}),s.a.createElement("path",{d:"M28.7803 56.1582H61.4996",stroke:"#90C6EB",strokeWidth:2.97366,strokeLinecap:"round",strokeLinejoin:"round"}),s.a.createElement("path",{d:"M48.4858 43.3208H61.5014",stroke:"#90C6EB",strokeWidth:2.97366,strokeLinecap:"round",strokeLinejoin:"round"}),s.a.createElement("path",{d:"M48.4858 50.1177H61.5014",stroke:"#90C6EB",strokeWidth:2.97366,strokeLinecap:"round",strokeLinejoin:"round"}),s.a.createElement("path",{d:"M48.4858 36.5259H61.5014",stroke:"#90C6EB",strokeWidth:2.97366,strokeLinecap:"round",strokeLinejoin:"round"}),s.a.createElement("path",{d:"M11.3308 3.71176L7.81299 5.9834L10.13 9.54651L13.6478 7.27487L11.3308 3.71176Z",stroke:"#E78C89",strokeWidth:1.675,strokeLinecap:"round",strokeLinejoin:"round"}),s.a.createElement("path",{d:"M21.2627 4.12474L20.4082 8.22412L24.5604 9.13149L25.415 5.0321L21.2627 4.12474Z",stroke:"#E78C89",strokeWidth:1.675,strokeLinecap:"round",strokeLinejoin:"round"}),s.a.createElement("path",{d:"M5.78564 18.3105L11.3262 19.5369Z",fill:"#E78C89"}),s.a.createElement("path",{d:"M5.78564 18.3105L11.3262 19.5369",stroke:"#E78C89",strokeWidth:1.675,strokeLinecap:"round"}),s.a.createElement("path",{d:"M9.00693 16.2301L7.86667 21.7706Z",fill:"#E78C89"}),s.a.createElement("path",{d:"M9.00693 16.2301L7.86667 21.7706",stroke:"#E78C89",strokeWidth:1.675,strokeLinecap:"round"}),s.a.createElement("path",{d:"M98.2638 23.0084L95.1548 20.2031L92.3617 23.3L95.4706 26.1052L98.2638 23.0084Z",stroke:"#E78C89",strokeWidth:1.675,strokeLinecap:"round",strokeLinejoin:"round"})),P=s.a.createElement("defs",null,s.a.createElement("clipPath",{id:"clip0_4041_39308"},s.a.createElement("rect",{width:102,height:68,fill:"white",transform:"translate(0.5)"}))),V=function(e){var t=e.svgRef,r=B(e,["svgRef"]);return s.a.createElement("svg",H({width:103,height:68,viewBox:"0 0 103 68",fill:"none",ref:t},r),W,P)},Z=s.a.forwardRef(function(e,t){return s.a.createElement(V,H({svgRef:t},e))}),A=(r.p,r(762)),S=r(129),I=r(40),R=r(1290),T=r(757),_=r(10),F=Object(n.a)("p",{target:"ei08m5w0"})({name:"adn84a",styles:"font-size:12px;line-height:24px;color:#1d3049;margin-bottom:12px;&.bold{font-weight:600;}"}),N=Object(n.a)(S.a,{target:"ei08m5w1"})({name:"wayys6",styles:"width:100%;border-radius:4px;"});t.default=function(e){var t=e.skill,r=e.expanded,n=e.fromAllSkillsDialog,i=Object(R.a)(),s=Object(_.f)(function(e){return e.vaultData.passwords}),c=Math.min(10,Object.keys(s).length);return Object(o.jsx)(A.a,{skill:t,icon:t.completed&&Object(o.jsx)(M,null)||Object(o.jsx)(Z,{width:60,height:40}),title:Object(o.jsx)(a.Trans,{id:"Add 10+ websites"}),description:Object(o.jsx)(a.Trans,{id:"Speed things along by importing your passwords"}),expanded:r,fromAllSkillsDialog:n,bodyTitle:Object(o.jsx)(a.Trans,{id:"{passwordsCount}/10 websites already added",values:{passwordsCount:c}}),automationId:"so-ten-password",bodyContent:Object(o.jsx)("div",{className:"add-ten-passwords"},Object(o.jsx)(F,{className:"bold"},Object(o.jsx)(a.Trans,{id:"If you want to speed things up, try the Import feature."})),Object(o.jsx)(F,null,Object(o.jsx)(a.Trans,{id:"LastPass can import your passwords from other password managers so you can keep everything in one place. Securely.<0>Learn more</0>",components:[Object(o.jsx)(T.b,{url:"https://support.logmeininc.com/lastpass/help/import-passwords-from-other-sources-lp040003"})]})),Object(o.jsx)(N,{red:!0,theme:I.a,onClick:function(){i.openImportPasswords(),i.hideExpandedSkillInDrawer()},className:"action-cta"},Object(o.jsx)(a.Trans,{id:"Import your passwords"})))})}}}]);