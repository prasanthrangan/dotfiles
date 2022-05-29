(()=>{"use strict";class e extends Error{constructor(e){super(e),this.name="LoginError"}}class t extends Error{constructor(e){super(e),this.name="ServerOutageError"}}class s extends Error{constructor(e,t){super(t),this.code=e}}class r extends Error{constructor(e,t){super(e),this.featureName=t}}const o={LoginError:e,ServerOutageError:t,HTTPError:s,FeatureDependencyError:r};Promise.allSettled||(Promise.allSettled=e=>Promise.all(e.map((e=>e.then((e=>({status:"fulfilled",value:e}))).catch((e=>({status:"rejected",reason:e})))))));const a=Object.freeze({ACCOUNT:1,APP:2,BUNDLE:3,STORE_DEFAULT:4,FUNDS:5,REGISTER_KEY:6,SALE:7,SEARCH:8,STATS:9,STORE_FRONT:10,SUB:11,WISHLIST:12,AGECHECK:13,COMMUNITY_DEFAULT:14,WORKSHOP:15,PROFILE_ACTIVITY:16,GAMES:17,PROFILE_EDIT:18,BADGES:19,GAME_CARD:20,FRIENDS_THAT_PLAY:21,FRIENDS:22,MARKET_SEARCH:23,INVENTORY:24,MARKET_LISTING:25,MARKET_HOME:26,PROFILE_HOME:27,GROUP_HOME:28,GUIDES:29,COMMUNITY_APP:30,COMMUNITY_STATS:31,MY_WORKSHOP:32,SHARED_FILES:33,WORKSHOP_BROWSE:34,EDIT_GUIDE:35,RECOMMENDED:36,BOOSTER_CREATOR:37,TRADE_OFFER:38,FRIENDS_AND_GROUPS:39,POINTS_SHOP:40});class n{constructor(e){this.context=e}checkPrerequisites(){return!0}apply(){throw new Error("Stub")}logError(e,t,...s){console.group(this.constructor.name),console.error(t,...s),console.error(e),console.groupEnd()}}class i{static escape(e){const t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"};return e.replace(/[&<>"']/g,(e=>t[e]))}static fragment(e){const t=document.createElement("template");return t.innerHTML=DOMPurify.sanitize(e),t.content}static element(e){return i.fragment(e).firstElementChild}static _getNode(e){let t=e;return null==t?(console.warn(`${t} is not an Element.`),null):("string"==typeof t&&(t=document.querySelector(t)),t instanceof Element?t:(console.warn(`${t} is not an Element.`),null))}static inner(e,t){const s=i._getNode(e);return s&&(s.innerHTML=DOMPurify.sanitize(t)),s}static replace(e,t){const s=i._getNode(e);return s&&(s.outerHTML=DOMPurify.sanitize(t)),s}static wrap(e,t,s=t){const r=i._getNode(t);if(!r)return null;const o=null===s?r.parentElement.lastElementChild:i._getNode(s),a=[r];for(let e=r;null!==e.nextElementSibling&&e!==o;e=e.nextElementSibling)a.push(e.nextElementSibling);const n=i.element(e);return r.replaceWith(n),n.append(...a),n}static adjacent(e,t,s){const r=i._getNode(e);return r&&r.insertAdjacentHTML(t,DOMPurify.sanitize(s)),r}static beforeBegin(e,t){i.adjacent(e,"beforebegin",t)}static afterBegin(e,t){i.adjacent(e,"afterbegin",t)}static beforeEnd(e,t){i.adjacent(e,"beforeend",t)}static afterEnd(e,t){i.adjacent(e,"afterend",t)}}class c{static get(e,t){const s=e.trim();return c.cache.has(s)?c.cache.get(s):t}static set(e,t,s=31536e3){let r=e.trim(),o=t.trim();c.cache.set(r,o),r=encodeURIComponent(r),o=encodeURIComponent(o),document.cookie=`${r}=${o}; max-age=${s}`}static remove(e){let t=e.trim();c.cache.delete(t),t=encodeURIComponent(t),document.cookie=`${t}; expires=Thu, 01 Jan 1970 00:00:00 GMT`}static init(){c.cache=new Map;for(let[e,t]of document.cookie.split(";").map((e=>e.split("="))))e=e.trim(),c.cache.set(e,decodeURIComponent(t))}}c.init();const l=Object.freeze({BACKGROUND:1,CONTENT_SCRIPT:2,OPTIONS:3});let u;if(browser.extension.getBackgroundPage){const e=browser.extension.getBackgroundPage();u=e===window?l.BACKGROUND:l.OPTIONS}else u=l.CONTENT_SCRIPT;class h{static isBackgroundScript(){return u===l.BACKGROUND}static isContentScript(){return u===l.CONTENT_SCRIPT}static isOptions(){return u===l.OPTIONS}}class _{static getCurrentSteamLanguage(){if(null!==this._currentSteamLanguage)return this._currentSteamLanguage;for(const e of document.querySelectorAll("script[src]")){const t=new URL(e.src).searchParams.get("l");if(t)return _._currentSteamLanguage=t,this._currentSteamLanguage}return h.isContentScript()&&(_._currentSteamLanguage=c.get("Steam_Language")||null),this._currentSteamLanguage}static getLanguageCode(e){return _.languages[e]||"en"}static isCurrentLanguageOneOf(e){return e.includes(_.getCurrentSteamLanguage())}}_._currentSteamLanguage=null,_.languages={english:"en",bulgarian:"bg",czech:"cs",danish:"da",dutch:"nl",finnish:"fi",french:"fr",greek:"el",german:"de",hungarian:"hu",italian:"it",japanese:"ja",koreana:"ko",norwegian:"no",polish:"pl",portuguese:"pt-PT",brazilian:"pt-BR",russian:"ru",romanian:"ro",schinese:"zh-CN",spanish:"es-ES",latam:"es-419",swedish:"sv-SE",tchinese:"zh-TW",thai:"th",turkish:"tr",ukrainian:"ua",vietnamese:"vi"};class g{static getURL(e){return browser.runtime.getURL(e)}static get(e){return fetch(g.getURL(e))}static getJSON(e){return g.get(e).then((e=>e.json()))}static getText(e){return g.get(e).then((e=>e.text()))}}class d{static has(e){return Object.prototype.hasOwnProperty.call(this.cache,e)}static get(e){return void 0!==this.cache[e]||void 0===this.defaults?this.cache[e]:(void 0===this.defaults[e]&&console.warn('Unrecognized storage key "%s"',e),this.defaults[e])}static set(e,t){return this.cache[e]=t,this._adapter.set({[e]:t})}static import(e){for(const[t,s]of Object.entries(e))this.cache[t]=s;return this._adapter.set(e)}static remove(e){return void 0!==this.cache[e]&&delete this.cache[e],this._adapter.remove(e)}static keys(e=""){return Object.keys(this.cache).filter((t=>t.startsWith(e)))}static entries(){return Object.entries(this.cache)}static async clear(e=!1){let t;e||(t=(this.persistent??[]).reduce(((e,t)=>(e[t]=this.cache[t],e)),{})),await this._adapter.clear(),this.cache={},e||await this.import(t)}static async init(){const e=this._adapter===browser.storage.sync?"sync":"local",t=d.caches[e];return void 0!==t?(this.cache=t,this.cache):(d.caches[e]={},this.cache=d.caches[e],browser.storage.onChanged.addListener(((t,s)=>{if(e===s)for(const[e,{newValue:s}]of Object.entries(t))this.cache[e]=s})),Object.assign(this.cache,await this._adapter.get(null)))}static then(e,t){const s=this._initialized?Promise.resolve(this.cache):this.init();return this._initialized=!0,s.then(e,t)}static toJson(){return JSON.stringify(this.cache)}}d.caches={};const m={version:browser.runtime.getManifest().version,db_version:3};class p extends d{}p._adapter=browser.storage.sync||browser.storage.local,p.QUOTA_BYTES_PER_ITEM=browser.storage.sync?8192:5240832,p.defaults=Object.freeze({language:"english",version:m.version,version_show:!0,highlight_owned_color:"#00ce67",highlight_wishlist_color:"#0491bf",highlight_coupon_color:"#a26426",highlight_inv_gift_color:"#800040",highlight_inv_guestpass_color:"#513c73",highlight_notinterested_color:"#4f4f4f",highlight_collection_color:"#856d0e",highlight_waitlist_color:"#4c7521",tag_owned_color:"#00b75b",tag_wishlist_color:"#0383b4",tag_coupon_color:"#c27120",tag_inv_gift_color:"#b10059",tag_inv_guestpass_color:"#65449a",tag_notinterested_color:"#4f4f4f",tag_collection_color:"#856d0e",tag_waitlist_color:"#4c7521",highlight_owned:!0,highlight_wishlist:!0,highlight_coupon:!1,highlight_inv_gift:!1,highlight_inv_guestpass:!1,highlight_notinterested:!1,highlight_excludef2p:!1,highlight_collection:!0,highlight_waitlist:!0,tag_owned:!1,tag_wishlist:!1,tag_coupon:!1,tag_inv_gift:!1,tag_inv_guestpass:!1,tag_notinterested:!0,tag_collection:!1,tag_waitlist:!1,tag_short:!1,hidetmsymbols:!1,showlowestprice:!0,showlowestprice_onwishlist:!0,showlowestpricecoupon:!0,showallstores:!0,stores:[],override_price:"auto",showregionalprice:"mouse",regional_countries:["us","gb","ru","br","au","jp"],show_es_homepagetabs:!0,showmarkettotal:!1,showsteamrepapi:!0,showmcus:!0,showoc:!0,showhltb:!0,showyoutube:!0,showtwitch:!0,showpcgw:!0,showcompletionistme:!1,showprotondb:!1,showviewinlibrary:!1,showsteamcardexchange:!1,showitadlinks:!0,showsteamdb:!0,showbartervg:!1,showastatslink:!0,showyoutubegameplay:!0,showyoutubereviews:!0,showwsgf:!0,exfgls:!0,app_custom_link:[{enabled:!1,name:"Google",url:"google.com/search?q=[ID]+[NAME]",icon:"www.google.com/images/branding/product/ico/googleg_lodp.ico"}],customize_apppage:{recentupdates:!0,reviews:!0,about:!0,contentwarning:!0,steamchart:!0,steamspy:!0,surveys:!0,sysreq:!0,legal:!0,morelikethis:!0,recommendedbycurators:!0,customerreviews:!0},customize_frontpage:{featuredrecommended:!0,specialoffers:!0,trendingamongfriends:!0,discoveryqueue:!0,browsesteam:!0,curators:!0,morecuratorrecommendations:!0,recentlyupdated:!0,fromdevelopersandpublishersthatyouknow:!0,popularvrgames:!0,homepagetabs:!0,gamesstreamingnow:!0,under:!0,updatesandoffers:!0,homepagesidebar:!0},show_package_info:!1,show_steamchart_info:!0,show_steamspy_info:!0,show_early_access:!0,show_alternative_linux_icon:!1,show_itad_button:!1,skip_got_steam:!1,installsteam:"show",openinnewtab:!1,keepssachecked:!1,showemptywishlist:!0,user_notes_app:!0,user_notes_wishlist:!0,showwishliststats:!0,oneclickremovewl:!1,user_notes:{},user_notes_adapter:"synced_storage",replaceaccountname:!0,showlanguagewarning:!0,showlanguagewarninglanguage:"english",homepage_tab_selection:"remember",homepage_tab_last:null,send_age_info:!0,removebroadcasts:!1,mp4video:!1,horizontalscrolling:!0,showsupportinfo:!0,showdrm:!0,regional_hideworld:!1,showinvnav:!0,quickinv:!0,quickinv_diff:-.01,community_default_tab:"",showallachievements:!1,showallstats:!0,replacecommunityhublinks:!1,hideannouncementcomments:!1,showachinstore:!0,hideactivelistings:!1,showlowestmarketprice:!0,hidespamcomments:!1,spamcommentregex:"[\\u2500-\\u25FF]",wlbuttoncommunityapp:!0,removeguideslanguagefilter:!1,disablelinkfilter:!1,sortfriendsby:"default_ASC",sortreviewsby:"default_ASC",sortgroupsby:"default_ASC",show1clickgoo:!0,show_profile_link_images:"gray",show_custom_themes:!0,profile_pinned_bg:!1,profile_steamrepcn:!0,profile_steamgifts:!0,profile_steamtrades:!0,profile_bartervg:!0,profile_steamrep:!0,profile_steamdbcalc:!0,profile_astats:!0,profile_backpacktf:!0,profile_astatsnl:!0,profile_steamid:!0,profile_custom_link:[{enabled:!0,name:"Google",url:"google.com/search?q=[ID]",icon:"www.google.com/images/branding/product/ico/googleg_lodp.ico"}],fav_emoticons:[],group_steamgifts:!0,steamcardexchange:!0,purchase_dates:!0,show_badge_progress:!0,show_coupon:!0,show_wishlist_link:!0,show_wishlist_count:!0,show_progressbar:!0,show_backtotop:!1,profile_showcase_twitch:!0,profile_showcase_own_twitch:!1,profile_showcase_twitch_profileonly:!1,itad_import_library:!1,itad_import_wishlist:!1,add_to_waitlist:!1,context_steam_store:!1,context_steam_market:!1,context_itad:!1,context_bartervg:!1,context_steamdb:!1,context_steamdb_instant:!1,context_steam_keys:!1}),p.persistent=["user_notes","user_notes_adapter"];class f{static loadLocalization(e){return g.getJSON(`/localization/${e}.json`)}static init(){if(f._promise)return f._promise;let e=_.getCurrentSteamLanguage();const t=p.get("language");function s(e,t){for(const[r,o]of Object.entries(t))void 0!==e[r]?"object"==typeof o?s(e[r],o):""!==o&&(e[r]=o):console.warn("The key %s doesn't exist in the English localization file",r);return e}null===e?e=t:e!==t&&(p.set("language",e),class{static message(e){return browser.runtime.sendMessage(e)}static action(e,...t){return t.length?this.message({action:e,params:t}):this.message({action:e})}}.action("clearpurchases"));const r=_.getLanguageCode(e),o=["en"];return null!==r&&"en"!==r&&o.push(r),f._promise=Promise.all(o.map((e=>f.loadLocalization(e)))).then((([e,t])=>(f.str=e,t&&s(f.str,t),f.str))),f._promise}static then(e,t){return f.init().then(e,t)}static getString(e){const t=e.split(".").reverse();let s=f.str;for(;t.length;){if("object"!=typeof s)return null;s=s[t.pop()]}return s}}f._promise=null;class w extends d{static async init(){return await super.init(),this===w?this.migrate():null}static async migrate(){const e=this.get("local_storage_migration");let t;if("store.steampowered.com"===location.hostname)t="store";else if("steamcommunity.com"===location.hostname)t="community";else{if(h.isContentScript())return null;t="extension"}return e[t]?null:(await Promise.all(Object.keys(w.defaults).map((async e=>{let t=localStorage.getItem(e);if(null!==t){try{t=JSON.parse(t)}catch(e){throw console.error("Can't parse value",t),e}await w.set(e,t),localStorage.removeItem(e)}}))),e[t]=!0,w.set("local_storage_migration",e))}}w._adapter=browser.storage.local,w.defaults=Object.freeze({access_token:null,lastItadImport:{from:null,to:null},login:{steamId:null,profilePath:null},storeCountry:null,expand_slider:!1,es_guide_tags:{},market_stats:{startListing:null,purchaseTotal:0,saleTotal:0},popular_refresh:!1,workshop_state:"",playback_hd:!1,show_review_section:!0,steampeek:!1,support_info:null,hide_login_warn_store:!1,hide_login_warn_community:!1,review_filters:{},local_storage_migration:{store:!1,community:!1,extension:!1}});const y=["contextMenus"];Object.freeze({context_steam_store:{persistent:!0,permissions:y},context_steam_market:{persistent:!0,permissions:y},context_itad:{persistent:!0,permissions:y},context_bartervg:{persistent:!0,permissions:y},context_steamdb:{persistent:!0,permissions:y},context_steamdb_instant:{persistent:!0,permissions:y},context_steam_keys:{persistent:!0,permissions:y}});class b extends n{checkPrerequisites(){return null===document.querySelector(".error_page_links")}apply(){i.afterEnd(document.querySelector("#your_slots").parentNode,'<div id="your_slots_count" class="trade_item_box"><span id="your_items_count"></span></div>'),i.afterEnd(document.querySelector("#their_slots").parentNode,"<div id='their_slots_count' class='trade_item_box'><span id='their_items_count'></span></div>"),new MutationObserver((e=>{for(const t of e)for(const e of t.addedNodes){if(!e.classList||!e.classList.contains("item"))continue;const t=document.querySelector("#your_items_count"),s=document.querySelector("#their_items_count"),r=document.querySelectorAll("#your_slots .has_item").length;if(r>0){const e=1===r?f.str.tradeoffer.num_item:f.str.tradeoffer.num_items;t.textContent=e.replace("__num__",r),document.querySelector("#your_slots_count").style.display="block"}else document.querySelector("#your_slots_count").style.display="none";const o=document.querySelectorAll("#their_slots .has_item").length;if(o>0){const e=1===o?f.str.tradeoffer.num_item:f.str.tradeoffer.num_items;s.textContent=e.replace("__num__",o),document.querySelector("#their_slots_count").style.display="block"}else document.querySelector("#their_slots_count").style.display="none";t.className="",s.className="",r===o?(t.classList.add("es_same"),s.classList.add("es_same")):r>o?(t.classList.add("es_higher"),s.classList.add("es_lower")):(t.classList.add("es_lower"),s.classList.add("es_higher"))}})).observe(document,{subtree:!0,childList:!0})}}class S extends n{checkPrerequisites(){return this._linksNode=document.querySelector(".error_page_links"),null!==this._linksNode}apply(){i.beforeEnd(this._linksNode,`<div class="black_square_btn" id="back_to_tradeoffers_btn"> <a href="https://steamcommunity.com/my/tradeoffers"><div class="cap left"></div><div class="cap right"></div>${f.str.tradeoffer.back}</a></div>`)}}class E extends class{constructor(e,t){this._callbacks=[],this.type=e,this.features=t.map((e=>new e(this)))}applyFeatures(){return class{static async apply(e){for(this._promisesMap=new Map,this._stats={completed:0,failed:0,dependency:0};e.length>0;){const t=e.pop(),s=this._generateFeatureChain(t);null===s?e.unshift(t):this._promisesMap.set(t.constructor,s)}await Promise.allSettled(Array.from(this._promisesMap.values())),console.log("Feature loading complete, %i successfully loaded, %i failed to load, %i didn't load due to dependency errors",this._stats.completed,this._stats.failed,this._stats.dependency)}static _generateFeatureChain(e){let t=!0,s=Promise.resolve(!0);if(Array.isArray(e.constructor.dependencies)){for(const s of e.constructor.dependencies)if(!this._promisesMap.has(s)){t=!1;break}t&&(s=Promise.all(Array.from(this._promisesMap.entries()).filter((([t])=>e.constructor.dependencies.includes(t))).map((([,e])=>e))))}return t?s.then((t=>{let s=!0;return e.constructor.weakDependency||(s=Array.isArray(t)?t.every((e=>e)):t),s&&e.checkPrerequisites()})).then((async t=>(t&&(await e.apply(),++this._stats.completed),t))).catch((t=>{const s=e.constructor.name;if(t instanceof o.FeatureDependencyError)throw console.warn("Not applying feature %s due to an error in the dependency chain (namely %s)",s,t.featureName),++this._stats.dependency,t;throw console.group(s),console.error("Error while applying feature %s",s),console.error(t),console.groupEnd(),++this._stats.failed,new o.FeatureDependencyError("Failed to apply",s)})):null}}.apply(this.features)}registerCallback(e){this._callbacks.push(e)}triggerCallbacks(...e){for(const t of this._callbacks)t(...e)}}{constructor(){super(a.TRADE_OFFER,[b,S])}}!async function(){try{await p,await f}catch(e){return console.group("Augmented Steam initialization"),console.error("Failed to initiliaze Augmented Steam"),console.error(e),void console.groupEnd()}(new E).applyFeatures()}()})();
//# sourceMappingURL=trade_offer.js.map