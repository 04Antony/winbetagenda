var feUrl = 'sb-feapi.shabiki.com';
var webUrl = 'shabiki.com';
var globalBalanceUrl = 'https://' + feUrl + '/api/v1/balance';
var globalLoginUrl = 'https://' + feUrl + '/api/v1/authenticate';
var globalAccountHistoryUrl = 'https://' + feUrl + '/api/v1/accounthistory';
var golbalAccountSummaryUrl = 'https://' + feUrl + '/api/v1/accountsummary';
var globalChangePinUrl = 'https://' + feUrl + '/api/v1/setpassword';
var globalDepositUrl = 'https://' + feUrl + '/api/v1/deposit';
var globalDepositPaystackUrl = 'https://' + feUrl + '/api/v1/sb/deposit';
var globalDepositOpayUrl = 'https://' + feUrl + '/api/v1/deposit';
var globalForgotPinUrl = 'https://' + feUrl + '/api/v1/forgotpassword';
var globalRegisterUrl = 'https://' + feUrl + '/api/v1/register';
var globalWithdrawUrl = 'https://' + feUrl + '/api/v1/requestawithdrawal';
var globalWithdrawHistoryUrl = 'https://' + feUrl + '/api/v1/withdrawals';
var globalBetHistoryUrl = 'https://' + feUrl + '/api/v1/bethistory';
var globalPlaceBetUrl = 'https://' + feUrl + '/api/v1/placebet';
var globalMyBetsUrl = 'https://' + feUrl + '/api/v1/bethistory';
var globalCashOutUrl = 'https://' + feUrl + '/api/v1/allcashouts';
var globalRequestCashOutUrl = 'https://' + feUrl + '/api/v1/requestacashout';
var globalConfirmCashOutUrl = 'https://' + feUrl + '/api/v1/confirmcashout';
var globalEditDetailsSubmit = 'https://' + feUrl + '/api/v1/editcustomerdetails';
var globalSaveBankDetailsUrl = 'https://' + feUrl + '/api/v1/save/bank/details';
var globalFetchBankDetailsUrl = 'https://' + feUrl + '/api/v1/fetch/bank/details';
var globalGenerateBookbetCodeUrl = 'https://' + feUrl + '/api/v1/generate/betcode';
var globalLoadBookedBetsUrl = 'https://' + feUrl + '/api/v1/betcode/fetch/betslip';
var globalBetbuilderUrl = 'https://shab-ke-api.fsbtech.com/fsb-api-rest/bet/builder.json';
var globalOpayCallbackUrl = 'https://' + feUrl + '/api/v1/opay/checkstatus';
var globalRetreiveBetUrl = 'https://' + feUrl + '/api/v1/retrieve/bet';
var sitedomainurl = 'https://' + webUrl + '/';
var sitedomain = 'shabiki.com';
var gamesdomain = 'games-rgs.sportsit-tech.net';
var popupToken = '8Eup4Rx02z04TJ0iDJVZRmLS';
var brandToken = '727bdea0-df79-4758-9159-0f8c7c8be665';
var Countrycode = 'KE';
var Countryid = '254';
var trk = 'PmOp';
var CurrencyCode = 'KSH';
var Language = 'en-US';
var SupportEmail = '@shabiki.com';
var IsExciseDutyExists = true;
var globalDepositCallbackUrl = 'https://' + window.location.hostname + '/depositcallback.html';
var globalDepositPaystackCallbackUrl = 'https://' + window.location.hostname + '/depositpaystackcallback.html';
var globalDepositOpayCallbackUrl = 'https://' + window.location.hostname + '/depositopaycallback.html';
var objAccaSelections = {
    "acca5": 5,
    "acca7": 7,
    "acca9": 9,
    "acca11": 11,
    "acca13": 13,
    "acca15": 15
};
var WebPushAppKey = '9auGyfy549Fx_XvjXTdPFFHb17q7s2Q6';
var globalConfig = {
    defaultHomeTabIndex: 0,
    chatAppId: '5f3bc78cb7f44f406e95b2a5',
    intercommAppId: '',
    googleAnalyticsTagId: 'UA-156878018-1',
    facebookPixelID: '686111352121300',
    IsLanguageDropdownExits: false,
    defaultLanguage: 'en-US',
    MSISDNAcceptableDigits: 9,
    MSISDNAcceptableDigitsWithZero: 10,
    MSISDNZeroEnabled: true,
    MSISDNFirstSuffixValues: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    depositSiteURL: "/Deposit",
    depositMinAmount: 1,
    depositMaxAmount: 70000,
    depositSelections: [49, 99, 500, 1000],
    depositRedirectValue: 50,
    withdrawMinValue: 50,
    withdrawMaxValue: 5000000,
    withdrawSelections: [50, 100, 250, 500, 1000],
    CookieDomain: webUrl
};
var maxBetsCount = 40;
var WHTValue = 20;
var ConfigStakeTaxValue = 7.5;
var ConfigExiceTaxPercantage = 107.5;
var placebetMinStakeValue = 1;
var placebetDefaultStakeValue = 100;
var placebetMaxReturnsValue = 50000000;
var oddsThresholdValue = 1.33;
var maxPercentage = 40;
var minBetCount = 3;
var placebetMaxStakeValue = 500000;
var placebetMaxAmount = "50M";
var cookieExpiryTime = 1;
var cookieExpiryHours = 1;
var cookieExpiryMinutes = 30;
var multiBetBonusobj = {
    3: 3,
    4: 5,
    5: 10,
    6: 15,
    7: 20,
    8: 25,
    9: 30,
    10: 35,
    11: 40,
    12: 45,
    13: 50,
    14: 55,
    15: 60,
    16: 65,
    17: 70,
    18: 70,
    19: 75,
    20: 80,
    21: 85,
    22: 95,
    23: 100,
    24: 105,
    25: 110,
    26: 115,
    27: 120,
    28: 125,
    29: 130,
    30: 135,
    31: 135,
    32: 155,
    33: 155,
    34: 175,
    35: 200,
    36: 200,
    37: 250,
    38: 300,
    39: 400,
    40: 500
};
var global_environment = 'prod';
window.addEventListener("pageshow", function(event) {
    var historyTraversal = event.persisted || (typeof window.performance != "undefined" && window.performance.navigation.type === 2);
    if (historyTraversal) {
        window.location.reload();
    }
});

