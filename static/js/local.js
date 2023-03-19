function GetLocalizedPlacebetMessages(validationKey) {
    var localizedString = {
        displayBetslipEmpty: "Your Betslip is empty. Please add selections.",
        betslipLabelName: "Betslip",
        btnDepositName: "Deposit",
        btnLoginName: "place_bet",
        acceptOddsLabelName: "Accept Odds Change",
        keepBetsLabelName: "Keep bets in betslip",
        clearAllLabelName: "Clear All",
        freebetLabelName: "Use free bet",
        freebetName: "Free Bet",
        totalOddsLabelName: "Total Odds",
        StakeLabelName: "Stake",
        winLabelName: "To Win",
        placeBetLabelName: "Place Bet",
        placebetdecimalErrorMsg: "Decimal Stake is not allowed",
        placebetMaxAmountExceedMsg: "Cannot place bet sorry, the potential returns exceed the maximum allowable payout of ",
        placebetMinStakeAmountMsg: "The minimum stake you can bet with is ",
        placebetAPIErrorMsg: "Unable to place bet.Sorry,due to an unexpected error,your request cannot be completed.",
        bonusLabelName: "Bonus Amount",
        betslipMultibetMsg: "Add bonusBetCount more selections to receive a bonus of noOfBets%",
        betslipOddsThresholdMsg: "This bet is below the minimum threshold of odds of 1.20 or greater required for a multi bet bonus",
        placebetMaxStakeAmountExceedMsg: "Cannot place bet sorry, the stake amount exceed the maximum amount ",
        invalidBonusMessage: "This bet does not qualify for the multi bet bonus",
        bonusStakeErrorMessage: "Insufficient Bonus Amount",
        bonusFreebetErrorMessage: "Select any one Freebet/Bonus",
        maxbetAddedMessage: "Max bets added to betslip",
        betBuilderCombinationErrorMsg: "Single bets cannot be combined with Betbuilder",
        oldEventonBetslipErrorMsg: "Cannot add old event to betslip.",
        betSlipMarketInactiveMessage: "Market is not offered",
        betSlipMarketCompletedMessage: "Market is completed",
        betSlipMarketClosedMessage: "Market is closed",
        betSlipSelectionSuspendedMessage: "Selection has been suspended",
    }
    return localizedString[validationKey];
}

function GetLocalizedPlacebetReceiptMessages(validationKey) {
    var localizedString = {
        receiptBetLabel: "Bet Receipt",
        PlacebetSuccessMsg: "<div>Thank you for placing your bet.</div><div>Your bet has successfully placed.</div>",
        receiptBettypeLabel: "Bet type",
        betTypeSingle: "Single",
        betTypeMultiple: "Multiple",
        betReceiptIdLabel: "Bet Receipt ID",
        betReceiptPlacedOnLabel: "Placed on",
        betReceiptTotalStakeLabel: "Total Stake",
        betReceiptWinLabel: "Potential win",
        shareYourBetMsg: "Share your bet",
        continueBettingMsg: "Continue Betting",
        excitingGamesMsg: "Or bet on one of these exciting games:",
        vLeagueLabelMsg: "V League",
        jackpotLabelMsg: "Jackpot"
    }
    return localizedString[validationKey];
}

function GetDateAndMonthMessages(validationKey) {
    var localizedString = {
        todayLabelName: "Today",
        tomorrowLabelName: "Tomorrow",
        janMonth: "Jan",
        febMonth: "Feb",
        marMonth: "Mar",
        aprMonth: "Apr",
        mayMonth: "May",
        junMonth: "Jun",
        julMonth: "Jul",
        augMonth: "Aug",
        sepMonth: "Sep",
        octMonth: "Oct",
        novMonth: "Nov",
        decMonth: "Dec"
    }
    return localizedString[validationKey];
}

function GetDepositMessages(validationKey) {
    var localizedString = {
        txtyouhave: "You have",
        txtbalance: "balance",
        txtdeposittoday: "Deposit now to bet on today's games"
    }
    return localizedString[validationKey];
}

function GetazMaintabTitles(validationKey) {
    var localizedString = {
        txtTopLeagues: "Top Leagues",
        txtAllLeagues: "All Leagues",
        txtLiveNow: "Live Now",
        txtInplay: "In-play"
    }
    return localizedString[validationKey];
}