try{if("function"==typeof importScripts){try{var baseUrl=location.pathname.slice(0,-26);importScripts(baseUrl+"/zxcvbn.js"),importScripts(baseUrl+"/sjcl.js"),importScripts(baseUrl+"/sha256.js")}catch(x){try{importScripts("/zxcvbn.js"),importScripts("/sjcl.js"),importScripts("/sha256.js")}catch(x){importScripts("/js-thirdparty/zxcvbn.js"),importScripts("/js/sjcl/sjcl.js"),importScripts("/js/sha256.js")}}var startTime;function calculateStrength(x,e){if("undefined"==typeof zxcvbn)return console.error("No zxcvbn functionality available"),void sendPostMessage();var a=x?x.substring(0,50):"",s=e?e.substring(0,50).toLowerCase():"",o;return zxcvbn(a,[s,"lastpass","lastpass.com"]).score}function challengegetstrength(x,e){return 25*calculateStrength(e,x)}function challengecomputescore_async(x,e,a,s,o,n,r,t,d,i,c,l,h,v,g,u,f,p,m,_,w,y,S,b,P,O,M,j,k,A,T,U,N,D,E,R,z,C,F){function L(){postMessage({cmd:"report",runtimesec:void 0!==lx?lx:void 0,calcTimeMs:void 0!==startTime?(new Date).getTime()-startTime:void 0,g_totalscore:void 0!==e?e:void 0,g_aSites:void 0!==s?s:void 0,g_numsites:void 0!==o?o:0,g_numblanksites:void 0!==n?n:0,g_avgpasswordlength:void 0!==r?r:0,g_avgstrength:"undefined"!=typeof g_avgstrength?g_avgstrength:0,g_aPasswords:void 0!==t?t:{},g_MAXNUMCOMPUTESCORE:void 0!==d?d:0,g_numduppasswords:void 0!==i?i:0,g_numdupsites:void 0!==c?c:0,g_usernames:void 0!==l?l:[],WEAKPASSWORDSCORE:void 0!==h?h:50,g_strengthscore:void 0!==v?v:0,g_countscore:void 0!==g?g:0,g_numweak:void 0!==u?u:0,sharedavgstrength:void 0!==f?f:[],SharedAccounts:void 0!==p?p:[],g_runtimems:void 0!==m?m:0,sfcounts:void 0!==_?_:[],sharedstrengthscore:void 0!==w?w:[],sharedblanksites:void 0!==y?y:[],sharedweak:void 0!==S?S:[],sharedavgpasswordlength:void 0!==b?b:[],SharedPasswords:void 0!==P?P:[],sharedcountscore:void 0!==O?O:[],NonSharedAccounts:void 0!==M?M:[],g_SFNames:void 0!==j?j:[],AllSFNames:void 0!==k?k:[],sharedtotalscore:void 0!==A?A:[],g_numvulnerablesites:void 0!==T?T:0,g_allPasswords:void 0!==U?U:{},g_reuse:void 0!==N?N:void 0,g_blanksites:void 0!==D?D:void 0,g_allnumduppasswords:void 0!==E?E:0})}if(0!==e)return L(),void console.log("Not processing security score");var W,K=0,X,q,J,Z,B,G,H,q,J,Z,B,G,H;for(R=void 0===R?{}:R,void 0!==s[W=void 0===x?0:x]&&void 0!==s[W].sfname&&(X=s[W].sfname),void 0===X&&(X="nonshared"),void 0===_&&(_=[]),void 0===w&&(w=[]),void 0===y&&(y=[]),void 0===S&&(S=[]),void 0===b&&(b=[]),void 0===P&&(P=[]),void 0===O&&(O=[]),void 0===M&&(M=[]),void 0===j&&(j=[]),void 0===k&&(k=[]),void 0===_[X]&&(_[X]=0),_[X]++,void 0===x&&(g_challengeregexcache=[]);W<o;++W){if("function"==typeof reportprogress&&reportprogress(W,o),X="nonshared",void 0!==s[W].sfname)var X=s[W].sfname;var I=s[W].usernamedec,Q=s[W].passworddec;Q=Q||"";var V=s[W].passworddecfix,Y=s[W].domain2lvl,$=void 0!==s[W].realdomain2lvl?s[W].realdomain2lvl:Y,xx=void 0!==s[W].vulnerable;void 0===n&&(n=0),void 0===T&&(T=0),void 0===y[X]&&(y[X]=0),void 0===w[X]&&(w[X]=0);var ex="function"==typeof get_sitepwlen?get_sitepwlen($):1;if(xx)console.log("challengecomputescore_async : Found vulnerable site domain2lvl="+Y+" sfname="+X),"nonshared"==X&&++T,s[W].challenge_score=0;else if(0<Q.length&&Q.length<ex)s[W].challenge_score=0;else{s[W].challenge_score=challengegetstrength(I,Q);var ax=F&&F instanceof Array&&-1!==F.indexOf(s[W].realdomain2lvl),sx=C&&C instanceof Array&&-1!==C.indexOf(s[W].id);z&&(ax||sx)&&(s[W].is_excluded=!0)}if(""!=V){if("nonshared"==X&&(r+=Q.length),void 0===b[X]&&(b[X]=0),b[X]+=Q.length,void 0===P[X]&&(P[X]=[]),"nonshared"==X){void 0===t[V]&&(t[V]=[]),(void 0===t[V][Y]||"function"==typeof t[V][Y]&&void 0===t[V][Y].push)&&(t[V][Y]=[]);try{t[V][Y].push(W)}catch(x){return void(V=Q=I="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")}}void 0===U&&(U=[]),void 0===U[V]&&(U[V]=[],R[V]=[]),(void 0===U[V][Y]||"function"==typeof U[V][Y]&&void 0===U[V][Y].push)&&(U[V][Y]=[],R[V][Y]={users:[],hasDifferentUser:!1});try{U[V][Y].push(W),R[V][Y].hasDifferentUser||R[V][Y].users.forEach(function(x){x===I||(R[V][Y].hasDifferentUser=!0)}),R[V][Y].users.push(I)}catch(x){return void(V=Q=I="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")}if("nonshared"!=X){void 0===P[X][V]&&(P[X][V]=[]),(void 0===P[X][V][Y]||"function"==typeof P[X][V][Y]&&void 0===P[X][V][Y].push)&&(P[X][V][Y]=[]);try{P[X][V][Y].push(W)}catch(x){return void(V=Q=I="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")}}if(++K>d){var ox=null;try{"function"==typeof setTimeout?ox=setTimeout:"undefined"!=typeof LP&&void 0!==LP.mostRecent&&void 0!==LP.mostRecent().setTimeout&&(ox=LP.mostRecent().setTimeout)}catch(x){}var nx=0;return ox(function(){if(999<s.length){var x=Number(((W+1)/s.length*100).toFixed(2));Math.floor(x)==Math.ceil(x)&&console.log(x+"% score calculation done")}challengecomputescore_async(W+1,e,a,s,o,n,r,t,d,i,c,l,h,v,g,u,f,p,m,_,w,y,S,b,P,O,M,j,k,A,T,U,N,D,E,R,z,C,F)},0),void(V=Q=I="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")}V=Q=I="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}else"nonshared"==X&&n++,y[X]++,void 0!==D&&D.push(W),V=Q=I="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}for(H in g_challengeregexcache=[],r=o==n?0:Math.round(10*r/(o-n))/10,t)if(G=0,t.hasOwnProperty(H)){J=t[H];var rx=!1;for(var tx in J)R[H][tx].hasDifferentUser&&(rx=!0),J.hasOwnProperty(tx)&&G++;if(1==G&&!rx||""==H){if(void 0!==N)for(var dx in t[H])for(var ix in t[H][dx])delete N[t[H][dx][ix]];delete t[H]}else{for(var tx in++i,B=0,J)J.hasOwnProperty(tx)&&(B+=t[H][tx].length);for(var tx in c+=B,J)if(J.hasOwnProperty(tx))for(q in Z=t[H][tx])Z.hasOwnProperty(q)&&(W=t[H][tx][q],s[W].challenge_numduplicates=B,s[W].challenge_duplicatescore=s[W].challenge_score/G)}}for(H in H="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",void 0===U&&(U={},g_allnumdupsites=o),U)if(U.hasOwnProperty(H)){J=U[H],G=0;var rx=!1;for(var tx in J)R[H][tx].hasDifferentUser&&(rx=!0),J.hasOwnProperty(tx)&&++G;if(1==G&&!rx||""==H)delete U[H];else{for(var tx in void 0===E&&(E=0),++E,B=0,"undefined"==typeof g_allnumdupsites&&(g_allnumdupsites=0),J)J.hasOwnProperty(tx)&&(B+=U[H][tx].length);for(var tx in g_allnumdupsites+=B,J)if(J.hasOwnProperty(tx))for(var q in Z=U[H][tx])Z.hasOwnProperty(q)&&(W=U[H][tx][q],void 0!==s[W]&&(s[W].challenge_numduplicates=B,s[W].challenge_duplicatescore=s[W].challenge_score/G))}}H="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";var cx=0;for(W=0;W<s.length;++W)void 0!==s[W].sfname&&(X=s[W].sfname),void 0===s[W].sfname&&(X="nonshared"),void 0===S[X]&&(S[X]=0),s[W].challenge_scorefinal=s[W].challenge_score,!s[W].usernamedec||-1===s[W].usernamedec.indexOf("@")||s[W].usernamedec in l||(l[s[W].usernamedec]=[],l[s[W].usernamedec].hash=lp_sha2lib.sha256(s[W].usernamedec),l[s[W].usernamedec].link=s[W].link),void 0===s[W].challenge_dictionary||void 0===s[W].challenge_duplicatescore?void 0===s[W].challenge_dictionary?void 0===s[W].challenge_duplicatescore?(s[W].challenge_score<h&&""!=s[W].passworddecfix&&("nonshared"==X&&++u,"nonshared"!=X&&++S[X]),"nonshared"==X&&(s[W].is_excluded&&!0===s[W].is_excluded?cx++:v+=s[W].challenge_score,g_avgstrength=o==n?0:Math.round(10*v/(o-n-cx))/10,0!=M.length&&(g_avgstrength=M.length==n?0:Math.round(10*v/(M.length-n-cx))/10)),"nonshared"!=X&&(w[X]+=s[W].challenge_score,f[X]=_[X]==y[X]?0:Math.round(10*w[X]/(p[X].length-y[X]))/10),void 0===O[X]&&(O[X]=0),70<=s[W].challenge_score&&void 0===s[W].sfname&&(g+=2),70<=s[W].challenge_score&&void 0!==s[W].sfname&&(O[X]+=2)):(s[W].challenge_scorefinal=s[W].challenge_duplicatescore,void 0===s[W].sfname&&(v+=s[W].challenge_duplicatescore),void 0!==s[W].sfname&&(w[X]+=s[W].challenge_duplicatescore)):(s[W].challenge_scorefinal=.5*s[W].challenge_scorefinal,"nonshared"==X&&++u,"nonshared"!=X&&++S[X]):(s[W].challenge_scorefinal=.5*s[W].challenge_duplicatescore,"nonshared"==X&&++u,"nonshared"!=X&&++S[X]);100<g&&(g=100),100<O[X]&&(O[X]=100),void 0!==M&&0!=M.length&&(o=M.length),0<o-n&&(e=Math.round(10*(v/(o-n-cx)*.8+g/10))/10);for(var W=0;W<k.length;W++)X=k[W],void 0===p[X]&&(p[X]=[]),void 0===y[X]&&(y[X]=0),0<p[X].length-y[X]&&(A[X]=Math.round(10*(w[X]/(p[X].length-y[X])*.8+O[X]/10))/10);100<e&&(e=100),m=(new Date).getTime()-m;var lx=Math.round(m/1e3);L()}onmessage=function(x){"zxcvbn"===x.data.source&&"challengecomputescore_async"===x.data.cmd&&(startTime=(new Date).getTime(),challengecomputescore_async(x.data.curr,x.data.g_totalscore,JSON.parse(x.data.g_sites),x.data.g_aSites,x.data.g_numsites,x.data.g_numblanksites,x.data.g_avgpasswordlength,x.data.g_aPasswords,x.data.g_MAXNUMCOMPUTESCORE,x.data.g_numduppasswords,x.data.g_numdupsites,x.data.g_usernames,x.data.WEAKPASSWORDSCORE,x.data.g_strengthscore,x.data.g_countscore,x.data.g_numweak,x.data.sharedavgstrength,x.data.SharedAccounts,x.data.g_runtimems,x.data.sfcounts,x.data.sharedstrengthscore,x.data.sharedblanksites,x.data.sharedweak,x.data.sharedavgpasswordlength,x.data.SharedPasswords,x.data.sharedcountscore,x.data.NonSharedAccounts,x.data.g_SFNames,x.data.AllSFNames,x.data.sharedtotalscore,x.data.g_numvulnerablesites,x.data.g_allPasswords,x.data.g_reuse,x.data.g_blanksites,x.data.g_allnumduppasswords,x.data.equivalentDomainCheckList,x.data.isExcludeSwitchedOn,x.data.excludedPasswords,x.data.domainsForAutomaticPasswordExclude))}}else console.info("Zxcvbn-Worker initial phase done")}catch(x){console.error("inside-zxcvbn-worker",x)}