function GetLocalizedLoginMessages(validationKey) {
    if (validationKey == "displayLoginButton") {
        return "Login";
    } else if (validationKey == "authenticatreerrMsg") {
        return "Please enter valid credentials";
    } else if (validationKey == "loginNumberEmptyerrMsg") {
        return "Please enter Mobile number";
    } else if (validationKey == "loginNumberInvaliderrMsg") {
        return "Invalid mobile number"
    } else if (validationKey == "logPasserrMsg") {
        return "Please enter 6 digit pin";
    } else if (validationKey == "interneterrMsg") {
        return "Internet connection not available. Please try again";
    } else if (validationKey == "authenticatreerrMsg") {
        return "Sorry, that username / password combination has not been recognised";
    } else if (validationKey == "depositAmountIntegerErrorMessage") {
        return "Please enter valid deposit amount";
    } else if (validationKey == "depositErrorMessage") {
        return "Deposit failed";
    } else if (validationKey == "depositButton") {
        return "Deposit";
    }
}

function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * cookieExpiryHours * cookieExpiryMinutes * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function createAppDomainCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * cookieExpiryHours * cookieExpiryMinutes * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + ";domain=" + globalConfig.CookieDomain + "; path=/";
}

function createAppDomainCookie_Games(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * cookieExpiryHours * cookieExpiryMinutes * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + ";domain=" + globalConfig.gamesdomain + "; path=/";
}

