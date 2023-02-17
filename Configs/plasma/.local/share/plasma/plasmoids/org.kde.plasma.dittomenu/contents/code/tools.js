/***************************************************************************
 *   Copyright (C) 2013 by Aurélien Gâteau <agateau@kde.org>               *
 *   Copyright (C) 2013-2015 by Eike Hein <hein@kde.org>                   *
 *                                                                         *
 *   This program is free software; you can redistribute it and/or modify  *
 *   it under the terms of the GNU General Public License as published by  *
 *   the Free Software Foundation; either version 2 of the License, or     *
 *   (at your option) any later version.                                   *
 *                                                                         *
 *   This program is distributed in the hope that it will be useful,       *
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of        *
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the         *
 *   GNU General Public License for more details.                          *
 *                                                                         *
 *   You should have received a copy of the GNU General Public License     *
 *   along with this program; if not, write to the                         *
 *   Free Software Foundation, Inc.,                                       *
 *   51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA .        *
 ***************************************************************************/

.pragma library

function fillActionMenu(i18n, actionMenu, actionList, favoriteModel, favoriteId) {
    // Accessing actionList can be a costly operation, so we don't
    // access it until we need the menu.

    var actions = createFavoriteActions(i18n, favoriteModel, favoriteId);

    if (actions) {
        if (actionList && actionList.length > 0) {
            var separator = { "type": "separator" };
            actionList.unshift(separator);
            // actionList = actions.concat(actionList); // this crashes Qt O.o
            actionList.unshift.apply(actionList, actions);
        } else {
            actionList = actions;
        }
    }

    actionMenu.actionList = actionList;
}

function createFavoriteActions(i18n, favoriteModel, favoriteId) {
    if (favoriteModel === null || !favoriteModel.enabled || favoriteId == null) {
        return null;
    }

    if ("initForClient" in favoriteModel) {
        var activities = favoriteModel.activities.runningActivities;

        if (activities.length <= 1) {
            var action = {};

            if (favoriteModel.isFavorite(favoriteId)) {
                action.text = i18n("Remove from Favorites");
                action.icon = "list-remove";
                action.actionId = "_kicker_favorite_remove";
            } else if (favoriteModel.maxFavorites == -1 || favoriteModel.count < favoriteModel.maxFavorites) {
                action.text = i18n("Add to Favorites");
                action.icon = "bookmark-new";
                action.actionId = "_kicker_favorite_add";
            } else {
                return null;
            }

            action.actionArgument = { favoriteModel: favoriteModel, favoriteId: favoriteId };

            return [action];

        } else {
            var actions = [];

            var linkedActivities = favoriteModel.linkedActivitiesFor(favoriteId);

            // Adding the item to link/unlink to all activities

            var linkedToAllActivities =
                !(linkedActivities.indexOf(":global") === -1);

            actions.push({
                text      : i18n("On All Activities"),
                checkable : true,

                actionId  : linkedToAllActivities ?
                                "_kicker_favorite_remove_from_activity" :
                                "_kicker_favorite_set_to_activity",
                checked   : linkedToAllActivities,

                actionArgument : {
                    favoriteModel: favoriteModel,
                    favoriteId: favoriteId,
                    favoriteActivity: ""
                }
            });


            // Adding items for each activity separately

            var addActivityItem = function(activityId, activityName) {
                var linkedToThisActivity =
                    !(linkedActivities.indexOf(activityId) === -1);

                actions.push({
                    text      : activityName,
                    checkable : true,
                    checked   : linkedToThisActivity && !linkedToAllActivities,

                    actionId :
                        // If we are on all activities, and the user clicks just one
                        // specific activity, unlink from everything else
                        linkedToAllActivities ? "_kicker_favorite_set_to_activity" :

                        // If we are linked to the current activity, just unlink from
                        // that single one
                        linkedToThisActivity ? "_kicker_favorite_remove_from_activity" :

                        // Otherwise, link to this activity, but do not unlink from
                        // other ones
                        "_kicker_favorite_add_to_activity",

                    actionArgument : {
                        favoriteModel    : favoriteModel,
                        favoriteId       : favoriteId,
                        favoriteActivity : activityId
                    }
                });
            };

            // Adding the item to link/unlink to the current activity

            addActivityItem(favoriteModel.activities.currentActivity, i18n("On The Current Activity"));

            actions.push({
                type: "separator",
                actionId: "_kicker_favorite_separator"
            });

            // Adding the items for each activity

            activities.forEach(function(activityId) {
                addActivityItem(activityId, favoriteModel.activityNameForId(activityId));
            });

            return [{
                text       : i18n("Show In Favorites"),
                icon       : "favorite",
                subActions : actions
            }];
        }
    } else {
        var action = {};

        if (favoriteModel.isFavorite(favoriteId)) {
            action.text = i18n("Remove from Favorites");
            action.icon = "list-remove";
            action.actionId = "_kicker_favorite_remove";
        } else if (favoriteModel.maxFavorites == -1 || favoriteModel.count < favoriteModel.maxFavorites) {
            action.text = i18n("Add to Favorites");
            action.icon = "bookmark-new";
            action.actionId = "_kicker_favorite_add";
        } else {
            return null;
        }

        action.actionArgument = { favoriteModel: favoriteModel, favoriteId: favoriteId };

        return [action];
    }
}

function triggerAction(plasmoid, model, index, actionId, actionArgument) {
    function startsWith(txt, needle) {
        return txt.substr(0, needle.length) === needle;
    }

    if (startsWith(actionId, "_kicker_favorite_")) {
        handleFavoriteAction(actionId, actionArgument);
        return;
    }

    var closeRequested = model.trigger(index, actionId, actionArgument);

    if (closeRequested) {
        plasmoid.expanded = false;

        return true;
    }

    return false;
}

function handleFavoriteAction(actionId, actionArgument) {
    var favoriteId = actionArgument.favoriteId;
    var favoriteModel = actionArgument.favoriteModel;

    console.log(actionId);

    if (favoriteModel === null || favoriteId == null) {
        return null;
    }

    if ("initForClient" in favoriteModel) {
        if (actionId == "_kicker_favorite_remove") {
            console.log("Removing from all activities");
            favoriteModel.removeFavoriteFrom(favoriteId, ":any");

        } else if (actionId == "_kicker_favorite_add") {
            console.log("Adding to global activity");
            favoriteModel.addFavoriteTo(favoriteId, ":global");

        } else if (actionId == "_kicker_favorite_remove_from_activity") {
            console.log("Removing from a specific activity");
            favoriteModel.removeFavoriteFrom(favoriteId, actionArgument.favoriteActivity);

        } else if (actionId == "_kicker_favorite_add_to_activity") {
            console.log("Adding to another activity");
            favoriteModel.addFavoriteTo(favoriteId, actionArgument.favoriteActivity);

        } else if (actionId == "_kicker_favorite_set_to_activity") {
            console.log("Removing the item from the favourites, and re-adding it just to be on a specific activity");
            favoriteModel.setFavoriteOn(favoriteId, actionArgument.favoriteActivity);

        }
    } else {
        if (actionId == "_kicker_favorite_remove") {
            favoriteModel.removeFavorite(favoriteId);
        } else if (actionId == "_kicker_favorite_add") {
            favoriteModel.addFavorite(favoriteId);
        }
    }
}
