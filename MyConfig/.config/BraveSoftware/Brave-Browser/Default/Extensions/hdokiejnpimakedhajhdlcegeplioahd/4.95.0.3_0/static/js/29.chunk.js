(window.webpackJsonpwebClient=window.webpackJsonpwebClient||[]).push([[29],{1020:function(e,t,n){"use strict";n.r(t);var o=n(1),r=n(1291),a=n(764),i=(n(0),n(892)),c=n(770),l=n.n(c),u=n(10),s={id:0,type:"ShareFolder",visible:!0,completed:null,seenAt:null,color:r.a.GREY},f={showHowToDialog:jest.fn(),closeHowToDialog:jest.fn(),openCreateFolderDialog:jest.fn()};jest.mock("../../hooks/use-secondary-onboarding-actions",function(){return{useSecondaryOnboardingActions:function(){return f}}});var d=l()([])({secondaryOnboarding:{isHowToOpen:!1}});it("should shallow render the ShareFolder component",function(){var e=Object(a.shallow)(Object(o.jsx)(u.a,{store:d},Object(o.jsx)(i.default,{skill:s,expanded:!0,fromAllSkillsDialog:!1})));expect(e).toHaveLength(1)});it("should mount render the ShareFolder component and have the correct Learn more link",function(){var e=Object(a.mount)(Object(o.jsx)(u.a,{store:d},Object(o.jsx)(i.default,{skill:s,expanded:!0,fromAllSkillsDialog:!1})));expect(e.find("#learn-more").first().prop("url")).toMatch("https://support.logmeininc.com/lastpass/help/what-are-shared-folders"),e.unmount()}),it("should mount render the ShareFolder component and open the How-to dialog",function(){var e=Object(a.mount)(Object(o.jsx)(u.a,{store:d},Object(o.jsx)(i.default,{skill:s,expanded:!0,fromAllSkillsDialog:!1})));e.find("#see-how-to").first().simulate("click"),expect(f.showHowToDialog).toHaveBeenCalled(),e.unmount()}),it("should mount render the ShareFolder component and open the Create a new shared folder dialog",function(){var e=Object(a.mount)(Object(o.jsx)(u.a,{store:d},Object(o.jsx)(i.default,{skill:s,expanded:!0,fromAllSkillsDialog:!1})));e.find("#create-shared-folder").first().simulate("click"),expect(f.openCreateFolderDialog).toHaveBeenCalled(),e.unmount()})},765:function(e,t){},766:function(e,t){},767:function(e,t){},768:function(e,t){},770:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};var n=r.applyMiddleware.apply(void 0,function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}(e))(function(){var e=[],n=[];return{getState:function(){return c(t)?t(e):t},getActions:function(){return e},dispatch:function(t){if(!(0,i.default)(t))throw new Error("Actions must be plain objects. Use custom middleware for async actions.");if("undefined"===typeof t.type)throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant? Action: '+JSON.stringify(t));e.push(t);for(var o=0;o<n.length;o++)n[o]();return t},clearActions:function(){e=[]},subscribe:function(e){return c(e)&&n.push(e),function(){var t=n.indexOf(e);t<0||n.splice(t,1)}},replaceReducer:function(e){if(!c(e))throw new Error("Expected the nextReducer to be a function.")}}});return n()}};var o,r=n(65),a=n(771),i=(o=a)&&o.__esModule?o:{default:o};var c=function(e){return"function"===typeof e}},771:function(e,t){var n="[object Object]";var o,r,a=Function.prototype,i=Object.prototype,c=a.toString,l=i.hasOwnProperty,u=c.call(Object),s=i.toString,f=(o=Object.getPrototypeOf,r=Object,function(e){return o(r(e))});e.exports=function(e){if(!function(e){return!!e&&"object"==typeof e}(e)||s.call(e)!=n||function(e){var t=!1;if(null!=e&&"function"!=typeof e.toString)try{t=!!(e+"")}catch(n){}return t}(e))return!1;var t=f(e);if(null===t)return!0;var o=l.call(t,"constructor")&&t.constructor;return"function"==typeof o&&o instanceof o&&c.call(o)==u}}}]);