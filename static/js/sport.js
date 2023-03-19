"use strict"
var timeoutId;
var sportsBookUrl = socketConfig.sportsBookUrl;
var groupArray = [];
var liveGroupArray = [];
var onBetStopFixtureName = 'bsf_';
var connection = new signalR.HubConnectionBuilder().withUrl(sportsBookUrl).configureLogging(signalR.LogLevel.Information).build();
start();

function start() {
    timeoutId = setTimeout(function() {
        try {
            if (connection.connectionState === 'Connected') {
                connection.stop();
            }
            if (connection.connectionState === 'Disconnected') {
                connection.start().then(function() {
                    clearTimeout(timeoutId);
                    socketState.commonGroupArray = [];
                    betSlipData = sessionState.getBetSlipList();
                    socketGroups.createBetSlipFixtureGroup(socketState.commonGroupArray, betSlipData);
                    socketGroups.createSocketEventsFixtureGroup(socketState.commonGroupArray);
                    socket.addConnectionToGroup(socketState.commonGroupArray);
                    try {
                        connection.on("OnEvent", function(object) {
                            var betSlipData = sessionState.getBetSlipList();
                            if (betSlipData ? .length > 0) {
                                for (var b = 0; b < betSlipData ? .length; b++) {
                                    if (object ? .eventCode === betSlipData[b] ? .eventId) {
                                        var isOddsFeedUpdatesProcessing = true;
                                        socketBetslip.oddsFeedProcess(betSlipData[b], object, isOddsFeedUpdatesProcessing, true);
                                    }
                                }
                            }
                            if (window.location.href.toLowerCase().indexOf("livenow") > -1) {
                                var liveData = document.querySelector("[id='" + object ? .eventCode + "']");
                                if (liveData !== null && liveData !== undefined) {
                                    var isOddsFeedUpdatesProcessing = true;
                                    if (object ? .statusName === null)
                                        socketUpdate.oddsFeedProcess(liveData, object, isOddsFeedUpdatesProcessing, true);
                                    if (object ? .statusName !== null && object ? .statusName ? .toLowerCase() !== "in_play")
                                        socketUpdate.oddsFeedProcess(liveData, object, isOddsFeedUpdatesProcessing, true);
                                }
                            } else if (window.location.href.toLowerCase().indexOf(object ? .eventCode) > -1) {
                                var eventpageData = document.getElementsByClassName("SB-marketBox-content");
                                if (eventpageData ? .length > 0) {
                                    for (var l = 0; l < eventpageData ? .length; l++) {
                                        var isOddsFeedUpdatesProcessing = true;
                                        socketUpdate.eventpageOddsFeedProcess(eventpageData[l], object, isOddsFeedUpdatesProcessing, true);
                                    }
                                }
                            } else {
                                var eventData = document.querySelector("[id='" + object ? .eventCode + "']");
                                if (eventData !== null && eventData !== undefined) {
                                    var isOddsFeedUpdatesProcessing = true;
                                    socketUpdate.oddsFeedProcess(eventData, object, isOddsFeedUpdatesProcessing, true);
                                }
                                eventData = document.querySelectorAll("[attr-matchid='" + object ? .eventCode + "']");
                                if (eventData !== null && eventData !== undefined) {
                                    for (var k = 0; k < eventData ? .length; k++) {
                                        if (eventData[k].className === "SB-matchDetails-container") {
                                            var isOddsFeedUpdatesProcessing = true;
                                            socketUpdate.oddsFeedProcess(eventData[k], object, isOddsFeedUpdatesProcessing, true);
                                        } else if (eventData[k].className === "SB-fixtureInfo") {
                                            var isOddsFeedUpdatesProcessing = true;
                                            socketUpdate.oddsFeedProcess(eventData[k].nextElementSibling, object, isOddsFeedUpdatesProcessing, true);
                                        }
                                    }
                                }
                            }
                            if (socketState ? .pageViewAttributeValue ? .eventId === object ? .eventCode) {
                                if (object ? .eventChangeType ? .toLowerCase() === "onoddschange") {
                                    if (object ? .isLive.toLowerCase() === "live" || object ? .isLive.toLowerCase() === "prematch" || object ? .isLive.toLowerCase() === "suspended") {
                                        socket.eventWiseOnBetStopFixture(object);
                                        socket.eventWiseRemoveAllMarketsData(object ? .eventCode, object);
                                        socket.eventWiseUpdateMarketInactiveData(object ? .eventCode, object);
                                        socket.eventWiseUpdateOddsData(object ? .eventCode, object);
                                        socket.eventWiseUpdateOddsSuspendedData(object ? .eventCode, object);
                                    } else {
                                        var betSlipData = sessionState.getBetSlipList();
                                        if (betSlipData.length > 0) {
                                            for (var b = 0; b < betSlipData.length; b++) {
                                                if (object ? .eventCode.toString() === betSlipData[b].eventId.toString()) {
                                                    var marketId = betSlipData[b].marketId;
                                                    var selectionId = betSlipData[b].selectionId;
                                                    socket.removeMarketFromBetslip('inactive', marketId, selectionId);
                                                }
                                            }
                                        }
                                        pageViewNavigation.loadViewSport('topgames', 0);
                                    }
                                } else if (object ? .eventChangeType ? .toLowerCase() === "onbetstopfixture") {
                                    socket.eventWiseOnBetStopFixture(object);
                                } else if (object ? .eventChangeType ? .toLowerCase() === "onstatistics") {} else if (object ? .eventChangeType ? .toLowerCase() === "onlivestream") {}
                            }
                        });
                    } catch (err) {
                        if (connection.connectionState !== 'Disconnected') {
                            if (connection.connectionState === 'Connected') {
                                connection.stop();
                            }
                        }
                        console.error(err.toString());
                    };
                    try {
                        connection.on("receiveLiveSportFeed", function(object) {
                            if (object ? .eventChangeType ? .toLowerCase() === "onoddschange") {
                                sportId = object ? .sportId;
                                if (socketState ? .pageViewAttributeValue ? .sportId === sportId.toString()) {
                                    var ddnLiveGamesId = "ddlMarkets_" + sportId;
                                    var ddnMarket = document.getElementById(ddnLiveGamesId);
                                    if (ddnMarket !== null) {
                                        mrktName = ddnMarket.options[ddnMarket.selectedIndex].value;
                                        var marktName = sportsConfig.getClientMarketNames(sportId, mrktName);
                                    }
                                    marketName = (marktName !== null && marktName !== undefined) ? marktName : sportsConfig.getDefaultMarketName(object ? .sportName);
                                    var isOddsFeedUpdatesProcessing = true;
                                }
                            }
                            socket.oddsFeedProcess(sportId, marketName, object, true, object, isOddsFeedUpdatesProcessing);
                            tenBetIntegration.setIframeHeight();
                        });
                    } catch (err) {
                        if (connection.connectionState !== 'Disconnected') {
                            if (connection.connectionState === 'Connected') {
                                connection.stop();
                            }
                        }
                        console.error(err.toString());
                    };
                    try {
                        connection.on("receiveTopGamesFeed", function(object) {
                            if (object ? .eventChangeType ? .toLowerCase() === "onoddschange") {
                                sportId = object ? .sportId;
                                var ddnLiveGamesId = "ddlMarkets_" + sportId;
                                var ddnMarket = document.getElementById(ddnLiveGamesId);
                                if (ddnMarket !== null) {
                                    mrktName = ddnMarket.options[ddnMarket.selectedIndex].value;
                                    var marktName = sportsConfig.getClientMarketNames(sportId, mrktName);
                                }
                                marketName = (marktName !== null && marktName !== undefined) ? marktName : sportsConfig.getDefaultMarketName(object ? .sportName);
                                var isOddsFeedUpdatesProcessing = true;
                            }
                            socket.oddsFeedProcess(sportId, marketName, object, false, object, isOddsFeedUpdatesProcessing);
                            tenBetIntegration.setIframeHeight();
                        });
                    } catch (err) {
                        if (connection.connectionState !== 'Disconnected') {
                            if (connection.connectionState === 'Connected') {
                                connection.stop();
                            }
                        }
                        console.error(err.toString());
                    };
                    try {
                        connection.on("receiveTodayFeed", function(object) {
                            if (object ? .eventChangeType ? .toLowerCase() === "onoddschange") {
                                sportId = object ? .sportId;
                                if (socketState.pageViewAttributeValue.sportId === sportId.toString()) {
                                    var ddnLiveGamesId = "ddlMarkets_" + sportId;
                                    var ddnMarket = document.getElementById(ddnLiveGamesId);
                                    if (ddnMarket !== null) {
                                        mrktName = ddnMarket.options[ddnMarket.selectedIndex].value;
                                        var marktName = sportsConfig.getClientMarketNames(sportId, mrktName);
                                    }
                                    marketName = (marktName !== null && marktName !== undefined) ? marktName : sportsConfig.getDefaultMarketName(object ? .sportName);
                                    var isOddsFeedUpdatesProcessing = true;
                                }
                            }
                            socket.oddsFeedProcess(sportId, marketName, object, false, object, isOddsFeedUpdatesProcessing);
                            tenBetIntegration.setIframeHeight();
                        });
                    } catch (err) {
                        if (connection.connectionState !== 'Disconnected') {
                            if (connection.connectionState === 'Connected') {
                                connection.stop();
                            }
                        }
                        console.error(err.toString());
                    };
                    try {
                        connection.on("receiveTopLeaguesFeed", function(object) {
                            if (object ? .eventChangeType ? .toLowerCase() === "onoddschange") {
                                sportId = socketState.pageViewAttributeValue.sportId;
                                if (sportId == object ? .sportId) {
                                    sportId = object ? .sportId;
                                    var ddnLiveGamesId = "ddlMarkets_" + sportId;
                                    var ddnMarket = document.getElementById(ddnLiveGamesId);
                                    if (ddnMarket !== null) {
                                        mrktName = ddnMarket.options[ddnMarket.selectedIndex].value;
                                        var marktName = sportsConfig.getClientMarketNames(sportId, mrktName);
                                    }
                                }
                                marketName = (marktName !== null && marktName !== undefined) ? marktName : sportsConfig.getDefaultMarketName(object ? .sportName);
                                var isOddsFeedUpdatesProcessing = true;
                            }
                            socket.oddsFeedProcess(sportId, marketName, object, true, object, isOddsFeedUpdatesProcessing);
                            tenBetIntegration.setIframeHeight();
                        });
                    } catch (err) {
                        if (connection.connectionState !== 'Disconnected') {
                            if (connection.connectionState === 'Connected') {
                                connection.stop();
                            }
                        }
                        console.error(err.toString());
                    };
                    try {
                        connection.on("receiveMatchesDailyFeed", function(object) {
                            if (object ? .eventChangeType ? .toLowerCase() === "onoddschange") {
                                sportId = object ? .sportId;
                                var currentDateId = document.getElementsByClassName("SB-filterButtonsList-item active")[0].id;
                                var getCurrentDate = new Date(currentDateId).getDate();
                                var eventCurrentDate = new Date(object ? .eventDate).getDate();
                                if (getCurrentDate === eventCurrentDate) {
                                    if (socketState ? .pageViewAttributeValue ? .sportId == sportId.toString()) {
                                        var ddnLiveGamesId = "ddlMarkets_" + sportId;
                                        var ddnMarket = document.getElementById(ddnLiveGamesId);
                                        if (ddnMarket !== null) {
                                            mrktName = ddnMarket.options[ddnMarket.selectedIndex].value;
                                            var marktName = sportsConfig.getClientMarketNames(sportId, mrktName);
                                        }
                                        marketName = (marktName !== null && marktName !== undefined) ? marktName : sportsConfig.getDefaultMarketName(object ? .sportName);
                                        var isOddsFeedUpdatesProcessing = true;
                                    }
                                }
                            }
                            socket.oddsFeedProcess(sportId, marketName, object, false, object, isOddsFeedUpdatesProcessing);
                            tenBetIntegration.setIframeHeight();
                        });
                    } catch (err) {
                        if (connection.connectionState !== 'Disconnected') {
                            if (connection.connectionState === 'Connected') {
                                connection.stop();
                            }
                        }
                        console.error(err.toString());
                    };
                    try {
                        connection.on("receiveSegmentFeed", function(object) {
                            if (object ? .eventChangeType ? .toLowerCase() === "onoddschange") {
                                sportId = object ? .sportId;
                                var ddnLiveGamesId = "ddlMarkets_" + sportId
                                var ddnMarket = document.getElementById(ddnLiveGamesId);
                                if (ddnMarket !== null) {
                                    mrktName = ddnMarket.options[ddnMarket.selectedIndex].value;
                                    var marktName = sportsConfig.getClientMarketNames(sportId, mrktName);
                                }
                                marketName = (marktName !== null && marktName !== undefined) ? marktName : sportsConfig.getDefaultMarketName(object ? .sportName);
                                var isOddsFeedUpdatesProcessing = true;
                            }
                            socket.oddsFeedProcess(sportId, marketName, object, true, object, isOddsFeedUpdatesProcessing);
                            tenBetIntegration.setIframeHeight();
                        });
                    } catch (err) {
                        if (connection.connectionState !== 'Disconnected') {
                            if (connection.connectionState === 'Connected') {
                                connection.stop();
                            }
                        }
                        console.error(err.toString());
                    };
                    try {
                        connection.on("receiveLeagueFeed", function(object) {
                            if (object ? .eventChangeType ? .toLowerCase() === "onoddschange") {
                                sportId = object ? .sportId;
                                var ddnLiveGamesId = "ddlMarkets_" + sportId
                                var ddnMarket = document.getElementById(ddnLiveGamesId);
                                if (ddnMarket !== null) {
                                    mrktName = ddnMarket.options[ddnMarket.selectedIndex].value;
                                    var marktName = sportsConfig.getClientMarketNames(sportId, mrktName);
                                }
                                marketName = (marktName !== null && marktName !== undefined) ? marktName : sportsConfig.getDefaultMarketName(object ? .sportName);
                                var isOddsFeedUpdatesProcessing = true;
                            }
                            socket.oddsFeedProcess(sportId, marketName, object, true, object, isOddsFeedUpdatesProcessing);
                            tenBetIntegration.setIframeHeight();
                        });
                    } catch (err) {
                        console.error(err.toString());
                        connection.stop();
                    };
                    try {
                        connection.on("receiveBetStatusFeed", function(object) {
                            if (object.userId !== null) {
                                if (object.userId === sessionState.getuserId()) {
                                    if (betSlip ? .isBetSlipType ? .toLowerCase() === betSlip ? .isSingleBet ? .toLowerCase()) {
                                        betslip.setMyBetsStatusInBetReceiptData(object);
                                    }
                                    socketMyBets.betReceiptStatusUpdate(object);
                                    socketMyBets.myBetsStatusUpdate(object);
                                }
                            }
                        });
                    } catch (err) {
                        if (connection.connectionState !== 'Disconnected') {
                            if (connection.connectionState === 'Connected') {
                                connection.stop();
                            }
                        }
                        console.error(err.toString());
                    };
                    try {
                        connection.on("receiveBetStopGlobalFeed", function(object) {
                            if (object !== null) {
                                socket.onBetStopGlobalUpdate(object);
                            }
                        });
                    } catch (err) {
                        if (connection.connectionState !== 'Disconnected') {
                            if (connection.connectionState === 'Connected') {
                                connection.stop();
                            }
                        }
                        console.error(err.toString());
                    };
                });
            }
        } catch (err) {
            if (connection.connectionState !== 'Disconnected') {
                if (connection.connectionState === 'Connected') {
                    connection.stop();
                }
            }
            console.error(err.toString());
        }
    }, 2000);
};

function reconnect() {
    if (connection.connectionState !== "Connected") {
        start();
    }
}
connection.onclose(function(e) {
    reconnect();
});

function addEventToHub(event) {
    socketGroups.receiveMessage(event, socketState.commonGroupArray);
}