/** hooks Amazon framework to be notified of product variation change events */
(function () {
	function projectPlanes(planes) {
		try {
			if ("ORCA_SHIRT" == twisterController.twisterModel.twisterJSInitData.productTypeName) {
				return;
			}
		} catch (c) {}
		window.postMessage('{"asin": "' + planes + '"}', location.href);
	}
	if (!(0 < document.documentElement.innerHTML.indexOf("https://m.media-amazon.com/images/G/01/Merch"))) {
		window.addEventListener("message", function (e) {
			if (("https://keepa.com" == e.origin || "https://test.keepa.com" == e.origin) && e.data.hasOwnProperty("origin") && "keepaIframe" == e.data.origin && "getState" == e.data.key) {
				var command_module_id = null;
				var dimensionCombinationToASINMap = null;
				try {
					command_module_id = DetailPage.StateController.getState();
					dimensionCombinationToASINMap = Twister.dimensionalSummaryModule.dimensionCombinationToASINMap;
				} catch (d) {}
				e.source.postMessage({
					origin: "keepaContentScript",
					key: e.data.key,
					value: command_module_id,
					value2: dimensionCombinationToASINMap,
					id: e.data.id
				}, e.origin);
			}
		});

		var cbObj = function () {
			try {
				if (DetailPage) {
					var planes = DetailPage.StateController.getState().current_asin;
				} else {
					if (goTwisterCore) {
						planes = goTwisterCore.getSelectedASIN();
					} else {
						return;
					}
				}
				projectPlanes(planes);
			} catch (c) {}
		};

		var setState = function (resetGroupState) {
			projectPlanes(resetGroupState.current_hovered_asin);
		};

		var h = 0;

		var init = function () {
			try {
				var a = false;
				try {
					if (DetailPage && DetailPage.StateController.setState) {
						projectPlanes(DetailPage.StateController.getState().current_asin);
						var setState = DetailPage.StateController.setState;

						DetailPage.StateController.setState = function () {
							try {
								if (arguments && 2 == arguments.length && "current_asin" == arguments[0]) {
									projectPlanes(arguments[1]);
								}
							} catch (d) {}
							return setState.apply(this, arguments);
						};
						return;
					}
				} catch (d) {
					a = true;
				}
				try {
					if (twisterController && twisterController.twisterModel && twisterController.twisterModel.twisterState && twisterController.twisterModel.twisterState.setCurrentASIN) {
						projectPlanes(twisterController.twisterModel.twisterState.getCurrentASIN());
						setState = twisterController.twisterModel.twisterState.setCurrentASIN;

						DtwisterController.twisterModel.twisterState.setCurrentASIN = function () {
							try {
								if (arguments && 2 == arguments.length && "current_asin" == arguments[0]) {
									projectPlanes(arguments[1]);
								}
							} catch (d) {}
							return setState.apply(this, arguments);
						};
						a = false;
						return;
					}
				} catch (d) {
					a = true;
				}
				if ("undefined" != typeof DetailPageFramework && DetailPageFramework.registerCallback) {
					DetailPageFramework.registerFeatureConfig("keepa", {
						dataType: "atf",
						priority: "high",
						suppressDefaultBehavior: true
					});
					DetailPageFramework.registerCallback("asin_select", "keepa", cbObj);
					DetailPageFramework.registerCallback("swatch_hover", "keepa", setState);
					try {
						if (twisterController) {
							twisterController.model.state.setCurrentASINbackup = twisterController.model.state.setCurrentASIN;
							twisterController.model.state.setCurrentASINHook = function (planes) {
								if (planes) {
									projectPlanes(planes);
								}
								return twisterController.model.state.setCurrentASINbackup(planes);
							};

							twisterController.model.state.setCurrentASIN = twisterController.model.state.setCurrentASINHook;
							twisterController.model.variationsData.getNewDimCombIDbackup = twisterController.model.variationsData.getNewDimCombID;
							twisterController.model.variationsData.getNewDimCombIDHook = function (planes, visibleNodes, camera, sortObjects) {
								try {
									if (!Error().stack.match(".*triggerPrefetchOnInteraction.*")) {
										projectPlanes(planes);
									}
								} catch (k) {}
								return twisterController.model.variationsData.getNewDimCombIDbackup(planes, visibleNodes, camera, sortObjects);
							};
							twisterController.model.variationsData.getNewDimCombID = twisterController.model.variationsData.getNewDimCombIDHook;
						}
					} catch (d) {
						a = true;
					}
				} else {
					a = true;
				}
				if (a && 20 > h++) {
					setTimeout(init, 1000);
				}
			} catch (d) {}
		};
		init();
	}
})();
