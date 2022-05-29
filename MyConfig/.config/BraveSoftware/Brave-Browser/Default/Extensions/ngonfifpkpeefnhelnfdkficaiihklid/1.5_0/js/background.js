"use strict";

chrome.runtime.onMessage.addListener(
  function(req, from, sendRes) {
      if (req.contentScriptQuery == "queryProtonRating") {
          //    link to game ratings on proton
          var href = "https://www.protondb.com/api/v1/reports/summaries/" + req.appID + ".json";
          
          //    Fetch the body from the appid's protondb page then if response if 404, that means its not been reviewed enough then return the rating field in the json
          fetch(href)
              .then(res => {
                  if (!res.ok) {
                      if (res.status == 404) {
                          sendRes(["pending", req.appID]);
                          return true;
                      }
                      throw Error(res.status);
                  }
                  return res.json();
              })
              .then(data => {sendRes([data.tier, req.appID]);}).catch(error => console.log(error))

          return true;
      }
  }
);