function createAppDomainCookie_Pick6(name, value, days) {
    var getBaseUrl = window.location.hostname;
    var getHostName = getBaseUrl.split('.').reverse();
    if (getHostName.length === 1) {
        var rootDomain = '.' + getHostName[0];
    } else if (getHostName.length === 2) {
        rootDomain = '.' + getHostName[1] + '.' + getHostName[0];
    } else if (getHostName.length === 3) {
        rootDomain = '.' + getHostName[1] + '.' + getHostName[0];
    } else if (getHostName.length === 4) {
        rootDomain = '.' + getHostName[1] + '.' + getHostName[0];
    }
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * cookieExpiryHours * cookieExpiryMinutes * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + ";domain=" + rootDomain + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}

function GetLocalizedMyBetsMessages(validationKey) {
    if (validationKey == "textWin") {
        return "To Win";
    }
    if (validationKey == "textPayout") {
        return "Payout";
    }
    if (validationKey == "textStake") {
        return "Stake";
    }
    if (validationKey == "textCashout") {
        return "Cashout";
    }
    if (validationKey == "textConfirm") {
        return "Confirm";
    }
    if (validationKey == "cashoutSuccessMsg") {
        return "Cashout success";
    }
    if (validationKey == "displayLost") {
        return "Lost";
    }
    if (validationKey == "displayShowmore") {
        return "Show more";
    }
    if (validationKey == "displayCancel") {
        return "Cancel";
    }
    if (validationKey == "displaySuspended") {
        return "Suspended";
    }
    if (validationKey == "nobetserrMsg") {
        return "Currently no bets available";
    }
    if (validationKey == "nodataerrMsg") {
        return "Currently no data available";
    }
    if (validationKey == "noCashoutserrMsg") {
        return "Currently no cashouts available";
    }
    if (validationKey == "displayWon") {
        return "Won";
    }
}

function restrictWithoutLogin() {
    let getActiveToken = readCookie("token");
    if (getActiveToken === null || getActiveToken === "") {
        createCookie("token", "", -1);
        createCookie("balance", "", -1);
        createCookie("betsCount", "", -1);
        createCookie("walletId", "", -1);
        createCookie("defWalletId", "", -1);
        createCookie("userNumber", "", -1);
        createCookie("customerId", '', -1);
        createCookie("depositPopUp", '', -1);
        createCookie("jackpotPopUp", '', -1);
        createCookie("picksixPopUp", '', -1);
        createCookie("registration", '', -1);
        createCookie("freebet", '', -1);
        createCookie("email", '', -1);
        createCookie("PhoneNumber", '', -1);
        createCookie("userStakeValue", '', -1);
        createCookie("acceptcheck", '', -1);
        createCookie("hasDeposited", '', -1);
        createCookie("user", '', -1);
        createCookie("keepbetscheck", '', -1);
        createAppDomainCookie("user", "", -1);
        createAppDomainCookie("AppSession", "", -1);
        createAppDomainCookie_Pick6("AppSession", '', -1);
        createAppDomainCookie_Pick6("userId", '', -1);
        createAppDomainCookie_Pick6("userNumber", '', -1);
        createAppDomainCookie_Pick6("CurrencyCode", '', -1);
        createAppDomainCookie_Pick6("UserCulture", '', -1);
        createAppDomainCookie_Games("AppSession", '', -1);
        createAppDomainCookie_Games("userId", '', -1);
        createAppDomainCookie_Games("userNumber", '', -1);
        createAppDomainCookie_Games("CurrencyCode", '', -1);
        createAppDomainCookie_Games("UserCulture", '', -1);
        window.location.href = "/placebet";
    }
}
var socketConfig = {
    sportsBookUrl: "#"
};

function SetMenuActive(list) {
    for (var i = 0; i < list.length; i++) {
        var baseurl = list[i].attributes.class['baseURI'];
        var loophref = list[i]['children'][0]['href'];
        if (baseurl == loophref) {
            list[i].classList.add('active');
            break;
        }
    }
}