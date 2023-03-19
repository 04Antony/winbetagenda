var socket = {
    addConnectionToGroup: function(groupName) {
        try {
            connection.invoke("JoinGroups", groupName).catch(function(err) {
                return console.error(err ? .toString());
            });
        } catch (err) {
            if (connection.connectionState !== 'Disconnected') {
                if (connection.connectionState === 'Connected') {
                    connection.stop();
                }
            }
            console.error(err.toString());
        };
    },
    removeEventFromConnectionGroup: function(eventGroupName) {
        var isRemove = true;
        var eventGroupArray = [];
        eventGroupArray.push(eventGroupName);
        try {
            if (isRemove) {
                connection.invoke("RemoveFromGroups", eventGroupArray).catch(function(err) {
                    return console.error(err.toString());
                });
            }
        } catch (err) {
            if (connection.connectionState !== 'Disconnected') {
                if (connection.connectionState === 'Connected') {
                    connection.stop();
                }
            }
            console.error(err.toString());
        };
    },
    removeConnectionFromgroup: function(groupName) {
        var isRemove = true;
        var betSlipData = sessionState.getBetSlipList();
        try {
            if (false) {
                if (groupName.length > 0) {
                    for (var b = 0; b < groupName.length; b++) {
                        if (groupName[b].includes('fxt_')) {
                            var splitGroupName = groupName[0].split('_');
                            if (splitGroupName.length > 0) {
                                var fixtureId = splitGroupName[1];
                                for (var i = 0; i < betSlipData.length; i++) {
                                    if (betSlipData[i].eventId == fixtureId) {
                                        isRemove = false;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (isRemove) {
                connection.invoke("RemoveFromGroups", groupName).catch(function(err) {
                    return console.error(err.toString());
                });
            }
        } catch (err) {
            if (connection.connectionState !== 'Disconnected') {
                if (connection.connectionState === 'Connected') {
                    connection.stop();
                }
            }
            console.error(err.toString());
        };
    },
    timeoutCallIncreased: function(id, increasedClassName) {
        setTimeout(function() {
            if (increasedClassName) {
                id.classList.remove(increasedClassName);
            }
        }, 4000);
    },
    timeoutCallDecreased: function(id, decreasedClassName) {
        setTimeout(function() {
            if (decreasedClassName) {
                id.classList.remove(decreasedClassName);
            }
        }, 4000);
    },
    updateOddsInBetSlip: function(selectionObj, odds, homeScore, awayScore, socketStatus, ) {
        odds = (odds == 0 ? "-" : socket.getDecimalOddsValue(odds));
        var betSlipData = sessionState.getBetSlipList();
        var getHigherOddsChecked = sessionState.getHigherOdds();
        var getAcceptAnyOddsChecked = sessionState.getAcceptAnyOdds();
        if (betSlipData.length > 0) {
            for (var b = 0; b < betSlipData.length; b++) {
                if (betSlipData[b].selectionId === selectionObj.selectionId) {
                    betSlipData[b].odds = odds;
                    betSlipData[b].priceId = selectionObj.priceId;
                    betSlipData[b].homeScore = homeScore;
                    betSlipData[b].awayScore = awayScore;
                    betSlipData[b].socketStatus = socketStatus;
                    var getHighlightBetslipOddsId = document.getElementById("highlightOdds_" + selectionObj.selectionId);
                    var getSingleBetSlipOddsId = document.getElementById("oddsSelectionId_" + selectionObj.selectionId);
                    var getSingleBetslipLiveScoresId = document.getElementById("getBetSlipliveScores_" + selectionObj.selectionId);
                    if (getSingleBetSlipOddsId !== null && getHighlightBetslipOddsId !== null) {
                        if (Number(odds) > Number(getSingleBetSlipOddsId.innerHTML)) {
                            getHighlightBetslipOddsId.classList.remove("SB-betSlip-oddsDecreased");
                            getHighlightBetslipOddsId.classList.add("SB-betSlip-oddsIncreased");
                            socket.timeoutCallIncreased(getHighlightBetslipOddsId, "SB-betSlip-oddsIncreased");
                            if (getHigherOddsChecked === "false" && getAcceptAnyOddsChecked === "false") {
                                socket.enableAcceptOddsButton();
                            }
                        } else if (Number(odds) < Number(getSingleBetSlipOddsId.innerHTML)) {
                            getHighlightBetslipOddsId.classList.remove("SB-betSlip-oddsIncreased");
                            getHighlightBetslipOddsId.classList.add("SB-betSlip-oddsDecreased");
                            socket.timeoutCallDecreased(getHighlightBetslipOddsId, "SB-betSlip-oddsDecreased");
                            if (getHigherOddsChecked === "false" && getAcceptAnyOddsChecked === "false") {
                                socket.enableAcceptOddsButton();
                            } else if (getHigherOddsChecked === "true") {
                                socket.enableAcceptOddsButton();
                            }
                        }
                        getSingleBetSlipOddsId.innerHTML = betSlipData[b].odds;
                    }
                    if (betSlipData[b].odds === "-") {
                        socket.removeMarketFromBetslip('zeroodds', betSlipData[b].marketId, betSlipData[b].selectionId);
                    }
                    sessionState.setBetSlipList(betSlipData);
                }
            }
            updateBetslip(true);
        }
    },
    enableAcceptOddsButton: function() {
        var getSinglePlaceBetButtonId = document.getElementById("getSinglePlacebetButtonId");
        var getParlayPlaceBetButtonId = document.getElementById("parlayPlacebetButtonId");
        if (getSinglePlaceBetButtonId !== null && getSinglePlaceBetButtonId !== undefined) {
            getSinglePlaceBetButtonId.innerHTML = '<button class="btn SB-btnPrimary SB-btnPlaceBet active" id="placebetButtonId" onclick="socket.acceptOddsClickButton()">Accept Odds Change</button>';
        }
        if (getParlayPlaceBetButtonId !== null && getParlayPlaceBetButtonId !== undefined) {
            getParlayPlaceBetButtonId.innerHTML = '<button class="btn SB-btnPrimary SB-btnPlaceBet active" id="parlayPlacebetButtonActiveId" onclick="socket.acceptOddsClickButton()">Accept Odds Change</button>';
        }
    },
    removeMarketFromBetslip: function(marketStatusName, marketId, selectionSuspendedId) {
        var selectionId;
        marketStatusName = (marketStatusName !== null && marketStatusName !== undefined) ? marketStatusName : "";
        var betSlipData = sessionState.getBetSlipList();
        if (betSlipData.length > 0) {
            for (var d = 0; d < betSlipData.length; d++) {
                if (marketId.toString() === betSlipData[d].marketId.toString()) {
                    selectionId = betSlipData[d].selectionId;
                    betSlipData[d]["socketStatus"] = marketStatusName.toLowerCase();
                }
            }
            sessionState.setBetSlipList(betSlipData);
        }
        if (selectionId) {
            var getIndividualErrorMessageId = document.getElementById('individualErrorMessage_' + selectionId + '');
            var getBetSlipBoxContentSelectionId = document.querySelector('[data-selidbox="betSlipBoxContentSeId_' + selectionId + '"]');
            var getSingleBetSlipBoxSelectionId;
            if (getBetSlipBoxContentSelectionId !== null && getIndividualErrorMessageId !== null) {
                if (marketStatusName.toLowerCase() === 'inactive' || marketStatusName.toLowerCase() === 'notmapped' || marketStatusName.toLowerCase() === 'cancelled' || marketStatusName.toLowerCase() === 'settled' || marketStatusName.toLowerCase() === 'handedover') {
                    getBetSlipBoxContentSelectionId.classList.add("SB-disabled");
                    getIndividualErrorMessageId.innerHTML = GetLocalizedPlacebetMessages("betSlipMarketInactiveMessage");
                    getIndividualErrorMessageId.classList.remove('d-none');
                    socket.betslipSetTimeout(getBetSlipBoxContentSelectionId, selectionId);
                } else if (marketStatusName.toLowerCase() === 'suspended' && (selectionSuspendedId === "marketSuspended" || selectionSuspendedId === selectionId)) {
                    getBetSlipBoxContentSelectionId.classList.add("SB-disabled");
                    getIndividualErrorMessageId.innerHTML = GetLocalizedPlacebetMessages("betSlipSelectionSuspendedMessage");
                    getIndividualErrorMessageId.classList.remove('d-none');
                    socket.betslipSetTimeout(getBetSlipBoxContentSelectionId, selectionId);
                } else if (marketStatusName.toLowerCase() === 'active' && (selectionSuspendedId === "marketSuspended" || selectionSuspendedId === selectionId)) {
                    getBetSlipBoxContentSelectionId.classList.remove("SB-disabled");
                } else if (marketStatusName.toLowerCase() === 'zeroodds' && (selectionSuspendedId === "marketSuspended" || selectionSuspendedId === selectionId)) {
                    getBetSlipBoxContentSelectionId.classList.add("SB-disabled");
                    getIndividualErrorMessageId.innerHTML = GetLocalizedPlacebetMessages("betSlipSelectionSuspendedMessage");
                    getIndividualErrorMessageId.classList.remove('d-none');
                    socket.betslipSetTimeout(getBetSlipBoxContentSelectionId, selectionId);
                }
            }
        }
    },
    removeEventlineMarketFromBestlip: function(marketId) {
        var selectionId;
        var betSlipData = sessionState.getBetSlipList();
        if (betSlipData.length > 0) {
            for (var d = 0; d < betSlipData.length; d++) {
                if (marketId.toString() === betSlipData[d].marketId.toString()) {
                    selectionId = betSlipData[d].selectionId;
                }
            }
        }
        if (selectionId) {
            var getSingleBetStakeErrorMessageId = document.getElementById('displayMinMaxErrorMessage_' + selectionId + '');
            var getSingleIndividualErrorMessageId = document.getElementById('individualErrorMessage_' + selectionId + '');
            var getSingleBetSlipBoxContentSelectionId = document.getElementById("singleBetSlipBoxContentSeId_" + selectionId + '');
            var getParlayBetStakeErrorMessageId = document.getElementById('displayParlayMinMaxErrorMessage_' + selectionId + '');
            var getParlayIndividualErrorMessageId = document.getElementById('individualParlayErrorMessage_' + selectionId + '');
            var getParlayBetSlipBoxContentSelectionId = document.getElementById("parlayBetSlipBoxContentSeId_" + selectionId + '');
            var getParlayBetSlipBoxSelectionId;
            if (getSingleBetStakeErrorMessageId !== null && getSingleIndividualErrorMessageId !== null && getSingleBetSlipBoxContentSelectionId !== null) {
                for (var i = 0; i < betSlipData.length; i++) {
                    if (selectionId.toString() === betSlipData[i].selectionId.toString()) {
                        betslip.removeHighlightBets("highlightBet_" + betSlipData[i].selectionId);
                        betSlipData.splice(i, 1);
                    }
                }
                sessionState.setBetSlipList(betSlipData);
                getSingleBetSlipBoxContentSelectionId.innerHTML = "";
                if (betSlipData.length === 0) {
                    betslip.stakeCalculation("fromPlacebet");
                }
                betslip.getBetCountDisplay();
                betslip.hideBetSlip();
            }
            if (getParlayBetStakeErrorMessageId !== null && getParlayIndividualErrorMessageId !== null && getParlayBetSlipBoxContentSelectionId !== null) {
                for (var i = 0; i < betSlipData.length; i++) {
                    if (selectionId.toString() === betSlipData[i].selectionId.toString()) {
                        getParlayBetSlipBoxSelectionId = document.getElementById("parlayBetSlipBoxSeId_" + selectionId + '');
                        if (getParlayBetSlipBoxSelectionId !== null && getParlayBetSlipBoxSelectionId !== undefined) {
                            betslip.removeHighlightBets("highlightBet_" + betSlipData[i].selectionId);
                            betSlipData.splice(i, 1);
                        }
                    }
                }
                sessionState.setBetSlipList(betSlipData);
                if (getParlayBetSlipBoxSelectionId !== null && getParlayBetSlipBoxSelectionId !== undefined) {
                    getParlayBetSlipBoxSelectionId.innerHTML = "";
                    if (betSlipData.length === 1) {
                        betSlip.isBetSlipType = betSlip.isSingleBet;
                        betslip.BetSlipTypeActive(betSlip.isBetSlipType);
                    } else if (betSlipData.length === 0) {
                        betslip.hideBetSlip();
                    } else if (betSlipData.length > 0) {
                        betslip.stakeCalculation("fromPlacebet");
                        betslip.getBetCountDisplay();
                        betslip.displayParlayBetType();
                    }
                }
            }
        }
    },
    addFixtureIdToSocketGroup: function(groupArray, betSlipData) {
        var fixtureIdGroupArray = [];
        if (betSlipData.length > 0) {
            for (var b = 0; b < betSlipData.length; b++) {
                if (groupArray.indexOf("fxt_" + betSlipData[b].eventId) === -1) {
                    fixtureIdGroupArray.push("fxt_".concat(betSlipData[b].eventId));
                }
            }
        }
        if (fixtureIdGroupArray.length > 0) {
            socket.addConnectionToGroup(fixtureIdGroupArray);
            for (var g = 0; g < fixtureIdGroupArray.length; g++) {
                groupArray.push(fixtureIdGroupArray[g]);
            }
        }
    },
    getDecimalOddsValue: function(selectionOdds) {
        if (selectionOdds !== null && selectionOdds !== undefined) {
            if (selectionOdds.toString().indexOf('.') > -1) {
                var splitSelectionOdds = selectionOdds.toString().split('.');
                var splitOddsLength = splitSelectionOdds[1].length;
                if (splitOddsLength > 1) {
                    return selectionOdds;
                } else {
                    return selectionOdds.toFixed(2);
                }
            } else {
                return selectionOdds.toFixed(2);
            }
        }
    },
    betslipSetTimeout: function(getBetSlipBoxContentSelectionId, selectionId) {
        setTimeout(function() {
            if (getBetSlipBoxContentSelectionId !== null && getBetSlipBoxContentSelectionId !== undefined) {
                getBetSlipBoxContentSelectionId.innerHTML = "";
                removeBet(selectionId);
            }
        }, 3000);
    }
}
var socketGroups = {
    createBetOnstopFixtureGroup: function(groupArray, pageViewGroupName) {
        groupArray.push("bsf_".concat(pageViewGroupName));
    },
    createMyBetsGroup: function(groupArray, userId) {
        if (userId !== null) {
            groupArray.push("bs_".concat(userId));
        }
    },
    createBetSlipFixtureGroup: function(groupArray, betSlipData) {
        if (betSlipData.length > 0) {
            for (var b = 0; b < betSlipData.length; b++) {
                groupArray.push("fxt_".concat(betSlipData[b] ? .eventId));
            }
        }
    },
    createLiveNowFixtureGroup: function(livegroupArray) {
        let liveData = document.getElementsByClassName("SB-matchBox");
        if (liveData.length > 0) {
            for (var e = 0; e < liveData.length; e++) {
                livegroupArray.push("fxt_".concat(liveData[e].getAttribute("id")));
            }
        }
    },
    createSocketEventsFixtureGroup: function(eventArray) {
        let socketEventsData = document.querySelectorAll("[data-socketeventid]");
        if (socketEventsData !== null && socketEventsData !== undefined && socketEventsData.length > 0) {
            for (var e = 0; e < socketEventsData.length; e++) {
                eventArray.push("fxt_".concat(socketEventsData[e].getAttribute("data-socketeventid")));
            }
        }
    },
    receiveMessage: function(event, groupArray) {
        var betSlipObj = JSON.parse(event);
        if (betSlipObj.eventType == "betSlipFixture") {
            var betSlipfixture = [{
                eventId: betSlipObj.eventId,
                sportId: betSlipObj.sportId
            }];
            socket.addFixtureIdToSocketGroup(groupArray, betSlipfixture);
        }
    },
    createBetStatusGroupAtLogin: function() {
        betStatusGroup = [];
        var userId = sessionState.getuserId();
        if (userId !== null && userId !== "") {
            betStatusGroup.push("bs_".concat(userId));
            socket.addConnectionToGroup(betStatusGroup);
        }
    },
    createPageViewOddsTableGroup: function() {
        betSlipData = sessionState.getBetSlipList();
        socketState.pageViewGroupArray = [];
        socketState.pageViewAttributeValue = socket.getPageViewAttribute();
        if (socketState.pageViewAttributeValue !== null && socketState.pageViewAttributeValue !== undefined) {
            socketState.pageViewGroupPrefixName = socket.getPageViewGroupPrefix(socketState.pageViewAttributeValue);
            socketState.pageViewGroupName = socket.getPageViewGroup(socketState.pageViewAttributeValue);
            socketState.pageViewGroupArray.push(socketState.pageViewGroupName);
        }
        var onBetStopGroupPrefixName = socketState.onBetStopFixtureName.concat(socketState.pageViewGroupPrefixName, socketState ? .pageViewAttributeValue ? .sportId);
        socketState.pageViewBetStopGroupName = (socketState.pageViewGroupPrefixName === 'topgames' || socketState.pageViewGroupPrefixName === 'todaygames_' || socketState.pageViewGroupPrefixName === 'fxt_') ? '' : onBetStopGroupPrefixName;
        if (socketState.pageViewBetStopGroupName !== '') {
            socketState.pageViewGroupArray.push(socketState.pageViewBetStopGroupName);
        }
        socket.addConnectionToGroup(socketState.pageViewGroupArray);
    }
}
var socketBetslip = {
    oddsFeedProcess: function(betSlipItemData, socketData, isOddsFeedUpdatesProcessing, showLiveSports) {
        if (isOddsFeedUpdatesProcessing === true) {
            socketBetslip.marketInactiveUpdate(betSlipItemData, socketData);
            socketBetslip.selectionSuspendedUpdate(betSlipItemData, socketData);
            for (var m = 0; m < socketData ? .markets ? .length; m++) {
                if (socketData ? .markets[m] ? .marketId === betSlipItemData ? .marketId && socketData ? .markets[m] ? .marketStatusName !== undefined) {
                    let marketStatusName = socketData ? .markets[m] ? .marketStatusName;
                    if (marketStatusName.toLowerCase() !== 'inactive' && marketStatusName.toLowerCase() !== 'notmapped' && marketStatusName.toLowerCase() !== 'cancelled' && marketStatusName.toLowerCase() !== 'settled' && marketStatusName.toLowerCase() !== 'handedover') {
                        socketBetslip.betslipOddsUpdate(betSlipItemData, socketData);
                    }
                }
            }
            if (socketData ? .isLive ? .toLowerCase() === "live" && showLiveSports) {
                socketBetslip.liveScoresUpdate(betSlipItemData, socketData);
            }
        } else if (socketData ? .eventChangeType ? .toLowerCase() === "onbetstopfixture") {
            socket.updateBetOnStopFixtureInBetslip(socketData ? .eventCode, socketData ? .isBetStop, socketData ? .sportId);
        } else if (socketData ? .eventChangeType ? .toLowerCase() === "onstatistics") {} else if (socketData ? .eventChangeType ? .toLowerCase() === "onlivestream") {}
    },
    betslipOddsUpdate: function(betSlipItemData, socketData) {
        if (socketData ? .markets ? .length > 0) {
            for (var m = 0; m < socketData ? .markets ? .length; m++) {
                for (var s = 0; s < socketData ? .markets[m] ? .selections ? .length; s++) {
                    if (socketData ? .markets[m] ? .selections[s] ? .selectionId === betSlipItemData ? .selectionId) {
                        var selectionOdds = socketData ? .markets[m].selections[s].decimalOdds;
                        var homeScore = socketData ? .homeScore;
                        var awayScore = socketData ? .awayScore;
                        var socketStatus;
                        if ((socketData ? .markets[m] ? .selections[s] ? .selectionSuspended === true || socketData ? .markets[m] ? .selections[s] ? .selectionSuspended === "true")) {
                            socketStatus = 'suspended';
                        } else {
                            socketStatus = 'active';
                            socket.updateOddsInBetSlip(socketData ? .markets[m] ? .selections[s], selectionOdds, homeScore, awayScore, socketStatus);
                        }
                    }
                }
            }
        }
    },
    marketInactiveUpdate: function(betSlipItemData, socketData) {
        if (socketData ? .markets ? .length > 0) {
            for (var m = 0; m < socketData ? .markets ? .length; m++) {
                if (socketData ? .markets[m] ? .marketId === betSlipItemData ? .marketId) {
                    var marketStatus = socketData ? .markets[m] ? .marketStatusName ? socketData ? .markets[m] ? .marketStatusName : "";
                    socket.removeMarketFromBetslip(marketStatus ? .toLowerCase(), socketData ? .markets[m] ? .marketId, "marketSuspended");
                }
            }
        }
    },
    selectionSuspendedUpdate: function(betSlipItemData, socketData) {
        if (socketData ? .markets ? .length > 0) {
            for (var m = 0; m < socketData ? .markets ? .length; m++) {
                if (socketData ? .markets[m] ? .marketId === betSlipItemData ? .marketId) {
                    var marketStatus = socketData ? .markets[m] ? .marketStatusName !== undefined ? socketData ? .markets[m] ? .marketStatusName.toLowerCase() : "";
                    if (marketStatus === 'active') {
                        for (var s = 0; s < socketData ? .markets[m] ? .selections ? .length; s++) {
                            if (socketData ? .markets[m] ? .selections[s] ? .selectionSuspended === true || socketData ? .markets[m] ? .selections[s] ? .selectionSuspended === "true") {
                                socket.removeMarketFromBetslip('suspended', socketData ? .markets[m] ? .marketId, socketData ? .markets[m] ? .selections[s] ? .selectionId);
                            }
                        }
                    }
                }
            }
        }
    },
    liveScoresUpdate: function(betSlipItemData, socketData) {
        if (socketData !== null) {
            var getBetslipLiveScoresId = document.getElementById("getBetSlipliveScores_" + betSlipItemData ? .selectionId);
            var getParlayBetslipLiveScoresId = document.getElementById("getParlayBetSlipliveScores_" + betSlipItemData ? .selectionId);
            if (getBetslipLiveScoresId !== null && getBetslipLiveScoresId !== undefined && getParlayBetslipLiveScoresId !== null && getParlayBetslipLiveScoresId !== undefined) {
                var awayScore = socketData ? .awayScore;
                getBetslipLiveScoresId.innerHTML = "<b>[" + socketData ? .homeScore + " - " + awayScore + "]";
                getParlayBetslipLiveScoresId.innerHTML = "<b>[" + socketData ? .homeScore + " - " + awayScore + "]";
            }
        }
    }
}
var socketUpdate = {
    oddsFeedProcess: function(eventData, socketData, isOddsFeedUpdatesProcessing, showLiveSports) {
        if (isOddsFeedUpdatesProcessing === true && (socketData.eventChangeType === "major_update" || socketData.eventChangeType === "minor_update")) {
            var childnodes = eventData.getElementsByClassName("btn SB-btnOdds");
            if (childnodes === null || childnodes === undefined) {
                childnodes = eventData.getElementsByClassName("btn SB-btnOdds-matchCard");
            }
            var ismarketstatusset = "false";
            for (var i = 0; i < childnodes.length; i++) {
                let eventDatanode = childnodes[i] ? .getAttribute("onclick");
                if (childnodes[i] ? .getAttribute("id") !== "highlightBet_") {
                    if (ismarketstatusset === "false") {
                        let eventData = "[" + eventDatanode.substring(17, eventDatanode.length + 1).split("}")[0] + "}]";
                        eventData = JSON.parse(eventData.replaceAll("'", "\""));
                        socketUpdate.marketInactiveUpdate(eventData[0], socketData);
                        socketUpdate.selectionSuspendedUpdate(eventData[0], socketData);
                        if (i === childnodes.length - 1)
                            ismarketstatusset = "true";
                    }
                    eventDatanode = "[" + eventDatanode.substring(17, eventDatanode.length + 1).split("}")[0] + "}]";
                    eventDatanode = JSON.parse(eventDatanode.replaceAll("'", "\""));
                    socketUpdate.liveEventOddsUpdate(eventDatanode, socketData);
                }
            }
        } else if (socketData.eventChangeType === null) {
            if (socketData ? .statusName !== null && socketData ? .statusName ? .toLowerCase() === "completed") {
                var childnodes = eventData.getElementsByClassName("btn SB-btnOdds");
                if (childnodes === null || childnodes === undefined) {
                    childnodes = eventData.getElementsByClassName("btn SB-btnOdds-matchCard");
                }
                for (var i = 0; i < childnodes.length; i++) {
                    let eventDatanode = childnodes[i] ? .getAttribute("onclick");
                    if (childnodes[i] ? .getAttribute("id") !== "highlightBet_") {
                        let eventData = "[" + eventDatanode.substring(17, eventDatanode.length + 1).split("}")[0] + "}]";
                        eventData = JSON.parse(eventData.replaceAll("'", "\""));
                        socketUpdate.marketInactiveUpdate(eventData[0], socketData);
                        socketUpdate.selectionSuspendedUpdate(eventData[0], socketData);
                    }
                }
            }
        } else if (socketData.eventChangeType === "score") {
            socketUpdate.liveScoresUpdate(eventData, socketData);
        } else if (socketData ? .eventChangeType ? .toLowerCase() === "onbetstopfixture") {
            socket.updateBetOnStopFixtureInBetslip(socketData ? .eventCode, socketData ? .isBetStop, socketData ? .sportId);
        } else if (socketData ? .eventChangeType ? .toLowerCase() === "onstatistics") {}
    },
    eventpageOddsFeedProcess: function(eventData, socketData, isOddsFeedUpdatesProcessing, showLiveSports) {
        if (isOddsFeedUpdatesProcessing === true && (socketData.eventChangeType === "major_update" || socketData.eventChangeType === "minor_update")) {
            var childnodes = eventData.getElementsByClassName("btn SB-btnOdds");
            var ismarketstatusset = "false";
            for (var i = 0; i < childnodes.length; i++) {
                let eventDatanode = childnodes[i] ? .getAttribute("onclick");
                if (childnodes[i] ? .getAttribute("id") !== "highlightBet_") {
                    if (ismarketstatusset === "false") {
                        let eventData = "[" + eventDatanode.substring(17, eventDatanode.length + 1).split("}")[0] + "}]";
                        eventData = JSON.parse(eventData.replaceAll("'", "\""));
                        socketUpdate.marketInactiveUpdate(eventData[0], socketData);
                        socketUpdate.selectionSuspendedUpdate(eventData[0], socketData);
                        ismarketstatusset = "true";
                    }
                    eventDatanode = "[" + eventDatanode.substring(17, eventDatanode.length + 1).split("}")[0] + "}]";
                    eventDatanode = JSON.parse(eventDatanode.replaceAll("'", "\""));
                    socketUpdate.eventpageOddsUpdate(eventDatanode, socketData);
                }
            }
        } else if (socketData.eventChangeType === "score") {
            socketUpdate.liveScoresUpdate(eventData, socketData);
        } else if (socketData ? .eventChangeType ? .toLowerCase() === "onbetstopfixture") {
            socket.updateBetOnStopFixtureInBetslip(socketData ? .eventCode, socketData ? .isBetStop, socketData ? .sportId);
        } else if (socketData ? .eventChangeType ? .toLowerCase() === "onstatistics") {}
    },
    eventpageOddsUpdate: function(eventDataNode, socketData) {
        if (socketData ? .markets ? .length > 0) {
            for (var m = 0; m < socketData ? .markets ? .length; m++) {
                var marketStatusName = socketData ? .markets[m] ? .marketStatusName !== null ? socketData ? .markets[m] ? .marketStatusName : "";
                if (marketStatusName.toLowerCase() === "inactive" || marketStatusName.toLowerCase() === 'notmapped' || marketStatusName.toLowerCase() === 'cancelled' || marketStatusName.toLowerCase() === 'settled' || marketStatusName.toLowerCase() === 'handedover' || marketStatusName.toLowerCase() === 'completed' || marketStatusName.toLowerCase() === 'closed' || marketStatusName.toLowerCase() === "") {
                    var marketitem = document.getElementById("highlightBet_" + eventDataNode[0] ? .selectionId);
                    if (marketitem !== null && marketitem !== undefined)
                        marketitem.classList.add("SB-btnOddsDisabled");
                } else if (marketStatusName.toLowerCase() === "active") {
                    for (var s = 0; s < socketData ? .markets[m] ? .selections ? .length; s++) {
                        var btnOddsItem = document.getElementById("highlightBet_" + socketData ? .markets[m] ? .selections[s] ? .selectionId);
                        if (btnOddsItem !== null && btnOddsItem !== undefined && eventDataNode[0] ? .selectionId === socketData ? .markets[m] ? .selections[s] ? .selectionId) {
                            if (socketData ? .markets[m].selections[s].decimalOdds > Number(btnOddsItem.innerText)) {
                                btnOddsItem.classList.remove("SB-btnOddsIncreased");
                                btnOddsItem.classList.remove("SB-btnOddsDecreased");
                                btnOddsItem.setAttribute("individualevent-odds-incdec", "I");
                                btnOddsItem.classList.add("SB-btnOddsIncreased");
                            } else if (socketData ? .markets[m].selections[s].decimalOdds < Number(btnOddsItem.innerText)) {
                                btnOddsItem.classList.remove("SB-btnOddsIncreased");
                                btnOddsItem.classList.remove("SB-btnOddsDecreased");
                                btnOddsItem.setAttribute("individualevent-odds-incdec", "D");
                                btnOddsItem.classList.add("SB-btnOddsDecreased");
                            } else {
                                btnOddsItem.setAttribute("individualevent-odds-incdec", "N");
                                btnOddsItem.classList.remove("SB-btnOddsIncreased");
                                btnOddsItem.classList.remove("SB-btnOddsDecreased");
                            }
                            setTimeout(function() {
                                btnOddsItem.classList.remove("SB-btnOddsIncreased");
                                btnOddsItem.classList.remove("SB-btnOddsDecreased");
                            }, 10000);
                            if (socketData ? .markets[m] ? .selections[s] ? .decimalOdds !== null && socketData ? .markets[m] ? .selections[s] ? .priceId !== null) {
                                if (socketData ? .markets[m].selections[s].selectionSuspended === true || marketStatusName.toLowerCase() === "inactive" || marketStatusName.toLowerCase() === 'notmapped' || marketStatusName.toLowerCase() === 'cancelled' || marketStatusName.toLowerCase() === 'settled' || marketStatusName.toLowerCase() === 'handedover' || marketStatusName.toLowerCase() === 'completed' || marketStatusName.toLowerCase() === 'closed') {
                                    var marketitem = document.getElementById("highlightBet_" + socketData ? .markets[m] ? .selections[s] ? .selectionId);
                                    if (marketitem !== null && marketitem !== undefined)
                                        marketitem.classList.add("SB-btnOddsDisabled");
                                } else if (Number(socketData ? .markets[m].selections[s].decimalOdds) > 0) {
                                    var marketitem = document.getElementById("highlightBet_" + socketData ? .markets[m] ? .selections[s] ? .selectionId);
                                    if (marketitem !== null && marketitem !== undefined) {
                                        marketitem.children[1].textContent = Number(socketData ? .markets[m].selections[s].decimalOdds).toFixed(2);
                                    }
                                    eventDataNode[0].odds = Number(socketData ? .markets[m].selections[s].decimalOdds).toFixed(2);
                                    eventDataNode[0].priceId = socketData ? .markets[m].selections[s].priceId;
                                    btnOddsItem.setAttribute("onclick", "addBetsToBetSlip(" + JSON.stringify(eventDataNode[0]).replaceAll('[').replaceAll(']') + ',' + eventDataNode[0].selectionId + ")");
                                    if (marketitem !== null && marketitem !== undefined)
                                        marketitem.classList.remove("SB-btnOddsDisabled");
                                } else if (marketStatusName.toLowerCase() === 'active' && socketData ? .markets[m].selections[s].selectionSuspended === false) {
                                    var marketitem = document.getElementById("highlightBet_" + socketData ? .markets[m] ? .selections[s] ? .selectionId);
                                    if (marketitem !== null && marketitem !== undefined)
                                        marketitem.classList.remove("SB-btnOddsDisabled");
                                }
                            } else if (socketData ? .markets[m].selections[s].selectionSuspended === true || marketStatusName.toLowerCase() === "inactive" || marketStatusName.toLowerCase() === 'notmapped' || marketStatusName.toLowerCase() === 'cancelled' || marketStatusName.toLowerCase() === 'settled' || marketStatusName.toLowerCase() === 'handedover') {
                                var marketitem = document.getElementById("highlightBet_" + socketData ? .markets[m] ? .selections[s] ? .selectionId);
                                if (marketitem !== null && marketitem !== undefined)
                                    marketitem.classList.add("SB-btnOddsDisabled");
                            } else if (socketData ? .markets[m].selections[s].selectionSuspended === false && marketStatusName.toLowerCase() === 'active') {
                                var marketitem = document.getElementById("highlightBet_" + socketData ? .markets[m] ? .selections[s] ? .selectionId);
                                if (marketitem !== null && marketitem !== undefined)
                                    marketitem.classList.remove("SB-btnOddsDisabled");
                            }
                        }
                    }
                }
            }
        }
    },
    liveEventOddsUpdate: function(eventDataNode, socketData) {
        if (socketData ? .markets ? .length > 0) {
            for (var m = 0; m < socketData ? .markets ? .length; m++) {
                var marketStatusName = socketData ? .markets[m] ? .marketStatusName !== null ? socketData ? .markets[m] ? .marketStatusName : "";
                if (marketStatusName.toLowerCase() === "active") {
                    for (var s = 0; s < socketData ? .markets[m] ? .selections ? .length; s++) {
                        var btnOddsItem = document.getElementById("highlightBet_" + socketData ? .markets[m] ? .selections[s] ? .selectionId);
                        if (btnOddsItem !== null && btnOddsItem !== undefined && eventDataNode[0] ? .selectionId === socketData ? .markets[m] ? .selections[s] ? .selectionId) {
                            if (socketData ? .markets[m].selections[s].decimalOdds > Number(btnOddsItem.innerText)) {
                                btnOddsItem.classList.remove("SB-btnOddsIncreased");
                                btnOddsItem.classList.remove("SB-btnOddsDecreased");
                                btnOddsItem.setAttribute("allsportsodds-incdec", "I");
                                btnOddsItem.classList.add("SB-btnOddsIncreased");
                            } else if (socketData ? .markets[m].selections[s].decimalOdds < Number(btnOddsItem.innerText)) {
                                btnOddsItem.classList.remove("SB-btnOddsIncreased");
                                btnOddsItem.classList.remove("SB-btnOddsDecreased");
                                btnOddsItem.setAttribute("allsportsodds-incdec", "D");
                                btnOddsItem.classList.add("SB-btnOddsDecreased");
                            } else {
                                btnOddsItem.setAttribute("allsportsodds-incdec", "N");
                                btnOddsItem.classList.remove("SB-btnOddsIncreased");
                                btnOddsItem.classList.remove("SB-btnOddsDecreased");
                            }
                            setTimeout(function() {
                                if (btnOddsItem !== null) {
                                    btnOddsItem.classList.remove("SB-btnOddsIncreased");
                                    btnOddsItem.classList.remove("SB-btnOddsDecreased");
                                }
                            }, 10000);
                            if (socketData ? .markets[m] ? .selections[s] ? .decimalOdds !== null && socketData ? .markets[m] ? .selections[s] ? .priceId !== null) {
                                if (socketData ? .markets[m].selections[s].selectionSuspended === true || marketStatusName.toLowerCase() === "inactive" || marketStatusName.toLowerCase() === 'notmapped' || marketStatusName.toLowerCase() === 'cancelled' || marketStatusName.toLowerCase() === 'settled' || marketStatusName.toLowerCase() === 'handedover' || marketStatusName.toLowerCase() === 'completed' || marketStatusName.toLowerCase() === 'closed') {
                                    var marketitem = document.getElementById("highlightBet_" + socketData ? .markets[m] ? .selections[s] ? .selectionId);
                                    if (marketitem !== null && marketitem !== undefined)
                                        marketitem.classList.add("SB-btnOddsDisabled");
                                } else if (Number(socketData ? .markets[m].selections[s].decimalOdds) > 0) {
                                    var btnOddsItemlist = document.querySelectorAll("[id='highlightBet_" + socketData ? .markets[m] ? .selections[s] ? .selectionId + "']");
                                    eventDataNode[0].odds = Number(socketData ? .markets[m].selections[s].decimalOdds).toFixed(2);
                                    eventDataNode[0].priceId = socketData ? .markets[m].selections[s].priceId;
                                    if (btnOddsItemlist !== null && btnOddsItemlist !== undefined) {
                                        for (var j = 0; j < btnOddsItemlist.length; j++) {
                                            if (btnOddsItemlist[j].className.trimEnd().indexOf("btn SB-btnOdds-matchCard") > -1) {
                                                var oddsctrls = btnOddsItemlist[j].getElementsByClassName("SB-odds");
                                                if (oddsctrls !== null && oddsctrls !== undefined)
                                                    oddsctrls[0].innerText = Number(socketData ? .markets[m].selections[s].decimalOdds).toFixed(2);
                                            } else {
                                                btnOddsItemlist[j].innerText = Number(socketData ? .markets[m].selections[s].decimalOdds).toFixed(2);
                                            }
                                            btnOddsItemlist[j].setAttribute("onclick", "addBetsToBetSlip(" + JSON.stringify(eventDataNode[0]).replaceAll('[').replaceAll(']') + ',' + eventDataNode[0].selectionId + ")");
                                        }
                                    }
                                    var marketitem = document.getElementById("highlightBet_" + socketData ? .markets[m] ? .selections[s] ? .selectionId);
                                    if (marketitem !== null && marketitem !== undefined)
                                        marketitem.classList.remove("SB-btnOddsDisabled");
                                } else if (marketStatusName.toLowerCase() === 'active' && socketData ? .markets[m].selections[s].selectionSuspended === false) {
                                    var marketitem = document.getElementById("highlightBet_" + socketData ? .markets[m] ? .selections[s] ? .selectionId);
                                    if (marketitem !== null && marketitem !== undefined)
                                        marketitem.classList.remove("SB-btnOddsDisabled");
                                }
                            } else if (socketData ? .markets[m].selections[s].selectionSuspended === false && marketStatusName.toLowerCase() === 'active') {
                                var marketitem = document.getElementById("highlightBet_" + socketData ? .markets[m] ? .selections[s] ? .selectionId);
                                if (marketitem !== null && marketitem !== undefined)
                                    marketitem.classList.remove("SB-btnOddsDisabled");
                            }
                        }
                    }
                } else if (marketStatusName.toLowerCase() === "inactive" || marketStatusName.toLowerCase() === 'notmapped' || marketStatusName.toLowerCase() === 'cancelled' || marketStatusName.toLowerCase() === 'settled' || marketStatusName.toLowerCase() === 'handedover' || marketStatusName.toLowerCase() === 'completed' || marketStatusName.toLowerCase() === 'closed' || marketStatusName.toLowerCase() === "") {
                    var marketitem = document.getElementById("highlightBet_" + eventDataNode[0] ? .selectionId);
                    if (marketitem !== null && marketitem !== undefined)
                        marketitem.classList.add("SB-btnOddsDisabled");
                }
            }
        }
    },
    marketInactiveUpdate: function(eventData, socketData) {
        if (socketData ? .statusName !== null && socketData ? .statusName ? .toLowerCase() !== "in_play") {
            if (socketData ? .markets ? .length > 0) {
                for (var m = 0; m < socketData ? .markets ? .length; m++) {
                    if (socketData ? .markets[m] ? .marketId === eventData ? .marketId) {
                        var marketStatus = (socketData ? .markets[m] ? .marketStatusName !== null && socketData ? .markets[m] ? .marketStatusName !== undefined) ? socketData ? .markets[m] ? .marketStatusName : "";
                        if (socketData ? .markets[m] ? .marketStatusName === null && socketData ? .eventChangeType === null) {
                            if (socketData ? .statusName !== null && socketData ? .statusName ? .toLowerCase() === "completed")
                                marketStatus = "completed";
                        }
                        if (marketStatus.toLowerCase() === "active") {
                            var btnmarketItemlist = document.querySelectorAll("[id='highlightBet_" + eventData.selectionId + "']");
                            if (btnmarketItemlist !== null && btnmarketItemlist !== undefined) {
                                for (var j = 0; j < btnmarketItemlist.length; j++) {
                                    btnmarketItemlist[j].classList.remove("SB-btnOddsDisabled");
                                }
                            }
                        } else if (marketStatus !== "") {
                            var btnmarketItemlist = document.querySelectorAll("[id='highlightBet_" + eventData.selectionId + "']");
                            if (btnmarketItemlist !== null && btnmarketItemlist !== undefined) {
                                for (var j = 0; j < btnmarketItemlist.length; j++) {
                                    btnmarketItemlist[j].classList.add("SB-btnOddsDisabled");
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    selectionSuspendedUpdate: function(eventData, socketData) {
        if (socketData ? .markets ? .length > 0) {
            for (var m = 0; m < socketData ? .markets ? .length; m++) {
                if (socketData ? .markets[m] ? .marketId === eventData ? .marketId) {
                    var marketStatus = socketData ? .markets[m] ? .marketStatusName !== null ? socketData ? .markets[m] ? .marketStatusName ? .toLowerCase() : "";
                    if (marketStatus === 'active') {
                        for (var s = 0; s < socketData ? .markets[m] ? .selections ? .length; s++) {
                            if (socketData ? .markets[m] ? .selections[s] ? .selectionSuspended === true || socketData ? .markets[m] ? .selections[s] ? .selectionSuspended === "true") {
                                var btnmarketItemlist = document.querySelectorAll("[id='highlightBet_" + socketData ? .markets[m] ? .selections[s] ? .selectionId + "']");
                                if (btnmarketItemlist !== null && btnmarketItemlist !== undefined) {
                                    for (var j = 0; j < btnmarketItemlist.length; j++) {
                                        btnmarketItemlist[j].classList.add("SB-btnOddsDisabled");
                                    }
                                }
                            } else {
                                var btnmarketItemlist = document.querySelectorAll("[id='highlightBet_" + socketData ? .markets[m] ? .selections[s] ? .selectionId + "']");
                                if (btnmarketItemlist !== null && btnmarketItemlist !== undefined) {
                                    for (var j = 0; j < btnmarketItemlist.length; j++) {
                                        btnmarketItemlist[j].classList.remove("SB-btnOddsDisabled");
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    liveScoresUpdate: function(eventData, socketData) {
        if (socketData !== null) {
            var getLiveScoresId = eventData.getElementsByClassName("SB-score active");
            if (getLiveScoresId !== null && getLiveScoresId !== undefined && getLiveScoresId ? .length === 2) {
                getLiveScoresId[0].innerHTML = socketData ? .homeScore !== null ? socketData ? .homeScore : getLiveScoresId[0].innerHTML;
                getLiveScoresId[1].innerHTML = socketData ? .awayScore !== null ? socketData ? .awayScore : getLiveScoresId[1].innerHTML;
            }
        }
    }
}
var socketState = {
    pageViewGroupArray: [],
    commonGroupArray: [],
    liveEventsGroupArray: []
}