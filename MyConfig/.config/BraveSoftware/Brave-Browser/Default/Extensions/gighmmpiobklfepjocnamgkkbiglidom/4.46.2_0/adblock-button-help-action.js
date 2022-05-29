'use strict';

/* For ESLint: List any global identifiers used in this file below */
/* global pageInfo, transitionTo, logHelpFlowResults, filterUpdateError:true,
  browser, savedData, translate */

// Help flow button actions -- called when the associated buttons are clicked
const popupMenuHelpActionMap = {
  // Checks if the page is whitelisted. If the page isn't whitelisted,
  // updates filter lists and checks for update errors
  // Disables button while updating the filter lists and reenables it
  // when updating is complete or after 6 seconds
  okCheckWhitelistAction() {
    if (pageInfo.whitelisted) {
      transitionTo('seeAdOnWhitelist', false);
    } else {
      transitionTo('seeAdNotOnWhitelist', false);
      $('button').prop('disabled', true);
      browser.runtime.sendMessage({ command: 'updateFilterLists' });
      setTimeout(() => {
        browser.runtime.sendMessage({ command: 'checkUpdateProgress' }).then((progress) => {
          if (progress.inProgress) {
            setTimeout(() => {
              browser.runtime.sendMessage({ command: 'checkUpdateProgress' }).then((progress2) => {
                if (progress2.inProgress || progress2.filterError) {
                  filterUpdateError = true;
                }
                $('button').prop('disabled', false);
              });
            }, 5000); // wait five seconds and check again
          } else {
            $('button').prop('disabled', false);
          }
          if (progress.filterError && !progress.inProgress) {
            filterUpdateError = true;
          }
        });
      }, 1000); // wait one second and check
    }
  },
  okCheckWhitelistDistractionsAction() {
    if (pageInfo.whitelisted) {
      transitionTo('seeDistractionOnWhitelist', false);
    } else {
      transitionTo('seeDistractionNotOnWhitelist', false);
      $('button').prop('disabled', true);
      browser.runtime.sendMessage({ command: 'updateFilterLists' });
      setTimeout(() => {
        browser.runtime.sendMessage({ command: 'checkUpdateProgress' }).then((progress) => {
          if (progress.inProgress) {
            setTimeout(() => {
              browser.runtime.sendMessage({ command: 'checkUpdateProgress' }).then((progress2) => {
                if (progress2.inProgress || progress2.filterError) {
                  filterUpdateError = true;
                }
                $('button').prop('disabled', false);
              });
            }, 5000); // wait five seconds and check again
          } else {
            $('button').prop('disabled', false);
          }
          if (progress.filterError && !progress.inProgress) {
            filterUpdateError = true;
          }
        });
      }, 1000); // wait one second and check
    }
  },
  dontRemoveWhitelistAction() {
    transitionTo('dontRemoveWhitelist', false);
  },
  removeWhitelistAction() {
    if (pageInfo.url) {
      browser.runtime.sendMessage({ command: 'tryToUnwhitelist', url: pageInfo.url.href });
    }
    transitionTo('removeWhitelist', false);
  },
  dontRemoveWhitelistDistractionAction() {
    transitionTo('dontRemoveWhitelistDistraction', false);
  },
  removeWhitelistDistractionAction() {
    if (pageInfo.url) {
      browser.runtime.sendMessage({ command: 'tryToUnwhitelist', url: pageInfo.url.href });
    }
    transitionTo('removeWhitelistDistraction', false);
  },
  finishFlowAction() {
    logHelpFlowResults('finishFlow');
    window.close();
  },
  reloadFinishFlowAction() {
    browser.tabs.reload();
    logHelpFlowResults('reloadFinishFlow');
    window.close();
  },
  reloadCheckAction() {
    browser.tabs.reload();
    transitionTo('checkedBasics', false);
  },
  reloadCheckDistractionAction() {
    browser.tabs.reload();
    transitionTo('checkedDistractionBasics', false);
  },
  stillSeeAdAction() {
    if (filterUpdateError) {
      transitionTo('seeAdFilterError', false);
    } else {
      transitionTo('seeAdFiltersGood', false);
    }
  },
  stillSeeDistractionAction() {
    if (filterUpdateError) {
      transitionTo('seeDistractionFilterError', false);
    } else {
      transitionTo('whichDistractions', false);
    }
  },
  problemSolvedAction() {
    transitionTo('problemSolved', false);
  },
  seeAdEnglishSiteAction() {
    transitionTo('seeAdEnglishSite', false);
  },
  seeAdNotEnglishSiteAction() {
    transitionTo('seeAdNotEnglishSite', false);
  },
  // Unpauses and reloads the page
  unpauseAndReloadAction() {
    if (pageInfo.paused) {
      browser.runtime.sendMessage({ command: 'adblockIsPaused', newValue: false }).then(() => {
        browser.tabs.reload();
        transitionTo('unpauseAndReload', false);
      });
    } else if (pageInfo.url) {
      browser.runtime.sendMessage({ command: 'adblockIsDomainPaused', activeTab: { url: pageInfo.url.href, id: pageInfo.id }, newValue: false }).then(() => {
        browser.tabs.reload();
        transitionTo('unpauseAndReload', false);
      });
    } else {
      browser.tabs.reload();
      transitionTo('unpauseAndReload', false);
    }
  },
  // Unpauses and reloads the page
  unpauseAndReloadActionDistraction() {
    if (pageInfo.paused) {
      browser.runtime.sendMessage({ command: 'adblockIsPaused', newValue: false }).then(() => {
        browser.tabs.reload();
        browser.runtime.sendMessage({ command: 'getCurrentTabInfo' }).then((info) => {
          // eslint-disable-next-line no-global-assign
          pageInfo = info;
          transitionTo('unpauseAndReloadDistraction', false);
        });
      });
    } else if (pageInfo.url) {
      browser.runtime.sendMessage({ command: 'adblockIsDomainPaused', activeTab: { url: pageInfo.url.href, id: pageInfo.id }, newValue: false }).then(() => {
        browser.tabs.reload();
        browser.runtime.sendMessage({ command: 'getCurrentTabInfo' }).then((info) => {
          // eslint-disable-next-line no-global-assign
          pageInfo = info;
          transitionTo('unpauseAndReloadDistraction', false);
        });
      });
    } else {
      browser.tabs.reload();
      browser.runtime.sendMessage({ command: 'getCurrentTabInfo' }).then((info) => {
        // eslint-disable-next-line no-global-assign
        pageInfo = info;
        transitionTo('unpauseAndReloadDistraction', false);
      });
    }
  },
  dontChangeSeeAdsAction() {
    transitionTo('dontChangeSeeAds', false);
  },
  dontChangeSeeDistractionAction() {
    transitionTo('dontChangeSeeDistraction', false);
  },
  seeAdsUnpausedAction() {
    transitionTo('seeAdFiltersGood', false);
  },
  // Pauses and reloads the page
  reloadStillBrokenAction() {
    browser.runtime.sendMessage({ command: 'adblockIsPaused', newValue: true }).then(() => {
      browser.tabs.reload();
      transitionTo('reloadStillBroken', false);
    });
  },
  stillBrokenNotAdBlockAction() {
    transitionTo('stillBrokenNotAdBlock', false);
  },
  stillBrokenAdBlockAction() {
    transitionTo('stillBrokenAdBlock', false);
  },
  reportRecievedAction() {
    const msg = {
      command: 'sendDCReport',
      url: pageInfo.url.origin + pageInfo.url.pathname,
      type: savedData.titleText,
      id: savedData.subId,
    };
    browser.runtime.sendMessage(msg).then(() => {
      transitionTo('finishDCSubmission', false);
    });
  },
  checkIfSubscribedToList(segue) {
    const subId = segue.correlates_to_filter_list;
    const titleText = segue.content;
    savedData = { subId, titleText };
    if (pageInfo && pageInfo.subscriptions && pageInfo.subscriptions[subId]) {
      transitionTo('requestDCSubmission', false);
    } else {
      transitionTo('enableDCFeature', false);
    }
  },
  distractionControlFeatureDisabled() {
    transitionTo('distractionControlFeatureDisabled', false);
  },
  requestDCSubmission() {
    transitionTo('requestDCSubmission', false);
  },
  showDCHelpPanel() {
    transitionTo('showDCHelpPanel', false);
  },
  subscribeToFilterList() {
    transitionTo('waitToRefreshPage', false);
    const port = browser.runtime.connect({ name: 'ui' });
    port.onMessage.addListener((message) => {
      if (message && message.type === 'subscriptions.respond' && message.action === 'downloadStatus') {
        setTimeout(() => { // wait at least 2 seconds for the user to see the button / icon change
          port.disconnect();
          $('#help_content button.button[disabled]').text(translate('reload_the_page')).attr('disabled', false);
        }, 2000);
      }
    });

    port.postMessage({
      type: 'subscriptions.listen',
      filter: ['added', 'downloadStatus'],
    });

    browser.runtime.sendMessage({ command: 'subscribe', id: savedData.subId });
  },
  reloadcheckedDistractions() {
    browser.tabs.reload();
    transitionTo('checkedDistractions', false);
  },
  distractionsProblemSolvedAction() {
    transitionTo('seeingDistractionsProblemSolved', false);
  },
  whichDistractionsAction() {
    transitionTo('seeDistraction', false);
  },
};
