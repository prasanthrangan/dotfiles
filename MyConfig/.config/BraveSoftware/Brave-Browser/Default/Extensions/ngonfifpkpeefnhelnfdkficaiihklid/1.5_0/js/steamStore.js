"use strict";

var id = window.location.href.slice(35).split("/")[0];
var protonAppLink = "https://www.protondb.com/app/" + id;

// Check if the app runs natively
var tabs = document.getElementsByClassName("sysreq_tab");
var isNative = checkNative(tabs);


//  Send app id to the listener in background.js and callback the createProtonButton with the results
chrome.runtime.sendMessage({
        contentScriptQuery: "queryProtonRating",
        appID: id
    },
    run
);

function run(res) {
    var rating = res[0];
    var button = createProtonButton(rating);
    addButtonToClass(button, "apphub_OtherSiteInfo");
}

//  If app is native, create a button for that too
if (isNative) {
    var nativeButton = createProtonButton("native");
    addButtonToClass(nativeButton, "apphub_OtherSiteInfo");
}

// Check if system requirements tabs include a linux tab
function checkNative(sysreq_tabs) {
    for (let i = 0; i < sysreq_tabs.length; i++) {
        var tab = sysreq_tabs.item(i);
        if (tab.getAttribute("data-os") == "linux") {
            return true;
        }
    }
    return false;
}

// Shared Functions
function createProtonButton(rating) {
    //  Create a div.
    var cont = document.createElement("div");
    cont.className = "proton_rating_div proton_" + rating;

    //  Create an anchor link, set the href to the protondb page, add it to the container div.
    var pageLink = document.createElement("a");
    pageLink.className = "proton_rating_link";
    pageLink.href = protonAppLink;
    pageLink.text = (rating === "native" ? rating[0].toUpperCase() + rating.substring(1) : "Proton: " + rating[0].toUpperCase() + rating.substring(1));
    pageLink.target = "_blank";
    cont.appendChild(pageLink);
    return cont;

}

function addButtonToClass(button, className) {
    //  Get the "Community Hub" button on the steam page and append the new div to the parent of the button.
    var otherSiteButton = document.getElementsByClassName(className);
    if (otherSiteButton) {
        otherSiteButton[0].append(button);
    }
}