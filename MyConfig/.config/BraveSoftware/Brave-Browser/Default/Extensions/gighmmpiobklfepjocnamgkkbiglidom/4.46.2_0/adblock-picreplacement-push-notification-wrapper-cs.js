'use strict';

/* For ESLint: List any global identifiers used in this file below */
/* global browser  */

/*
    This content script, when injected into tab, will
    wrap the Notification.requestPermission function, so that it will
    return a 'denied' permission if the user hadn't previously granted
    permission.
*/

// the following code will be injected into the Twitch JS page context.
if (typeof denyNotificationsRequests !== 'function') {
  const denyNotificationsRequests = function () {
    window.Notification.requestPermission = function theFN() {
      // When a website checks for the permission, deny it if not granted
      // and allow it if it's already allowed
      return new Promise((resolve) => {
        resolve(window.Notification.permission === 'granted' ? 'granted' : 'denied');
      });
    };
  }; // end of denyNotificationsRequests() - injected into the page context

  const injectDenyNotificationsWrapper = function () {
    const scriptToInject = `(${denyNotificationsRequests.toString()})();`;
    const script = document.createElement('script');
    script.type = 'application/javascript';
    script.async = false;
    script.textContent = scriptToInject;
    try {
      document.documentElement.appendChild(script);
      document.documentElement.removeChild(script);
    } catch (ex) {
      // eslint-disable-next-line no-console
      console.log(ex);
    }
  };
  injectDenyNotificationsWrapper();
}
