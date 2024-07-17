/**
 * Vodus API
 *
 * @summary   Vodus API for commercial calling
 *
 * @link      www.vodus.com/developer/api
 * @since     0.0.2
 */
var GlobalParameter

function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname
    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    } else {
        hostname = url.split('/')[0];
    }
    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];
    return hostname;
}


(function (global) {
    //"use strict";
    if (global.vodus == null) {
        console.error("Vodus => Initialization failed");
        console.error("Vodus => Exiting vodus...");
        return;
    }

    var app = {
        version: '0.0.2',
        partner_code: (global.vodus.partner_code != null && global.vodus.partner_code != "" ? global.vodus.partner_code.replace(/[^\x00-\x7F]/g, "") : ""),
        interval: global.vodus.interval,
        language: global.vodus.language,
        cookieName: 'Vodus.Token',
        debug: global.vodus.debug,
        rootUrl: '',
        serverlessUrl: '',
        initCallbackFunctionName: '',
        vodus3PRootUrl: '',
        reward3PRootUrl: '',
        thirdPartyEnabled: false,
        availablePoints: 0,
        email: '',
        isLoggedin: false,
        skip3PCheck: false,
        cacheCode: '?build=' + global.vodus.build,
        modalClosable: global.vodus.modalClosable,
        env: global.vodus.env,
        preferredLanguage: '',
        selectedType: "",
        demographicSurveyType: "0",
        questionData: "",
        questionModalDelay: global.vodus.questionModalDelay,
        ctcTimer: global.vodus.ctcTimer,
        ctcInterval: global.vodus.ctcInterval,
        surveyQuestionId: 0,
        loadedAt: "",
        skipQuestionStatusCheck: false,
        skipShowQuestionModal: true,
        minSessionCount: global.vodus.minSessionCount,
        noDemo: global.vodus.noDemo,
        checkCounterTimer: null,
        notificationPosition: global.vodus.notificationPosition,
        ccType: global.vodus.ccType,
        isReferral: false,
        vPointsPerQuestion: 0,
        dailyAllowance: global.vodus.dailyAllowance,
        demographicCCType: global.vodus.demographicCCType,
        demographicCTCTimer: global.vodus.demographicCTCTimer,
        demographicInterval: global.vodus.demographicInterval,
        pipeReplace: '',
        pipeList: '',
        pipeAnswerIdList: '',
        idsForPipeList: '',
        ccRequestUrl: '',
        ccTargetCode: (global.vodus.ccTargetCode != null && global.vodus.ccTargetCode != "" ? global.vodus.ccTargetCode : ""),
        dmpTargetCode: '',
        dmpUrl: global.vodus.dmpUrl,
        dmpType: global.vodus.dmpType,
        dmpCode: global.vodus.dmpCode,
        dmpTarget: global.vodus.dmpTarget,
        chainQuota: global.vodus.chainQuota,
        chainQuotaCount: 0,
        isChainQuestion: false,
        ccPageScrollTrigger: global.vodus.ccPageScrollTrigger,
        isCCPageScrollTriggered: false,
        catfishPosition: global.vodus.catfishPosition, //bottom-right, bottom-left, top-right, top-left
        bannerMode: global.vodus.bannerMode,
        intervalBannerMode: global.vodus.intervalBannerMode,
        isBannerMode: global.vodus.isBannerMode,
        isFailBannerMode: false,
        isResized: false,
        isSurveyFallbackScript: global.vodus.isSurveyFallbackScript,
        GAMAdUnitId: global.vodus.GAMAdUnitId,
        stoAfterTotalNoResponse: global.vodus.stoAfterTotalNoResponse,
        stoCTCTimer: global.vodus.ctcTimer,
        stoCTCInterval: global.vodus.ctcInterval,
        stoInterval: global.vodus.interval,
        stoCCType: global.vodus.ccType,
        stoDemographicCCType: global.vodus.demographicCCType,
        rewardsAdSubgroupId: '',
        rewardsAdDemographicStateId: 0,
        rewardsAdDemographicAgeId: 0,
        rewardsAdDemographicGenderId: 0,
        rewardsAdDemographicEthnicityId: 0,
        rewardsAdsTemplate: '',
        rewardsAdsData: '',
        rewardsAdsTriggeredAt: 0,
        partnerId: '',
        partnerWebsiteId: '',
        partnerWebsiteName: '',
        fingerPrintObject: null,
        fingerprint: null,
        deviceId: (global.vodus.deviceId != null && global.vodus.deviceId != "" ? global.vodus.deviceId : ""),
        deviceOS: (global.vodus.deviceOS != null && global.vodus.deviceOS != "" ? global.vodus.deviceOS : "1"),
        isUrlSyncRequired: false,
        isFingerprintingEnabled: false,
        isUrlSyncEnabled: true,
        tempToken: "",
        logStatus: {
            error: "error",
            warning: "warning"
        },
        syncType: {
            intervalSync: "intervalSync",
            sessionSync: "sessionSync",
            ccSync: "ccSync"
        },
        thirdPartyTestType: {
            firstLoad: 1,
            beforeCC: 2
        },
        usesLocalStorage: false,
        localStorageVersion: 5,
        localSyncInterval: 120, // Minutes
        globalSwitchCheckInterval: 120, //Minutes,
        cdnUrl: '',
        surveycssUrl: '',
        commonjsUrl: '',
        displayHeight: 0,
        questionId: 0,
        surveyType: 0,
        memberProfileId: 0,
        browser: "",
        isAnswerIDZeroLogged: false,
        viewType: (global.vodus.viewType != null && global.vodus.viewType != "" ? global.vodus.viewType : "web"),
        containerHeight: global.vodus.containerHeight,
        cookieSyncType: '',
        userCountryCode: (global.vodus.userCountryCode != null && global.vodus.userCountryCode != "" ? global.vodus.userCountryCode : ""),
    }

    if (app.env == 'live') {
        app.rootUrl = 'https://api.vodus.com'; // requires www, https://www.vodus.com
        app.ccRequestUrl = 'https://api.vodus.com';
        app.vodus3PRootUrl = 'https://api.vodus.com'; // Do not add www, it has to be root https://vodus.my
        app.reward3PRootUrl = 'https://vodus.my';
        app.responseRootUrl = 'https://api.vodus.com';
        app.cdnUrl = 'https://cdn.jsdelivr.net/gh/vodus-ai/api@latest';
        app.surveycssUrl = 'https://cdn.jsdelivr.net/gh/vodus-ai/api@latest/240208-survey.css';
        app.commonjsUrl = 'https://cdn.jsdelivr.net/gh/vodus-ai/api@latest/230612-1-vodus-common.js';
        app.serverlessUrl = 'https://vodus-api-serverless.azurewebsites.net';
    } else if (app.env == 'uat') {
        app.rootUrl = 'https://vodus-api-uat.azurewebsites.net';
        app.ccRequestUrl = 'https://vodus-api-uat.azurewebsites.net';
        app.vodus3PRootUrl = 'https://vodus-api-uat.azurewebsites.net';
        app.reward3PRootUrl = 'https://voupon-uat.azurewebsites.net';
        app.responseRootUrl = 'https://vodus-api-uat.azurewebsites.net';
        app.cdnUrl = 'https://cdn.jsdelivr.net/gh/vodus-ai/api@latest';
        app.tingleUrl = 'https://vodus-api-uat.azurewebsites.net';
        app.surveycssUrl = 'https://vodus-api-uat.azurewebsites.net/cc/css/creator/survey.css';
        app.commonjsUrl = 'https://vodus-api-uat.azurewebsites.net/cc/scripts/vodus-common.js';
        app.serverlessUrl = 'https://vodus-api-serverless-uat.azurewebsites.net';
    } else if (app.env == 'dev') {
        app.rootUrl = 'https://vodus-api-dev.azurewebsites.net';
        app.ccRequestUrl = 'https://vodus-api-dev.azurewebsites.net';
        app.vodus3PRootUrl = 'https://vodus-api-dev.azurewebsites.net';
        app.reward3PRootUrl = 'https://vodus-rewards-dev.azurewebsites.net';
        app.responseRootUrl = 'https://vodus-dev.azurewebsites.net';
        app.cdnUrl = 'https://cdn.jsdelivr.net/gh/vodus-ai/api@latest';
        app.surveycssUrl = 'https://vodus-api-uat.azurewebsites.net/cc/css/creator/survey.css';
        app.commonjsUrl = 'https://vodus-api-uat.azurewebsites.net/cc/scripts/vodus-common.js';
        app.serverlessUrl = 'https://vodus-api-serverless-uat.azurewebsites.net';
    } else if (app.env == 'local') {
        app.rootUrl = 'http://localhost:7193';
        app.ccRequestUrl = 'http://localhost:7071';
        app.vodus3PRootUrl = 'https://vodus-api-uat.azurewebsites.net';
        app.reward3PRootUrl = 'https://voupon-uat.azurewebsites.net';
        app.responseRootUrl = 'http://localhost:7071';
        app.cdnUrl = 'https://cdn.jsdelivr.net/gh/vodus-ai/api@latest';
        app.surveycssUrl = 'https://vodus-api-uat.azurewebsites.net/cc/css/creator/survey.css';
        app.commonjsUrl = 'https://vodus-api-uat.azurewebsites.net/cc/scripts/vodus-common.js';
        app.serverlessUrl = 'http://localhost:7071';
    }
    if (global.vodus.modalClosable != null) {
        app.modalClosable = global.vodus.modalClosable
    }

    if (app.ccType == "2" || app.ccType == "3") {
        app.skipQuestionStatusCheck = true;
    }

    app.debug = false;
    if (global.vodus.q != null) {
        for (var i = 0; i < global.vodus.q.length; i++) {
            //  init
            if (global.vodus.q[i][0] != null) {
                if (global.vodus.q[i][0].toLowerCase() == "init") {
                    if (global.vodus.q[i][1] != null) {
                        app.initCallbackFunctionName = global.vodus.q[i][1];
                    }
                }
            }
        }
    }


    window.onload = function () {
        //init();
    };

    if (app.rootUrl == "") {
        console.log("Invalid setup. Exiting Vodus");
        return false;
    }
    var ua = navigator.userAgent;

    function resyncToken(env) {
        var resyncServerlessUrl = "";
        var resyncApiUrl = "";
        var resyncRewardsUrl = "";
        if (env == 'live') {
            resyncServerlessUrl = 'https://vodus-api-serverless.azurewebsites.net';
            resyncApiUrl = 'https://api.vodus.com/';
            resyncRewardsUrl = 'https://vodus.my/';
        } else if (env == 'uat') {
            //resyncServerlessUrl = 'https://vodus-api-serverless-uat.azurewebsites.net';
            //resyncApiUrl = 'https://vodus-api-js-uat.azurewebsites.net';
            //resyncRewardsUrl = 'http://voupon-uat.ap-southeast-1.elasticbeanstalk.com';

            resyncServerlessUrl = 'https://vodus-api-serverless-uat.azurewebsites.net';
            resyncApiUrl = 'https://vodus-api-uat.azurewebsites.net';
            resyncRewardsUrl = 'https://uat.vodus.my';
        } else if (env == 'dev') {
            resyncServerlessUrl = 'https://vodus-api-uat.azurewebsites.net';
            resyncApiUrl = 'https://vodus-api-uat.azurewebsites.net';
            resyncRewardsUrl = 'https://voupon-uat.azurewebsites.net';
        } else if (env == 'local') {
            resyncServerlessUrl = 'https://vodus-api-serverless-uat.azurewebsites.net';
            resyncApiUrl = 'https://vodus-api-uat.azurewebsites.net';
            resyncRewardsUrl = 'https://uat.vodus.my';
        }
        var resyncCookie = vodus.readCookie("Vodus.Token");
        var localMemberProfile = localStorage.getItem('memberProfile');
        if (localMemberProfile == null) {
            //console.log("Empty localMemberProfile");
        } else {
            localMemberProfileObject = JSON.parse(localMemberProfile);
            if (localMemberProfileObject.version != 5) {
                localStorage.clear();
                console.log('Resetting localstorage, newer version available');
            } else {
                if (resyncCookie != null && resyncCookie != "" && resyncCookie != "null") {
                    console.log("Nothing to resync. System is latest");
                    var secondLoadCheck = vodus.readCookie("vodus_second_load_check");
                    if (secondLoadCheck == null || secondLoadCheck == "") {
                        var tempToken = vodus.readCookie("vodus_temp_token");
                        if (tempToken != null && tempToken != "") {
                            $.ajax({
                                type: "POST",
                                dataType: 'json',
                                cache: false,
                                data: JSON.stringify({
                                    token: resyncCookie,
                                    tempToken: tempToken
                                }),
                                url: resyncServerlessUrl + '/api/token/second-load-check',
                                success: function (response) {
                                    if (response.successful) {
                                        if (response.data != null && response.data != "") {
                                            if (response.data == "logout") {
                                                vodus.deleteCookie("Vodus.Token");
                                                vodus.deleteCookie("vodus_temp_token");
                                                vodus.log('resetting token..');
                                                vodus.initCallback();
                                            }
                                            else {
                                                vodus.log("second load token => " + response.data.trim());
                                                if (!app.thirdPartyEnabled) {
                                                    vodus.createCookie("Vodus.Token", response.data.trim(), 3650);
                                                    vodus.createCookie("vodus_second_load_check", "Y", 3650);
                                                    vodus.getQuestionBeforeInternal();
                                                    return;
                                                }
                                                else {
                                                    vodus.getQuestionBeforeInternal();
                                                }
                                            }
                                        }
                                        else {
                                            vodus.getQuestionBeforeInternal();
                                            return;
                                        }
                                    } else {
                                        if (response.code == 999) {
                                            vodus.deleteCookie("Vodus.Token");
                                            vodus.deleteCookie("vodus_temp_token");
                                            vodus.log('resetting token..');
                                            return;
                                        }
                                        else {
                                            vodus.log("Temp token => Fail to generate second load token" + response.message);
                                        }
                                    }
                                },
                                error: function (err) {
                                    vodus.log(err, app.logStatus.error)
                                }
                            });
                        }
                        else {
                            if (window.location.hostname.indexOf("vodus.my") > -1 || window.location.hostname.indexOf("voupon-uat.azurewebsites.net") > -1) {
                                vodus.getQuestionBeforeInternal();
                                return;
                            }
                            else {
                                $.ajax({
                                    type: "POST",
                                    dataType: 'json',
                                    cache: false,
                                    data: JSON.stringify({
                                        token: resyncCookie
                                    }),
                                    url: resyncServerlessUrl + '/api/token/check-logged-out-sync',
                                    success: function (response) {
                                        if (response.successful) {
                                            if (response.data != null && response.data != "") {
                                                if (response.data == "logout") {
                                                    vodus.createCookie("Vodus.Token", "", -3650);
                                                    vodus.createCookie("vodus_temp_token", "", -3650);
                                                    vodus.createCookie("vodus_second_load_check", "", -3650);
                                                    vodus.createCookie("vodus_sync_clicked", "", -3650);
                                                    vodus.initCallback();
                                                }
                                                else {
                                                    vodus.getQuestionBeforeInternal();
                                                    return;
                                                }
                                            }
                                            else {
                                                vodus.getQuestionBeforeInternal();
                                                return;
                                            }
                                        } else {
                                            vodus.log("logout check => Fail to check logout state");
                                        }
                                    },
                                    error: function (err) {
                                        vodus.log(err, app.logStatus.error)
                                    }
                                });
                            }
                        }
                    }
                    else {
                        if (window.location.hostname.indexOf("vodus.my") > -1 || window.location.hostname.indexOf("voupon-uat.azurewebsites.net") > -1) {
                            vodus.getQuestionBeforeInternal();
                            return;
                        }
                        else {
                            $.ajax({
                                type: "POST",
                                dataType: 'json',
                                cache: false,
                                data: JSON.stringify({
                                    token: resyncCookie
                                }),
                                url: resyncServerlessUrl + '/api/token/check-logged-out-sync',
                                success: function (response) {
                                    if (response.successful) {
                                        if (response.data != null && response.data != "") {
                                            if (response.data == "logout") {
                                                vodus.createCookie("Vodus.Token", "", -3650);
                                                vodus.createCookie("vodus_temp_token", "", -3650);
                                                vodus.createCookie("vodus_second_load_check", "", -3650);
                                                vodus.initCallback();
                                            }
                                            else {
                                                vodus.getQuestionBeforeInternal();
                                            }
                                        }
                                        else {
                                            vodus.getQuestionBeforeInternal();
                                        }
                                    } else {
                                        vodus.log("logout check => Fail to check logout state");
                                    }
                                },
                                error: function (err) {
                                    vodus.log(err, app.logStatus.error)
                                }
                            });
                        }
                    }
                    return;
                } else {
                    //vodus.getQuestionBeforeInternal();
                    //return;
                }

            }
        }


        if ($("#resyncRewardVodus3PTestContainer").length == 0) {
            $("<div style='height:0;'>").attr({
                'class': "",
                'id': "resyncRewardVodus3PTestContainer"
            }).appendTo("body");
        }

        if ($("#resyncApiVodus3PTestContainer").length == 0) {
            $("<div style='height:0;'>").attr({
                'class': "",
                'id': "resyncApiVodus3PTestContainer"
            }).appendTo("body");
        }

        //  check api for token
        if (resyncCookie == null || resyncCookie == "") {

            //  Generate temp token if its empty
            var deviceId = "";
            if (deviceId == null || deviceId == "") {
                var tempToken = vodus.readCookie("vodus_temp_token");
                if (tempToken == null || tempToken == "") {
                    $.ajax({
                        type: "POST",
                        dataType: 'json',
                        cache: false,
                        data: JSON.stringify({
                            token: resyncCookie
                        }),
                        url: resyncServerlessUrl + '/api/token/generate-temp-token',
                        success: function (response) {

                            if (response.successful) {
                                if (response.data != null && response.data != null) {
                                    vodus.log("Temp token => " + response.data.trim());
                                    vodus.createCookie("vodus_temp_token", response.data.trim(), 3650);
                                    vodus.createCookie("vodus_sync_clicked", "", -3650);


                                    if (app.bannerMode == 1) {
                                        if ($(".vodus-banner").length > 0) {
                                            if (app.ccType == 1) {
                                                app.ccType = "3";
                                            }

                                            app.ctcTimer = 0;
                                            app.interval = 0;
                                            app.ctcInterval = 0;
                                            app.isBannerMode = true;
                                            DetectingMobile();
                                            app.ccPageScrollTrigger = 20;
                                            $(".vodus-banner").css("width", "").css("height", "");
                                        } else {
                                            vodus.log('Banner Mode: Vodus Banner div is not found.');
                                            app.IsFailBannerMode = true;
                                            return false;
                                        }
                                    } else if (app.intervalBannerMode == 1) {
                                        if ($(".vodus-banner").length > 0) {
                                            if (app.ccType == 1) {
                                                app.ccType = "3";
                                            }
                                            app.ctcTimer = 0;
                                            app.interval = 0;
                                            app.ctcInterval = 0;
                                            app.isBannerMode = true;
                                            DetectingMobile();
                                            app.ccPageScrollTrigger = 20;
                                            $(".vodus-banner").css("width", "").css("height", "");
                                        } else {
                                            vodus.log('Banner Mode: Vodus Banner div is not found.');
                                            app.IsFailBannerMode = true;
                                            return false;
                                        }
                                    }
                                    vodus.getQuestionBeforeInternal();
                                }
                            } else {
                                vodus.log("Temp token => Fail to generate vodus temp token" + response.message);
                            }
                        },
                        error: function (err) {
                            vodus.log(err, app.logStatus.error)
                        }
                    });
                }
                else {

                    if (app.thirdPartyEnabled) {
                        vodus.getQuestionBeforeInternal();
                    }
                    else {
                        $.ajax({
                            type: "POST",
                            dataType: 'json',
                            cache: false,
                            data: JSON.stringify({
                                tempToken: tempToken
                            }),
                            url: resyncServerlessUrl + '/api/token/check-temp-token',
                            success: function (response) {

                                if (response.successful) {
                                    if (response.data != null && response.data != "") {
                                        vodus.log("New token => " + response.data.trim());
                                        vodus.createCookie("Vodus.Token", response.data.trim(), 3650);
                                    }
                                    else {
                                        vodus.log("No new token exchanged");
                                    }
                                    vodus.getQuestionBeforeInternal();
                                } else {
                                    if (response.data != null) {
                                        vodus.log("Invalid temp token, recreating...");
                                        vodus.createCookie("vodus_temp_token", response.data.trim(), 3650);
                                        vodus.getQuestionBeforeInternal();
                                    }
                                    else {
                                        vodus.log("Invalid temp token, recreating...");
                                    }
                                }
                            },
                            error: function (err) {
                                vodus.log(err, app.logStatus.error)
                            }
                        });
                    }

                }
            }
            else {
                //  Regenerate token or create if deviceid and os is found
                vodus.log("Checking/generating deviceId");
                $.ajax({
                    type: "POST",
                    dataType: 'json',
                    cache: false,
                    data: {
                        deviceId: app.deviceId,
                        os: app.deviceOS
                    },
                    url: resyncServerlessUrl + '/api/token/generate-token-via-device',
                    success: function (response) {

                        if (response.successful) {
                            if (response.data != null && response.data != "") {
                                vodus.log("New token => " + response.data.token.trim());
                                vodus.createCookie("vodus_id", response.data.vodusId.trim(), 3650);
                                vodus.createCookie("Vodus.Token", response.data.token.trim(), 3650);
                                vodus.getQuestionBeforeInternal();
                            }
                            else {
                                vodus.log("No new token exchanged");
                            }

                        } else {
                            vodus.log("Fail to generate token with device details");
                        }
                    },
                    error: function (err) {
                        vodus.log(err, app.logStatus.error)
                    }
                });
            }

        }
        else {

            $.ajax({
                type: "POST",
                dataType: 'json',
                cache: false,
                data: JSON.stringify({
                    token: resyncCookie
                }),
                url: resyncServerlessUrl + '/api/token/resync',
                success: function (response) {

                    if (response.successful) {
                        if (response.data != null && response.data != null) {
                            vodus.log("Resync token => " + response.data.trim());
                            vodus.createCookie("Vodus.Token", response.data.trim(), 3650);

                            var memberProfile = {
                                version: 5,
                                token: response.data.trim(),
                                ctcLastUpdatedAt: null,
                                submitResponseLastUpdatedAt: null,
                                thirdPartyEnabled: true,
                                lastSyncAt: "",
                                globalCC: {
                                    status: "",
                                    lastUpdatedAt: ""
                                },
                                pageLoad: {
                                    date: new Date(),
                                    localCount: 0,
                                    serverCount: 0
                                },
                                session: {
                                    localCount: 0,
                                    serverCount: 0,
                                    lastUpdatedAt: null
                                }
                            }

                            var localMemberProfileObject = memberProfile;
                            localStorage.setItem('memberProfile', JSON.stringify(localMemberProfileObject));
                            vodus.log('Creating new localstorage data');

                            //  Sync 3P
                            $("#resyncRewardVodus3PTestContainer").html('<iframe id="resyncRewardVodus3PTest" width="0" height="0"  src="' + resyncRewardsUrl + '/token/create-temporary-points?token=' + response.data.trim() + '" frameborder="0" allowfullscreen></iframe>');
                            $("#resyncApiVodus3PTestContainer").html('<iframe id="resyncApiVodus3PTest" width="0" height="0"  src="' + resyncApiUrl + '/v1/token/sync?token=' + response.data.trim() + '" frameborder="0" allowfullscreen></iframe>');
                            vodus.log('Done resync');
                        }

                        vodus.getQuestionBeforeInternal();
                    } else {
                        vodus.log("Reissuing a new token...");
                        vodus.deleteCookie("Vodus.Token");
                        $("#resyncRewardVodus3PTestContainer").html('<iframe id="vodus3PTest" width="0" height="0"  src="' + resyncApiUrl + '/v1/token/delete" frameborder="0" allowfullscreen></iframe>');
                        //  Remove token from rewards
                        $("#resyncApiVodus3PTestContainer").html('<iframe id="reward3PTest" width="0" height="0"  src="' + resyncRewardsUrl + '/token/delete-temporary-points" frameborder="0" allowfullscreen></iframe>');


                        $.ajax({
                            type: "GET",
                            dataType: 'json',
                            cache: false,
                            url: resyncServerlessUrl + '/api/token/check',
                            success: function (response) {
                                if (response.successful) {
                                    if (response.data != null && response.data != null) {
                                        var date = new Date();
                                        date.setTime(date.getTime() + (3650 * 24 * 60 * 60 * 1000));
                                        var expires = "; expires=" + date.toGMTString();
                                        //document.cookie = "Vodus.Token" + "=" + expires + response.data + "; SameSite=None;secure;path=/";
                                        var domain = "" + document.domain;

                                        document.cookie = "Vodus.Token" + "=" + response.data + expires + "; SameSite=None;secure; domain=" + domain + ";path=/";

                                        $("#resyncRewardVodus3PTestContainer").html('<iframe id="resyncRewardVodus3PTest" width="0" height="0"  src="' + resyncRewardsUrl + '/token/create-temporary-points?token=' + response.data.trim() + '" frameborder="0" allowfullscreen></iframe>');
                                        $("#resyncApiVodus3PTestContainer").html('<iframe id="resyncApiVodus3PTest" width="0" height="0"  src="' + resyncApiUrl + '/v1/token/sync?token=' + response.data.trim() + '" frameborder="0" allowfullscreen></iframe>');

                                        vodus.log("Done issuing a new token...");
                                        vodus.getQuestionBeforeInternal();
                                    }

                                }
                            },
                            error: function (err) {
                                vodus.log(err, app.logStatus.error)
                            }
                        });
                    }
                },
                error: function (err) {
                    vodus.log(err, app.logStatus.error)
                }
            });
        }
    }


    function DetectingMobile() {
        if (/Mobi/i.test(navigator.userAgent)) {
            if (/iPad|iPod/i.test(navigator.userAgent)) {
                app.isMobile = 0;
                if (app.ccType == 2) {
                    app.isMobile = 1;
                }
            } else {
                app.isMobile = 1;
            }
        } else {
            app.isMobile = 0;
            if (app.ccType == 2 || app.ccType == 3) {
                app.isMobile = 1;
            }
        }
    }

    var token = "";
    var initCallback = "";
    var rootUrl = "";
    var email = "";
    var password = "";
    var loginProvider = "";
    var externalUserId = "";
    var externalUserName = "";
    var firstName = "";
    var lastName = "";
    var gender = "";
    var ageRange = "";
    var partnerCode = "";
    var surveyResponse;
    var redirectUrl = "";
    var submitResponseCallback = "";
    var submitResponseArgument = [];
    var noQuestionCallback = "";
    var noQuestionArgument = [];
    var rewardCreateAccountCallback = "";
    var rewardCreateAccountArgument = [];
    var rewardLoginCallback = "";
    var rewardLoginArgument = [];
    var rewardLogoutCallback = "";
    var rewardLogoutArgument = [];
    var rewardGetQuestionCallback = "";
    var rewardGetQuestionArgument = [];
    var partnerData = "";
    var pixelData = "";
    var tingleQuestionModal = "";
    var tingleAboutUsModal = "";
    var tingleSignupModal = "";
    var tingleLoginModal = "";
    var appData = "";


    //  Vodus logger
    var vodus = {
        log: function log(message, type) {
            if (app.debug) {
                if (type == app.logStatus.error) {
                    console.error('%c Vodus =>' + message, 'background: #ff0000; color: #fff');
                } else if (type == app.logStatus.warning) {
                    console.warn("Vodus => " + message);
                } else {
                    console.log("Vodus => " + message);
                }
            }
            $(".vodusLog").append(message);
        },
        readCookie: function readCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },
        createCookie: function createCookie(name, value, days) {
            var domain = "" + document.domain;
            // Deleting cookie before creating
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=None;secure';
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                var expires = "; expires=" + date.toGMTString();
            } else {
                var expires = "";
            }
            //console.log("cookie domain > " + domain);
            document.cookie = name + "=" + value + expires + "; SameSite=None;secure; domain=" + domain + ";path=/";
            document.cookie = name + "=" + value + expires + "; SameSite=None;secure; domain=" + "." + domain + ";path=/";

        },
        deleteCookie: function deleteCookie(name, value, days) {
            vodus.createCookie(app.cookieName, '', -3650);
        },

        //  Set Vodus Available Point
        //  @param inputAvailablePoint Available Point(s)
        setSkipQuestionStatusCheck: function setSkipQuestionStatusCheck(inputAvailablePoint) {
            app.skipQuestionStatusCheck = inputAvailablePoint;
        },

        //  Set Vodus Available Point
        //  @param inputAvailablePoint Available Point(s)
        setAvailablePoint: function setAvailablePoint(inputAvailablePoint) {
            app.availablePoints = inputAvailablePoint;
        },
        getAvailablePoint: function getAvailablePoint() {
            return app.availablePoints;
        },

        //  Set rootUrl values
        //  @param inputRootUrl root Url
        setRootUrl: function setRootUrl(inputRootUrl) {
            rootUrl = inputRootUrl;
        },
        getRootUrl: function getRootUrl() {
            return rootUrl;
        },

        //  Set email values
        //  @param inputEmail email address
        setSkipShowModal: function setSkipShowModal(input) {
            app.skipShowQuestionModal = input
        },
        //  Get email values
        getSkipShowModal: function getEmail() {
            return app.skipShowQuestionModal;
        },

        //  Set email values
        //  @param inputEmail root Url
        setInitCallback: function setInitCallback(inputInitCallback) {
            initCallback = inputInitCallback;
        },
        getInitCallback: function getInitCallback() {
            return initCallback;
        },
        setQuestionModal: function setQuestionModal(tingle) {
            tingleQuestionModal = tingle;
        },
        getQuestionModal: function getQuestionModal() {
            return tingleQuestionModal;
        },
        setAboutUsModal: function setAboutUsModal(tingle) {
            tingleAboutUsModal = tingle;
        },
        getAboutUsModal: function getAboutUsModal() {
            return tingleAboutUsModal;
        },
        setLoginModal: function setLoginModal(tingle) {
            tingleLoginModal = tingle;
        },
        getLoginModal: function getLoginModal() {
            return tingleLoginModal;
        },
        setSignupModal: function setSignupModal(tingle) {
            tingleSignupModal = tingle;
        },
        getSignupModal: function getSignupModal() {
            return tingleSignupModal;
        },
        setAppData: function setAppData(app) {
            appData = app;
        },
        getAppData: function getAppData() {
            return appData;
        },
        //  Set email values
        //  @param inputEmail email address
        setEmail: function setEmail(inputEmail) {
            email = inputEmail;
        },
        //  Get email values
        getEmail: function getEmail() {
            return email;
        },

        //  Set password values
        //  @param inputEmail email address
        setPassword: function setPassword(inputPassword) {
            password = inputPassword;
        },
        //  Get password values
        getPassword: function getPassword() {
            return password;
        },

        //  Set rewards Ads Data
        //  @param inputRewardAdsData reward ads
        setRewardAdsData: function setRewardAdsData(inputRewardAdsData) {
            rewardsAdsData = inputRewardAdsData;
        },
        //  Set login provider values
        //  @param inputLoginProvider email address
        setLoginProvider: function setLoginProvider(inputLoginProvider) {
            loginProvider = inputLoginProvider;
        },

        //  Get loginProvider values
        getLoginProvider: function getLoginProvider() {
            return loginProvider;
        },

        //  Set login provider values
        //  @param inputLoginProvider email address
        setExternalUserId: function setExternalUserId(inputExternalUserId) {
            externalUserId = inputExternalUserId;
        },

        //  Get loginProvider values
        getExternalUserId: function getExternalUserId() {
            return externalUserId;
        },

        //  Set login name values
        //  @param inputExteralUserName email address
        setExternalUserName: function setExternalUserName(inputExteralUserName) {
            externalUserName = inputExteralUserName;
        },

        //  Get loginProvider values
        getExternalUserName: function getExternalUserName() {
            return externalUserName;
        },

        //  @param inputFirstName
        setFirstName: function setFirstName(inputFirstName) {
            firstName = inputFirstName;
        },

        //  Get first name values
        getFirstName: function getFirstName() {
            return firstName;
        },

        //  @param inputLastName
        setLastName: function setLastName(inputLastName) {
            lastName = inputLastName;
        },

        //  Get first name values
        getLastName: function getLastName() {
            return lastName;
        },

        //  @param inputGender
        setGender: function setGender(inputGender) {
            gender = inputGender;
        },

        //  Get first name values
        getGender: function getGender() {
            return gender;
        },

        //  @param inputGender
        setAgeRange: function setAgeRange(inputAgeRange) {
            ageRange = inputAgeRange;
        },

        //  Get first name values
        getAgeRange: function getAgeRange() {
            return ageRange;
        },

        //  Set email values
        //  @param inputEmail email address
        setPartnerCode: function setPartnerCode(inputPartnerCode) {
            partnerCode = inputPartnerCode;
        },
        //  Get email values
        getPartnerCode: function getPartnerCode() {
            return partnerCode;
        },

        //Set Language Code
        setLanguageCode: function setLanguageCode(inputLanguageCode) {
            app.language = inputLanguageCode;
        },
        //  Get email values
        getLanguageCode: function getLanguageCode() {
            return app.language;
        },

        //Set Language Code
        setPreferredLanguage: function setPreferredLanguage(inputPreferredLanguage) {
            app.preferredLanguage = inputPreferredLanguage;
        },
        //  Get email values
        getPreferredLanguage: function getPreferredLanguage() {
            return app.preferredLanguage;
        },


        //Set Language Code
        setIsAnswerIDZeroLogged: function setIsAnswerIDZeroLogged(value) {
            app.isAnswerIDZeroLogged = value;
        },
        //  Get email values
        getIsAnswerIDZeroLogged: function getIsAnswerIDZeroLogged() {
            return app.isAnswerIDZeroLogged;
        },
        /*  
         * First parameter is the function name in string
         * Followed by subsequent parameter if any
         * Example: helloWorld(param,param2)
         * vodus.setSubmitResponseCallback("helloWorld",param,param2)
         */
        setSubmitResponseCallback: function setSubmitResponseCallback(callback) {
            if (arguments.length > 0) {
                submitResponseCallback = arguments[0];
                if (arguments.length > 1) {
                    for (var i = 0; i < arguments.length; i++) {
                        if (i > 0) {
                            submitResponseArgument.push(arguments[i]);
                        }
                    }
                }
            }
        },
        //  Get callback response if any
        getSubmitResponseCallback: function getSubmitResponseCallback() {
            return submitResponseCallback;
        },
        //  Set email values
        //  @param inputEmail root Url
        setNoQuestionCallback: function setNoQuestionCallback(callback) {
            if (arguments.length > 0) {
                noQuestionCallback = arguments[0];
                if (arguments.length > 1) {
                    for (var i = 0; i < arguments.length; i++) {
                        if (i > 0) {
                            noQuestionArgument.push(arguments[i]);
                        }
                    }
                }
            }
        },
        getNoQuestionCallArgument: function getNoQuestionCallArgument() {
            return noQuestionArgument;
        },
        getNoQuestionCallback: function getNoQuestionCallback() {
            return noQuestionCallback;
        },
        //  Set email values
        //  @param inputEmail root Url
        setRewardCreateAccountCallback: function setRewardCreateAccountCallback(callback) {
            if (arguments.length > 0) {
                rewardCreateAccountCallback = arguments[0];
                if (arguments.length > 1) {
                    for (var i = 0; i < arguments.length; i++) {
                        if (i > 0) {
                            rewardCreateAccountArgument.push(arguments[i]);
                        }
                    }
                }
            }
        },
        getRewardCreateAccountCallback: function getRewardCreateAccountCallback() {
            return rewardCreateAccountCallback;
        },
        //  Set email values
        //  @param inputEmail root Url
        setRewardLoginCallback: function setRewardLoginCallback(callback) {
            if (arguments.length > 0) {
                rewardLoginCallback = arguments[0];
                if (arguments.length > 1) {
                    for (var i = 0; i < arguments.length; i++) {
                        if (i > 0) {
                            rewardLoginArgument.push(arguments[i]);
                        }
                    }
                }
            }
        },
        getRewardLoginCallback: function getRewardLoginCallback() {
            return rewardLoginCallback;
        },
        //  Set email values
        //  @param inputEmail root Url
        setRewardGetQuestionCallback: function setRewardGetQuestionCallback(callback) {
            if (arguments.length > 0) {
                rewardGetQuestionCallback = arguments[0];
                if (arguments.length > 1) {
                    for (var i = 0; i < arguments.length; i++) {
                        if (i > 0) {
                            rewardGetQuestionArgument.push(arguments[i]);
                        }
                    }
                }
            }
        },
        getRewardGetQuestionArgument: function getRewardGetQuestionArgument() {
            return rewardGetQuestionArgument;
        },
        getRewardGetQuestionCallback: function getRewardGetQuestionCallback() {
            return rewardGetQuestionCallback;
        },
        //  Set email values
        //  @param inputEmail root Url
        setRewardLogoutCallback: function setRewardLogoutCallback(callback) {
            if (arguments.length > 0) {
                rewardLogoutCallback = arguments[0];
                if (arguments.length > 1) {
                    for (var i = 0; i < arguments.length; i++) {
                        if (i > 0) {
                            rewardLogoutArgument.push(arguments[i]);
                        }
                    }
                }
            }
        },
        getRewardLogoutCallback: function getRewardLogoutCallback() {
            return rewardLogoutCallback;
        },
        getRewardLogoutArgument: function getRewardLogoutArgument() {
            return rewardLogoutArgument;
        },
        //  Set redirect url
        setRedirectUrl: function setRedirectUrl(inputRedirectUrl) {
            redirectUrl = inputRedirectUrl;
        },
        //  Get redirect url
        getRedirectUrl: function getRedirectUrl() {
            return redirectUrl;
        },
        //  Set user selected answers
        setSurveyResponse: function setSurveyResponse(inputSurveyResponse) {
            surveyResponse = inputSurveyResponse;
        },
        //  Get user selected answers
        getSurveyResponse: function getSurveyResponse() {
            return surveyResponse;
        },
        //  Set token
        setToken: function setToken(inputToken) {
            token = inputToken;
        },
        //  Get user selected answers
        getToken: function getToken() {
            return token;
        },

        //Set Partner data
        setPartnerData: function setPartnerData(inputPartnerData) {
            partnerData = inputPartnerData;
        },
        //  Get email values
        getPartnerData: function getPartnerData() {
            return partnerData;
        },
        //Set Pixel data
        setPixelData: function setPixelData(inputPixelData) {
            pixelData = inputPixelData;
        },
        //  Get picel values
        getPixelData: function getPixelData() {
            return pixelData;
        },

        generateFingerPrint: function generateFingerPrint() {
            initializeAllTheCssAndJavascriptFiles();
            /*
            FingerprintJS.load().then(fp => {
                app.fingerPrintObject = FingerprintJS;
                fp.get(true).then(result => {
                    app.fingerprint = result;
                   
                });
            });
            */
        },
        getEmptyLocalVodusStore: function getEmptyLocalVodusStore() {
            return {
                cc: {
                    totalCCSinceResponse: 0,
                },
                lastUpdatedAt: Date.now(),
                rewards: {
                    cache_buster_code: "",
                    thankyou_template: ""
                },
                template: {
                    cache_buster_code: "",
                    thank_you: {
                        en: "",
                    },
                    type1: {
                        mobile: {
                            about_us_en: "",
                            about_us_my: "",
                            about_us_zh: "",
                            intro_en: "",
                            intro_my: "",
                            intro_zh: "",
                            signup_en: "",
                            signup_my: "",
                            signup_zh: "",
                            question_en: "",
                            question_my: "",
                            question_zh: "",
                        },
                        desktop: {
                            about_us_en: "",
                            about_us_my: "",
                            about_us_zh: "",
                            intro_en: "",
                            intro_my: "",
                            intro_zh: "",
                            signup_en: "",
                            signup_my: "",
                            signup_zh: "",
                            question_en: "",
                            question_my: "",
                            question_zh: "",
                        }
                    },
                    type2: {
                        about_us_en: "",
                        about_us_my: "",
                        about_us_zh: "",
                        intro_en: "",
                        intro_my: "",
                        intro_zh: "",
                        signup_en: "",
                        signup_my: "",
                        signup_zh: "",
                        question_en: "",
                        question_my: "",
                        question_zh: "",
                    },
                    type3: {
                        about_us_en: "",
                        about_us_my: "",
                        about_us_zh: "",
                        intro_en: "",
                        intro_my: "",
                        intro_zh: "",
                        signup_en: "",
                        signup_my: "",
                        signup_zh: "",
                        question_en: "",
                        question_my: "",
                        question_zh: "",
                    }

                }
            }
        },
        thirdPartyTest: function thirdPartyTest(thirdPartyTestType) {
            app.displayHeight = $(window).scrollTop();
            var ccToken = vodus.getParameterByName("cctoken");
            if (ccToken != null && ccToken != "") {
                //console.log('skiping 3P checking with ccToken')
                vodus.initCallback();
                return;
            }
            //  Check for thirdparty status. If already passed, skip checks
            if (thirdPartyTestType == app.thirdPartyTestType.firstLoad) {


                //vodus.initCallback();
                //  3P test

                if (app.skip3PCheck) {
                    vodus.log("GetQuestion: Skipping 3P");
                    vodus.initCallback();
                } else {
                    if ($("#vodus3PTester").length == 0) {
                        $("<div>").attr({
                            'class': "",
                            'id': "vodus3PTester"
                        }).appendTo("body");
                    }
                    vodus.log("3P check: 3rd party cookie testing in progress...");
                    $("#vodus3PTester").html('<iframe id="tester" src="' + app.vodus3PRootUrl + '/thirdparty-cookie-check-start.html" style="display:none" />');
                    var vodus3PTesterMessage = function check3PCookies(evt) {
                        if (evt.origin == app.vodus3PRootUrl) {
                            vodus.log('3P check: Removing 3rd party tester...');
                            if (evt.origin.indexOf("goog") > 0) { } else {
                                if (evt.data === 'MM:3PCunsupported') {
                                    app.thirdPartyEnabled = false;
                                    vodus.log('3P check: 3rd party cookie not supported', app.logStatus.error);
                                    vodus.initCallback();
                                    /*
                                   
                                    window.removeEventListener("message", vodus3PTesterMessage, false);
                                    app.thirdPartyEnabled = false;
                                    app.skip3PCheck = true;


                                    var token = vodus.readCookie(app.cookieName);
                                    if (token == null || token == "") {
                                        //  Test third party
                                        if ($("#vodus3PCookie").length == 0) {
                                            $("<div>").attr({
                                                'class': "",
                                                'id': "vodus3PCookie"
                                            }).appendTo("body");
                                        }

                                        $("#vodus3PCookie").html('<iframe id="vodusIframe" width="0" height="0"  src="' + app.vodus3PRootUrl + '/token/check?partnerCode=' + app.partner_code + '" frameborder="0" allowfullscreen></iframe>');

                                        $("#vodusIframe").on('load', function () {
                                            var iframe = document.getElementById('vodusIframe');
                                            iframe.contentWindow.postMessage("hello", '*');

                                        });
                                        window.addEventListener("message", vodus3PCookie, false);

                                        function vodus3PCookie(event) {
                                            if (event.origin == app.vodus3PRootUrl) {
                                                if (event.origin.indexOf("goog") > 1) {
                                                    //vodus.log('invalid post message');
                                                } else {
                                                    window.removeEventListener("message", vodus3PCookie, false);
                                                    //vodus.log('3P check: Message received from ' + event.origin);
                                                    //vodus.log('GetQuestion: Message received from ' + event.data);
                                                    //vodus.createCookie(app.cookieName, event.data, 3650);
                                                    var decoded = $('<div>').html(event.data.trim()).text();
                                                    vodus.createCookie(app.cookieName, decoded, 3650);
                                                    app.thirdPartyEnabled = true;
                                                    vodus.initCallback();
                                                }
                                            }
                                        }
                                    }
                                    */
                                    //vodus.initCallback();
                                } else if (evt.data === 'MM:3PCsupported') {
                                    window.removeEventListener("message", vodus3PTesterMessage, false);
                                    vodus.log('3P check: 3rd party cookie supported');
                                    app.skip3PCheck = true;
                                    app.thirdPartyEnabled = true;
                                    //  Test third party
                                    if ($("#vodus3PCookie").length == 0) {
                                        $("<div>").attr({
                                            'class': "",
                                            'id': "vodus3PCookie"
                                        }).appendTo("body");
                                    }

                                    $("#vodus3PCookie").html('<iframe id="vodusIframe" width="0" height="0"  src="' + app.vodus3PRootUrl + '/v1/token/serverless?partnerCode=' + app.partner_code + '" frameborder="0" allowfullscreen></iframe>');

                                    $("#vodusIframe").on('load', function () {
                                        var iframe = document.getElementById('vodusIframe');
                                        iframe.contentWindow.postMessage("hello", '*');

                                    });
                                    window.addEventListener("message", vodus3PCookie, false);
                                    var token = vodus.readCookie("Vodus.Token");
                                    function vodus3PCookie(event) {
                                        if (event.origin == app.vodus3PRootUrl) {
                                            if (event.origin.indexOf("goog") > 1) { } else {
                                                window.removeEventListener("message", vodus3PCookie, false);
                                                if (event.data != null && event.data != "") {

                                                    var decoded = $('<div>').html(event.data).text();

                                                    vodus.createCookie(app.cookieName, decoded, 3650);
                                                    vodus.setToken(decoded);
                                                    app.cookieSyncType = "api";
                                                    app.thirdPartyEnabled = true;
                                                    vodus.initCallback();
                                                }
                                                else {
                                                    //  check vodusmy
                                                    $("#vodus3PCookie").html('<iframe id="vodusIframe" width="0" height="0"  src="' + app.reward3PRootUrl + '/token/check?partnerCode=' + app.partner_code + '" frameborder="0" allowfullscreen></iframe>');
                                                    $("#vodusIframe").on('load', function () {
                                                        var iframe = document.getElementById('vodusIframe');
                                                        iframe.contentWindow.postMessage("hello", '*');

                                                    });
                                                    window.addEventListener("message", vodusmy3PCookie, false);

                                                }

                                            }
                                        }
                                    }

                                    function vodusmy3PCookie(event) {
                                        if (event.origin == app.reward3PRootUrl) {
                                            if (event.origin.indexOf("goog") > 1) { } else {
                                                window.removeEventListener("message", vodus3PCookie, false);
                                                if (event.data != null && event.data != "") {
                                                    //console.log("VODUS T2 : " + event.data);
                                                    var decoded = $('<div>').html(event.data).text();
                                                    vodus.createCookie(app.cookieName, decoded, 3650);
                                                    vodus.setToken(decoded);
                                                    app.cookieSyncType = "voupon";
                                                }

                                                app.thirdPartyEnabled = true;
                                                vodus.initCallback();
                                            }
                                        }
                                    }

                                }
                            }
                        }
                    };
                    window.addEventListener("message", vodus3PTesterMessage, false);
                }

            }
            else {
                vodus.initCallback();
            }
        },
        getCCParameter: function getCCParameter(partnercode, env) {
            var requestUrl = "";
            if (env == 'live') {
                requestUrl = 'https://vodus-api-serverless.azurewebsites.net/';
            } else if (env == 'uat') {
                requestUrl = 'https://vodus-api-serverless-uat.azurewebsites.net/';
                //requestUrl = 'https://vodus-api-serverless-uat.azurewebsites.net/';
            } else if (env == 'dev') {
                requestUrl = 'https://vodus-api-dev.azurewebsites.net/';
            } else if (env == 'local') {
                requestUrl = app.ccRequestUrl + '/';
            }
            var hostname = window.location.hostname.replace("www.", "");
            vodus.log("Checking cc parameters...");
            $.ajax({
                type: "POST",
                dataType: 'json',
                async: false,
                cache: false,
                data: JSON.stringify({
                    PartnerCode: partnercode,
                    RefreshCache: false,
                    Hostname: hostname
                }),
                url: requestUrl + 'api/getCCParameter',
                success: function (response) {

                    if (response.successful) {
                        GlobalParameter = response.data;

                        if (GlobalParameter != null) {
                            app.debug = GlobalParameter.IsJSConsoleLogEnabled;
                            app.isFingerprintingEnabled = GlobalParameter.IsFingerprintingEnabled;
                            if (app.debug) {
                                console.log(GlobalParameter);
                            }
                            if (GlobalParameter.IsAdminCCControl) {
                                app.interval = GlobalParameter.Interval;
                                app.delay = GlobalParameter.Delay;
                                app.ctcTimer = GlobalParameter.CTCTimer;
                                app.ctcInterval = GlobalParameter.CTCInterval;
                                app.language = GlobalParameter.Language;
                                app.modalClosable = GlobalParameter.ModalClosable;
                                app.minSessionCount = GlobalParameter.MinSessionCount;
                                app.noDemo = GlobalParameter.NoDemo;
                                app.ccType = GlobalParameter.CCType;
                                app.dailyAllowance = GlobalParameter.DailyAllowance;
                                app.demographicCCType = GlobalParameter.DemographicCCType;
                                app.demographicCTCTimer = GlobalParameter.DemographicCTCTimer;
                                app.demographicInterval = GlobalParameter.DemographicInterval;
                                app.ccPageScrollTrigger = GlobalParameter.CCScrollTrigger;
                                app.catfishPosition = GlobalParameter.CatFishPosition;
                                app.chainQuota = GlobalParameter.ChainQuota;
                                app.bannerMode = GlobalParameter.BannerMode;
                                app.intervalBannerMode = GlobalParameter.IntervalBannerMode;
                                app.stoAfterTotalNoResponse = GlobalParameter.STOAfterTotalNoResponse;
                                app.stoCTCTimer = GlobalParameter.CTCTimer;
                                app.stoCTCInterval = GlobalParameter.CTCInterval;
                                app.stoInterval = GlobalParameter.Interval;
                                app.stoCCType = GlobalParameter.CCType;
                                app.stoDemographicCCType = GlobalParameter.DemographicCCType;
                                app.dmpType = GlobalParameter.DMPType;
                                app.dmpCode = GlobalParameter.DMPCode;
                                app.dmpTargetAudience = GlobalParameter.DMPTargetAudience;
                                app.dmpTargetCode = GlobalParameter.DMPTargetCode;
                                app.chainQuota = GlobalParameter.ChainQuota
                            } else {
                                if (app.interval == null || app.interval == "") {
                                    app.interval = GlobalParameter.Interval;
                                }
                                if (app.delay == null || app.delay == "") {
                                    app.delay = GlobalParameter.Delay;
                                }
                                if (app.ctcTimer == null || app.ctcTimer == "") {
                                    app.ctcTimer = GlobalParameter.CTCTimer;
                                }
                                if (app.ctcInterval == null || app.ctcInterval == "") {
                                    app.ctcInterval = GlobalParameter.CTCInterval;
                                }
                                if (app.language == null || app.language == "") {
                                    app.language = GlobalParameter.Language;
                                }
                                if (app.modalClosable == null) {
                                    app.modalClosable = GlobalParameter.ModalClosable;
                                }
                                if (app.minSessionCount == null || app.minSessionCount == "") {
                                    app.minSessionCount = GlobalParameter.MinSessionCount;
                                }
                                if (app.noDemo == null || app.noDemo == "") {
                                    app.noDemo = GlobalParameter.NoDemo;
                                }
                                if (app.ccType == null || app.ccType == "") {
                                    app.ccType = GlobalParameter.CCType;
                                }
                                if (app.dailyAllowance == null || app.dailyAllowance == "") {
                                    app.dailyAllowance = GlobalParameter.DailyAllowance;
                                }
                                if (app.demographicCCType == null || app.demographicCCType == "") {
                                    app.demographicCCType = GlobalParameter.DemographicCCType;
                                }
                                if (app.demographicCTCTimer == null || app.demographicCTCTimer == "") {
                                    app.demographicCTCTimer = GlobalParameter.DemographicCTCTimer;
                                }
                                if (app.demographicInterval == null || app.demographicInterval == "") {
                                    app.demographicInterval = GlobalParameter.DemographicInterval;
                                }
                                if (app.ccPageScrollTrigger == null || app.ccPageScrollTrigger == "") {
                                    app.ccPageScrollTrigger = GlobalParameter.CCScrollTrigger;
                                }
                                if (app.catfishPosition == null || app.catfishPosition == "") {
                                    app.catfishPosition = GlobalParameter.CatFishPosition;
                                }
                                if (app.bannerMode == null || app.bannerMode == "") {
                                    app.bannerMode = GlobalParameter.BannerMode;
                                }
                                if (app.intervalBannerMode == null || app.intervalBannerMode == "") {
                                    app.intervalBannerMode = GlobalParameter.IntervalBannerMode;
                                }
                                if (app.stoAfterTotalNoResponse == null || app.stoAfterTotalNoResponse == "") {
                                    app.stoAfterTotalNoResponse = GlobalParameter.STOAfterTotalNoResponse;
                                }
                                if (app.stoCTCTimer == null || app.stoCTCTimer == "") {
                                    app.stoCTCTimer = GlobalParameter.CTCTimer;
                                }
                                if (app.stoCTCInterval == null || app.stoCTCInterval == "") {
                                    app.stoCTCInterval = GlobalParameter.CTCInterval;
                                }
                                if (app.stoInterval == null || app.stoInterval == "") {
                                    app.stoInterval = GlobalParameter.Interval;
                                }
                                if (app.stoCCType == null || app.stoCCType == "") {
                                    app.stoCCType = GlobalParameter.CCType;
                                }
                                if (app.stoCCType == null || app.stoCCType == "") {
                                    app.stoDemographicCCType = GlobalParameter.DemographicCCType;
                                }
                                if (app.isUrlSyncEnabled == null) {
                                    app.isUrlSyncEnabled = GlobalParameter.IsUrlSyncEnabled;
                                }
                                if (app.dmpCode == null || app.dmpCode == "") {
                                    app.dmpCode = GlobalParameter.DMPCode;
                                }
                                if (app.dmpType == null || app.dmpType == "") {
                                    app.dmpType = GlobalParameter.DMPType;
                                }
                                if (app.dmpTargetAudience == null || app.dmpTargetAudience == "") {
                                    app.dmpTargetAudience = GlobalParameter.DMPTargetAudience;
                                }
                                if (app.dmpTargetCode == null || app.dmpTargetCode == "") {
                                    app.dmpTargetCode = GlobalParameter.DMPTargetCode;
                                }
                                if (app.chainQuota == null || app.chainQuota == "") {
                                    app.chainQuota = GlobalParameter.ChainQuota;
                                }
                            }
                        }

                        if (global.vodus.partner_code === undefined || global.vodus.partner_code == null) {
                            global.vodus.partner_code = "";
                        }

                        if (global.vodus.interval === undefined || global.vodus.interval == null || global.vodus.interval == "") {
                            global.vodus.interval = 0;
                        }

                        if (global.vodus.delay === undefined || global.vodus.delay == null || global.vodus.delay == "") {
                            global.vodus.delay = 0;
                        }

                        if (global.vodus.questionModalDelay === undefined || global.vodus.questionModalDelay == null || global.vodus.questionModalDelay == "") {
                            global.vodus.questionModalDelay = 1;
                        }

                        if (global.vodus.ctcTimer === undefined || global.vodus.ctcTimer == null || global.vodus.ctcTimer == "") {
                            global.vodus.ctcTimer = 0;
                        }

                        if (global.vodus.ctcInterval === undefined || global.vodus.ctcInterval == null || global.vodus.ctcInterval == "") {
                            global.vodus.ctcInterval = 0;
                        }

                        if (global.vodus.language === undefined || global.vodus.language == null || global.vodus.language == "") {
                            global.vodus.language = "";
                        }

                        if (global.vodus.modalClosable === undefined || global.vodus.modalClosable == null) {
                            global.vodus.modalClosable = true;
                        }


                        if (global.vodus.minSessionCount === undefined || global.vodus.minSessionCount == null || global.vodus.minSessionCount == "") {
                            global.vodus.minSessionCount = 0;
                        }

                        if (global.vodus.noDemo === undefined || global.vodus.noDemo == null || global.vodus.noDemo == "") {
                            global.vodus.noDemo = 0;
                        }

                        if (global.vodus.ccType === undefined || global.vodus.ccType == null || global.vodus.ccType == "") {
                            global.vodus.ccType = 1;
                        }

                        if (global.vodus.dailyAllowance === undefined || global.vodus.dailyAllowance == null || global.vodus.dailyAllowance == "") {
                            global.vodus.dailyAllowance = 0;
                        }

                        if (global.vodus.notificationPosition === undefined || global.vodus.notificationPosition == null) {
                            global.vodus.notificationPosition = 'top-right';
                        }

                        if (global.vodus.demographicCCType === undefined || global.vodus.demographicCCType == null || global.vodus.demographicCCType == "") {
                            global.vodus.demographicCCType = '2';
                        }

                        if (global.vodus.demographicCTCTimer === undefined || global.vodus.demographicCTCTimer == null || global.vodus.demographicCTCTimer == "") {
                            global.vodus.demographicCTCTimer = 0;
                        }

                        if (global.vodus.demographicInterval === undefined || global.vodus.demographicInterval == null || global.vodus.demographicInterval == "") {
                            global.vodus.demographicInterval = 0;
                        }

                        if (global.vodus.env === undefined || global.vodus.env == null) {
                            global.vodus.env = "uat";
                        }

                        if (global.vodus.ccPageScrollTrigger === undefined || global.vodus.ccPageScrollTrigger == null || global.vodus.ccPageScrollTrigger == "") {
                            global.vodus.ccPageScrollTrigger = 10;
                        }

                        if (global.vodus.catfishPosition === undefined || global.vodus.catfishPosition == null || global.vodus.catfishPosition == "") {
                            global.vodus.catfishPosition = 'bottom-right';
                        }

                        if (global.vodus.chainQuota === undefined || global.vodus.chainQuota == null || global.vodus.chainQuota == "") {
                            global.vodus.chainQuota = 0;
                        }

                        if (global.vodus.bannerMode === undefined || global.vodus.bannerMode == null || global.vodus.bannerMode == "") {
                            global.vodus.bannerMode = 0;
                        }

                        if (global.vodus.intervalBannerMode === undefined || global.vodus.intervalBannerMode == null || global.vodus.intervalBannerMode == "") {
                            global.vodus.intervalBannerMode = 0
                        }
                        if (global.vodus.isSurveyFallbackScript === undefined || global.vodus.isSurveyFallbackScript == null || global.vodus.isSurveyFallbackScript == "") {
                            global.vodus.isSurveyFallbackScript = "0"
                        }
                        if (global.vodus.GAMAdUnitId === undefined || global.vodus.GAMAdUnitId == null || global.vodus.GAMAdUnitId == "") {
                            global.vodus.GAMAdUnitId = ""
                        }

                        if (global.vodus.stoAfterTotalNoResponse === undefined || global.vodus.stoAfterTotalNoResponse == null || global.vodus.stoAfterTotalNoResponse == "") {
                            global.vodus.stoAfterTotalNoResponse = 999
                        }

                        if (global.vodus.chainQuota === undefined || global.vodus.chainQuota == null || global.vodus.chainQuota == "") {
                            global.vodus.chainQuota = 1
                        }

                        vodus.setAppData(app);
                        var parameters = {
                            Interval: app.interval, Delay: app.delay, CTCTimer: app.ctcTimer, CTCInterval: app.ctcInterval, Language: app.language, ModalClosable: app.modalClosable,
                            MinSessionCount: app.minSessionCount, NoDemo: app.noDemo, CCType: app.ccType, DailyAllowance: app.dailyAllowance, DemographicCCType: app.demographicCCType, DemographicCTCTimer: app.demographicCTCTimer,
                            DemographicInterval: app.demographicInterval, CCScrollTrigger: app.ccPageScrollTrigger, CatFishPosition: app.catfishPosition, ChainQuota: app.chainQuota, BannerMode: app.bannerMode, IntervalBannerMode: app.intervalBannerMode,
                            STOAfterTotalNoResponse: app.stoAfterTotalNoResponse, DMPType: app.dmpType, DMPCode: app.dmpCode, DMPTargetAudience: app.dmpTargetAudience, DMPTargetCode: app.dmpTargetCode, IsAdminCCControl: GlobalParameter.IsAdminCCControl, IsJSConsoleLogEnabled: GlobalParameter.IsJSConsoleLogEnabled
                        }

                        vodus.log(parameters);
                        vodus.createCookie("vodus_cc_parameter_last_sync", new Date(), 365);
                        vodus.createCookie("vodus_cc_parameter", JSON.stringify(parameters), 365);

                        vodus.log("Done checking cc parameters...");

                        if (app.initCallbackFunctionName != null) {
                            if (typeof window[app.initCallbackFunctionName] === 'function') {
                                vodus.log("Executing init callback -> " + app.initCallbackFunctionName);
                                window[app.initCallbackFunctionName].apply(this);
                            } else {

                                vodus.log("Invalid init callback -> " + app.initCallbackFunctionName);
                            }
                        } else {
                            vodus.log("No init callback", app.logStatus.warning);
                        }
                        return true;

                    } else {
                        return;
                    }
                },
                error: function (err) {
                    vodus.log(err, app.logStatus.error)
                }
            });
        },
        isAlive: function isAlive() {
            $.ajax({
                type: "GET",
                dataType: 'json',
                url: app.serverlessUrl + '/api/monitoring/isAlive',
                success: function (response) {
                    if (response.successful) {
                        vodus.log("Vodus is alive!");
                        if (typeof callback === "function") {
                            callback(false, "success");
                        }
                    }
                },
                error: function (xhr, status, error) {
                    if (typeof callback === "function") {
                        callback(true, error);
                    }
                }
            });
            return true;
        },
        update3PToken: function update3PToken() {

            const sleep = (milliseconds) => {
                return new Promise(resolve => setTimeout(resolve, milliseconds))
            }

            if (vodus.getToken().length == 0) {
                vodus.log('Token is empty...', app.logStatus.error);
                return;
            }
            if (app.thirdPartyEnabled) {
                if ($("#vodus_3PTest").length == 0) {
                    $("<div>").attr({
                        'class': "",
                        'id': "vodus_3PTest"
                    }).appendTo("body");
                }
                var encodedToken = vodus.readCookie(app.cookieName).trim();
                $("#resyncApiVodus3PTestContainer").html('<iframe id="resyncApiVodus3PTest" width="0" height="0"  src="' + app.rootUrl + '/v1/token/sync?token=' + encodedToken + '" frameborder="0" allowfullscreen></iframe>');
                $("#vodus_3PTest").html('<iframe id="vodus3PTest" width="0" height="0"  src="' + app.vodus3PRootUrl + '/v1/token/create?partnerCode=' + app.partner_code + '&token=' + encodedToken + '" frameborder="0" allowfullscreen></iframe>');
                $("#vodus3PTest").on('load', function () {
                    vodus.log('Update 3P: Updated token');

                });
                sleep(5000).then(() => {
                    //do stuff
                    location.reload();
                });

            } else {
                vodus.log('Update 3P: Skip, third party no enabled', vodus.log.warning);
                location.reload();
            }
            return true;
        },
        logout: function logout() {
            if (vodus.getToken().length == 0) {
                //return;
            }

            if (app.thirdPartyEnabled) {
                vodus.deleteCookie(app.cookieName);
                app.skip3PCheck = true;
                if ($("#vodus_3PTest").length == 0) {
                    $("<div>").attr({
                        'class': "",
                        'id': "vodus_3PTest"
                    }).appendTo("body");
                }
                if ($("#reward_3PTest").length == 0) {
                    $("<div>").attr({
                        'class': "",
                        'id': "reward_3PTest"
                    }).appendTo("body");
                }

                vodus.log("logout: loggging out...");
                if (app.thirdPartyEnabled) {
                    $("#vodus_3PTest").html('<iframe id="vodus3PTest" width="0" height="0"  src="' + app.vodus3PRootUrl + '/v1/token/delete?partnerCode=' + app.partner_code + '" frameborder="0" allowfullscreen></iframe>');
                    //  Remove token from rewards
                    $("#reward_3PTest").html('<iframe id="reward3PTest" width="0" height="0"  src="' + app.reward3PRootUrl + '/token/delete-temporary-points?partnerCode=' + app.partner_code + '" frameborder="0" allowfullscreen></iframe>');
                }
            } else {
                vodus.log('Logout 3P: Skip, third party no enabled');
            }
            return true;
        },
        initCallback: function initCallback() {

            var ccParameterCookieLastSync = vodus.readCookie("vodus_cc_parameter_last_sync");

            var checkCCParameter = false;
            if (ccParameterCookieLastSync == null || ccParameterCookieLastSync == "") {
                checkCCParameter = true;
            }
            else {
                var currentDate = new Date();
                if (Math.floor(((currentDate - new Date(ccParameterCookieLastSync)) / 1000) / 60) > 5) {
                    checkCCParameter = true;
                }
            }

            var ccParameterCookie = vodus.readCookie("vodus_cc_parameter");
            if (ccParameterCookie == null || ccParameterCookie == undefined || ccParameterCookie == "undefined") {
                checkCCParameter = true;
            }

            if (checkCCParameter) {
                var c = "";
                if (app.partner_code != null && app.partner_code != "") {
                    c = app.partner_code.replace(/[^\x00-\x7F]/g, "");
                }
                vodus.getCCParameter(c, app.env);
            }
            else {

                if (ccParameterCookie != null && ccParameterCookie != "") {
                    GlobalParameter = JSON.parse(ccParameterCookie);
                    if (GlobalParameter.IsAdminCCControl) {
                        app.interval = GlobalParameter.Interval;
                        app.delay = GlobalParameter.Delay;
                        app.ctcTimer = GlobalParameter.CTCTimer;
                        app.ctcInterval = GlobalParameter.CTCInterval;
                        app.language = GlobalParameter.Language;
                        app.modalClosable = GlobalParameter.ModalClosable;
                        app.minSessionCount = GlobalParameter.MinSessionCount;
                        app.noDemo = GlobalParameter.NoDemo;
                        app.ccType = GlobalParameter.CCType;
                        app.dailyAllowance = GlobalParameter.DailyAllowance;
                        app.demographicCCType = GlobalParameter.DemographicCCType;
                        app.demographicCTCTimer = GlobalParameter.DemographicCTCTimer;
                        app.demographicInterval = GlobalParameter.DemographicInterval;
                        app.ccPageScrollTrigger = GlobalParameter.CCScrollTrigger;
                        app.catfishPosition = GlobalParameter.CatFishPosition;
                        app.chainQuota = GlobalParameter.ChainQuota;
                        app.bannerMode = GlobalParameter.BannerMode;
                        app.intervalBannerMode = GlobalParameter.IntervalBannerMode;
                        app.stoAfterTotalNoResponse = GlobalParameter.STOAfterTotalNoResponse;
                        app.stoCTCTimer = GlobalParameter.CTCTimer;
                        app.stoCTCInterval = GlobalParameter.CTCInterval;
                        app.stoInterval = GlobalParameter.Interval;
                        app.stoCCType = GlobalParameter.CCType;
                        app.stoDemographicCCType = GlobalParameter.DemographicCCType;
                        app.dmpType = GlobalParameter.DMPType;
                        app.dmpCode = GlobalParameter.DMPCode;
                        app.dmpTargetAudience = GlobalParameter.DMPTargetAudience;
                        app.dmpTargetCode = GlobalParameter.DMPTargetCode;
                        app.chainQuota = GlobalParameter.ChainQuota;
                        app.debug = GlobalParameter.IsJSConsoleLogEnabled;
                    } else {
                        if (app.interval == null || app.interval == "") {
                            app.interval = GlobalParameter.Interval;
                        }
                        if (app.delay == null || app.delay == "") {
                            app.delay = GlobalParameter.Delay;
                        }
                        if (app.ctcTimer == null || app.ctcTimer == "") {
                            app.ctcTimer = GlobalParameter.CTCTimer;
                        }
                        if (app.ctcInterval == null || app.ctcInterval == "") {
                            app.ctcInterval = GlobalParameter.CTCInterval;
                        }
                        if (app.language == null || app.language == "") {
                            app.language = GlobalParameter.Language;
                        }
                        if (app.modalClosable == null) {
                            app.modalClosable = GlobalParameter.ModalClosable;
                        }
                        if (app.minSessionCount == null || app.minSessionCount == "") {
                            app.minSessionCount = GlobalParameter.MinSessionCount;
                        }
                        if (app.noDemo == null || app.noDemo == "") {
                            app.noDemo = GlobalParameter.NoDemo;
                        }
                        if (app.ccType == null || app.ccType == "") {
                            app.ccType = GlobalParameter.CCType;
                        }
                        if (app.dailyAllowance == null || app.dailyAllowance == "") {
                            app.dailyAllowance = GlobalParameter.DailyAllowance;
                        }
                        if (app.demographicCCType == null || app.demographicCCType == "") {
                            app.demographicCCType = GlobalParameter.DemographicCCType;
                        }
                        if (app.demographicCTCTimer == null || app.demographicCTCTimer == "") {
                            app.demographicCTCTimer = GlobalParameter.DemographicCTCTimer;
                        }
                        if (app.demographicInterval == null || app.demographicInterval == "") {
                            app.demographicInterval = GlobalParameter.DemographicInterval;
                        }
                        if (app.ccPageScrollTrigger == null || app.ccPageScrollTrigger == "") {
                            app.ccPageScrollTrigger = GlobalParameter.CCScrollTrigger;
                        }
                        if (app.catfishPosition == null || app.catfishPosition == "") {
                            app.catfishPosition = GlobalParameter.CatFishPosition;
                        }
                        if (app.bannerMode == null || app.bannerMode == "") {
                            app.bannerMode = GlobalParameter.BannerMode;
                        }
                        if (app.intervalBannerMode == null || app.intervalBannerMode == "") {
                            app.intervalBannerMode = GlobalParameter.IntervalBannerMode;
                        }
                        if (app.stoAfterTotalNoResponse == null || app.stoAfterTotalNoResponse == "") {
                            app.stoAfterTotalNoResponse = GlobalParameter.STOAfterTotalNoResponse;
                        }
                        if (app.stoCTCTimer == null || app.stoCTCTimer == "") {
                            app.stoCTCTimer = GlobalParameter.CTCTimer;
                        }
                        if (app.stoCTCInterval == null || app.stoCTCInterval == "") {
                            app.stoCTCInterval = GlobalParameter.CTCInterval;
                        }
                        if (app.stoInterval == null || app.stoInterval == "") {
                            app.stoInterval = GlobalParameter.Interval;
                        }
                        if (app.stoCCType == null || app.stoCCType == "") {
                            app.stoCCType = GlobalParameter.CCType;
                        }
                        if (app.stoCCType == null || app.stoCCType == "") {
                            app.stoDemographicCCType = GlobalParameter.DemographicCCType;
                        }
                        if (app.isUrlSyncEnabled == null) {
                            app.isUrlSyncEnabled = GlobalParameter.IsUrlSyncEnabled;
                        }
                        if (app.dmpCode == null || app.dmpCode == "") {
                            app.dmpCode = GlobalParameter.DMPCode;
                        }
                        if (app.dmpType == null || app.dmpType == "") {
                            app.dmpType = GlobalParameter.DMPType;
                        }
                        if (app.dmpTargetAudience == null || app.dmpTargetAudience == "") {
                            app.dmpTargetAudience = GlobalParameter.DMPTargetAudience;
                        }
                        if (app.dmpTargetCode == null || app.dmpTargetCode == "") {
                            app.dmpTargetCode = GlobalParameter.DMPTargetCode;
                        }
                        if (app.chainQuota == null || app.chainQuota == "") {
                            app.chainQuota = GlobalParameter.ChainQuota;
                        }
                    }
                }

                if (global.vodus.partner_code === undefined || global.vodus.partner_code == null) {
                    global.vodus.partner_code = "";
                }

                if (global.vodus.interval === undefined || global.vodus.interval == null || global.vodus.interval == "") {
                    global.vodus.interval = 0;
                }

                if (global.vodus.delay === undefined || global.vodus.delay == null || global.vodus.delay == "") {
                    global.vodus.delay = 0;
                }

                if (global.vodus.questionModalDelay === undefined || global.vodus.questionModalDelay == null || global.vodus.questionModalDelay == "") {
                    global.vodus.questionModalDelay = 1;
                }

                if (global.vodus.ctcTimer === undefined || global.vodus.ctcTimer == null || global.vodus.ctcTimer == "") {
                    global.vodus.ctcTimer = 0;
                }

                if (global.vodus.ctcInterval === undefined || global.vodus.ctcInterval == null || global.vodus.ctcInterval == "") {
                    global.vodus.ctcInterval = 0;
                }

                if (global.vodus.language === undefined || global.vodus.language == null || global.vodus.language == "") {
                    global.vodus.language = "";
                }

                if (global.vodus.modalClosable === undefined || global.vodus.modalClosable == null) {
                    global.vodus.modalClosable = true;
                }


                if (global.vodus.minSessionCount === undefined || global.vodus.minSessionCount == null || global.vodus.minSessionCount == "") {
                    global.vodus.minSessionCount = 0;
                }

                if (global.vodus.noDemo === undefined || global.vodus.noDemo == null || global.vodus.noDemo == "") {
                    global.vodus.noDemo = 0;
                }

                if (global.vodus.ccType === undefined || global.vodus.ccType == null || global.vodus.ccType == "") {
                    global.vodus.ccType = 1;
                }

                if (global.vodus.dailyAllowance === undefined || global.vodus.dailyAllowance == null || global.vodus.dailyAllowance == "") {
                    global.vodus.dailyAllowance = 0;
                }

                if (global.vodus.notificationPosition === undefined || global.vodus.notificationPosition == null) {
                    global.vodus.notificationPosition = 'top-right';
                }

                if (global.vodus.demographicCCType === undefined || global.vodus.demographicCCType == null || global.vodus.demographicCCType == "") {
                    global.vodus.demographicCCType = '2';
                }

                if (global.vodus.demographicCTCTimer === undefined || global.vodus.demographicCTCTimer == null || global.vodus.demographicCTCTimer == "") {
                    global.vodus.demographicCTCTimer = 0;
                }

                if (global.vodus.demographicInterval === undefined || global.vodus.demographicInterval == null || global.vodus.demographicInterval == "") {
                    global.vodus.demographicInterval = 0;
                }

                if (global.vodus.env === undefined || global.vodus.env == null) {
                    global.vodus.env = "uat";
                }

                if (global.vodus.ccPageScrollTrigger === undefined || global.vodus.ccPageScrollTrigger == null || global.vodus.ccPageScrollTrigger == "") {
                    global.vodus.ccPageScrollTrigger = 10;
                }

                if (global.vodus.catfishPosition === undefined || global.vodus.catfishPosition == null || global.vodus.catfishPosition == "") {
                    global.vodus.catfishPosition = 'bottom-right';
                }

                if (global.vodus.chainQuota === undefined || global.vodus.chainQuota == null || global.vodus.chainQuota == "") {
                    global.vodus.chainQuota = 0;
                }

                if (global.vodus.bannerMode === undefined || global.vodus.bannerMode == null || global.vodus.bannerMode == "") {
                    global.vodus.bannerMode = 0;
                }

                if (global.vodus.intervalBannerMode === undefined || global.vodus.intervalBannerMode == null || global.vodus.intervalBannerMode == "") {
                    global.vodus.intervalBannerMode = 0
                }
                if (global.vodus.isSurveyFallbackScript === undefined || global.vodus.isSurveyFallbackScript == null || global.vodus.isSurveyFallbackScript == "") {
                    global.vodus.isSurveyFallbackScript = "0"
                }
                if (global.vodus.GAMAdUnitId === undefined || global.vodus.GAMAdUnitId == null || global.vodus.GAMAdUnitId == "") {
                    global.vodus.GAMAdUnitId = ""
                }

                if (global.vodus.stoAfterTotalNoResponse === undefined || global.vodus.stoAfterTotalNoResponse == null || global.vodus.stoAfterTotalNoResponse == "") {
                    global.vodus.stoAfterTotalNoResponse = 999
                }
                if (global.vodus.chainQuota === undefined || global.vodus.chainQuota == null || global.vodus.chainQuota == "") {
                    global.vodus.chainQuota = 1
                }
                vodus.setAppData(app);

                vodus.log("Done checking cc parameters...");

                if (app.initCallbackFunctionName != null) {
                    if (typeof window[app.initCallbackFunctionName] === 'function') {
                        vodus.log("Executing init callback -> " + app.initCallbackFunctionName);
                        window[app.initCallbackFunctionName].apply(this);
                    } else {

                        vodus.log("Invalid init callback -> " + app.initCallbackFunctionName);
                    }
                } else {
                    vodus.log("No init callback", app.logStatus.warning);
                }
                return true;
            }


        },
        createAccount: function createAccount() {
            toastr.clear();
            var token = vodus.readCookie(app.cookieName);
            var email = $("#vodusSignupEmail").val();
            var password = $("#vodusSignupPassword").val();

            if (email.length == 0 || password.length == 0) {
                if (app.language == "ms") {
                    toastr.error("E-mel dan kata laluan diperlukan");
                } else if (app.language == "zh") {
                    toastr.error("需要输入电子邮件和密码");
                } else {
                    toastr.error("Email and password are required");
                }
                return;
            }
            vodus.setEmail(email);

            var deviceId = "";
            if (app.isFingerprintingEnabled) {
                deviceId = vodus.readCookie("vodus_device_id");
            }

            var data = {
                partnerCode: app.partner_code,
                email: email,
                password: password,
                loginProvider: "Email",
                token: token,
                deviceId: deviceId
            }

            $("#vodusSignupLoader").show();
            $.ajax({
                type: "POST",
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data),
                url: app.rootUrl + 'v1/authentication/CreateAccount',
                success: function (response) {
                    if (response.successful) {
                        closeAllVodusModal();
                        $("#vodusSignupLoader").hide();
                        if (app.language == "ms") {
                            toastr.success('', '<h4>Akaun Vodus anda telah berjaya didaftarkan.<h4>');
                        } else if (app.language == "zh") {
                            toastr.success('', '<h4>您的Vodus帐户已成功注册。</h4>');
                        } else {
                            toastr.success('', '<h4>Your Vodus account is successfully registered.</h4>');
                        }
                        $("#toast-container").addClass("vodus-responded-toast");
                        vodus.getQuestion();


                    } else {
                        $("#vodusSignupLoader").hide();
                        toastr.options = {
                            allowHtml: true
                        }
                        toastr.error(response.message);
                    }
                },
                error: function (err) {
                    vodus.log(err, app.logStatus.error);
                }
            });
        },
        isLocalStorageAvailable: function isLocalStorageAvailable() {
            var test = 'test';
            try {
                localStorage.setItem(test, test);
                localStorage.removeItem(test);
                vodus.log('Localstorage available');
                app.usesLocalStorage = true;
                return true;
            } catch (e) {
                vodus.log("Localstorage not supported", app.logStatus.warning)
                return false;
            }
        },
        getQuestionBeforeInternal: function getQuestionBeforeInternal() {

            //   Recreate cookie
            var existingToken = vodus.readCookie('Vodus.Token');
            if (existingToken !== null && existingToken !== "") {
                vodus.createCookie(app.cookieName, existingToken, 3650);
            }

            if (app.isFingerprintingEnabled) {
                vodus.getQuestionInternal();
                return true;
            } else {
                if (app.bannerMode == 1) {
                    if ($(".vodus-banner").length > 0) {
                        if (app.ccType == 1) {
                            app.ccType = "3";
                        }
                        app.ctcTimer = 0;
                        app.interval = 0;
                        app.ctcInterval = 0;
                        app.isBannerMode = true;

                        DetectingMobile();
                        app.ccPageScrollTrigger = 20;
                        $(".vodus-banner").css("width", "").css("height", "");
                    } else {
                        vodus.log('Banner Mode: Vodus Banner div is not found.');
                        app.IsFailBannerMode = true;
                        return false;
                    }
                } else if (app.intervalBannerMode == 1) {
                    if ($(".vodus-banner").length > 0) {
                        if (app.ccType == 1) {
                            app.ccType = "3";
                        }
                        app.ctcTimer = 0;
                        app.interval = 0;
                        app.ctcInterval = 0;
                        app.isBannerMode = true;

                        DetectingMobile();
                        app.ccPageScrollTrigger = 20;
                        $(".vodus-banner").css("width", "").css("height", "");
                    } else {
                        vodus.log('Banner Mode: Vodus Banner div is not found.');
                        app.IsFailBannerMode = true;
                        return false;
                    }
                }

                var localMemberProfile = localStorage.getItem('memberProfile');
                var localMemberProfileObject = null;
                var d = new Date();
                if (localMemberProfile == null) {

                    var memberProfile = {
                        version: 5,
                        token: token,
                        ctcLastUpdatedAt: null,
                        submitResponseLastUpdatedAt: null,
                        thirdPartyEnabled: app.thirdPartyEnabled,
                        lastSyncAt: "",
                        globalCC: {
                            status: "",
                            lastUpdatedAt: ""
                        },
                        pageLoad: {
                            date: d,
                            localCount: 0,
                            serverCount: 0
                        },
                        session: {
                            localCount: 0,
                            serverCount: 0,
                            lastUpdatedAt: null
                        }
                    }

                    localMemberProfileObject = memberProfile;
                    localStorage.setItem('memberProfile', JSON.stringify(localMemberProfileObject));
                    vodus.log('Creating new localstorage data');
                    vodus.localStorageCheck(localMemberProfileObject);
                } else {
                    localMemberProfileObject = JSON.parse(localMemberProfile);
                    if (localMemberProfileObject.version != app.localStorageVersion) {
                        localStorage.clear();
                        vodus.log('Resetting localstorage, newer version available');
                        return false;
                    }
                    var currentDate = new Date();
                    if (Math.floor(((currentDate - new Date(localMemberProfileObject.lastSyncAt)) / 1000) / 60) > app.localSyncInterval) {
                        vodus.log('Localstorage: Sync interval reached. Try to sync local data');
                        //return false;
                        vodus.ccDataSync(localMemberProfileObject, app.syncType.intervalSync);
                    } else {
                        vodus.log('Localstorage: Sync interval not reached. Skip interval sync > ' + (app.localSyncInterval - Math.floor(((currentDate - new Date(localMemberProfileObject.lastSyncAt)) / 1000) / 60)).toFixed(2));
                        //console.log('88')
                        vodus.localStorageCheck(localMemberProfileObject);
                    }

                }
            }
        },
        getParameterByName: function getParameterByName(name, url = window.location.href) {
            name = name.replace(/[\[\]]/g, '\\$&');
            var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
        },
        getQuestion: function getQuestion() {
            //  skip resync if request is from mobile and has a cctoken
            var ccToken = vodus.getParameterByName("cctoken");
            if (ccToken == null || ccToken == "") {
                resyncToken(app.env);
            }
            else {
                vodus.getCC();
            }
        },
        toUTC: function utcDate(date) {
            if (date == null) {
                date = new Date();
            } else {
                date = new Date(date);
            }
            return new Date(date.setMinutes(date.getMinutes() + date.getTimezoneOffset()));
        },
        localStorageCheck: function localStorageCheck(localMemberProfileObject) {
            // first load, sync with server to get existing data
            if (localMemberProfileObject.lastSyncAt == null || localMemberProfileObject.lastSyncAt == "") {
                vodus.log('Localstorage: First setup sync...');
                vodus.ccDataSync(localMemberProfileObject, app.syncType.intervalSync);
                return false;
            } else {
                if (app.dailyAllowance == null || app.dailyAllowance == "") {
                    app.dailyAllowance = 0;
                }
                var currentDate = new Date();


                var sessionLastUpdated = new Date();
                if (localMemberProfileObject.session.lastUpdatedAt != null) {
                    sessionLastUpdated = new Date(localMemberProfileObject.session.lastUpdatedAt);
                }
                else {
                    localMemberProfileObject.session.lastUpdatedAt = new Date();
                    localStorage.setItem('memberProfile', JSON.stringify(localMemberProfileObject));
                }

                if (Math.floor(((currentDate - sessionLastUpdated) / 1000) / 60) >= app.interval) {
                    //pass session
                } else {
                    vodus.log('Localstorage: Interval not met > ' + ((app.interval * 60) - (currentDate - sessionLastUpdated) / 1000).toFixed(2));
                    return;
                }

                var lastSyncAt = new Date(localMemberProfileObject.session.lastSyncAt);

                //1. Update pageload
                localMemberProfileObject.pageLoad.localCount = localMemberProfileObject.pageLoad.localCount + 1;
                localStorage.setItem('memberProfile', JSON.stringify(localMemberProfileObject));
                vodus.log('Localstorage: Local page load +1 , Total: ' + (localMemberProfileObject.pageLoad.localCount + localMemberProfileObject.pageLoad.serverCount));

                //2.  Check pageload
                var totalPageLoad = (localMemberProfileObject.pageLoad.localCount + localMemberProfileObject.pageLoad.serverCount);
                if (totalPageLoad > app.dailyAllowance) {

                } else {
                    vodus.log('Localstorage: Yay. Page load count not reached. ' + totalPageLoad + '/' + app.dailyAllowance);
                    return false;
                }

                //3. Interval check
                var totalSession = (localMemberProfileObject.session.localCount + localMemberProfileObject.session.serverCount);
                if (localMemberProfileObject.ctcLastUpdatedAt != null || localMemberProfileObject.submitResponseLastUpdatedAt != null || (totalSession > app.minSessionCount)) {
                    let submitResponseLastUpdatedAt = new Date(localMemberProfileObject.submitResponseLastUpdatedAt);
                    let ctcLastUpdatedAt = new Date(localMemberProfileObject.ctcLastUpdatedAt);

                    // BannerMode Check

                    if (app.bannerMode == 1) {
                        BannerModeFunction();
                    } else if (app.intervalBannerMode == 1) {
                        if (!(Math.floor(((currentDate - submitResponseLastUpdatedAt) / 1000) / 60) >= app.interval) || !(Math.floor(((currentDate - ctcLastUpdatedAt) / 1000) / 60) >= app.ctcInterval)) {
                            BannerModeFunction();
                        }
                    }

                    function BannerModeFunction() {
                        if ($(".vodus-banner").length > 0) {
                            if (app.ccType == 1) {
                                app.ccType = "3";
                            }
                            app.ctcTimer = 0;
                            app.interval = 0;
                            app.ctcInterval = 0;
                            app.isBannerMode = true;

                            DetectingMobile();
                            app.ccPageScrollTrigger = 20;
                            $(".vodus-banner").css("width", "").css("height", "");
                        } else {
                            vodus.log('Banner Mode: Vodus Banner div is not found.');
                            app.IsFailBannerMode = true;
                            return false;
                        }
                    }

                    if (localMemberProfileObject.ctcLastUpdatedAt == null && localMemberProfileObject.submitResponseLastUpdatedAt == null) {

                        vodus.ccDataSync(localMemberProfileObject, app.syncType.ccSync);
                        return false;
                    } else {
                        if (localMemberProfileObject.submitResponseLastUpdatedAt != null && submitResponseLastUpdatedAt > ctcLastUpdatedAt) {

                            if (Math.floor(((currentDate - submitResponseLastUpdatedAt) / 1000) / 60) >= app.interval) {
                                vodus.log('Localstorage: Response interval passed. Sync with server');
                                vodus.ccDataSync(localMemberProfileObject, app.syncType.ccSync);
                                return false;
                            } else {
                                vodus.log('Localstorage: Response interval not met > ' + ((app.interval * 60) - (currentDate - submitResponseLastUpdatedAt) / 1000).toFixed(2));
                                if (Math.floor(((currentDate - sessionLastUpdated) / 1000) / 60) >= app.interval) {
                                    vodus.log('Localstorage: Session Sync');
                                    vodus.ccDataSync(localMemberProfileObject, app.syncType.sessionSync);
                                    return false;
                                } else {
                                    vodus.log('Localstorage: Session interval not met. No data sync > ' + ((app.interval * 60) - (currentDate - sessionLastUpdated) / 1000).toFixed(2));
                                }
                            }
                        } else {
                            if (Math.floor(((currentDate - ctcLastUpdatedAt) / 1000) / 60) >= app.ctcInterval) {
                                vodus.log('Localstorage: CTC interval passed. Sync with server');
                                vodus.ccDataSync(localMemberProfileObject, app.syncType.ccSync);
                                return false;
                            } else {
                                vodus.log('Localstorage: CTC interval not met > ' + ((app.ctcInterval * 60) - (currentDate - ctcLastUpdatedAt) / 1000).toFixed(2));
                                if (Math.floor(((currentDate - sessionLastUpdated) / 1000) / 60) >= app.interval) {
                                    vodus.log('Localstorage: Session Sync');
                                    vodus.ccDataSync(localMemberProfileObject, app.syncType.sessionSync);
                                    return false;
                                } else {
                                    vodus.log('Localstorage: Session interval not met. No data sync > ' + ((app.interval * 60) - (currentDate - sessionLastUpdated) / 1000).toFixed(2));
                                }
                            }
                        }
                    }

                } else {

                    if (app.bannerMode == 1) {
                        BannerModeFunction();
                    } else if (app.intervalBannerMode == 1) {
                        if (!(Math.floor(((currentDate - submitResponseLastUpdatedAt) / 1000) / 60) >= app.interval) || !(Math.floor(((currentDate - ctcLastUpdatedAt) / 1000) / 60) >= app.ctcInterval)) {
                            BannerModeFunction();
                        }
                    }

                    function BannerModeFunction() {
                        if ($(".vodus-banner").length > 0) {
                            if (app.ccType == 1) {
                                app.ccType = "3";
                            }
                            app.ctcTimer = 0;
                            app.interval = 0;
                            app.ctcInterval = 0;
                            app.isBannerMode = true;

                            DetectingMobile();
                            app.ccPageScrollTrigger = 20;
                            $(".vodus-banner").css("width", "").css("height", "");
                        } else {
                            vodus.log('Banner Mode: Vodus Banner div is not found.');
                            app.IsFailBannerMode = true;
                            return false;
                        }
                    }

                    if (Math.floor(((currentDate - sessionLastUpdated) / 1000) / 60) >= app.interval) {
                        vodus.ccDataSync(localMemberProfileObject, app.syncType.sessionSync);
                        return false;
                    } else {
                        vodus.log('Localstorage: Interval not met > ' + ((app.interval * 60) - (currentDate - sessionLastUpdated) / 1000).toFixed(2));
                    }
                }
            }
        },
        ccDataSync: function ccDataSync(localMemberProfileObject, syncType) {
            var token = vodus.readCookie(app.cookieName);

            var syncModel = {
                partnerCode: app.partner_code,
                token: token,
                interval: app.interval,
                localStorageSync: {
                    pageLoad: {
                        date: null,
                        localCount: null,
                        serverCount: null
                    },
                    session: {
                        date: null,
                        localCount: null,
                        serverCount: null,
                    }
                }
            };
            syncModel.localStorageSync.session.localCount = localMemberProfileObject.session.localCount;
            syncModel.localStorageSync.pageLoad.localCount = localMemberProfileObject.pageLoad.localCount;

            var fingerprint = "";
            var fingerPrintComponentJson = "";
            if (app.fingerprint != null) {
                syncModel.fingerprint = app.fingerprint.visitorId;
                syncModel.fingerPrintComponentsJson = JSON.stringify(app.fingerprint.components);
            }

            if (app.deviceId != null) {
                syncModel.deviceId = app.deviceId;
            }

            var totalSession = (localMemberProfileObject.session.localCount + localMemberProfileObject.session.serverCount);
            localMemberProfileObject.session.localCount = totalSession;
            localStorage.setItem('memberProfile', JSON.stringify(localMemberProfileObject));
            if (totalSession >= app.minSessionCount) {
                vodus.getQuestionInternal();
            } else {
                var sessionLastUpdated = new Date();
                var currentDate = new Date();
                if (localMemberProfileObject.session.lastUpdatedAt != null) {
                    sessionLastUpdated = new Date(localMemberProfileObject.session.lastUpdatedAt);
                }
                else {
                    localMemberProfileObject.session.lastUpdatedAt = new Date();
                    localStorage.setItem('memberProfile', JSON.stringify(localMemberProfileObject));
                }

                if (Math.floor(((currentDate - sessionLastUpdated) / 1000) / 60) >= app.interval) {
                    localMemberProfileObject.session.localCount = localMemberProfileObject.session.localCount + 1;
                    localMemberProfileObject.session.lastUpdatedAt = new Date();
                    localStorage.setItem('memberProfile', JSON.stringify(localMemberProfileObject));
                    if (totalSession + 1 >= app.minSessionCount) {
                        vodus.getQuestionInternal();
                    }
                } else {
                    vodus.log(totalSession + " / " + app.minSessionCount);
                    vodus.log('Localstorage: Interval not met > ' + ((app.interval * 60) - (currentDate - sessionLastUpdated) / 1000).toFixed(2));
                    return;
                }
            }




        },
        checkSurveyQuestionStatus: function checkQuestionStatus() {
            vodus.log("checkSurveyQuestionStatus -> Checking question status...");
            var checkCounter = 2000;
            var millis = Date.now() - app.LoadedAt;
            var since = Math.floor(millis / 1000);
            if (since < 60) {
                checkCounter = 30;
            } else if (since > 59 && since < 600) {
                checkCounter = 300;
            } else if (since > 599) {
                checkCounter = 2000;
            }
            var checkCountdownCounter = checkCounter;
            app.checkCounterTimer = setInterval(function () {
                checkCountdownCounter--;
                if (checkCountdownCounter === 0) {
                    clearInterval(app.checkCounterTimer);
                    var token = vodus.readCookie(app.cookieName);
                    token = decodeURIComponent(token);
                    var modal = "";
                    $.ajax({
                        type: "POST",
                        dataType: 'json',
                        data: JSON.stringify({
                            token: token,
                            surveyQuestionId: app.surveyQuestionId,
                            demographicType: app.demographicSurveyType
                        }),
                        url: app.serverlessUrl + '/api/CheckSurveyStatus',
                        success: function (response) {
                            if (response.successful) {
                                if (response.data) {
                                    vodus.log("Status check ended");
                                    closeAllVodusModal();
                                } else {
                                    vodus.checkSurveyQuestionStatus();
                                }
                            }
                        }
                    });
                }
            }, 1000);
        },
        getQuestionInternal: function getQuestionInternal() {
            vodus.setRedirectUrl("");
            //app.dmpCode = 'cc075833-8412-42a7-bfce-0157b6fcf7d7';
            //app.dmpType = "1";
            //app.dmpTarget = '617060';
            var app = vodus.getAppData();
            if (app != null) {
                vodus.log("GetQuestionInternal -> Checking available questions...");

                if (app.dmpType == "1") {
                    //  This is for testing purpose
                    if (typeof lotauds !== 'undefined') {
                        var lotaudsListId = [];

                        if (lotauds != null) {
                            if (lotauds == "test") {
                                lotaudsListId.push("617060");
                                lotaudsListId.push("333");
                            } else {
                                var obj = lotauds.Profile.Audiences["Audience"];
                                for (var p in obj) {
                                    if (obj.hasOwnProperty(p)) {
                                        lotaudsListId.push(obj[p]["id"]);
                                    }
                                }
                            }
                        }

                        //  Check if single or multiple target code
                        if (app.dmpTarget != null && app.dmpTarget != "") {
                            if (app.dmpTarget.indexOf('|') > 0) {
                                var targetCodeList = app.dmpTarget.split('|');
                                var targetAudienceList = app.dmpTargetAudience.split(",");
                                var targetExist = false;
                                for (var i = 0; i < targetCodeList.length; i++) {
                                    if (targetExist) {
                                        break
                                    }
                                    var targetAudience = targetAudienceList[i].split(",");
                                    if (lotaudsListId != null && lotaudsListId.length > 0 && targetAudience != null && targetAudience.length > 0) {

                                        for (var i = 0; i < targetAudience.length; i++) {
                                            if (lotaudsListId.includes(targetAudience[i])) {
                                                if (app.dmpTargetCode == "") {
                                                    app.dmpTargetCode = targetCodeList[i];
                                                    targetExist = true;
                                                }
                                                break;
                                            }
                                        }
                                    }
                                }
                            } else {
                                var targetAudience = targetAudienceList[i].split(",");
                                if (lotaudsListId != null && targetAudience != null && targetAudience.length > 0) {

                                    for (var i = 0; i < targetAudience.length; i++) {
                                        if (lotaudsListId.includes(targetAudience[i])) {
                                            app.dmpTargetCode = app.dmpTargetCode;
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (app.dmpTargetCode == null || app.dmpTargetCode == "") {
                        vodus.log("No DMP CC Target set, not qualified");
                    }
                    else {
                        vodus.log("DMP CC Target => " + app.dmpTargetCode);
                    }
                    vodus.setupCC();
                }
                else if (app.dmpType == "2") {

                    if (app.dmpCode != null && app.dmpCode != "") {
                        var lotameProfileWithCode = "lotame_" + app.dmpCode;
                        var lotameProfileId = eval(lotameProfileWithCode).getProfileId();
                        if (lotameProfileId != null && lotameProfileId != "") {
                            vodus.setPartnerData(lotameProfileId);
                        }
                    }

                    var lotaudsList = localStorage.getItem("lotame_" + app.dmpCode + "_auds");
                    if (lotaudsList != null && lotaudsList != "") {
                        var lotaudsListId = lotaudsList.split(",");
                        var targetAudienceList = app.dmpTargetAudience.split(",");
                        vodus.log("DMP Target Audience : " + targetAudienceList);
                        for (var i = 0; i < targetAudienceList.length; i++) {
                            if (lotaudsListId.includes(targetAudienceList[i])) {
                                app.dmpTargetCode = app.dmpTargetCode;
                                vodus.log("DMP Qualified : " + targetAudienceList[i]);
                                break;
                            }
                        }
                        if (app.dmpTargetCode == null || app.dmpTargetCode == "") {
                            vodus.log("No DMP CC Target set, not qualified");
                        }
                        else {
                            vodus.log("DMP CC Target => " + app.dmpTargetCode);
                        }
                    }
                    vodus.setupCC();
                }
                else {
                    vodus.setupCC();
                }
            }
            else {
                vodus.setupCC();
            }
        },
        setupCC: function setupCC() {

            var isAllowed = false;

            if (app.userCountryCode) {
                if (app.debug) {
                    console.log("Using userCountryCode: " + app.userCountryCode);
                }
                if (app.userCountryCode.toUpperCase() == "MY") {
                    isAllowed = true;
                }
                else {
                    if (app.debug) {
                        console.log('CC not allowed from : ' + app.userCountryCode);
                    }
                }
            }
            else {
                const xhr = new XMLHttpRequest();

                xhr.onload = () => {
                    // process response
                    if (xhr.status == 200) {
                        var rawData = xhr.response
                            .trim()
                            .split('\n')
                            .reduce(function (obj, pair) {
                                pair = pair.split('=');
                                return (obj[pair[0]] = pair[1]), obj;
                            }, {});

                        if(!rawData)
                        {
                            isAllowed = true;
                            return isAllowed;
                        }
                        if (rawData.loc == "MY") {
                            vodus.log("GEO passed: " + rawData.loc);
                            isAllowed = true;
                        }
                        else {
                            vodus.log("GEO failed: " + rawData.loc);
                        }
                    } else {
                        console.error('Error!');
                        isAllowed = true;
                    }
                    return isAllowed;
                };

                // create a `GET` request
                xhr.open('GET', 'https://www.cloudflare.com/cdn-cgi/trace', false);

                // send request
                xhr.send();
            }


            if (!isAllowed) {
                return;
            }

            if (app.isBannerMode) {
                vodus.log("Setup banner mode cc scroll trigger..");
                if (app.viewType == "mobile-app") {
                    scrollFunction(app)
                }
                else {
                    scrollFunction(app);
                    $(window).bind('scroll', function () {
                        scrollFunction(app)
                    });

                }
            }
            else {
                if (app.ccPageScrollTrigger == 0) {
                    vodus.getCC();
                } else {
                    vodus.log("Setup cc scroll trigger..");

                    if ($("body").height() > $(window).height()) {
                        $(window).bind('scroll', function () {
                            scrollFunction(app)
                        });
                    } else {
                        // For Astro
                        if ($("body").height() == $(window).height() && $("#app").length > 0) {
                            $(window).bind('scroll', function () {
                                scrollFunction(app);
                            });
                        }
                        else {
                            setTimeout(function () {
                                $(window).bind('scroll', function () {
                                    scrollFunction(app);
                                })
                            }, 3000);
                        }
                    }

                }
            }
        },
        checkIsMobile: function checkIsMobile() {
            if (/Mobi/i.test(navigator.userAgent)) {
                if (/iPad|iPod/i.test(navigator.userAgent)) {
                    app.isMobile = 0;
                    if (app.ccType == 2) {
                        app.isMobile = 1;
                    }
                } else {
                    app.isMobile = 1;
                }
            } else {
                app.isMobile = 0;
                if (app.ccType == 2 || app.ccType == 3) {
                    app.isMobile = 1;
                }
            }
        },
        getCC: function getCC() {
            if ($('.tingle-modal--noOverlayClose').length > 1) {

                $('.tingle-modal--noOverlayClose')[1].remove();
            }
            if (app.IsFailBannerMode && !$(".vodus-banner").length > 0) {
                closeAllVodusModal();
                vodus.log('Banner Mode: Vodus Banner div is not found.');
                return false;
            }

            var token = "";

            var ccToken = vodus.getParameterByName("cctoken");
            if (ccToken == null || ccToken == "") {
                token = vodus.readCookie(app.cookieName);
                if (token == null || token === "") {
                    token = vodus.getToken();
                }
            }
            else {
                token = ccToken;
            }


            var tempToken = vodus.readCookie("vodus_temp_token");
            if (app.language == null || app.language == "") {
                //app.language = "en"
            }

            questionDelayCounter = parseInt(app.questionModalDelay);
            if (isNaN(questionDelayCounter)) {
                questionDelayCounter = 0;
            }
            var localStorageSync = null;
            var localMemberProfileObject = null;
            app.usesLocalStorage = true;
            if (app.usesLocalStorage) {
                let localMemberProfile = localStorage.getItem('memberProfile');
                if (localMemberProfile != null) {
                    localMemberProfileObject = JSON.parse(localMemberProfile);

                    var pageLoad = {
                        count: localMemberProfileObject.pageLoad.count,
                        date: localMemberProfileObject.pageLoad.date
                    }

                    var session = {
                        count: localMemberProfileObject.session.count,
                        date: localMemberProfileObject.session.date
                    }
                    localStorageSync = {
                        pageLoad: pageLoad,
                        session: session,

                    }
                }
            }
            DetectingMobile();
            var templateCacheBusterCode = "";
            var rewardsAdsTemplateCacheBusterCode = "";
            let localVodusStoreJson = localStorage.getItem('vodus_store');
            if (localVodusStoreJson != null) {
                var tempVodusStore = JSON.parse(localVodusStoreJson);

                if (tempVodusStore.cc == null) {
                    tempVodusStore.cc = {
                        totalCCSinceResponse: 0
                    }
                } else {
                    tempVodusStore.cc.totalCCSinceResponse = parseInt(tempVodusStore.cc.totalCCSinceResponse) + 1;
                }

                if (tempVodusStore.cc.totalCCSinceResponse > app.stoAfterTotalNoResponse) {
                    if (app.viewType != "mobile-app") {
                        app.isBannerMode = false;
                        app.modalClosable = true;
                        app.bannerMode = 0;
                        app.intervalBannerMode = 1;


                        app.interval = app.stoInterval;
                        app.ctcInterval = app.stoCTCInterval;
                        app.ctcTimer = app.stoCTCTimer;
                        app.ccType = app.stoCCType;
                        app.demographicCCType = app.stoDemographicCCType;
                    }

                } else {
                    if (app.ccType == "1" && app.bannerMode == "1") {
                        app.ccType = "3";
                    }
                }

                if (localMemberProfileObject != null) {
                    var currentDate = new Date();
                    let ctcLastUpdatedAt = new Date(localMemberProfileObject.ctcLastUpdatedAt);
                    if (Math.floor(((currentDate - ctcLastUpdatedAt) / 1000) / 60) >= app.ctcInterval) {

                        vodus.log('STO: CTC interval passed.');

                    } else {
                        vodus.log("ST overriding... CTC not met");
                        return;
                    }
                }

                templateCacheBusterCode = tempVodusStore.template.cache_buster_code;
                if (tempVodusStore.rewards != null) {
                    rewardsAdsTemplateCacheBusterCode = tempVodusStore.rewards.cache_buster_code;
                }

                //  Only type 1 has mobile/desktop 
                if (app.ccType == "1") {
                    if (app.language == "en") {
                        if (app.isMobile) {
                            if (tempVodusStore.template.type1.mobile.about_us_en == "") {
                                templateCacheBusterCode = "reset";
                            }
                        } else {
                            if (tempVodusStore.template.type1.desktop.about_us_en == "") {
                                templateCacheBusterCode = "reset";
                            }
                        }
                    } else if (app.language == "ms") {
                        if (app.isMobile) {
                            if (tempVodusStore.template.type1.mobile.about_us_my == "") {
                                templateCacheBusterCode = "reset";
                            }
                        } else {
                            if (tempVodusStore.template.type1.desktop.about_us_my == "") {
                                templateCacheBusterCode = "reset";
                            }
                        }
                    } else {
                        if (app.isMobile) {
                            if (tempVodusStore.template.type1.mobile.about_us_zh == "") {
                                templateCacheBusterCode = "reset";
                            }
                        } else {
                            if (tempVodusStore.template.type1.desktop.about_us_zh == "") {
                                templateCacheBusterCode = "reset";
                            }
                        }
                    }

                } else if (app.ccType == "2") {
                    if (app.language == "en") {
                        if (tempVodusStore.template.type2.about_us_en == "") {
                            templateCacheBusterCode = "reset";
                        }
                    } else if (app.language == "ms") {
                        if (tempVodusStore.template.type2.about_us_my == "") {
                            templateCacheBusterCode = "reset";
                        }
                    } else {
                        if (tempVodusStore.template.type2.about_us_zh == "") {
                            templateCacheBusterCode = "reset";
                        }
                    }
                } else {
                    if (app.language == "en") {
                        if (tempVodusStore.template.type3.about_us_en == "") {
                            templateCacheBusterCode = "reset";
                        }
                    } else if (app.language == "ms") {
                        if (tempVodusStore.template.type3.about_us_my == "") {
                            templateCacheBusterCode = "reset";
                        }
                    } else {
                        if (tempVodusStore.template.type3.about_us_zh == "") {
                            templateCacheBusterCode = "reset";
                        }
                    }
                }

            }

            var deviceId = "";
            if (app.isFingerprintingEnabled) {
                deviceId = vodus.readCookie("vodus_device_id");
            }

            if (window.location.hostname.indexOf("vodus.my") > -1 || window.location.hostname.indexOf("voupon-uat.azurewebsites.net") > -1) {
                app.demographicInterval = 0;
                app.interval = 0;
            }

            //app.ccTargetCode = '93ef27f4-e668-40a1-97f8-0edd3bfb1aa2';
            app.chainQuotaCount = app.chainQuotaCount + 1;
            app.browser = getBrowser();
            $.ajax({
                type: "POST",
                dataType: 'json',
                data: JSON.stringify({
                    ccTargetCode: app.ccTargetCode,
                    dmpTargetCode: app.dmpTargetCode,
                    localStorageSync: localStorageSync,
                    usesLocalStorage: app.usesLocalStorage,
                    demographicInterval: app.demographicInterval,
                    demographicCTCTimer: app.demographicCTCTimer,
                    demographicCCType: app.demographicCCType,
                    dailyAllowance: app.dailyAllowance,
                    ccType: app.ccType,
                    noDemo: app.noDemo,
                    minSessionCount: app.minSessionCount,
                    ctcInterval: app.ctcInterval,
                    ctcTimer: app.ctcTimer,
                    interval: app.interval,
                    language: app.language,
                    partnerCode: app.partner_code,
                    token: token,
                    localStorageSync: localStorageSync,
                    usesLocalStorage: app.usesLocalStorage,
                    demographicInterval: app.demographicInterval,
                    demographicCTCTimer: app.demographicCTCTimer,
                    demographicCCType: app.demographicCCType,
                    dailyAllowance: app.dailyAllowance,
                    ccType: app.ccType,
                    noDemo: app.noDemo,
                    minSessionCount: app.minSessionCount,
                    ctcInterval: app.ctcInterval,
                    ctcTimer: app.ctcTimer,
                    interval: app.interval,
                    language: app.language,
                    partnerCode: app.partner_code,
                    tempToken: tempToken,
                    templateCacheBusterCode: templateCacheBusterCode,
                    rewardsAdsTemplateCacheBusterCode: rewardsAdsTemplateCacheBusterCode,
                    deviceId: deviceId,
                    thirdPartyEnabled: app.thirdPartyEnabled,
                    browser: app.browser,
                    commercialId: 0
                }),
                url: app.serverlessUrl + '/api/getQuestion',
                success: function (response) {

                    if (!response.successful) {
                        if (response.code == 999) {
                            vodus.deleteCookie("Vodus.Token");
                            vodus.deleteCookie("vodus_temp_token");
                            vodus.log('resetting token..');
                            $("#vodus_3PTest").html('<iframe id="vodus3PLogoutTest" width="0" height="0"  src="' + app.vodus3PRootUrl + '/v1/token/delete?partnerCode=' + app.partner_code + '" frameborder="0" allowfullscreen></iframe>');
                            return;
                        } else if (response.code == 997) {
                            if (app.partner_code == "vodus-reward") {
                                VodusRewardSuspended(response.message)
                            }
                            console.log('Suspended until ' + response.message);
                        } else {
                            if (app.partner_code == "vodus-reward") {
                                VodusRewardNoQuestionAvailable()
                            } else if (app.partner_code == "vodus-mobile-app") {
                                if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.sendMessage && window.webkit.messageHandlers.sendMessage.postMessage) {
                                    vodus.log("Close Mobile App Web View");
                                    noMoreSurveyMessageToApp();
                                }
                            } else {
                                if (app.isChainQuestion) {
                                    var pointsGained = 0;
                                    showThankYouMessage(app, pointsGained);
                                } else {
                                    closeAllVodusModal();
                                }
                            }
                        }
                        vodus.log('No more question: \n' + response.message);
                        return;
                    }

                    //response.successful = false;

                    /* //Disabled errorLog function//
                    if (response.data != null) {
                        
                         if ((response.data.FunctionTimeSpent > 3000)) {
                            app.memberProfileId = response.data.MemberProfileId;
                            vodus.log('get question took more than 3s');
                            logDelay(response.data, null, response.data.FunctionTimeSpent, 1, app.serverlessUrl, app.thirdPartyEnabled, app.memberProfileId, app.partner_code, app.browser);
                        }
                    }*/
                    app.rewardsAdSubgroupId = response.data.SubgroupId;
                    app.rewardsAdDemographicStateId = response.data.DemographicStateId;
                    app.rewardsAdDemographicEthnicityId = response.data.DemographicEthnicityId;
                    app.rewardsAdDemographicGenderId = response.data.DemographicGenderId;
                    app.rewardsAdDemographicAgeId = response.data.DemographicAgeId;
                    app.partnerId = response.data.PartnerId;
                    app.partnerWebsiteId = response.data.PartnerWebsiteId;
                    app.questionId = response.data.Id;
                    app.surveyType = response.data.SurveyType;
                    //console.log("vodus stress load in progress. no survey will be displayed");
                    //return false;
                    if (response.data.IsStressTestEnabled) {
                        //app.questionData = response;
                        //app.questionData.data.QuestionTemplateContent = $("#divQuestionaireEditorContainer").html();
                        if (response.data.Code != "vodus-test") {
                            if (vodus.getNoQuestionCallback() != null) {
                                if (vodus.getNoQuestionCallback().length > 0) {
                                    vodus.log("Executing callback -> " + vodus.getNoQuestionCallback());
                                    window[vodus.getNoQuestionCallback()].apply(this, vodus.getNoQuestionCallArgument());
                                    //toastr.success("");
                                    //addShowGetQuestionModal();
                                }
                            }

                            vodus.log("Stress test in progress. No CC..");
                            NoCCCheckIsSurveyFallbackScript(app.isSurveyFallbackScript, app.GAMAdUnitId)
                            return false;
                        }
                    }
                    if (app.usesLocalStorage) {
                        let localMemberProfile = localStorage.getItem('memberProfile');
                        if (localMemberProfile != null) {
                            if (response.message == "global cc inactive") {

                                localMemberProfileObject = JSON.parse(localMemberProfile);
                                localMemberProfileObject.globalCC.status = "inactive";
                                localMemberProfileObject.globalCC.lastUpdatedAt = new Date();
                                localStorage.setItem("memberProfile", JSON.stringify(localMemberProfileObject));
                            } else {
                                localMemberProfileObject = JSON.parse(localMemberProfile);
                                localMemberProfileObject.globalCC.status = "active";
                                localMemberProfileObject.globalCC.lastUpdatedAt = new Date();
                                localStorage.setItem("memberProfile", JSON.stringify(localMemberProfileObject));
                            }
                        }
                    }
                    if (response.successful) {

                        if (response.data.resyncToken != null && response.data.ResyncToken != "") {
                            vodus.createCookie(app.cookieName, response.data.ResyncToken, 3650);
                        }

                        if (app.partner_code != "vodus-test") {
                        }

                        //  Compare local template vs server template version
                        let localVodusStoreJson = localStorage.getItem('vodus_store');

                        var localVodusStore = {
                            cc: {
                                totalCCSinceResponse: 0,
                            },
                            lastUpdatedAt: Date.now(),
                            rewards: {
                                cache_buster_code: "",
                                thankyou_template: ""
                            },
                            template: {
                                cache_buster_code: "",
                                thank_you: {
                                    en: "",
                                },
                                type1: {
                                    mobile: {
                                        about_us_en: "",
                                        about_us_my: "",
                                        about_us_zh: "",
                                        intro_en: "",
                                        intro_my: "",
                                        intro_zh: "",
                                        signup_en: "",
                                        signup_my: "",
                                        signup_zh: "",
                                        question_en: "",
                                        question_my: "",
                                        question_zh: "",
                                    },
                                    desktop: {
                                        about_us_en: "",
                                        about_us_my: "",
                                        about_us_zh: "",
                                        intro_en: "",
                                        intro_my: "",
                                        intro_zh: "",
                                        signup_en: "",
                                        signup_my: "",
                                        signup_zh: "",
                                        question_en: "",
                                        question_my: "",
                                        question_zh: "",
                                    }
                                },
                                type2: {
                                    about_us_en: "",
                                    about_us_my: "",
                                    about_us_zh: "",
                                    intro_en: "",
                                    intro_my: "",
                                    intro_zh: "",
                                    signup_en: "",
                                    signup_my: "",
                                    signup_zh: "",
                                    question_en: "",
                                    question_my: "",
                                    question_zh: "",
                                },
                                type3: {
                                    about_us_en: "",
                                    about_us_my: "",
                                    about_us_zh: "",
                                    intro_en: "",
                                    intro_my: "",
                                    intro_zh: "",
                                    signup_en: "",
                                    signup_my: "",
                                    signup_zh: "",
                                    question_en: "",
                                    question_my: "",
                                    question_zh: "",
                                }

                            }
                        }

                        if (localVodusStoreJson == null || localVodusStoreJson == "") {

                            if (localVodusStore != null) {
                                if (localVodusStore.cc == null) {
                                    localVodusStore.cc = {
                                        totalCCSinceResponse: 0
                                    }
                                } else {
                                    localVodusStore.cc.totalCCSinceResponse = parseInt(localVodusStore.cc.totalCCSinceResponse) + 1;
                                }
                                if (localVodusStore.cc.totalCCSinceResponse > app.stoAfterTotalNoResponse) {
                                    if (app.viewType != "mobile-app") {
                                        app.isBannerMode = false;
                                        app.modalClosable = true;
                                        app.bannerMode = 0;
                                        app.intervalBannerMode = 1;

                                        app.interval = app.stoInterval;
                                        app.ctcInterval = app.stoCTCInterval;
                                        app.ctcTimer = app.stoCTCTimer;
                                        app.ccType = app.stoCCType;
                                        app.demographicCCType = app.stoDemographicCCType;
                                    }

                                } else {
                                    vodus.log("No ST override 1: " + localVodusStore.cc.totalCCSinceResponse + "/" + app.stoAfterTotalNoResponse);
                                }
                            }

                            if (app.ccType == "1") {
                                if (app.isMobile) {
                                    if (app.language == "en") {
                                        localVodusStore.template.type1.mobile.question_en = response.data.CommercialCallingQuestionTemplate;
                                    } else if (app.language == "ms") {
                                        localVodusStore.template.type1.mobile.question_my = response.data.CommercialCallingQuestionTemplate;
                                    } else if (app.language == "zh") {
                                        localVodusStore.template.type1.mobile.question_zh = response.data.CommercialCallingQuestionTemplate;
                                    }
                                } else {
                                    if (app.language == "en") {
                                        localVodusStore.template.type1.desktop.question_en = response.data.CommercialCallingQuestionTemplate;
                                    } else if (app.language == "ms") {
                                        localVodusStore.template.type1.desktop.question_my = response.data.CommercialCallingQuestionTemplate;
                                    } else if (app.language == "zh") {
                                        localVodusStore.template.type1.desktop.question_zh = response.data.CommercialCallingQuestionTemplate;
                                    }
                                }
                            } else if (app.ccType == "2") {
                                if (app.language == "en") {
                                    localVodusStore.template.type2.question_en = response.data.CommercialCallingQuestionTemplate;
                                } else if (app.language == "ms") {
                                    localVodusStore.template.type2.question_my = response.data.CommercialCallingQuestionTemplate;
                                } else if (app.language == "zh") {
                                    localVodusStore.template.type2.question_zh = response.data.CommercialCallingQuestionTemplate;
                                }
                            } else if (app.ccType == "3") {
                                if (app.language == "en") {
                                    localVodusStore.template.type3.question_en = response.data.CommercialCallingQuestionTemplate;
                                } else if (app.language == "ms") {
                                    localVodusStore.template.type3.question_my = response.data.CommercialCallingQuestionTemplate;
                                } else if (app.language == "zh") {
                                    localVodusStore.template.type3.question_zh = response.data.CommercialCallingQuestionTemplate;
                                }
                            }
                            localVodusStore.template.cache_buster_code = response.data.TemplateCacheBusterCode;
                            localVodusStore.rewards.cache_buster_code = response.data.RewardsAdsTemplateCacheBusterCode;

                            if (response.data.RewardsAdsTemplate != null) {
                                localVodusStore.rewards.thankyou_template = response.data.RewardsAdsTemplate;
                                app.rewardsAdsTemplate = response.data.RewardsAdsTemplate;
                            }

                            localStorage.setItem("vodus_store", JSON.stringify(localVodusStore));
                        } else {
                            localVodusStore = JSON.parse(localVodusStoreJson);


                            if (localVodusStore != null) {
                                if (localVodusStore.cc == null) {
                                    localVodusStore.cc = {
                                        totalCCSinceResponse: 0
                                    }
                                } else {
                                    localVodusStore.cc.totalCCSinceResponse = parseInt(localVodusStore.cc.totalCCSinceResponse) + 1;
                                }
                                if (localVodusStore.cc.totalCCSinceResponse > app.stoAfterTotalNoResponse) {
                                    if (app.viewType != "mobile-app") {
                                        app.isBannerMode = false;
                                        app.modalClosable = true;
                                        app.bannerMode = 0;
                                        app.intervalBannerMode = 1;

                                        app.interval = app.stoInterval;
                                        app.ctcInterval = app.stoCTCInterval;
                                        app.ctcTimer = app.stoCTCTimer;
                                        app.ccType = app.stoCCType;
                                        app.demographicCCType = app.stoDemographicCCType;
                                        vodus.log("ST overriding...");
                                    }

                                } else {
                                    vodus.log("No ST override 2: " + localVodusStore.cc.totalCCSinceResponse + "/" + app.stoAfterTotalNoResponse);
                                }
                            }
                            if (localVodusStore.rewards == null || localVodusStore.rewards.cache_buster_code == null || localVodusStore.rewards.cache_buster_code == "") {
                                localVodusStore.rewards = {
                                    cache_buster_code: response.data.RewardsAdsTemplateCacheBusterCode,
                                    thankyou_template: response.data.RewardsAdsTemplate

                                }
                            }

                            if (localVodusStore.template.cache_buster_code != response.data.TemplateCacheBusterCode) {
                                localVodusStore.template.cache_buster_code = response.data.TemplateCacheBusterCode
                            }

                            app.rewardsAdsTemplate = localVodusStore.rewards.thankyou_template;
                            if (response.data.RewardsAdsTemplate != null && response.data.RewardsAdsTemplate != "") {
                                localVodusStore.rewards.thankyou_template = response.data.RewardsAdsTemplate;
                                app.rewardsAdsThankYouTemplate = response.data.RewardsAdsTemplate;
                            }

                            if (response.data.RewardsAdsTemplateCacheBusterCode != null && response.data.RewardsAdsTemplateCacheBusterCode != "") {
                                localVodusStore.rewards.cache_buster_code = response.data.RewardsAdsTemplateCacheBusterCode;
                            }

                            if (app.ccType == "1") {
                                if (app.isMobile) {
                                    //  Localstore question
                                    if (response.data.CommercialCallingQuestionTemplate != null && response.data.CommercialCallingQuestionTemplate != "") {
                                        if (app.language == "en") {
                                            localVodusStore.template.type1.mobile.question_en = response.data.CommercialCallingQuestionTemplate;
                                        } else if (app.language == "ms") {
                                            localVodusStore.template.type1.mobile.question_my = response.data.CommercialCallingQuestionTemplate;
                                        } else if (app.language == "zh") {
                                            localVodusStore.template.type1.mobile.question_zh = response.data.CommercialCallingQuestionTemplate;
                                        }
                                    } else {
                                        if (app.language == "en") {
                                            response.data.CommercialCallingQuestionTemplate = localVodusStore.template.type1.mobile.question_en;
                                        } else if (app.language == "ms") {
                                            response.data.CommercialCallingQuestionTemplate = localVodusStore.template.type1.mobile.question_my;
                                        } else if (app.language == "zh") {
                                            response.data.CommercialCallingQuestionTemplate = localVodusStore.template.type1.mobile.question_zh;
                                        }
                                    }
                                } else {
                                    //  Localstore question
                                    if (response.data.CommercialCallingQuestionTemplate != null && response.data.CommercialCallingQuestionTemplate != "") {
                                        if (app.language == "en") {
                                            localVodusStore.template.type1.desktop.question_en = response.data.CommercialCallingQuestionTemplate;
                                        } else if (app.language == "ms") {
                                            localVodusStore.template.type1.desktop.question_my = response.data.CommercialCallingQuestionTemplate;
                                        } else if (app.language == "zh") {
                                            localVodusStore.template.type1.desktop.question_zh = response.data.CommercialCallingQuestionTemplate;
                                        }
                                    } else {
                                        if (app.language == "en") {
                                            response.data.CommercialCallingQuestionTemplate = localVodusStore.template.type1.desktop.question_en;
                                        } else if (app.language == "ms") {
                                            response.data.CommercialCallingQuestionTemplate = localVodusStore.template.type1.desktop.question_my;
                                        } else if (app.language == "zh") {
                                            response.data.CommercialCallingQuestionTemplate = localVodusStore.template.type1.desktop.question_zh;
                                        }
                                    }
                                }

                            } else if (app.ccType == "2") {
                                //  Localstore question
                                if (response.data.CommercialCallingQuestionTemplate != null && response.data.CommercialCallingQuestionTemplate != "") {
                                    if (app.language == "en") {
                                        localVodusStore.template.type2.question_en = response.data.CommercialCallingQuestionTemplate;
                                    } else if (app.language == "ms") {
                                        localVodusStore.template.type2.question_my = response.data.CommercialCallingQuestionTemplate;
                                    } else if (app.language == "zh") {
                                        localVodusStore.template.type2.question_zh = response.data.CommercialCallingQuestionTemplate;
                                    }
                                } else {
                                    if (app.language == "en") {
                                        response.data.CommercialCallingQuestionTemplate = localVodusStore.template.type2.question_en;
                                    } else if (app.language == "ms") {
                                        response.data.CommercialCallingQuestionTemplate = localVodusStore.template.type2.question_my;
                                    } else if (app.language == "zh") {
                                        response.data.CommercialCallingQuestionTemplate = localVodusStore.template.type2.question_zh;
                                    }
                                }
                            } else if (app.ccType == "3") {
                                //  Localstore question
                                if (response.data.CommercialCallingQuestionTemplate != null && response.data.CommercialCallingQuestionTemplate != "") {
                                    if (app.language == "en") {
                                        localVodusStore.template.type3.question_en = response.data.CommercialCallingQuestionTemplate;
                                    } else if (app.language == "ms") {
                                        localVodusStore.template.type3.question_my = response.data.CommercialCallingQuestionTemplate;
                                    } else if (app.language == "zh") {
                                        localVodusStore.template.type3.question_zh = response.data.CommercialCallingQuestionTemplate;
                                    }
                                } else {
                                    if (app.language == "en") {
                                        response.data.CommercialCallingQuestionTemplate = localVodusStore.template.type3.question_en;
                                    } else if (app.language == "ms") {
                                        response.data.CommercialCallingQuestionTemplate = localVodusStore.template.type3.question_my;
                                    } else if (app.language == "zh") {
                                        response.data.CommercialCallingQuestionTemplate = localVodusStore.template.type3.question_zh;
                                    }
                                }
                            }
                            localStorage.setItem("vodus_store", JSON.stringify(localVodusStore));
                        }
                        if (app.isChainQuestion) {
                            $("#divQuestionaireEditorContainer").css("opacity", "0").css("max-height", $(".questionaire-container-size-variable").outerHeight());
                        }
                        app.surveyQuestionId = response.data.Id;
                        app.isReferral = (response.data.QuestionTypeId == 999 ? true : false);
                        app.vPointsPerQuestion = response.data.VPointsPerQuestion;
                        app.loadedAt = Date.now();
                        app.partnerWebsiteName = response.data.PartnerWebsiteName;


                        if (response.data.QuestionParameterOverride) {
                            questionDelayCounter = 0;
                            app.ccType = 2;
                        }

                        if (response.data.DemographicOnly) {
                            app.ccType = app.demographicCCType;
                            app.ctcTimer = app.demographicCTCTimer;
                        }

                        if ("http://localhost:63828" == origin || "https://voupon-uat.azurewebsites.net" == origin || "https://vodus.my" == origin) {
                            $(".tingle-modal").fadeOut(300);
                        }

                        var questionDelayTimer = setInterval(function () {

                            if (questionDelayCounter > 0) {

                                questionDelayCounter--;
                                vodus.log("Delay countdown:" + questionDelayCounter);
                            }

                            if (questionDelayCounter === 0) {
                                clearInterval(questionDelayTimer);
                                app.questionData = response;

                                var loginBox = "";
                                var tokenEmail = "";
                                var tokenPoints = "0";
                                if (response.data.UserToken != null) {
                                    if (response.data.UserToken.Email != null) {
                                        if (response.data.UserToken.Email.length > 100) {
                                            tokenEmail = response.data.UserToken.Email.substring(0, 15) + "...";
                                        } else {
                                            tokenEmail = response.data.UserToken.Email;
                                        }
                                    }
                                }

                                if ($("#vodus_tag").length == 0) {
                                    $("<div>").attr({
                                        'class': "bootstrap-vodus " + app.catfishPosition,
                                        'id': "vodus_tag"
                                    }).appendTo("body");
                                }

                                if ($("#vodus_grid_tag").length == 0) {
                                    $("<div>").attr({
                                        'class': "hidden",
                                        'id': "vodus_grid_tag"
                                    }).appendTo("body");
                                }

                                if ($("#vodus_grid_mobile_tag").length == 0) {
                                    $("<div>").attr({
                                        'class': "hidden",
                                        'id': "vodus_grid_mobile_tag"
                                    }).appendTo("body");
                                }

                                if ($("#test_tag").length == 0) {
                                    $("<div>").attr({
                                        'class': "",
                                        'id': "test_tag"
                                    }).appendTo("body");
                                }

                                //  Set color
                                // PrimaryColor, SecondaryColor, ButtonColor, SelectedAnswerColor, BackgroundColor, FontColor
                                if (response.data.BackgroundColor != "") {
                                    var styles = '.bootstrap-vodus .modal-dialog .modal-content,' +
                                        '.ccType2.bootstrap-vodus .modal-dialog .modal-content,' +
                                        '.ccType2.bootstrap-vodus .vodus-slider-question-vertical-slider input[type=range]::-webkit-slider-thumb,' +
                                        '.ccType2 .modal-dialog.mobile-vodusLoginDialog#vodusLoginDialog .modal-content,' +
                                        '.ccType2 .modal-dialog.mobile-vodusLoginDialog#vodusSignupDialog .modal-content,' +
                                        '.bootstrap-vodus .desktop-header-bar-vodus ,tablet-header-bar-vodus {' +
                                        'background-color: #' + response.data.BackgroundColor + '!important;' +
                                        'color: #' + response.data.FontColor + ' !important;}' +

                                        '.ccType2.bootstrap-vodus .template-preview-title-to-display .s-editable-text.question-header-1 {' +
                                        'background-color: #' + response.data.BackgroundColor + '!important;' +
                                        'color: #' + response.data.FontColor + ' !important;}' +

                                        '.ccType2 .mobile-question-container .answer-box,' +
                                        '.ccType2 .mobile-vodusLoginDialog .intro-btn {' +
                                        'background-color: #' + response.data.SecondaryColor + '!important;' +
                                        'color: #' + response.data.PrimaryColor + ' !important;}' +

                                        '.ccType2 .mobile-question-container .survey-submit-btn {' +
                                        'background-color: #' + response.data.ButtonColor + '!important;' +
                                        'box-shadow: 0 0 0 1px #' + response.data.SelectedAnswerColor + '!important;' +
                                        'color: #' + response.data.SelectedAnswerColor + ' !important;}' +

                                        '.ccType2 .template-preview-answer-to-display-table-content div {' +
                                        'color: #' + response.data.PrimaryColor + ' !important;}' +

                                        '.text-primary-vodus, .bootstrap-vodus #vodusAboutUsDialog footer .about-us-links a,' +
                                        '.bootstrap-vodus .text-span-vodus,.bootstrap-vodus .click-to-close,' +
                                        '.ccType2.bootstrap-vodus .click-to-close-div,' +
                                        '.bootstrap-vodus .vodusAvailablePoints {' +
                                        'color: #' + response.data.FontColor + ' !important;' +
                                        'border-color: #' + response.data.FontColor + ' !important;}' +

                                        '.ccType2 .mobile-footer-inner-container,' +
                                        '#vodusAboutUsDialog footer .info-redeem-container,' +
                                        '#vodusAboutUsDialog footer .info-aboutus-container,' +
                                        '#vodusAboutUsDialog footer .info-surveyus-container {' +
                                        'border-color: #' + response.data.FontColor + '}' +

                                        '.ccType2.bootstrap-vodus .selectedAnswer div {' +
                                        'color: #' + response.data.SelectedAnswerColor + ' !important;}' +

                                        '.ccType2.bootstrap-vodus .selectedAnswer {' +
                                        'box-shadow: 0 0 0 2px #' + response.data.SelectedAnswerColor + '!important;' +
                                        'background-color: #' + response.data.ButtonColor + '!important;' +
                                        'font-weight: 900;';

                                    $('<style>' + styles + '</style>').appendTo(document.head);
                                }

                                //  Temp tag
                                var vodus_grid_tag = response.data.QuestionTemplateContentDefaultLanguage;
                                var vodus_grid_mobile_tag = response.data.QuestionTemplateContentMobileDefaultLanguage;
                                window.vodus_grid_mobile_tag = vodus_grid_mobile_tag;
                                window.vodus_grid_tag = vodus_grid_tag;

                                //  Question template
                                $("#vodus_tag").html(response.data.CommercialCallingQuestionTemplate);

                                //  Update logo
                                $("#vodus_tag").find(".partnerLogo").attr('src', response.data.PartnerLogoUrl);

                                if (response.data.VodusLogoType == "1") {
                                    $("#vodus_tag").find(".vodusLogoSwap").attr('src', 'https://api.vodus.com/cc/images/Vodus-V3-Logo-White-Small.svg');
                                } else {
                                    $("#vodus_tag").find(".vodusLogoSwap").attr('src', 'https://api.vodus.com/cc/images/Vodus-V3-Logo-Small.svg');
                                }

                                if ($(".modal-content").css("background-color") == "rgb(255, 255, 255)") {
                                    $(".ccType-1-login .partnerLogo").css("filter", "drop-shadow(0 0 2px rgba(255,255,255,0.8))");
                                    $("#sso-desktop-content .sso-left-container .partnerLogo").css("filter", "drop-shadow(0 0 2px rgba(255,255,255,0.8))");
                                    $("#vodusAboutUsDialog .partnerLogo").css("filter", "drop-shadow(0 0 2px rgba(255,255,255,0.8))");
                                }

                                $("#test_tag").html(response.data.QuestionTemplateContent);
                                $("#test_tag").find('.vodus-slider-question-vertical-text').removeAttr("style");
                                $("#test_tag").find('.vodus-slider-question-vertical-title').removeAttr("style");
                                $("#test_tag").find('.vodus-slider-question-vertical-slider').removeAttr("style");
                                $("#divQuestionaireEditorContainer").html($("#test_tag").html());
                                app.questionData.data.QuestionTemplateContent = $("#divQuestionaireEditorContainer").html();
                                $("#test_tag").remove();

                                app.pipeReplace = response.data.PipeFromQuestionTemplate;
                                app.pipeList = response.data.PipeList;
                                app.pipeListDefault = response.data.PipeListDefault;
                                app.idsForPipeList = response.data.IdsForPipeList;
                                app.pipeAnswerIdList = response.data.PipeAnswerIdList;

                                if (response.data.UserToken != null) {
                                    $(".vodusTokenEmail").html(tokenEmail);
                                    $(".vodusAvailablePoints").html(response.data.UserToken.AvailablePoints);
                                    app.availablePoints = response.data.UserToken.AvailablePoints;
                                    app.email = tokenEmail;
                                    vodus.setEmail(tokenEmail);
                                }
                                else {
                                    $(".vodusAvailablePoints").html("0");
                                }

                                //Random Instructions
                                var random = Math.random();
                                if (app.language == "ms") {
                                    var totQuestionsInstruction = "satu ";
                                    if (app.chainQuota > 8) {
                                        totQuestionsInstruction = "";
                                    } else if (app.chainQuota > 1) {
                                        totQuestionsInstruction = app.chainQuota.toString() + " ";
                                    }
                                    if (app.availablePoints < 15) {
                                        if (random < 0.5) {
                                            $(".close-modal-instruction").html("Dapatkan Baucar Tunai").css("font-weight", "600");
                                            $(".question-purpose").html("dengan menjawab " + totQuestionsInstruction + "soalan kajian selidik").css("font-weight", "400");
                                        } else {
                                            $(".close-modal-instruction").html("Harap bantu kajian selidik kami dan").css("font-weight", "400");
                                            $(".question-purpose").html("Dapatkan Baucar Tunai").css("font-weight", "600");
                                        }
                                    } else {
                                        if (random < 0.334) {
                                            $(".close-modal-instruction").html("Dapatkan baucar tunai").css("font-weight", "600");
                                            $(".question-purpose").html("dengan menjawab " + totQuestionsInstruction + "soalan kajian selidik").css("font-weight", "400");
                                        } else if (random < 0.667) {
                                            $(".close-modal-instruction").html("Dapatkan VPoint untuk").css("font-weight", "400");
                                            $(".question-purpose").html("menebus baucar tunai & diskaun hebat").css("font-weight", "600");
                                        } else {
                                            $(".close-modal-instruction").html("Dapatkan 10% diskaun beli-bela").css("font-weight", "600");
                                            $(".question-purpose").html("dari setiap 10 soalan yang dijawab").css("font-weight", "400");
                                        }
                                    }
                                } else if (app.language == "zh") {
                                    var totQuestionsInstruction = "一道";
                                    if (app.chainQuota > 8) {
                                        totQuestionsInstruction = "";
                                    } else if (app.chainQuota > 1) {
                                        totQuestionsInstruction = " " + app.chainQuota.toString() + " 道";
                                    }
                                    if (app.availablePoints < 15) {
                                        if (random < 0.5) {
                                            $(".close-modal-instruction").html("回答" + totQuestionsInstruction + "简单的研究问题以").css("font-weight", "400");
                                            $(".question-purpose").html("获得现金与购物折扣").css("font-weight", "600");
                                        } else {
                                            $(".close-modal-instruction").html("协助我们的研究以").css("font-weight", "400");
                                            $(".question-purpose").html("获得现金与购物折扣").css("font-weight", "600");
                                        }
                                    } else {
                                        if (random < 0.337) {
                                            $(".close-modal-instruction").html("回答" + totQuestionsInstruction + "简单的研究问题以").css("font-weight", "400");
                                            $(".question-purpose").html("获得现金与购物折扣").css("font-weight", "600");
                                        } else if (random < 0.667) {
                                            $(".close-modal-instruction").html("获得更多VPoints以换取").css("font-weight", "400");
                                            $(".question-purpose").html("巨额折扣和现金券").css("font-weight", "600");
                                        } else {
                                            $(".close-modal-instruction").html("回答每十道简单问题以").css("font-weight", "400");
                                            $(".question-purpose").html("获取 20% 购物折扣").css("font-weight", "600");
                                        }
                                    }
                                } else {
                                    var totQuestionsInstruction = "one ";
                                    var s = "";
                                    if (app.chainQuota > 8) {
                                        totQuestionsInstruction = "";
                                        s = "s";
                                    } else if (app.chainQuota > 1) {
                                        totQuestionsInstruction = app.chainQuota.toString() + " ";
                                        s = "s";
                                    }
                                    if (app.availablePoints < 15) {
                                        if (random < 0.5) {
                                            $(".close-modal-instruction").html("Earn cash vouchers").css("font-weight", "600");
                                            $(".question-purpose").html("by answering " + totQuestionsInstruction + "survey question" + s).css("font-weight", "400");
                                        } else {
                                            $(".close-modal-instruction").html("Get exclusive vouchers for free").css("font-weight", "600");
                                            $(".question-purpose").html("when you join our research").css("font-weight", "400");
                                            //  $(".close-modal-instruction").html("Help us in our research to").css("font-weight", "400");
                                            //  $(".question-purpose").html("gain cash vouchers").css("font-weight", "600");
                                        }
                                    } else {
                                        if (random < 0.337) {
                                            $(".close-modal-instruction").html("Earn cash vouchers").css("font-weight", "600");
                                            $(".question-purpose").html("by answering " + totQuestionsInstruction + "survey question" + s).css("font-weight", "400");
                                        } else if (random < 0.667) {
                                            $(".close-modal-instruction").html("Gain VPoints to exchange for ").css("font-weight", "400");
                                            $(".question-purpose").html("huge discounts and cash vouchers").css("font-weight", "600");
                                        } else {
                                            $(".close-modal-instruction").html("Get 20% off your shopping").css("font-weight", "600");
                                            $(".question-purpose").html("for every 10 questions answered").css("font-weight", "400");
                                        }
                                    }
                                }

                                if (document.documentMode || /Edge/.test(navigator.userAgent)) {
                                    $(".survey-mcqma-div").css("display", "");
                                    $(".survey-mcqsa-div").css("display", " ");
                                } else {
                                    $(".answer-box").addClass("inline-you");
                                }

                                if (tokenEmail != "") {
                                    $(".vodusMobileHeaderLoginContainer").hide();
                                    $(".vodusMobileEmailIdContainer").show();
                                    $(".vodusProfileContainer").show();
                                    $(".vodusLoginContainer").hide();
                                } else {
                                    $(".vodusMobileHeaderLoginContainer").show();
                                    $(".vodusMobileEmailIdContainer").hide();
                                    $(".vodusProfileContainer").hide();
                                    $(".vodusLoginContainer").show();
                                }

                                if (app.modalClosable) {
                                    $(".ctc-container").show();
                                    $(".vodus-rewards-close-div").show();
                                    $(".vodus-reward-response-to-close").show();
                                } else {
                                    $(".vodus-reward-response-to-close").show();
                                    $(".vodus-rewards-close-div").hide();
                                    $(".click-to-close-div").hide();
                                    $(".wait-to-close-div").hide();
                                }

                                var input = document.getElementsByClassName("survey-submit-btn");

                                if (input[0] != undefined) {
                                    input[0].outerHTML = input[0].outerHTML.replace(/^\<input/, "<button") + "Submit" + "</button>";
                                }

                                var counter = response.data.QuestionDelayLengthInSeconds;
                                if (counter == null || counter == 0) {
                                    counter = 5;
                                }
                                if ("vodus-reward" == app.partner_code) {
                                    $(".tingle-modal-box").each(function () {
                                        $(this).hide();
                                    });
                                }
                                vodus.setAppData(app);

                                //content injection test
                                if (response.data.QuestionTemplateContent !== "") {
                                    /* This is to load all images before displaying questions */
                                    var loadedImages = 0;
                                    var totalImages = $("#divQuestionaireEditorContainer").find('img').length;
                                    if (totalImages > 0) {

                                        $($("#divQuestionaireEditorContainer").find('img')).each(function () {
                                            $(this).on('load', function () {
                                                loadedImages++;
                                                if (loadedImages == totalImages) {
                                                    vodus.log('All assets loaded. Displaying survey now');

                                                    if (app.isRewardGainPoint) {
                                                        addShowGetQuestionModal();
                                                    } else {
                                                        if ("vodus-reward" == app.partner_code) {
                                                            $(".tingle-modal").remove();
                                                        }
                                                        addShowGetQuestionModal();
                                                    }
                                                }
                                            });
                                        });
                                    } else {
                                        vodus.log('No assets to load. Displaying survey now');
                                        addShowGetQuestionModal();
                                    }
                                }


                                if (response.message == "Interval not reached yet") {
                                    vodus.log('No questions available: \n' + response.message);
                                    closeAllVodusModal();
                                    if (vodus.getNoQuestionCallback() != null) {
                                        if (vodus.getNoQuestionCallback().length > 0) {
                                            vodus.log("Executing callback -> " + vodus.getNoQuestionCallback());
                                            window[vodus.getNoQuestionCallback()].apply(this, vodus.getNoQuestionCallArgument());
                                        }
                                    }
                                    NoCCCheckIsSurveyFallbackScript(app.isSurveyFallbackScript, app.GAMAdUnitId);
                                    return;
                                }

                                if (response.data == null) {
                                    closeAllVodusModal();
                                    vodus.log('No questions available: \n' + response.message);
                                    if (vodus.getNoQuestionCallback() != null) {
                                        if (vodus.getNoQuestionCallback().length > 0) {
                                            vodus.log("Executing callback -> " + vodus.getNoQuestionCallback());
                                            window[vodus.getNoQuestionCallback()].apply(this, vodus.getNoQuestionCallArgument());
                                            addShowGetQuestionModal();
                                        }
                                    }
                                    NoCCCheckIsSurveyFallbackScript(app.isSurveyFallbackScript, app.GAMAdUnitId);
                                    return;
                                } else {
                                    if (response.data.QuestionTemplateContent === "") {
                                        closeAllVodusModal();
                                        vodus.log('No questions available: \n' + response.message);
                                        if (vodus.getNoQuestionCallback() != null) {
                                            if (vodus.getNoQuestionCallback().length > 0) {
                                                vodus.log("Executing callback -> " + vodus.getNoQuestionCallback());
                                                window[vodus.getNoQuestionCallback()].apply(this, vodus.getNoQuestionCallArgument());
                                                addShowGetQuestionModal();
                                            }
                                        }
                                        NoCCCheckIsSurveyFallbackScript(app.isSurveyFallbackScript, app.GAMAdUnitId);
                                        return;
                                    }
                                }
                            }
                        }, 1000);
                    } else {
                        vodus.log('No more question: \n' + response.message);
                        var pointsGained = 0;
                        if (app.isChainQuestion) {
                            showThankYouMessage(app, pointsGained);
                        } else {
                            closeAllVodusModal();
                        }

                        if (app.viewType == "mobile-app") {

                            $.ajax({
                                type: "GET",
                                dataType: 'html',
                                async: false,
                                global: false,
                                url: 'https://api.vodus.com/cc/templates/survey/mobile_thankyou_template.html',
                                success: function (response) {
                                    var thankyou_template = $(response);
                                    var pointsGained = 0;

                                    $(".bootstrap-vodus").find(".mobile-bar-vodus").hide();
                                    $(".bootstrap-vodus").find(".mobile-footer-vodus").hide();
                                    $(".bootstrap-vodus").addClass("thankyou-banner");

                                    respondedHeader = "";
                                    responsededMessage = "";
                                    respondedHeader = thankyou_template.html();

                                    $(".close-modal-instruction-container").html("");
                                    $(".wait-to-close-div").hide();
                                    $(".click-to-close-div").show().unbind().html("X");
                                    $("#divQuestionaireEditorContainer").html('<div class="s-editable-text question-header-1 banner-thankyou vodus-responded-toast">' + respondedHeader + responsededMessage + '</div>');
                                    $(".mobile-footer-vodus").html('');

                                    var questionModal = new tingle.modal({
                                        footer: false,
                                        stickyFooter: false,
                                        closeMethods: ['button'],
                                        closeLabel: "Close",
                                        cssClass: ['bootstrap-vodus', (app.ccType == "2" ? 'ccType2' : ((app.ccType == "3") ? "ccType3" : "ccType1"))],
                                        onOpen: function () {
                                            if (app.ccType == "2" || app.ccType == "3") {
                                                $("body").removeClass("tingle-enabled");
                                                repositionMobileImage($('.tingle-modal-box'));
                                                if (app.isBannerMode) {
                                                    $("body").css("top", "unset");

                                                }
                                            }

                                        },
                                        onClose: function () { },
                                        beforeOpen: function () {
                                            if (app.ccType == "2" || app.ccType == "3") {
                                                $(".tingle-modal__close").remove();

                                            }
                                        }
                                    });
                                    questionModal.setContent('<div id="divQuestionaireEditorContainer"><div class="s-editable-text question-header-1 banner-thankyou vodus-responded-toast">' + respondedHeader + responsededMessage + '</div></div>');
                                    questionModal.open();

                                    $("#vodusQuestionModal").modal('hide');
                                    $("#vodusLoginModal").modal('hide');
                                    $(".modal-backdrop").remove();

                                    if (app.viewType == "mobile-app") {
                                        if (app.containerHeight != null && app.containerHeight != 0) {
                                            var height = Math.floor((app.containerHeight - (48 * window.devicePixelRatio)) / window.devicePixelRatio);
                                            $(".thankyou-message").hide();
                                            $(".tingle-modal").css("height", height + "px");
                                            $(".autoclose-message").hide();
                                            $(".vodus-banner").html("");
                                            $(".questionaire-container-size-variable").css("height", height + "px");
                                            $(".questionaire-container-size-variable").css("max-height", height + "px");
                                            $(".mobile-question-container").css("max-width", "100%");
                                            $(".mobile-question-container").css("height", height + "px");
                                            $(".modal-dialog").css("max-width", "100%");
                                            $(".left-header-container").css("width", "70px");
                                            $(".center-header-container").css("width", "80%");

                                            $(".tingle-enabled").css("position", "unset").css("overflow", "auto").css("margin", "8px 0");
                                        }
                                    }

                                    var modalCounter = 3;
                                    if (!app.isBannerMode) {
                                        type2Close(modalCounter);
                                    }

                                    clearInterval(app.checkCounterTimer);
                                    $(".click-to-close-div").click(function () {
                                        closeAllVodusModal();
                                    });
                                    $(".vodus-responded-toast").click(function () {
                                        if (!app.isBannerMode) {
                                            $('.autoclose-message').hide();
                                            clearInterval(type2CloseTimer);
                                        }
                                    });
                                    if (app.viewType == "mobile-app") {
                                        $(".click-to-close-div").hide();
                                    }

                                    $(".adsContainer").fadeIn();
                                },
                                error: function (err) {
                                    vodus.log(err, app.logStatus.err);
                                    toastr.clear();
                                    toastr.error("Hmm.. Something went wrong. We are checking the issue. Please try again later");
                                }
                            });
                        }
                        else {
                            if (vodus.getNoQuestionCallback() != null) {
                                if (vodus.getNoQuestionCallback().length > 0) {
                                    vodus.log("Executing callback -> " + vodus.getNoQuestionCallback());
                                    window[vodus.getNoQuestionCallback()].apply(this, vodus.getNoQuestionCallArgument());
                                    //addShowGetQuestionModal();
                                    toastr.remove();
                                    if (app.language == "ms") {
                                        toastr.success("Tiada soal selidik buat masa ini. Terima kasih atas kerjasama anda menjawab soal selidik kami.");
                                    } else if (app.language == "zh") {
                                        toastr.success("您已回答所有问题， 感谢您完成我们的调查");
                                    } else {
                                        toastr.success("There are no more questions for you now. Please try again later");
                                    }
                                }
                            }
                        }


                        NoCCCheckIsSurveyFallbackScript(app.isSurveyFallbackScript, app.GAMAdUnitId);
                        return;
                    }
                },
                error: function (err) {
                    vodus.log(err, app.logStatus.error)
                }
            });
        },
        submitResponse: function submitResponse() {
            var app = vodus.getAppData();

            $("#vodus_tag").remove();
            var pointsGained = 1

            var memberProfileId = 0;
            if (app.questionData.data.UserToken != null) {
                memberProfileId = app.questionData.data.UserToken.MemberProfileId;
            }

            if (app.chainQuota < 1) {
                if (app.bannerMode == 1) {
                    app.chainQuota = 5;
                } else {
                    app.chainQuota = 5;
                }
            }

            app.isChainQuestion = false;
            if (app.chainQuota == 1) {
                app.isChainQuestion = false;
            }
            else {
                if (app.chainQuotaCount < app.chainQuota) {
                    app.isChainQuestion = true;
                }
                else {
                    app.isChainQuestion = false;
                }
            }

            if (window.location.hostname.indexOf("vodus.my") > -1 || window.location.hostname.indexOf("voupon-uat.azurewebsites.net") > -1) {
                app.isChainQuestion = true;
            }

            if (window.location.hostname.indexOf("vodus.my") > -1 || window.location.hostname.indexOf("voupon-uat.azurewebsites.net") > -1 || app.isChainQuestion == true) {

            }
            else {
                app.rewardsAdsTriggeredAt = new Date().getTime();
                /* Get Reward Ads from server if VPoints > 3*/
                if (app.availablePoints > 3) {
                    $.ajax({
                        type: "POST",
                        dataType: 'json',
                        async: true,
                        global: false,
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify({
                            MemberProfileId: memberProfileId,
                            DemographicstateId: app.rewardsAdDemographicStateId,
                            DemographicAgeId: app.rewardsAdDemographicAgeId,
                            DemographicEthnicityId: app.rewardsAdDemographicEthnicityId,
                            DemographicGenderId: app.rewardsAdDemographicGenderId,
                            SubgroupId: app.rewardsAdSubgroupId,
                            PartnerId: app.partnerId,
                            PartnerWebsiteId: app.partnerWebsiteId
                        }),
                        url: app.serverlessUrl + '/api/getRewardsAds',
                        success: function (response) {
                            if (response.successful) {
                                if (response.data != null) {

                                    var responseCompletedAt = new Date().getTime();

                                    if ((responseCompletedAt - app.rewardsAdsTriggeredAt) > 2000) {
                                        vodus.log('recommended rewards took more than 2s');
                                        return;
                                    }
                                    vodus.log('recommended rewards took less than 2s. Using AI recommended rewards');
                                    app.rewardsAdsData = response.data;
                                }
                            }
                        },
                        error: function (err) {
                            vodus.log(err, app.logStatus.err);
                        }
                    });
                } else {
                    app.rewardsAdsData = "";
                }
            }

            if (!app.isChainQuestion) {
                showThankYouMessage(app, pointsGained);
            }

            var token = vodus.readCookie(app.cookieName);

            var redirect = vodus.getRedirectUrl();
            if (redirect == null || redirect == "" || redirect == 'undefined') {

            } else {
                window.open(redirect + "?ref=" + window.location.href + "&host=" + window.location.hostname);
            }

            var deviceId = vodus.readCookie("vodus_device_id");
            if (app.isFingerprintingEnabled) {
                if (deviceId != null && deviceId != "") {
                    surveyResponse.deviceId = deviceId;
                    //surveyResponse.fingerPrintComponentsJSON = app.fingerprint.components;  
                }
            }

            var tempToken = vodus.readCookie("vodus_temp_token");
            if (tempToken != null && tempToken != "") {
                surveyResponse.tempToken = tempToken;
            }
            surveyResponse.thirdPartyEnabled = app.thirdPartyEnabled;
            surveyResponse.browser = app.browser;

            var ccToken = vodus.getParameterByName("cctoken");
            if (ccToken == null || ccToken == "") {
                token = vodus.readCookie(app.cookieName);
                if (token == null || token === "") {
                    surveyResponse.token = vodus.getToken();
                }
                else {
                    surveyResponse.token = token;
                }
            }
            else {
                surveyResponse.token = ccToken;
            }

            $("#vodusLoader").show();
            $.ajax({
                type: "POST",
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(surveyResponse),
                dataType: "json",
                url: app.serverlessUrl + '/api/submitResponse',
                success: function (response) {
                    if (response.successful) {

                        if (ccToken != null && ccToken != "") {
                            vodus.log("Getting next question...")
                            vodus.getCC();
                            return;
                        }

                        /*//Disabled errorLog function//
                        if (response.data != null) {
                            if ((response.data.FunctionTimeSpent > 3000)) {
                                vodus.log('get question took more than 3s');
                              logDelay(null, surveyResponse, response.data.FunctionTimeSpent, 2, app.serverlessUrl, app.thirdPartyEnabled, app.memberProfileId, app.partner_code, app.browser);
                            }
                        }*/

                        if (response.data != null) {
                            if (response.data.Token != null && response.data.Token != "") {
                                vodus.createCookie(app.cookieName, response.data.Token, 3650);
                            }
                        }

                        if (app.thirdPartyEnabled) {
                            if ($("#reward_3PTest").length == 0) {
                                $("<div>").attr({
                                    'class': "",
                                    'id': "reward_3PTest"
                                }).appendTo("body");
                            }
                            app.availablePoints = app.availablePoints + pointsGained;
                            var encodedToken = vodus.readCookie(app.cookieName).trim();
                            $("#reward_3PTest").html('<iframe id="vodus3PTest" width="0" height="0"  src="' + app.vodus3PRootUrl + '/v1/token/sync?token=' + encodedToken + '" frameborder="0" allowfullscreen></iframe>');
                        }

                        var localMemberProfileObject = "";
                        let localMemberProfile = localStorage.getItem('memberProfile');
                        if (localMemberProfile != null) {
                            localMemberProfileObject = JSON.parse(localMemberProfile);
                            localMemberProfileObject.submitResponseLastUpdatedAt = new Date();
                            localMemberProfileObject.token = response.data.token;
                            localStorage.setItem("memberProfile", JSON.stringify(localMemberProfileObject));
                        }

                        let localVodusStoreJson = localStorage.getItem('vodus_store');
                        if (localVodusStoreJson != null) {
                            var localVodusStore = JSON.parse(localVodusStoreJson);
                            localVodusStore.cc.totalCCSinceResponse = 0;
                            localStorage.setItem("vodus_store", JSON.stringify(localVodusStore));
                        }

                        if (app.isChainQuestion) {
                            app.interval = 0;
                            app.isChainQuestion = true;
                            vodus.getCC();
                            vodus.log('Chain question in progress. Starting another cc...');
                            return;
                        }

                        $("#vodusLoader").hide();

                        if (submitResponseCallback.length > 0) {
                            vodus.log("Executing callback -> " + submitResponseCallback);
                            window[submitResponseCallback].apply(this, submitResponseArgument);
                        }
                    } else {
                        vodus.log('error => requiredCCDataSync');

                        if (response.data.requiredCCDataSync) {
                            $.ajax({
                                type: "POST",
                                dataType: 'json',
                                async: true,
                                global: false,
                                contentType: "application/json; charset=utf-8",
                                data: JSON.stringify({
                                    "Browser": browser,
                                    "MemberProfileId": memberProfileId,
                                    "Data": app
                                }),
                                url: app.serverlessUrl + '/api/logDataSyncFunction',
                                success: function (response) {

                                },
                                error: function (err) {
                                    vodus.log(err, app.logStatus.err);
                                }
                            });
                        }

                    }
                },
                error: function (err) {
                    closeAllVodusModal();
                    vodus.log(err, app.logStatus.err);
                    ResponseCloseCheckIsSurveyFallbackScript(app.isSurveyFallbackScript, app.GAMAdUnitId, true);
                }
            });
            if (app.chainQuota == 1 || app.chainQuota == app.chainQuotaCount && app.isBannerMode == true) {
                $("#vodusQuestionModal").modal('hide');
                $(".modal-backdrop").remove();

                if (app.viewType == "mobile-app") {
                    if (app.containerHeight != null && app.containerHeight != 0) {
                        var height = Math.floor((app.containerHeight - (48 * window.devicePixelRatio)) / window.devicePixelRatio);
                        $("#divQuestionaireEditorContainer").css("height", height + "px");
                        $(".questionaire-container-size-variable").css("height", height + "px");
                        $(".questionaire-container-size-variable").css("max-height", height + "px");
                        $(".mobile-question-container").css("max-width", "100%");
                        $(".mobile-question-container").css("height", height + "px");
                        $(".modal-dialog").css("max-width", "100%");
                        $(".left-header-container").css("width", "70px");
                        $(".center-header-container").css("width", "80%");
                        $(".thankyou-product-discount").css("position", "relative").css("bottom", "5px");
                        $(".rewards-logo").css("flex-wrap", "nowrap");
                        $(".thankyou-message").css("margin-top", "0").css("display", "flex").css("justify-content", "center").css("width", "50%").css("font-size", "20px");
                        $(".tingle-enabled").css("position", "unset").css("overflow", "auto").css("margin", "8px 0");
                    }
                }
            }

        },
        updateAdsData: function updateAdsData() {
            var adsList = [];
            var app = vodus.getAppData();
            var rewardsAdsData = app.rewardsAdsData;

            var modalCounter = 3;
            if (!app.isBannerMode) {
                type2Close(modalCounter);
            }

            if (app.env == "live") {
                if (rewardsAdsData == '') {
                    //  Add multiple default ads
                    adsList.push({
                        pointRequired: 167,
                        discountValue: 30,
                        dealExpirationTypeId: 2,
                        imageUrl: "https://vouponlive.blob.core.windows.net/products/143/images/small_01_134c4fd2-41c2-4660-bd05-d4d8c772c07f.jpeg",
                        productUrl: "https://vodus.my/Product/143",
                        productTitle: "TNG E-Wallet RM30 Credit Voucher",
                        merchantName: "Vodus",
                        discountedPrice: "RM0",
                        price: "RM30",
                        totalDiscount: "RM30 OFF",
                        productRecoId: 144
                    });

                    adsList.push({
                        pointRequired: 133,
                        discountValue: 20,
                        dealExpirationTypeId: 2,
                        imageUrl: "https://vouponlive.blob.core.windows.net/products/19953/images/small_01_c1e0ab94-116f-47b7-ba8a-1b78489a18b5.jpeg",
                        productUrl: "https://vodus.my/product/19953",
                        productTitle: "Starbucks RM 20 Cash Voucher",
                        merchantName: "Vodus",
                        discountedPrice: "RM0",
                        price: "RM20",
                        totalDiscount: "RM20 OFF",
                        productRecoId: 126
                    });

                    adsList.push({
                        pointRequired: 67,
                        discountValue: 10,
                        dealExpirationTypeId: 2,
                        imageUrl: "https://vouponlive.blob.core.windows.net/products/19951/images/small_01_ab92503e-c538-4f8d-9c1d-2b35322e85f0.jpeg",
                        productUrl: "https://vodus.my/product/19951",
                        productTitle: "RM10 Häagen-Dazs Cash Voucher",
                        merchantName: "Vodus",
                        discountedPrice: "RM0",
                        price: "RM10",
                        totalDiscount: "RM10 OFF",
                        productRecoId: 138
                    });

                    adsList.push({
                        pointRequired: 50,
                        discountValue: 10,
                        dealExpirationTypeId: 2,
                        imageUrl: "https://vouponlive.blob.core.windows.net/products/127/images/small_01_e88be58c-8177-436e-9c57-38e43c559d38.jpeg",
                        productUrl: "https://vodus.my/product/127",
                        productTitle: "Tealive RM10 Cash Vouchers",
                        merchantName: "Vodus",
                        discountedPrice: "RM0",
                        price: "RM10",
                        totalDiscount: "RM10 OFF",
                        productRecoId: 135
                    });

                    rewardsAdsData = adsList[Math.floor(Math.random() * adsList.length)];
                }
            }
            else {
                if (rewardsAdsData == '') {
                    adsList.push({
                        pointRequired: 91,
                        discountValue: 10,
                        dealExpirationTypeId: 2,
                        imageUrl: "https://vodusuat.blob.core.windows.net/products/85/images/normal_1_5c708215-b730-4ed0-95e1-8ba917a4cf66.jpeg",
                        productUrl: "https://voupon-uat.azurewebsites.net/product/85",
                        productTitle: "TALMO 5pcs Glass Tea Pot Set",
                        merchantName: "Vodus",
                        discountedPrice: "RM 0.00",
                        price: "RM 10.00",
                        totalDiscount: "RM10.00 OFF",
                        productRecoId: 212
                    });

                    adsList.push({
                        pointRequired: 91,
                        discountValue: 10,
                        dealExpirationTypeId: 2,
                        imageUrl: "https://vodusuat.blob.core.windows.net/products/79/images/normal_1_a46f2bca-c8b6-4688-9799-bc75927c54f0.jpeg",
                        productUrl: "https://voupon-uat.azurewebsites.net/product/79",
                        productTitle: "Threetrees 8.5 inch LCD drawing pad",
                        merchantName: "Vodus",
                        discountedPrice: "RM 0.00",
                        price: "RM 10.00",
                        totalDiscount: "RM10.00 OFF",
                        productRecoId: 206
                    });

                    rewardsAdsData = adsList[Math.floor(Math.random() * adsList.length)];
                }
            }
            rewardsAdsData.productUrl = rewardsAdsData.productUrl += "?ccnav=1";


            if (rewardsAdsData.vodusLogoType == "1") {
                $(".banner-thankyou").find(".vodusLogoSwap").attr('src', 'https://api.vodus.com/cc/images/logo/Vodus%20V3%20Logo%20Favicon-White.svg');
            } else {
                $(".banner-thankyou").find(".vodusLogoSwap").attr('src', 'https://api.vodus.com/cc/images/logo/Vodus%20V3%20Logo%20Favicon.svg');
            }

            if (app.language == "ms") {
                $(".thankyou-required-point").html("Anda boleh menggunakan <b>" + rewardsAdsData.pointRequired + " VPoints</b> untuk dapatkan ganjaran ini:");
            } else if (app.language == "zh") {
                $(".thankyou-required-point").html("您可以使用 <b>" + rewardsAdsData.pointRequired + " Vpoints</b> 兑换此奖励:");
            } else {
                $(".thankyou-required-point").html("You may exchange <b>" + rewardsAdsData.pointRequired + " VPoints</b> for this reward:");
            }

            $(".thankyou-product-image-url").attr("src", rewardsAdsData.imageUrl);
            $(".thankyou-product-image-url").css("display", "block");
            if (rewardsAdsData.totalDiscount != null && rewardsAdsData.totalDiscount != "") {
                $(".thankyou-discount-message").html(rewardsAdsData.totalDiscount);
            } else {
                $(".thankyou-discount-message").hide();
            }
            $(".thankyou-product-title").html(rewardsAdsData.productTitle);
            $(".thankyou-product-price").html(rewardsAdsData.price);
            $(".thankyou-product-discounted-price").html(rewardsAdsData.discountedPrice);
            $(".thankyou-product-shop").html(rewardsAdsData.merchantName);

            var token = vodus.readCookie(app.cookieName);
            var tempToken = vodus.readCookie("vodus_temp_token");

            if (!app.thirdPartyEnabled) {
                if (token == null || token == "") {
                    var tempToken = vodus.readCookie("vodus_temp_token");
                    var redirectUrl = app.reward3PRootUrl + '/sync?syncType=3&partnerWebsiteId=' + app.partnerWebsiteId + '&questionId=' + app.questionId + '&questionType=' + app.surveyType + '&tempToken=' + tempToken + '&redirectUrl=' + encodeURI(rewardsAdsData.productUrl) + '&host=' + encodeURI(rewardsAdsData.productUrl)
                }
                else {
                    var redirectUrl = app.reward3PRootUrl + '/sync?syncType=3&partnerWebsiteId=' + app.partnerWebsiteId + '&questionId=' + app.questionId + '&questionType=' + app.surveyType + '&tempToken=' + tempToken + '&token=' + token + '&redirectUrl=' + encodeURI(rewardsAdsData.productUrl) + '&host=' + encodeURI(rewardsAdsData.productUrl)
                }
            } else {
                redirectUrl = rewardsAdsData.productUrl;
            }
            app.surveyType = 1;

            $(".thankyou-product-url").attr("href", redirectUrl);

            $(".thankyou-product-url").click(function () {
                vodus.createCookie("vodus_sync_clicked", "Y", 3650);
                if (app.viewType == "mobile-app") {
                    vodusAndroidSdk.openUrl($(this).attr('href'));
                    return false;
                }
            });
            $(".adsContainer").fadeIn();
            if (rewardsAdsData.productRecoId > 0 && rewardsAdsData.productRecoId != null) {
                if (app.questionData.data.UserToken != null)
                    var memberProfileId = app.questionData.data.UserToken.MemberProfileId;
                else
                    var memberProfileId = 0;
                $(".thankyou-product-url").click(function () {
                    $.ajax({
                        type: "POST",
                        dataType: 'json',
                        async: false,
                        global: false,
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify({
                            "SubgroupId": app.rewardsAdSubgroupId,
                            "DemographicstateId": app.rewardsAdDemographicStateId,
                            "MemberProfileId": memberProfileId,
                            "ProductAdId": rewardsAdsData.productRecoId
                        }),
                        url: app.serverlessUrl + '/api/updateRewardsAdsClicks',
                        success: function (response) {

                        },
                        error: function (err) {
                            vodus.log(err, app.logStatus.err);
                            toastr.clear();
                            toastr.error("Hmm.. Something went wrong. We are checking the issue. Please try again later");
                        }
                    });

                });
            }

            if ("http://localhost:63828" == origin || "https://voupon-uat.azurewebsites.net" == origin || "https://vodus.my" == origin) {
                //Skip updateRecoRewardImpression
            }
            else {
                updateRecoRewardImpression(memberProfileId, app.rewardsAdDemographicStateId, app.rewardsAdDemographicAgeId, app.rewardsAdDemographicEthnicityId, app.rewardsAdDemographicGenderId, app.rewardsAdSubgroupId, app.partnerId, app.partnerWebsiteId, rewardsAdsData.productRecoId, app.serverlessUrl);

            }
        },
        submitCloseResponse: function submitCloseResponse() {
            closeAllVodusModal();
            $("#vodus_tag").remove();
            $("#vodusQuestionModal").modal('hide');
            $("#vodusLoginModal").modal('hide');
            $(".modal-backdrop").remove();

            if ("http://localhost:63828" == origin || "https://voupon-uat.azurewebsites.net" == origin || "https://vodus.my" == origin) {
                vodus.log('Skipping close count');
                return;
            }

            var token = vodus.readCookie(app.cookieName);
            var tempToken = vodus.readCookie("vodus_temp_token");
            if (token == null) {
                if (tempToken == null) {
                    vodus.log('Invalid token/temp token no close response updated', app.logStatus.warning);
                    return;
                }
            }

            //token = decodeURIComponent(token);
            var data = {
                partnerCode: app.partner_code,
                token: token,
                tempToken: tempToken,
                interval: app.interval,
                ccType: app.ccType,
            };

            $.ajax({
                type: "POST",
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data),
                url: app.serverlessUrl + '/api/submitCloseResponse',
                success: function (response) {
                    vodus.log("Close response submitted");
                    //  Store to localstorage
                    let localMemberProfile = localStorage.getItem('memberProfile');
                    if (localMemberProfile != null) {
                        let localMemberProfileObject = JSON.parse(localMemberProfile);

                        localMemberProfileObject.ctcLastUpdatedAt = new Date();
                        localStorage.setItem("memberProfile", JSON.stringify(localMemberProfileObject));
                    }
                },
                error: function (err) {
                    vodus.log(err, app.logStatus.error)
                    ResponseCloseCheckIsSurveyFallbackScript(app.isSurveyFallbackScript, app.GAMAdUnitId, false);
                }
            });
            ResponseCloseCheckIsSurveyFallbackScript(app.isSurveyFallbackScript, app.GAMAdUnitId, false);
        },
        emailLogin: function emailLogin(email, password, loginProvider, thirdPartyToken) {
            toastr.clear();
            var token = vodus.readCookie(app.cookieName);
            var deviceId = "";
            if (app.isFingerprintingEnabled) {
                deviceId = vodus.readCookie("vodus_device_id");
            }

            var data = {
                partnerCode: app.partner_code,
                token: token,
                email: email,
                password: password,
                loginProvider: loginProvider,
                externalUserId: vodus.getExternalUserId(),
                thirdPartyToken: thirdPartyToken,
                deviceId: deviceId
            }

            if (data.loginProvider == "email") {
                if (data.email.length === 0 || data.password.length === 0) {
                    if (app.language == "ms") {
                        toastr.error("E-mel dan kata laluan diperlukan");
                    } else if (app.language == "zh") {
                        toastr.error("需要输入电子邮件和密码");
                    } else {
                        toastr.error("Email and password are required");
                    }
                    return false;
                }
            }

            $('#btnVodusLogin').prop('disabled', true);
            $.ajax({
                type: "POST",
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data),
                url: app.rootUrl + 'v1/authentication/EmailLogin',
                success: function (response) {
                    $('#btnVodusLogin').prop('disabled', false);
                    if (response.successful) {
                        if (app.language == "ms") {

                            toastr.success('', '<h4 style="padding:0 15px">Anda telah berjaya log masuk ke akaun Vodus anda</h4>');
                        } else if (app.language == "zh") {
                            toastr.success('', '<h4 style="padding:0 15px">您已成功登录Vodus帐户</h4>');
                        } else {

                            toastr.success('', '<h4 style="padding:0 15px">You have successfully logged in to your Vodus account</h4>');
                        }
                        $("#toast-container").addClass("vodus-responded-toast");
                        app.isLoggedin = true;

                        token = response.data.Token;
                        vodus.createCookie(app.cookieName, token, 3650);
                        app.preferredLanguage = response.data.PreferredLanguage;
                        app.skip3PCheck = true;

                        if (app.usesLocalStorage) {
                            let localMemberProfile = localStorage.getItem('memberProfile');
                            if (localMemberProfile != null) {
                                localMemberProfileObject = JSON.parse(localMemberProfile);

                                localMemberProfileObject.token = response.data.token;
                                localStorage.setItem('memberProfile', JSON.stringify(localMemberProfileObject));
                            }
                        }

                        //vodus.log('3P +> ' + app.thirdPartyEnabled);
                        if (app.thirdPartyEnabled) {
                            if ($("#vodus_3PTest").length === 0) {
                                $("<div>").attr({
                                    'class': "",
                                    'id': "vodus_3PTest"
                                }).appendTo("body");
                            }
                            if ($("#reward_3PTest").length === 0) {
                                $("<div>").attr({
                                    'class': "",
                                    'id': "vodus_3PTest"
                                }).appendTo("body");
                            }
                            var selectedLanguage = "";
                            selectedLanguage = vodus.getLanguageCode();
                            vodus.log('Logging in..');
                            $("#vodus_3PTest").html('<iframe id="vodus3PTest" width="0" height="0"  src="' + app.vodus3PRootUrl + '/v1/token/create?partnerCode=' + app.partner_code + '&token=' + token + '" frameborder="0" allowfullscreen></iframe>');
                            $("#reward_3PTest").html('<iframe id="rewardVodus3PTest" width="0" height="0"  src="' + app.reward3PRootUrl + '/token/create-temporary-points?points=' + response.data.Points + '&language=' + app.preferredLanguage + '&login=1&loginProvider=' + loginProvider + '&thirdPartyToken=' + thirdPartyToken + '&loginToken=' + response.data.LoginDataSync + '&token=' + token + '&partnerCode=' + app.partner_code + '" frameborder="0" allowfullscreen></iframe>');
                            $("#api_3PTest").html('<iframe id="apiVodus3PTest" width="0" height="0"  src="' + app.rootUrl + '/token/sync?points=' + response.data.Points + '&token=' + token + '&partnerCode=' + app.partner_code + '" frameborder="0" allowfullscreen></iframe>');


                            if (rewardLoginCallback.length > 0) {
                                closeAllVodusModal();
                                vodus.log("Executing callback -> " + rewardLoginCallback);
                                $("#rewardVodus3PTest").on('load', function () {
                                    window[rewardLoginCallback].apply(this, rewardLoginArgument);
                                    window.vodus = vodus;
                                });
                            } else {
                                $("#rewardVodus3PTest").on('load', function () {
                                    closeAllVodusModal();
                                    vodus.getQuestion();
                                });
                            }
                        } else {

                            if (rewardLoginCallback.length > 0) {
                                $("#rewardVodus3PTest").on('load', function () {
                                    vodus.log("Executing callback -> " + rewardLoginCallback);
                                    window[rewardLoginCallback].apply(this, rewardLoginArgument);
                                    window.vodus = vodus;
                                    vodus.getQuestion();
                                });
                            }
                            closeAllVodusModal();
                            vodus.getQuestion();
                        }
                    } else {
                        $("#vodusLoginLoader").hide();
                        if (app.language == "ms") {
                            toastr.error("Butiran log masuk anda tidak sah");
                        } else if (app.language == "zh") {
                            toastr.error("无效的登录信息");
                        } else {
                            toastr.error("Invalid login details");
                        }
                        return false;

                    }
                },
                error: function (err) {
                    $("#vodusLoginLoader").hide();
                    vodus.log(err, app.logStatus.error)
                }
            });
        },
        partnerDataSync: function partnerDataSync() {
            var token = vodus.readCookie(app.cookieName);
            var data = {
                partnerData: vodus.getPartnerData(),
                token: token
            }

            if (data.token.length === 0 || data.partnerData.length === 0) {
                vodus.log('Invalid sync request', app.logStatus.error);
                return false;
            }

            $("#vodusLoginLoader").show();
            $.ajax({
                type: "POST",
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data),
                url: app.rootUrl + 'v1/survey/PartnerDataSync',
                success: function (response) {
                    if (response.successful) { } else {
                        vodus.log(response.message);
                    }
                    $("#vodusLoginLoader").hide();
                },
                error: function (err) {
                    $("#vodusLoginLoader").hide();
                    vodus.log(err, app.logStatus.error);
                }
            });
        },
    };

    var cssChecking = function checkRequiredCssBeforeDisplay() {
        var found = true;
        $('head').append($('<link rel="stylesheet" type="text/css" href="' + app.cdnUrl + '/bootstrap-vodus.css' + app.cacheCode + '" />'));
        $('head').append($('<link rel="stylesheet" type="text/css" href="' + app.surveycssUrl + app.cacheCode + '" />'));
        $('head').append($('<link rel="stylesheet" type="text/css" href="' + app.cdnUrl + '/toastr.min.css' + app.cacheCode + '" />'));
        $('head').append($('<link rel="stylesheet" type="text/css" href="' + app.cdnUrl + '/240404-tingle.css' + app.cacheCode + '" />'));
        $('head').append($('<script src="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>'));
        $('head').append($('<script src="//cdnjs.cloudflare.com/ajax/libs/tingle/0.13.2/tingle.min.js"></script>'));

        //  Add i18Next
        if (!window.i18Next) {
            //vodus.log('Adding i18Next');
            $('head').append($('<script src="//cdnjs.cloudflare.com/ajax/libs/i18next/8.4.3/i18next.min.js"></script>'));
            $('head').append($('<script src="//cdnjs.cloudflare.com/ajax/libs/jquery-i18next/1.2.0/jquery-i18next.min.js"></script>'));
        }
        var UserAgent = navigator.userAgent,
            MobileBrowser = /IEMobile|Windows Phone|Lumia/i.test(UserAgent) ? 'w' : /iPhone|iP[oa]d/.test(UserAgent) ? 'i' : /Android/.test(UserAgent) ? 'a' : /BlackBerry|PlayBook|BB10/.test(UserAgent) ? 'b' : /Mobile Safari/.test(UserAgent) ? 's' : /webOS|Mobile|Tablet|Opera Mini|\bCrMo\/|Opera Mobi/i.test(UserAgent) ? 1 : 0;
    }

    var initializeAllTheCssAndJavascriptFiles = function initializeAllTheCssAndJavascriptFiles() {
        var scripts = document.getElementsByTagName('script');
        var myScript = scripts[scripts.length - 1];

        // Prepare required scripts
        var bsScript = document.createElement('script');
        var jqScript = document.createElement('script');


        //Common JS
        var common = document.createElement('script');
        common.type = "text/javascript";
        common.src = app.commonjsUrl + app.cacheCode;
        document.getElementsByTagName('head')[0].appendChild(common);

        if (app.debug) {
            console.log("Vodus => Debugging enabled");
            console.log(app);
        } else {
            console.log("Vodus => Debugging disabled");
        }
        var jqueryExist = false;
        if (!window.jQuery) {
            jqueryExist = false;
            console.log('jquery not available');
        } else {
            jqueryExist = true;
            //vodus.log('jquery available');
        }

        if (typeof $ === 'function') { } else {
            jqueryExist = false;
        }

        if (!jqueryExist) {
            jqScript.type = "text/javascript";
            jqScript.src = "//code.jquery.com/jquery-2.1.1.min.js";
            jqScript.className = "vodus-include"
            document.getElementsByTagName('head')[0].appendChild(jqScript);
            if (app.debug) {
                console.log("Missing jquery (Adding jquery.js...)", app.logStatus.warning);
            }
            jqScript.onload = function () {
                cssChecking();

                if ((typeof $().emulateTransitionEnd == 'function')) {
                    if (app.debug) {
                        vodus.log("Bootstrap js available (Skip bootstrap js adding)");
                        vodus.thirdPartyTest(app.thirdPartyTestType.firstLoad);
                    }
                } else {
                    if (app.debug) {
                        vodus.log("Missing bootstrap.js (Adding bootstrap.js...)", app.logStatus.warning);
                    }
                    var bs = document.createElement('script');
                    bs.type = "text/javascript";
                    bs.src = "https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/js/bootstrap.min.js" + app.cacheCode;
                    document.getElementsByTagName('head')[0].appendChild(bs);
                    bs.onload = function () {
                        vodus.thirdPartyTest(app.thirdPartyTestType.firstLoad);
                    };
                }

                var jqUI = document.createElement('script');
                jqUI.type = "text/javascript";
                jqUI.src = "//code.jquery.com/ui/1.13.2/jquery-ui.min.js";
                jqUI.className = "vodus-include"
                document.getElementsByTagName('head')[0].appendChild(jqUI);
                jqUI.onload = function () {

                    var jqTouchUI = document.createElement('script');
                    jqTouchUI.type = "text/javascript";
                    jqTouchUI.src = "//cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js";
                    jqTouchUI.className = "vodus-include"
                    document.getElementsByTagName('head')[0].appendChild(jqTouchUI);
                };


                $('head').append($('<meta name="google-signin-scope" content="profile email">'));
                $('head').append($('<meta name="google-signin-client_id" content="700069321358-1t3lj52il4lrfcbffo31qbj78b46dind.apps.googleusercontent.com">'));
                $('head').append($('<script src="https://apis.google.com/js/platform.js" async defer></script>'));

            };
        } else {
            //vodus.log("Jquery available (Skip jquery adding)");
            cssChecking();
            if ((typeof $().emulateTransitionEnd == 'function')) {
                //vodus.log("Bootstrap.js available (Skip bootstrap js adding)");
                vodus.thirdPartyTest(app.thirdPartyTestType.firstLoad);
            } else {
                //vodus.log("Missing bootstrap.js (Adding bootstrap.js...)");
                var bs = document.createElement('script');
                bs.type = "text/javascript";
                bs.src = "https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/js/bootstrap.min.js" + app.cacheCode;
                document.getElementsByTagName('head')[0].appendChild(bs);
                bs.onload = function () {
                    vodus.thirdPartyTest(app.thirdPartyTestType.firstLoad);
                };
            }

            var jqUI = document.createElement('script');
            jqUI.type = "text/javascript";
            jqUI.src = "//code.jquery.com/ui/1.12.1/jquery-ui.min.js";
            jqUI.className = "vodus-include"
            document.getElementsByTagName('head')[0].appendChild(jqUI);
            jqUI.onload = function () {
                var jqTouchUI = document.createElement('script');
                jqTouchUI.type = "text/javascript";
                jqTouchUI.src = "//cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js";
                jqTouchUI.className = "vodus-include"
                document.getElementsByTagName('head')[0].appendChild(jqTouchUI);
            };

            $('head').append($('<meta name="google-signin-scope" content="profile email">'));
            $('head').append($('<meta name="google-signin-client_id" content="700069321358-1t3lj52il4lrfcbffo31qbj78b46dind.apps.googleusercontent.com">'));
            $('head').append($('<script src="https://apis.google.com/js/platform.js" async defer></script>'));
        }

    }

    var init = function init() {
        console.log('Starting Vodus in 3');
        var myTimeout = setTimeout(function () {
            vodus.generateFingerPrint();
        }, 3000);
    }

    //renderButton
    var thirdPartyTest = function checkForThirdPartyCookiesSupport() {
        //  3P test
        if (app.skip3PCheck) {
            vodus.log("GetQuestion: Skipping 3P");
            vodus.initCallback();
        } else {
            if ($("#vodus3PTester").length == 0) {
                $("<div>").attr({
                    'class': "",
                    'id': "vodus3PTester"
                }).appendTo("body");
            }
            $("#vodus3PTester").html('<iframe id="tester" src="' + app.vodus3PRootUrl + '/thirdparty-cookie-check-start.html" style="display:none" />');
            var vodus3PTesterMessage = function checkThirdPartyCookiesAndDisplayMessage(evt) {
                if (evt.origin == app.vodus3PRootUrl) {
                    if (evt.origin.indexOf("goog") > 0) { } else {
                        if (evt.data === 'MM:3PCunsupported') {
                            window.removeEventListener("message", vodus3PTesterMessage, false);
                            app.thirdPartyEnabled = false;
                            app.skip3PCheck = true;
                            vodus.initCallback();
                        } else if (evt.data === 'MM:3PCsupported') {
                            window.removeEventListener("message", vodus3PTesterMessage, false);
                            app.skip3PCheck = true;

                            //  Test third party
                            if ($("#vodus3PCookie").length == 0) {
                                $("<div>").attr({
                                    'class': "",
                                    'id': "vodus3PCookie"
                                }).appendTo("body");
                            }

                            $("#vodus3PCookie").html('<iframe id="vodusIframe" width="0" height="0"  src="' + app.vodus3PRootUrl + '/v1/token/serverless?partnerCode=' + app.partner_code + '" frameborder="0" allowfullscreen></iframe>');

                            $("#vodusIframe").on('load', function () {
                                var iframe = document.getElementById('vodusIframe');
                                iframe.contentWindow.postMessage("hello", '*');

                            });
                            window.addEventListener("message", vodus3PCookie, false);

                            function vodus3PCookie(event) {
                                if (event.origin == app.vodus3PRootUrl) {
                                    if (event.origin.indexOf("goog") > 1) {
                                        vodus.log('invalid post message', app.logStatus.warning);
                                    } else {
                                        window.removeEventListener("message", vodus3PCookie, false);
                                        var decoded = $('<div>').html(event.data.trim()).text();
                                        vodus.createCookie(app.cookieName, decoded, 3650);
                                        app.thirdPartyEnabled = true;
                                        vodus.getQuestionBeforeInternal();
                                    }
                                }
                            }
                        }
                    }
                }
            };
            window.addEventListener("message", vodus3PTesterMessage, false);
        }
    }
    window.vodus = vodus;
    window.vodusInit = init;
    window.vodusInit();
}(this));

window.onresize = function () {
    repositionMobileImage($('.tingle-modal-box'));
}

//Resize question container
function repositionMobileImage(container) {

    if (typeof vodus === "undefined") {
        return;
    }
    var app = vodus.getAppData();

    if ($(container).find(".quesionaire-preview-question-mobile-preview").length > 0) {
        resizeMobileFontSize_Preview(container, app.ccType);
        $(container).find(".questionaire-container-size-variable").css("height", "fit-content");
        $(container).find(".mobile-question-container").css("height", "auto");
    }
}

function VodusRewardClickToClose() {
    closeAllVodusModal();
    vodus.submitCloseResponse();
    vodus.log('Rewards click to close');
    localizePage();
    i18next.reloadResources();
}

function closeAllVodusModal() {

    vodus.displayHeight = $(window).scrollTop();
    $(".ccType2").hide();
    $(".ccType3").hide();
    var aboutUsModal = vodus.getAboutUsModal();
    if (aboutUsModal != "") {
        if (aboutUsModal.isOpen()) {
            aboutUsModal.close();
        }
    }

    var questionModal = vodus.getQuestionModal();
    if (questionModal != "") {
        if (questionModal.isOpen()) {
            questionModal.close();
        }
    }

    var loginModal = vodus.getLoginModal();
    if (loginModal != "") {
        if (loginModal.isOpen()) {
            loginModal.close();
        }
    }

    var signupModal = vodus.getSignupModal();
    if (signupModal != "") {
        if (signupModal.isOpen()) {
            signupModal.close();
        }
    }
}

function BackButtonClick() {
    addShowGetQuestionModal();
}

function addLogoutEvent() {
    $('.btnVodusLogout').unbind('click');
    $(".btnVodusLogout").click(function () {
        isSubmitting = true;
        var app = vodus.getAppData();

        if (app.thirdPartyEnabled) {
            if ($("#vodus_3PTest").length == 0) {
                $("<div>").attr({
                    'class': "",
                    'id': "vodus_3PTest"
                }).appendTo("body");
            }
            if ($("#reward_3PTest").length == 0) {
                $("<div>").attr({
                    'class': "",
                    'id': "reward_3PTest"
                }).appendTo("body");
            }
            vodus.log('Clearing 3P...');
            $("#vodus_3PTest").html('<iframe id="vodus3PLogoutTest" width="0" height="0"  src="' + app.vodus3PRootUrl + '/v1/token/delete?partnerCode=' + app.partner_code + '" frameborder="0" allowfullscreen></iframe>');
            //  Remove token from rewards
            $("#reward_3PTest").html('<iframe id="reward3PLogoutTest" width="0" height="0"  src="' + app.reward3PRootUrl + '/token/delete-temporary-points?partnerCode=' + app.partner_code + '" frameborder="0" allowfullscreen></iframe>');

            $("#vodus3PLogoutTest").on('load', function () {
                var rewardLogoutCallback = vodus.getRewardLogoutCallback();
                vodus.log("Rewards logout callback => " + vodus.getRewardLogoutCallback());
                if (rewardLogoutCallback != null && rewardLogoutCallback.length > 0) {
                    closeAllVodusModal();
                    vodus.log("Logout callback -> " + rewardLogoutCallback);
                    $('#vodusQuestionModal').modal('hide');
                    closeAllVodusModal();
                    window[rewardLogoutCallback].apply(this, vodus.getRewardLogoutArgument());
                }
                closeAllVodusModal();
                if (app.language == "ms") {
                    toastr.success('', '<h4 style="padding:0 15px">Anda telah berjaya log keluar dari akaun Vodus anda.<h4>');
                } else if (app.language == "zh") {
                    toastr.success('', '<h4 style="padding:0 15px">您已成功登录您的Vodus帐户</h4>');
                } else {
                    toastr.success('', '<h4 style="padding:0 15px">You have successfully logged out from your Vodus account</h4>');
                }
                $("#toast-container").addClass("vodus-responded-toast");
            });

        } else {
            closeAllVodusModal();
            if (app.language == "ms") {
                toastr.success('', '<h4 style="padding:0 15px">Anda telah berjaya log keluar dari akaun Vodus anda.<h4>');
            } else if (app.language == "zh") {
                toastr.success('', '<h4 style="padding:0 15px">您已成功登录您的Vodus帐户</h4>');
            } else {
                toastr.success('', '<h4 style="padding:0 15px">Successfully logged out from your Vodus account</h4>');
            }
            $("#toast-container").addClass("vodus-responded-toast");
        }
        vodus.log("logging out...");
        vodus.createCookie(app.cookieName, '', -3650);
        vodus.createCookie('vodus_temp_token', '', -3650);
        vodus.createCookie('vodus_second_load_check', '', -3650);
        localStorage.clear();
        window.open(app.reward3PRootUrl + "/logout?partnerWebsiteId=" + app.partnerWebsiteId);
    });

}

function addShowLoginModalEvent() {

    var app = vodus.getAppData();
    var token = vodus.readCookie(app.cookieName);
    var tempToken = vodus.readCookie("vodus_temp_token");
    if (!app.thirdPartyEnabled) {
        if (token == null || token == "") {
            var tempToken = vodus.readCookie("vodus_temp_token");
            var redirectUrl = app.reward3PRootUrl + '/sync?syncType=2&partnerWebsiteId=' + app.partnerWebsiteId + '&questionId=' + app.questionId + '&questionType=' + app.surveyType + '&tempToken=' + tempToken + '&redirectUrl=' + encodeURI(window.location.href) + '&host=' + encodeURI(window.location.hostname)
            var syncType4 = app.reward3PRootUrl + '/sync?syncType=4&partnerWebsiteId=' + app.partnerWebsiteId + '&questionId=' + app.questionId + '&questionType=' + app.surveyType + '&tempToken=' + tempToken + '&redirectUrl=' + encodeURI(window.location.href) + '&host=' + encodeURI(window.location.hostname)
            $(".syncType4").attr("href", syncType4).attr("target", "_blank");
            $(".vodusLoginLink").attr("href", redirectUrl);
            $(".vodusSignupLink").attr("href", redirectUrl);
        }
        else {
            var redirectUrl = app.reward3PRootUrl + '/sync?syncType=2&partnerWebsiteId=' + app.partnerWebsiteId + '&questionId=' + app.questionId + '&questionType=' + app.surveyType + '&token=' + token + '&redirectUrl=' + encodeURI(window.location.href) + '&host=' + encodeURI(window.location.hostname)
            var syncType4 = app.reward3PRootUrl + '/sync?syncType=4&partnerWebsiteId=' + app.partnerWebsiteId + '&questionId=' + app.questionId + '&questionType=' + app.surveyType + '&token=' + token + '&redirectUrl=' + encodeURI(window.location.href) + '&host=' + encodeURI(window.location.hostname)

            $(".syncType4").attr("href", syncType4).attr("target", "_blank");
            $(".vodusLoginLink").attr("href", redirectUrl);
            $(".vodusSignupLink").attr("href", redirectUrl);
        }
    } else {
        $(".syncType4").attr("href", app.reward3PRootUrl).attr("href", app.reward3PRootUrl).attr("target", "_blank");
        $(".vodusLoginLink").attr("href", app.reward3PRootUrl + "/?login");
        $(".vodusSignupLink").attr("href", app.reward3PRootUrl + "/?login");
    }

    $(".closeQuestion").click(function () {
        closeAllVodusModal();
    });

    $(".syncType4").click(function () {
        vodus.createCookie("vodus_sync_clicked", "Y", 3650);
        if (app.viewType == "mobile-app") {
            vodusAndroidSdk.openUrl($(this).attr('href'));
            return false;
        }
    });

    $(".vodusLoginLink").click(function () {
        vodus.createCookie("vodus_sync_clicked", "Y", 3650);
        closeAllVodusModal();

        if (app.viewType == "mobile-app") {
            vodusAndroidSdk.openUrl($(this).attr('href'));
            return false;
        }
    });

    $(".vodusSignupLink").click(function () {
        vodus.createCookie("vodus_sync_clicked", "Y", 3650);
        closeAllVodusModal();
    });

    if (window.location.hostname.indexOf("vodus.my") > -1 || window.location.hostname.indexOf("voupon-uat.azurewebsites.net") > -1) {
        $(".syncType4").attr("href", "#").attr("target", "");
        $(".vodusLoginLink").attr("href", "#").attr("target", "");
        $(".vodusSignupLink").attr("href", "#").attr("target", "");

        $(".vodusLoginLink").click(function () {
            $(".vouponLogin").click();
            closeAllVodusModal();
        });

        $(".syncType4").attr("href", "#").attr("target", "");
    }
}

function scrollToBannerDiv(currentHeight) {
    $(".bootstrap-vodus").each(function () {
        if ($(this).css('display') == 'none') {
            $(this).remove();
        }
    });
    window.scrollTo(0, currentHeight);
}

function addShowGetQuestionModal() {
    var app = vodus.getAppData();
    //  Check if template contain ID=0, if yes, skip the rendering
    var hasIDZero = false;
    $($("#divQuestionaireEditorContainer").find('.answer-box')).each(function () {
        if ($(this).attr('id') == 0 || $(this).attr('id') == "0") {
            hasIDZero = true;
        }
    })

    if (app.viewType == "mobile-app") {
        $(".ctc-container").hide();
    }


    if (hasIDZero) {
        $("#divQuestionaireEditorContainer").find('img').remove();

        $("#divQuestionaireEditorContainer").find('.template-background-img').css("display", "none");

        if (!app.isAnswerIDZeroLogged) {
            app.isAnswerIDZeroLogged = true;
            $.ajax({
                type: "POST",
                dataType: 'json',
                async: true,
                global: false,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({
                    "Browser": app.browser,
                    "MemberProfileId": app.memberProfileId,
                    "Data": $("#divQuestionaireEditorContainer").html(),
                    "Token": vodus.getToken()
                }),
                url: app.serverlessUrl + '/api/logDataSyncFunction',
                success: function (response) {

                },
                error: function (err) {
                    vodus.log(err, app.logStatus.err);
                }
            });
        }
        return;
    }

    var currentScrollPosition = $(window).scrollTop();
    closeAllVodusModal();
    var questionModal = new tingle.modal({
        footer: false,
        stickyFooter: false,
        closeMethods: ['button'],
        closeLabel: "Close",
        cssClass: ['bootstrap-vodus', (app.ccType == "2" ? 'ccType2' : ((app.ccType == "3") ? "ccType3" : "ccType1"))],
        onOpen: function () {
            if (app.ccType == "2" || app.ccType == "3") {
                $("body").removeClass("tingle-enabled");
                repositionMobileImage($('.tingle-modal-box'));
                if (app.isBannerMode) {
                    $("body").css("top", "unset");
                }
            }
        },
        onClose: function () { },
        beforeOpen: function () {
            if (app.ccType == "2" || app.ccType == "3") {
                $(".tingle-modal__close").remove();
                $('.bootstrap-vodus').removeClass('tingle-modal').addClass(app.catfishPosition);
                //Place CCtype 2 in Banner Ad space if any      

                $(".click-to-close-div").hide();
                $(".vodus-banner").html("");
                if ($(".vodus-banner").length > 0 && app.ccType == "3" && app.isBannerMode) {
                    $(".bootstrap-vodus").detach().appendTo(".vodus-banner");
                } else if ($(".vodus-banner").length > 0 && app.ccType == "2" && app.isBannerMode) {
                    $(".bootstrap-vodus").detach().appendTo(".vodus-banner");
                }
            }
        }
    });
    var app = vodus.getAppData();
    if (vodus.getPixelData() != "") {
        vodus.log('Pixel: ' + vodus.getPixelData());

        var pixel = '<img id="pixel" src="' + vodus.getPixelData() + '" style="display:none">'
        questionModal.setContent($("#vodusQuestionModal").html() + pixel);
        $("#divQuestionaireEditorContainer").html(app.questionData.data.QuestionTemplateContent);
    } else {
        vodus.log('No Pixel data.');
        questionModal.setContent($("#vodusQuestionModal").html());
        $("#divQuestionaireEditorContainer").html(app.questionData.data.QuestionTemplateContent);
    }

    app.isUrlSyncRequired = true;
    var token = vodus.readCookie(app.cookieName);
    if (app.isUrlSyncRequired) {
        app.surveyType = 1;
        if (!app.thirdPartyEnabled) {
            $(".iHaveSeenThisQuestionBefore").click(function () {
                vodus.createCookie("vodus_sync_clicked", "Y", 3650);
            });
            var isSyncClicked = vodus.readCookie("vodus_sync_clicked");
            if (isSyncClicked == null || isSyncClicked == "") {
                if (token == null || token == "") {

                    var tempToken = vodus.readCookie("vodus_temp_token");

                    $(".answered-before").show();
                    $(".iHaveSeenThisQuestionBefore").attr("href", app.reward3PRootUrl + '/sync?syncType=1&partnerWebsiteId=' + app.partnerWebsiteId + '&questionId=' + app.questionId + '&questionType=' + app.surveyType + '&tempToken=' + tempToken + '&redirectUrl=' + encodeURI(window.location.href) + '&host=' + encodeURI(window.location.hostname));
                    //$(".tablet-footer-bar-vodus").prepend('<a class="closeQuestion i18next" target="_blank" href="' + app.reward3PRootUrl + '/sync?syncType=1&partnerWebsiteId=' + app.partnerWebsiteId + '&questionId=' + app.questionId + '&questionType=' + app.surveyType + '&tempToken=' + tempToken + '&redirectUrl=' + encodeURI(window.location.href) + '&host=' + encodeURI(window.location.hostname) + '" style="display: flex;width: 33%;margin: 10px auto;color: #222;text-decoration: underline;">I have seen this question before</p>');
                    $(".iHaveSeenThisQuestionBefore").click(function () {
                        closeAllVodusModal();
                    });
                }
                else {
                    if (app.email == null || app.email == "") {
                        $(".answered-before").show();
                        $(".iHaveSeenThisQuestionBefore").attr("href", app.reward3PRootUrl + '/sync?syncType=1&partnerWebsiteId=' + app.partnerWebsiteId + '&questionId=' + app.questionId + '&questionType=' + app.surveyType + '&token=' + token + '&redirectUrl=' + encodeURI(window.location.href) + '&host=' + encodeURI(window.location.hostname));
                        //$(".tablet-footer-bar-vodus").prepend('<a class="closeQuestion i18next" target="_blank" href="' + app.reward3PRootUrl + '/sync?syncType=1&partnerWebsiteId=' + app.partnerWebsiteId + '&questionId=' + app.questionId + '&questionType=' + app.surveyType + '&tempToken=' + tempToken + '&redirectUrl=' + encodeURI(window.location.href) + '&host=' + encodeURI(window.location.hostname) + '" style="display: flex;width: 33%;margin: 10px auto;color: #222;text-decoration: underline;">I have seen this question before</p>');
                        $(".iHaveSeenThisQuestionBefore").click(function () {
                            closeAllVodusModal();
                        });
                    }
                }
            }
        }
    }

    vodus.setQuestionModal(questionModal);
    questionModal.open();

    reinitModalEvent();
    getQuestionHandler();
    if (app.isBannerMode) {
        scrollToBannerDiv(currentScrollPosition);
    }

    if (app.pipeList != null && app.pipeList != "") {
        vodus.log('Piping...');

        var isTitlePiping = false;
        var pipelistCount = 0;
        var titleContent = $('.question-header-1').eq(0).html();
        for (var i in app.pipeList) {
            isTitlePiping = false;
            isAutoGen = false;
            pipelistCount++;
            var ans = app.pipeList[i].split('::').pop();

            var splittedAnswers = ans.split(' && ');

            if (app.pipeAnswerIdList != null && app.pipeAnswerIdList.length > 0) {
                splittedIds = app.pipeAnswerIdList;
            }
            else {
                if (app.idsForPipeList != null) {
                    var ids = app.idsForPipeList[i].split(':').shift();
                    var splittedIds = ids.split(' & ');
                }
            }

            var isAutoGenAnswer = true;
            if ($("#GridMultipleAnswersPipingId").length) {
                isAutoGenAnswer = true ? $("#GridMultipleAnswersPipingId").html().includes(i) : false;
            }

            if (titleContent.includes(i) && !isAutoGenAnswer) {
                isTitlePiping = true;
            }
            if ($("#GridMultipleAnswersPipingId").length) {
                if ($("#GridMultipleAnswersPipingId").html().includes(i)) {
                    isAutoGen = true;
                }
            }
            var isPsyAutoGenPiping = false;
            if ($("#PsychographicMultipleAnswersPiping").length) {
                isPsyAutoGenPiping = true;
            }
            var isPsyPiping = false;
            var isQuestionPiping = false;
            if (i.indexOf('@') >= 0) {
                newTitle = $('.question-header-1').eq(0).html().split(i.substring(0, i.lastIndexOf('@') + 1)).join(app.pipeList[i]).replace(/\~/g, '&');
                isQuestionPiping = true;
            } else if (i.indexOf('^') >= 0) {
                newTitle = $('.question-header-1').eq(0).html().split(i.substring(0, i.lastIndexOf('^') + 1)).join(app.pipeList[i]).replace(/\~/g, '&');
                isPsyPiping = true;
            }

            $('.question-header-1').eq(0).html(newTitle);
            $('.question-header-1').eq(1).html(newTitle);
            // Replace answer box
            $(".answer-box").each(function () {
                $(this).find('.s-editable-text').each(function () {
                    if (isQuestionPiping) {
                        if ($(this).attr('id') == "GridMultipleAnswersPipingId" && app.questionData.data.QuestionTypeId == 5) {
                            return true;
                        }
                        var content = $(this).html().split(i.substring(0, i.lastIndexOf('@') + 1)).join(app.pipeList[i]);
                    } else if (isPsyPiping) {
                        if ($(this).attr('id') == "GridMultipleAnswersPipingId" && app.questionData.data.QuestionTypeId == 5) {
                            return true;
                        }
                        var content = $(this).html().split(i.substring(0, i.lastIndexOf('^') + 1)).join(app.pipeList[i]);
                    }
                    content = content.replace(/\~/g, '&');
                    $(this).html(content);
                });
            });
            if (isQuestionPiping || isPsyPiping) {
                if (app.pipeAnswerIdList != null) {
                    if (app.pipeAnswerIdList.length > 5) {
                        $(".template-preview-answer-to-display-table-content").attr("col", "2");
                    }
                }
                $(".template-preview-answer-to-display-table-content").addClass("autogen-answer");
            }

            if ($("#GridMultipleAnswersPipingId").length && app.questionData.data.QuestionTypeId == 1 && app.isMobile) {
                $(".template-preview-answer-to-display").each(function () {
                    $(this).find('.s-editable-text').each(function () {
                        if ($(this).attr("id") == "GridMultipleAnswersPipingId") {

                            if (isTitlePiping || !isAutoGen) {
                                return true;
                            }
                            var response = app.questionData;
                            var answerElementCount = 0;

                            if ($("#divQuestionaireEditorContainer").find(".answer-box").length == response.data.SurveyQuestionAnswers.length) {
                                $(response.data.SurveyQuestionAnswers).each(function () {
                                    if (response.data.DemographicTypeId === 0) {
                                        $(".answer-box").eq(answerElementCount).attr('id', this.Id);
                                        $(".answer-box").eq(answerElementCount).attr('data-redirect-url', this.RedirectUrl);
                                        answerElementCount++;
                                    }
                                });
                            }
                            else {
                                if (response.data.SurveyQuestionAnswers.length == 2) {
                                    for (var ans = 0; ans < $("#divQuestionaireEditorContainer").find(".answer-box").length - 1; ans++) {
                                        $(".answer-box").eq(answerElementCount).attr('id', response.data.SurveyQuestionAnswers[0].Id);
                                        $(".answer-box").eq(answerElementCount).attr('data-redirect-url', response.data.SurveyQuestionAnswers[0].RedirectUrl);
                                        answerElementCount++;
                                    }

                                    //  Set last item

                                    $(".answer-box").eq(answerElementCount).attr('id', response.data.SurveyQuestionAnswers[1].Id);
                                    $(".answer-box").eq(answerElementCount).attr('data-redirect-url', response.data.SurveyQuestionAnswers[1].RedirectUrl);


                                }
                                else {
                                    $(response.data.SurveyQuestionAnswers).each(function () {
                                        if (response.data.DemographicTypeId === 0) {
                                            $(".answer-box").eq(answerElementCount).attr('id', this.Id);
                                            $(".answer-box").eq(answerElementCount).attr('data-redirect-url', this.RedirectUrl);
                                            answerElementCount++;
                                        }
                                    });
                                }
                            }


                            var idsCounter = 0;
                            for (var answer in splittedAnswers) {
                                var element = $(this).parent().clone(true, true);
                                splittedAnswers[answer] = splittedAnswers[answer].replace(/\~/g, '&');
                                element.find('.s-editable-text').html(splittedAnswers[answer]);
                                element.attr('data-pipe-answer-id', splittedIds[idsCounter]);
                                element.addClass('AutoGenPiping');
                                $(this).parent().parent().prepend(element);
                                idsCounter++;
                            }

                            $(this).parent().remove();
                        }
                    });
                });
            } else if ($("#GridMultipleAnswersPipingId").length && app.questionData.data.QuestionTypeId == 2 && app.isMobile) {
                $(".template-preview-answer-to-display").each(function () {
                    $(this).find('.s-editable-text').each(function () {
                        if ($(this).attr("id") == "GridMultipleAnswersPipingId") {
                            if (isTitlePiping || !isAutoGen) {
                                return true;
                            }
                            var response = app.questionData;
                            $(".s-selectable-text").css("border", "none");
                            var answerElementCount = 0;

                            $(response.data.SurveyQuestionAnswers).each(function () {
                                if (response.data.DemographicTypeId === 0) {
                                    $(".survey-mcqsa-div").eq(answerElementCount).attr('id', this.Id);
                                    $(".survey-mcqsa-div").eq(answerElementCount).attr('data-redirect-url', this.RedirectUrl);
                                    answerElementCount++;
                                }
                            });

                            var idsCounter = 0;
                            for (var answer in splittedAnswers) {

                                var questionText = $(this).html().split(i.substring(0, i.indexOf('@') + 3)).join(splittedAnswers[answer]);

                                var element = $(this).parent().clone(true, true);
                                splittedAnswers[answer] = splittedAnswers[answer].replace(/\~/g, '&');
                                element.find('.s-editable-text').html(splittedAnswers[answer]);
                                element.attr('data-pipe-answer-id', splittedIds[idsCounter]);
                                element.addClass('AutoGenPiping');
                                $(this).parent().parent().prepend(element);
                                idsCounter++;
                            }
                            $(this).parent().remove();
                        }
                    });
                });
            } else if ($("#PsychographicMultipleAnswersPiping").length && app.questionData.data.QuestionTypeId == 1 && app.isMobile) {
                $(".template-preview-answer-to-display").each(function () {
                    $(this).find('.s-editable-text').each(function () {
                        if (isTitlePiping || !isPsyAutoGenPiping) {
                            return true;
                        }
                        if ($(this).attr("id") == "PsychographicMultipleAnswersPiping") {
                            var response = app.questionData;
                            var answerElementCount = 0;
                            $(response.data.SurveyQuestionAnswers).each(function () {
                                if (response.data.DemographicTypeId === 0) {
                                    $(".survey-mcqsa-div").eq(answerElementCount).attr('id', this.Id);
                                    $(".survey-mcqsa-div").eq(answerElementCount).attr('data-redirect-url', this.RedirectUrl);
                                    answerElementCount++;
                                }
                            });
                            var idsCounter = 0;
                            for (var answer in splittedAnswers) {

                                var element = $(this).parent().clone(true, true);
                                splittedAnswers[answer] = splittedAnswers[answer].replace(/\~/g, '&');
                                element.find('.s-editable-text').html(splittedAnswers[answer]);
                                element.attr('data-pipe-answer-id', splittedIds[idsCounter]);
                                element.addClass('AutoGenPiping');
                                $(this).parent().parent().prepend(element);
                                idsCounter++;
                            }
                            $(this).parent().remove();
                        }
                    });
                });
            } else if ($("#PsychographicMultipleAnswersPiping").length && app.questionData.data.QuestionTypeId == 2 && app.isMobile) {
                $(".template-preview-answer-to-display").each(function () {
                    $(this).find('.s-editable-text').each(function () {
                        if (isTitlePiping || !isPsyAutoGenPiping) {
                            return true;
                        }
                        if ($(this).attr("id") == "PsychographicMultipleAnswersPiping") {
                            var response = app.questionData;
                            $(".s-selectable-text").css("border", "none");

                            var idsCounter = 0;
                            for (var answer in splittedAnswers) {
                                var element = $(this).parent().clone(true, true);
                                splittedAnswers[answer] = splittedAnswers[answer].replace(/\~/g, '&');
                                element.find('.s-editable-text').html(splittedAnswers[answer]);
                                element.attr('data-pipe-answer-id', splittedIds[idsCounter]);
                                element.addClass('AutoGenPiping');
                                $(this).parent().parent().prepend(element);
                                idsCounter++;
                            }

                            $(this).parent().remove();
                        }
                    });
                });
            } else if ($("#PsychographicMultipleAnswersPiping").length && (app.questionData.data.QuestionTypeId == 1 || app.questionData.data.QuestionTypeId == 2) && !app.isMobile) {
                // Replace answer box
                $(".answer-row").each(function () {
                    $(this).find('.s-editable-text').each(function () {
                        if (isTitlePiping || !isPsyAutoGenPiping) {
                            return true;
                        }
                        if ($(this).attr("id") == "PsychographicMultipleAnswersPiping") {
                            var currentCol = 1;

                            var currnetRow = $(this).parent().parent();

                            var colNumber = parseInt($(this).parent().parent().parent().attr("col"));
                            if (isNaN(colNumber)) {
                                colNumber = 2;
                            }

                            for (var answer in splittedAnswers) {
                                var questionText = $(this).html().split(i.substring(0, i.indexOf('@') + 3)).join(splittedAnswers[answer]);
                                var element = $(this).parent().clone(true, true);
                                splittedAnswers[answer] = splittedAnswers[answer].replace(/\~/g, '&');
                                element.find('.s-editable-text').html(splittedAnswers[answer]);
                                element.attr('data-pipe-answer-id', splittedIds[currentCol - 1]);
                                element.addClass('AutoGenPiping');
                                $(currnetRow).prepend(element);
                                currentCol++;
                            }
                            var rows = $(this).parent().parent().parent().find('.answer-row').length - 1;

                            $(this).parent().parent().parent().find('.answer-row').each(function () {
                                $(this).css("height", 100 / rows + "%");
                            });
                            var target = $(this).parent().parent().parent();
                            $(this).parent().remove();

                            ColFormating(target);
                        }
                    });
                });
            } else {
                $(".answer-box").each(function () {
                    $(this).find('.s-editable-text').each(function () {
                        if ($(this).parent().parent().attr('class') == "grid-header") {
                            return true;
                        }
                        if ($("#GridMultipleAnswersPipingId").length && app.questionData.data.QuestionTypeId == 5) {
                            if (isTitlePiping || !isAutoGen) {
                                return true;
                            }
                            if ($(this).attr("id") == "GridMultipleAnswersPipingId") {
                                var currentGridRow = 1;
                                var currentRow = 101;
                                var idsCounter = 0;
                                for (var answer in splittedAnswers) {
                                    if (i.indexOf('@') > 0) {
                                        var questionText = $(this).html().split(i.substring(0, i.indexOf('@') + i.length + 1)).join(splittedAnswers[answer]);
                                    } else {
                                        var questionText = $(this).html().split(i.substring(0, i.indexOf('^') + i.length + 1)).join(splittedAnswers[answer]);
                                    }
                                    var element = $(this).parent().parent().clone(true, true);
                                    questionText = questionText.replace(/\~/g, '&');
                                    element.find('.s-editable-text').html(questionText);

                                    $(this).parent().parent().parent().children().first().after(element);

                                    element.find()
                                    element.find('.gridOption').each(function () {
                                        $(this).attr("id", "grid_row_" + currentRow);
                                        $(this).attr("name", "grid_row_" + currentRow);
                                        $(this).attr('data-pipe-answer-id', splittedIds[idsCounter]);
                                        $(this).addClass('AutoGenPiping');
                                    });
                                    currentRow++;
                                    idsCounter++;
                                }
                                $(this).parent().parent().remove();
                            }
                        }
                        // For MCQ Auto Get Piping
                        else if ($("#GridMultipleAnswersPipingId").length && (app.questionData.data.QuestionTypeId == 1 || 2) && !app.isMobile) {
                            if (isTitlePiping || !isAutoGen) {
                                return true;
                            }
                            if ($(this).attr("id") == "GridMultipleAnswersPipingId") {

                                var numberOfRows = $("#divQuestionaireEditorContainer").find(".answer-row").length;
                                var currentCol = 1;

                                var currnetRow = $(this).parent().parent();

                                var colNumber = parseInt($(this).parent().parent().parent().attr("col"));
                                if (isNaN(colNumber)) {
                                    colNumber = 2;
                                }

                                for (var answer in splittedAnswers) {
                                    var questionText = $(this).html().split(i.substring(0, i.indexOf('@') + 3)).join(splittedAnswers[answer]);

                                    var element = $(this).parent().clone(true, true);
                                    splittedAnswers[answer] = splittedAnswers[answer].replace(/\~/g, '&');
                                    element.find('.s-editable-text').html(splittedAnswers[answer]);
                                    element.attr('data-pipe-answer-id', splittedIds[currentCol - 1]);
                                    element.addClass('AutoGenPiping');
                                    $(currnetRow).prepend(element);
                                    currentCol++;
                                }
                                var rows = $(this).parent().parent().parent().find('.answer-row').length - 1;

                                $(this).parent().parent().parent().find('.answer-row').each(function () {
                                    $(this).css("height", 100 / rows + "%");
                                });
                                var target = $(this).parent().parent().parent();
                                $(this).parent().remove();

                                ColFormating(target);
                            }
                        }
                    });
                });
            }


        }
    }
    else {
        if ($(".answer-box").length > 0) {
            if ($($(".answer-box")[0]).attr("id") != undefined) {
                if ($($(".answer-box")[0]).attr("id").includes("_")) {
                    for (var item = 0; item < app.questionData.data.SurveyQuestionAnswers.length; item++) {
                        var sequenceNumber = app.questionData.data.SurveyQuestionAnswers[item].AnswerSequenceNumber - 1;
                        if ($(".answer-box .s-editable-text" + "#" + sequenceNumber).length == 1) {
                            $(".answer-box .s-editable-text" + "#" + sequenceNumber).parent().attr("id", app.questionData.data.SurveyQuestionAnswers[item].Id);
                        } else {
                            if (document.querySelectorAll(".answer-box")[item] != null) {
                                document.querySelectorAll(".answer-box")[item].setAttribute("id", app.questionData.data.SurveyQuestionAnswers[item].Id);
                            }
                        }
                    }
                }
            }
        }
    }

    function ColFormating(target) {
        var defaultStyle = $(target).find(".answer-box").first().attr("style");

        var newCol = isNaN(parseInt($(target).attr("col"))) ? 2 : parseInt($(target).attr("col"));
        var totalAns = parseInt($(target).find("div.answer-box").length);
        var newWidth = 100 / (totalAns == 1 ? totalAns : newCol);
        var newHeight = (100 / Math.ceil(totalAns / newCol));

        var currentCol = 0;
        var asnLength = totalAns - 1;
        var row = "<div class='answer-row' style='height:" + newHeight + "%'></div>";
        var body = $.parseHTML("<div>" + row + "</div>");
        var newRow = "<div class='answer-row' style='height:" + newHeight + "%'>";
        var ansType = $(target).find("div.survey-mcqma-div").length > 0 ? "survey-mcqma-div selectedAnswer" : "survey-mcqsa-div";

        $(target).attr("col", $(target).attr("col"));

        $(target).find("div.answer-box").each(function (idx) {
            $(body).find(".answer-row").last().append(this);
            currentCol = currentCol + 1;

            if (currentCol >= newCol) {
                if (idx != asnLength) {
                    $(body).append($(row));
                }

                currentCol = 0;
            }
        })
        $(target).html("");
        $(target).append($(body).children().unwrap());
        $(target).find(".answer-box").css("width", newWidth + "%");
    }

    if (!app.skipQuestionStatusCheck) {
        vodus.checkSurveyQuestionStatus();
    }
    //  Add dynamic animation to loader
    // $(".question-countdown-bar-black").css("animation", "QUESTION-LOADER " + delayLength + "s");

    $(".survey-mcqsa-div").addClass("disabledButtons");
    if (app.questionData.data.QuestionTypeId != 6) {
        $(".survey-submit-btn").addClass("disabledButtons");
    }
    $(".survey-mcqsa-div").addClass("ripple");
    $(".survey-submit-btn").wrap('<a class="btn ripple" style="padding:0;margin:0;"></a>');


    if (app.QuestionTypeId == 6 || app.QuestionTypeId == 7 || app.QuestionTypeId == 8) {
        //  submit buttons
        $(".survey-submit-btn").prop("disabled", true);
        $(".survey-submit-btn").addClass("greyOutButton");
    }
    if (app.modalClosable) {
        if (parseInt(app.ctcTimer) > 0) {
            if ($(".vodusAvailablePoints").html() < 5) {
                if (isNaN(parseInt($('.timer-seconds').html()))) {
                    $(".timer-seconds").html(app.ctcTimer);
                    $(".wait-to-close-div").show();
                }
            } else {
                $(".wait-to-close-div").hide();
                $(".click-to-close-div").show();

                $(".click-to-close-div").click(function () {
                    if (app.checkCounterTimer != null) {
                        clearInterval(app.checkCounterTimer);
                    }
                    vodus.submitCloseResponse();
                    showCloseMessage();
                });
            }
        } else if (app.ctcTimer == 0) {
            $(".wait-to-close-div").hide();
            $(".click-to-close-div").show();

            $(".click-to-close-div").click(function () {
                if (app.checkCounterTimer != null) {
                    clearInterval(app.checkCounterTimer);
                }
                vodus.submitCloseResponse();
                showCloseMessage();
            });
        } else {
            $(".wait-to-close-div").hide();
        }
    }

    NoCCCheckIsSurveyFallbackScript(app.isSurveyFallbackScript, app.GAMAdUnitId);
    if (app.viewType == "mobile-app") {
        if (app.containerHeight != null && app.containerHeight != 0) {
            var height = Math.floor((app.containerHeight - (96 * window.devicePixelRatio)) / window.devicePixelRatio);
            $("#divQuestionaireEditorContainer").css("height", height + "px");
            $(".questionaire-container-size-variable").css("height", height + "px");
            $(".questionaire-container-size-variable").css("max-height", height + "px");
            $(".mobile-question-container").css("max-width", "100%");
            $(".modal-dialog").css("max-width", "100%");
            $(".left-header-container").css("width", "20%");
            $(".center-header-container").css("width", "75%");
            $(".tingle-enabled").css("position", "unset").css("overflow", "auto").css("margin", "8px 0");
        }
    }
    $("#divQuestionaireEditorContainer").css("opacity", "").css("max-height", "");
}

function reinitModalEvent() {
    addShowLoginModalEvent();
    addLogoutEvent();
}

function getQuestionHandler() {
    var app = vodus.getAppData();
    var response = app.questionData;

    var submitEnabled = false;
    var counter = response.data.QuestionDelayLengthInSeconds;
    var delayLength = response.data.QuestionDelayLengthInSeconds;
    var startTime = null;
    if (counter == null || counter == 0) {
        counter = 5;
    }

    $(".rewardCloseButton").click(function () {
        closeAllVodusModal();
    });

    var handler = function submitAnswerClickRippleEffect(e) {
        // create .ink element if it doesn't exist
        var rippler = $(this);
        rippler.append("<span class='ink'></span>");

        // prevent quick double clicks
        var ink = rippler.find(".ink");
        ink.removeClass("animate");

        // set .ink diametr
        if (!ink.height() && !ink.width()) {
            var d = Math.max(rippler.outerWidth(), rippler.outerHeight());
            ink.css({
                height: d,
                width: d
            });
        }

        // get click coordinates
        var x = e.pageX - rippler.offset().left - ink.width() / 2;
        var y = e.pageY - rippler.offset().top - ink.height() / 2;

        // set .ink position and add class .animate
        ink.css({
            top: y + 'px',
            left: x + 'px'
        }).addClass("animate");

    };
    $(".ripple-effect").bind('click', handler);

    if (app.isMobile) {
        $(".vodus-survey-question-container").css("display", "block");
        $(".vodus-survey-question-container").css("background-color", "transparent");
    } else {
        $(".hide-mcqsa-mcqma-image-answer").removeClass("hide-mcqsa-mcqma-image-answer");
    }

    var orderNumber = 0;
    var answerIdList = [];
    var answerElementCount = 0;
    var answerSequence = 1;

    app.demographicSurveyType = response.data.DemographicTypeId;
    //  Question type 1: multiple choice single answer
    if (response.data.QuestionTypeId === 1) {
        $(response.data.SurveyQuestionAnswers).each(function () {
            if (response.data.DemographicTypeId === 0) {
                var sequenceNumber = response.data.SurveyQuestionAnswers[answerElementCount].AnswerSequenceNumber - 1;
                if ($(".answer-box .s-editable-text" + "#" + sequenceNumber).length == 1) {
                    //For psycho MCQ to map AnswerID against AnswerSequence
                    $(".answer-box .s-editable-text" + "#" + sequenceNumber).parent().attr("id", app.questionData.data.SurveyQuestionAnswers[answerElementCount].Id);
                } else {
                    $(".answer-box").eq(answerElementCount).attr('id', this.Id);
                }
                $(".answer-box").eq(answerElementCount).attr('data-redirect-url', this.RedirectUrl);
                answerElementCount++;
            }
        });
        $(".answer-box").click(function () {
            if (!submitEnabled) {
                return false;
            }
            var consistOthers = false;
            if (response.data.DemographicTypeId === 0) {
                if (
                    $(this).find('.s-editable-text').text().toLowerCase() === "other" ||
                    $(this).find('.s-editable-text').text().toLowerCase() === "others" ||
                    $(this).find('.s-editable-text').text().toLowerCase() === ""
                ) {
                    consistOthers = false; // Set it to false to disable other, showing input text
                }
            }
            if (consistOthers) {
                var customAnswer = '<div class="input-group" style="margin:10px;">';
                customAnswer += '<textarea class="form-control customAnswer" placeholder="Please specify"></textarea>';
                customAnswer += '<span class="input-group-btn">';
                customAnswer += '<button class="survey-submit-btn wisteria-flat-button" type="button" style="margin-left:5px;">Submit</button>';
                customAnswer += '</span>';
                customAnswer += '</div>';

                $(this).find('.s-editable-text').parent().html(customAnswer);
                $(".survey-submit-btn").off();
                $(".survey-submit-btn").click(function () {
                    if (
                        $(this).parent().parent().parent().find('.customAnswer').val() === "" ||
                        $(this).parent().parent().parent().find('.customAnswer').val().toLowerCase() === "please specify"
                    ) {
                        $(".customAnswer").addClass("please-specify");
                        return false;
                    }
                    //else {
                    vodus.setRedirectUrl($(".survey-submit-btn").closest('.survey-mcqsa-div').attr('data-redirect-url'));
                    var answer = {
                        id: $(".survey-submit-btn").closest('.survey-mcqsa-div').attr('id'),
                        pipeSurveyQuestionAnswerId: ($(".survey-submit-btn").closest('.survey-mcqsa-div').attr('data-pipe-answer-id') == undefined ? 0 : $(".survey-submit-btn").closest('.survey-mcqsa-div').attr('data-pipe-answer-id')),
                        isAutoGenPiping: ($(".survey-submit-btn").closest('.survey-mcqsa-div').hasClass('AutoGenPiping') ? 1 : 0),
                        answerValue: $(this).parent().parent().parent().find('.customAnswer').val(),
                        otherAnswer: $(this).parent().parent().parent().find('.customAnswer').val(),
                        skipDefaultValue: false,
                        orderNumber: ($(this).attr('data-order-number') == undefined ? 1 : $(this).attr('data-order-number'))
                    }
                    answerIdList.push(answer);

                    var endTime = new Date();
                    var diff = Math.round((endTime.getTime() / 1000) - (startTime.getTime() / 1000));
                    var respondTimeInSeconds = (diff + delayLength);

                    var surveyResponseViewModel = {
                        CommercialId: response.data.CommercialId,
                        SurveyQuestionId: response.data.Id,
                        SurveyQuestionTypeId: response.data.QuestionTypeId,
                        DemographicTypeId: response.data.DemographicTypeId,
                        TierId: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.Id),
                        TierNumber: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.TierNumber),
                        SequenceNumber: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.SequenceNumber),
                        ParentId: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.ParentId),
                        SurveyType: response.data.SurveyType,
                        SelectedResponseList: answerIdList,
                        Token: vodus.readCookie(app.cookieName),
                        PartnerCode: app.partner_code,
                        RespondTimeInSeconds: respondTimeInSeconds,
                        PartnerData: vodus.getPartnerData(),
                        ccType: app.ccType,
                    };

                    submitEnabled = false;
                    vodus.setSurveyResponse(surveyResponseViewModel);
                    vodus.submitResponse();
                });
            } else {
                var answer = {
                    id: $(this).attr('id'),
                    pipeSurveyQuestionAnswerId: ($(this).attr('data-pipe-answer-id') == undefined ? 0 : $(this).attr('data-pipe-answer-id')),
                    isAutoGenPiping: ($(this).hasClass('AutoGenPiping') ? 1 : 0),
                    redirectUrl: $(this).attr('data-redirect-url'),
                    answerValue: $(this).find('.s-editable-text').text(),
                    skipDefaultValue: false,
                    orderNumber: ($(this).attr('data-order-number') == undefined ? 1 : $(this).attr('data-order-number'))
                }
                vodus.setRedirectUrl($(this).attr('data-redirect-url'));
                answerIdList.push(answer);

                var endTime = new Date();
                var diff = Math.round((endTime.getTime() / 1000) - (startTime.getTime() / 1000));
                var respondTimeInSeconds = (diff + delayLength);

                var surveyResponseViewModel = {
                    CommercialId: response.data.CommercialId,
                    SurveyQuestionId: response.data.Id,
                    SurveyQuestionTypeId: response.data.QuestionTypeId,
                    DemographicTypeId: response.data.DemographicTypeId,
                    TierId: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.Id),
                    TierNumber: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.TierNumber),
                    SequenceNumber: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.SequenceNumber),
                    ParentId: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.ParentId),
                    SurveyType: response.data.SurveyType,
                    SelectedResponseList: answerIdList,
                    Token: vodus.readCookie(app.cookieName),
                    PartnerCode: app.partner_code,
                    RespondTimeInSeconds: respondTimeInSeconds,
                    PartnerData: vodus.getPartnerData(),
                    ccType: app.ccType,
                };

                submitEnabled = false;
                vodus.setSurveyResponse(surveyResponseViewModel);
                vodus.submitResponse();
                $("#vodusLoader").css('display', 'flex');
            }
        });

        initMcqOpenEndedAnswer($("#divQuestionaireEditorContainer"), app.isMobile);
        $(".open-ended-mcq").find("input[type=button]").unbind("click");
        $(".open-ended-mcq").find("input[type=button]").unbind("onclick");
        $(".open-ended-mcq").find("input[type=button]").on("click", function (e) {


            answerIdList = [];
            var answer = {
                id: $(this).parent().parent().attr('id'),
                pipeSurveyQuestionAnswerId: ($(this).parent().parent().attr('data-pipe-answer-id') == undefined ? 0 : $(this).parent().parent().attr('data-pipe-answer-id')),
                isAutoGenPiping: ($(this).parent().parent().hasClass('AutoGenPiping') ? 1 : 0),
                redirectUrl: $(this).parent().parent().attr('data-redirect-url'),
                answerValue: $(this).siblings("textarea").val(),
                skipDefaultValue: true,
                orderNumber: ($(this).attr('data-order-number') == undefined ? 1 : $(this).attr('data-order-number'))
            }

            answerIdList.push(answer);

            var endTime = new Date();
            var diff = Math.round((endTime.getTime() / 1000) - (startTime.getTime() / 1000));
            var respondTimeInSeconds = (diff + delayLength);

            var surveyResponseViewModel = {
                CommercialId: response.data.CommercialId,
                SurveyQuestionId: response.data.Id,
                SurveyQuestionTypeId: response.data.QuestionTypeId,
                DemographicTypeId: response.data.DemographicTypeId,
                TierId: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.Id),
                TierNumber: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.TierNumber),
                SequenceNumber: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.SequenceNumber),
                ParentId: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.ParentId),
                SurveyType: response.data.SurveyType,
                SelectedResponseList: answerIdList,
                Token: vodus.readCookie(app.cookieName),
                PartnerCode: app.partner_code,
                RespondTimeInSeconds: respondTimeInSeconds,
                PartnerData: vodus.getPartnerData(),
                ccType: app.ccType,
            }
            submitEnabled = false;
            vodus.setSurveyResponse(surveyResponseViewModel);
            vodus.submitResponse();
            //$(".modal-body").addClass("submitted-question");
            $("#vodusLoader").css('display', 'flex');

            e.stopPropagation();
        })

        if ($("#divQuestionaireEditorContainer").find(".question-header-1").first().attr("israndomize") == "true") {
            if ($("#divQuestionaireEditorContainer .template-preview-answer-to-display-table-content").hasClass("grid-boolean")) {
                randomizeGridBooleanRows($("#divQuestionaireEditorContainer .grid-boolean"));
            } else {
                vodus.log("Randomize Grid Boolean 2");
                makeMCQAnswersSortable($("#divQuestionaireEditorContainer"), app.isMobile);
            }
        }
    } else if (response.data.QuestionTypeId === 2) {
        $(response.data.SurveyQuestionAnswers).each(function () {
            var sequenceNumber = response.data.SurveyQuestionAnswers[answerElementCount].AnswerSequenceNumber - 1;
            if ($(".answer-box .s-editable-text" + "#" + sequenceNumber).length == 1) {
                //For psycho MCQ to map AnswerID against AnswerSequence
                $(".answer-box .s-editable-text" + "#" + sequenceNumber).parent().attr("id", app.questionData.data.SurveyQuestionAnswers[answerElementCount].Id);
            } else {
                $(".answer-box").eq(answerElementCount).attr('id', this.Id);
            }
            answerSequence++;
            answerElementCount++;
        });

        $(".answer-box").click(function () {
            if ($(this).hasClass("selectedAnswer")) {
                $(this).removeClass("selectedAnswer");
            } else {
                orderNumber++;
                $(this).addClass("selectedAnswer");
                $(this).attr('data-order-number', orderNumber)
            }
        });

        initMcqOpenEndedAnswer($("#divQuestionaireEditorContainer"), app.isMobile);

        $('.survey-submit-btn').click(function () {
            answerIdList = [];
            if (!submitEnabled) {
                return false;
            }

            $(".selectedAnswer").each(function () {
                var answer = {
                    id: $(this).attr('id'),
                    pipeSurveyQuestionAnswerId: ($(this).attr('data-pipe-answer-id') == undefined ? 0 : $(this).attr('data-pipe-answer-id')),
                    isAutoGenPiping: ($(this).hasClass('AutoGenPiping') ? 1 : 0),
                    answerValue: $(this).hasClass("open-ended-mcq") ? $(this).find('.mcq-open-ended-textarea > textarea').val() : $(this).find('.s-editable-text').text(),
                    skipDefaultValue: $(this).hasClass("open-ended-mcq"),
                    orderNumber: ($(this).attr('data-order-number') == undefined ? 1 : $(this).attr('data-order-number'))
                }
                if ($(this).find('.mcq-open-ended-textarea > textarea').val().length > 0) {
                    answer.otherAnswer = $(this).find('.mcq-open-ended-textarea > textarea').val();
                }
                answerIdList.push(answer);
            });

            if (answerIdList.length > 0) {
                var endTime = new Date();
                var diff = Math.round((endTime.getTime() / 1000) - (startTime.getTime() / 1000));
                var respondTimeInSeconds = (diff + delayLength);

                var surveyResponseViewModel = {
                    CommercialId: response.data.CommercialId,
                    SurveyQuestionId: response.data.Id,
                    SurveyQuestionTypeId: response.data.QuestionTypeId,
                    DemographicTypeId: response.data.DemographicTypeId,
                    TierId: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.Id),
                    TierNumber: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.TierNumber),
                    SequenceNumber: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.SequenceNumber),
                    ParentId: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.ParentId),
                    SurveyType: response.data.SurveyType,
                    SelectedResponseList: answerIdList,
                    Token: vodus.readCookie(app.cookieName),
                    PartnerCode: app.partner_code,
                    RespondTimeInSeconds: respondTimeInSeconds,
                    PartnerData: vodus.getPartnerData(),
                    ccType: app.ccType,
                };

                submitEnabled = false;
                vodus.setSurveyResponse(surveyResponseViewModel);
                vodus.submitResponse();
                $("#vodusLoader").css('display', 'flex');
            }
        });
        if ($("#divQuestionaireEditorContainer").find(".question-header-1").first().attr("israndomize") == "true") {
            if (app.isMobile == 1) { app.isMobile = true } else { app.isMobile = false }
            makeMCQAnswersSortable($("#divQuestionaireEditorContainer"), app.isMobile);
        }
    } else if (response.data.QuestionTypeId === 3) {
        $(response.data.SurveyQuestionAnswers).each(function () {

            var idToReplace = $(this.Template).attr('id');
            $("#" + idToReplace + "").attr("answerId", this.Id);
            answerElementCount++;
        });

        $(".vodus-rating-question-type").find("input[type=radio]").click(function () {

            if (submitEnabled) {
                var answer = {
                    id: $(this).attr('answerid'),
                    pipeSurveyQuestionAnswerId: ($(this).attr('data-pipe-answer-id') == undefined ? 0 : $(this).attr('data-pipe-answer-id')),
                    isAutoGenPiping: ($(this).hasClass('AutoGenPiping') ? 1 : 0),
                    answerValue: $(this).next("label").attr("title"),
                    skipDefaultValue: false,
                    orderNumber: ($(this).attr('data-order-number') == undefined ? 1 : $(this).attr('data-order-number'))
                }

                answerIdList.push(answer);

                var endTime = new Date();
                var diff = Math.round((endTime.getTime() / 1000) - (startTime.getTime() / 1000));
                var respondTimeInSeconds = (diff + delayLength);

                var surveyResponseViewModel = {
                    CommercialId: response.data.CommercialId,
                    SurveyQuestionId: response.data.Id,
                    SurveyQuestionTypeId: response.data.QuestionTypeId,
                    DemographicTypeId: response.data.DemographicTypeId,
                    TierId: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.Id),
                    TierNumber: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.TierNumber),
                    SequenceNumber: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.SequenceNumber),
                    ParentId: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.ParentId),
                    SurveyType: response.data.SurveyType,
                    SelectedResponseList: answerIdList,
                    Token: vodus.readCookie(app.cookieName),
                    PartnerCode: app.partner_code,
                    RespondTimeInSeconds: respondTimeInSeconds,
                    PartnerData: vodus.getPartnerData(),
                    ccType: app.ccType,
                };

                submitEnabled = false;
                vodus.setSurveyResponse(surveyResponseViewModel);
                vodus.submitResponse();
                $("#vodusLoader").css('display', 'flex');
            }
        })
    } else if (response.data.QuestionTypeId === 6) {

        if (!app.isMobile) {
            $(response.data.SurveyQuestionAnswers).each(function () {
                $(".answer-box").eq(answerElementCount).attr('id', this.Id);
                answerElementCount++;
            });
        } else {
            $(response.data.SurveyQuestionAnswers).each(function () {
                $(".open-ended-answer").eq(answerElementCount).attr('id', this.Id);
                answerElementCount++;
            });
        }

        $('.survey-submit-btn').click(function () {
            answerIdList = [];
            if ($(this).hasClass("greyOutButton")) {
                return false;
            }

            if ($(this).hasClass("disabledButtons")) {
                return false;
            }

            if (!submitEnabled) {
                return false;
            }

            if (!app.isMobile) {
                $("#divQuestionaireEditorContainer").find(".answer-box").each(function (idx, ele) {
                    var answer = {
                        id: $(this).attr('id'),
                        AnswerSequenceNumber: (idx + 1),
                        answerValue: $(this).find('.s-editable-text').text(),
                        skipDefaultValue: true,
                        orderNumber: ($(this).attr('data-order-number') == undefined ? 1 : $(this).attr('data-order-number'))
                    }
                    answerIdList.push(answer);
                });
            } else {
                $("#divQuestionaireEditorContainer").find(".open-ended-answer").each(function (idx, ele) {
                    var answer = {
                        id: $(this).attr('id'),
                        AnswerSequenceNumber: (idx + 1),
                        answerValue: $(this).text(),
                        skipDefaultValue: true,
                        orderNumber: ($(this).attr('data-order-number') == undefined ? 1 : $(this).attr('data-order-number'))
                    }
                    answerIdList.push(answer);
                });
            }

            if (answerIdList.length > 0) {
                var endTime = new Date();
                var diff = Math.round((endTime.getTime() / 1000) - (startTime.getTime() / 1000));
                var respondTimeInSeconds = (diff + delayLength);

                var surveyResponseViewModel = {
                    CommercialId: response.data.CommercialId,
                    SurveyQuestionId: response.data.Id,
                    SurveyQuestionTypeId: response.data.QuestionTypeId,
                    DemographicTypeId: response.data.DemographicTypeId,
                    TierId: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.Id),
                    TierNumber: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.TierNumber),
                    SequenceNumber: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.SequenceNumber),
                    ParentId: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.ParentId),
                    SurveyType: response.data.SurveyType,
                    SelectedResponseList: answerIdList,
                    Token: vodus.readCookie(app.cookieName),
                    PartnerCode: app.partner_code,
                    RespondTimeInSeconds: respondTimeInSeconds,
                    PartnerData: vodus.getPartnerData(),
                    ccType: app.ccType,
                };

                submitEnabled = false;
                vodus.setSurveyResponse(surveyResponseViewModel);
                vodus.submitResponse();
                $("#vodusLoader").css('display', 'flex');
            }
        });
    } else if (response.data.QuestionTypeId === 7) {

        var style = 'background-color: #' + response.data.FontColor + ' !important';
        $('.ccType2 .mobile-question-container .template-preview-answer-to-display').attr('style', style);
        $('.ccType2 .mobile-question-container .template-preview-answer-to-display .vodus-slider-question-vertical-text-content div').attr('style', 'color:#222222!important');

        $(".survey-submit-btn").hide();
        var mobileAnswerValue = response.data.SurveyQuestionAnswers.length - 1;
        $(response.data.SurveyQuestionAnswers).each(function () {
            $(".slider-question-slider-answer > div.s-editable-text").eq(answerElementCount).attr('AnswerId', this.Id);
            $(".slider-question-slider-answer > div.s-editable-text").eq(answerElementCount).attr('AnswerSliderValue', (answerElementCount + 1));

            $(".vodus-slider-question-vertical-text > div.vodus-slider-question-vertical-text-content").eq(mobileAnswerValue).attr('AnswerId', this.Id);
            $(".vodus-slider-question-vertical-text > div.vodus-slider-question-vertical-text-content").eq(mobileAnswerValue).attr('AnswerSliderValue', (mobileAnswerValue + 1));

            answerElementCount++;
            mobileAnswerValue--;
        });

        $(".slider-question-slider-control").on("click", function () {
            submitEnabled = true;
            var SliderValue = $(".slider-question-slider-control").find("input[type=range]").val();
            var sliderAnswerID = 0;
            var sliderAnswerValue = "";

            $(".slider-question-slider-answer > div.s-editable-text").each(function () {
                if ($(this).attr("answerslidervalue") == SliderValue) {
                    sliderAnswerID = $(this).attr("answerid");
                    sliderAnswerValue = $(this).html();
                }
            })

            if (sliderAnswerID === 0) {
                SliderValue = $(".vodus-slider-question-vertical-slider").find("input[type=range]").val();
                $(".vodus-slider-question-vertical-text > div.vodus-slider-question-vertical-text-content").each(function () {
                    if ($(this).attr("answerslidervalue") == SliderValue) {
                        sliderAnswerID = $(this).attr("answerid");
                        sliderAnswerValue = $(this).html();
                    }
                })
            }

            var answer = {
                id: sliderAnswerID,
                answerValue: sliderAnswerValue,
                skipDefaultValue: false,
                orderNumber: ($(this).attr('data-order-number') == undefined ? 1 : $(this).attr('data-order-number'))
            }
            answerIdList.push(answer);

            if (answerIdList.length > 0) {
                var endTime = new Date();
                var diff = Math.round((endTime.getTime() / 1000) - (startTime.getTime() / 1000));
                var respondTimeInSeconds = (diff + delayLength);

                var surveyResponseViewModel = {
                    CommercialId: response.data.CommercialId,
                    SurveyQuestionId: response.data.Id,
                    SurveyQuestionTypeId: response.data.QuestionTypeId,
                    DemographicTypeId: response.data.DemographicTypeId,
                    TierId: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.Id),
                    TierNumber: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.TierNumber),
                    SequenceNumber: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.SequenceNumber),
                    ParentId: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.ParentId),
                    SurveyType: response.data.SurveyType,
                    SelectedResponseList: answerIdList,
                    Token: vodus.readCookie(app.cookieName),
                    PartnerCode: app.partner_code,
                    RespondTimeInSeconds: respondTimeInSeconds,
                    PartnerData: vodus.getPartnerData(),
                    ccType: app.ccType,
                };

                submitEnabled = false;
                vodus.setSurveyResponse(surveyResponseViewModel);
                vodus.submitResponse();
                $("#vodusLoader").css('display', 'flex');
            }
        })
        var isSubmitting = false;
        $(".vodus-slider-question-vertical-slider > input[type=range]").on("touchend click", function (event) {
            if (isSubmitting) {
                return false;
            }

            isSubmitting = true;
            submitEnabled = true;
            var SliderValue = $(".slider-question-slider-control").find("input[type=range]").val();
            var sliderAnswerID = 0;
            var sliderAnswerValue = "";

            $(".slider-question-slider-answer > div.s-editable-text").each(function () {
                if ($(this).attr("answerslidervalue") == SliderValue) {
                    sliderAnswerID = $(this).attr("answerid");
                    sliderAnswerValue = $(this).html();
                }
            })

            if (sliderAnswerID === 0) {
                SliderValue = $(".vodus-slider-question-vertical-slider").find("input[type=range]").val();
                $(".vodus-slider-question-vertical-text > div.vodus-slider-question-vertical-text-content").each(function () {
                    if ($(this).attr("answerslidervalue") == SliderValue) {
                        sliderAnswerID = $(this).attr("answerid");
                        sliderAnswerValue = $(this).html();
                    }
                })
            }

            var answer = {
                id: sliderAnswerID,
                answerValue: sliderAnswerValue,
                skipDefaultValue: false,
                orderNumber: ($(this).attr('data-order-number') == undefined ? 1 : $(this).attr('data-order-number'))
            }
            answerIdList.push(answer);

            if (answerIdList.length > 0) {
                var endTime = new Date();
                var diff = Math.round((endTime.getTime() / 1000) - (startTime.getTime() / 1000));
                var respondTimeInSeconds = (diff + delayLength);

                var surveyResponseViewModel = {
                    CommercialId: response.data.CommercialId,
                    SurveyQuestionId: response.data.Id,
                    SurveyQuestionTypeId: response.data.QuestionTypeId,
                    DemographicTypeId: response.data.DemographicTypeId,
                    TierId: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.Id),
                    TierNumber: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.TierNumber),
                    SequenceNumber: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.SequenceNumber),
                    ParentId: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.ParentId),
                    SurveyType: response.data.SurveyType,
                    SelectedResponseList: answerIdList,
                    Token: vodus.readCookie(app.cookieName),
                    PartnerCode: app.partner_code,
                    RespondTimeInSeconds: respondTimeInSeconds,
                    PartnerData: vodus.getPartnerData(),
                    ccType: app.ccType,
                };
                submitEnabled = false;
                vodus.setSurveyResponse(surveyResponseViewModel);
                vodus.submitResponse();
                //$(".modal-body").addClass("submitted-question");
                $("#vodusLoader").css('display', 'flex');
            }
        })

    } else if (response.data.QuestionTypeId === 8) {
        answerIdList = [];
        $(response.data.SurveyQuestionAnswers).each(function () {
            $(".survey-ranking-div").eq(answerElementCount).attr('id', this.Id);
            answerElementCount++;
        });

        makeRankingAnswerSortable($("#divQuestionaireEditorContainer"), app.isMobile);

        $('.survey-submit-btn').click(function () {

            if ($(this).hasClass("greyOutButton")) {
                return false;
            }
            if ($(this).hasClass("disabledButtons")) {
                return false;
            }
            if (!submitEnabled) {
                return false;
            }

            $("#divQuestionaireEditorContainer").find(".survey-ranking-div").each(function (idx, ele) {
                var answer = {
                    id: $(this).attr('id'),
                    AnswerSequenceNumber: (idx + 1),
                    answerValue: $(this).find('.s-editable-text').text(),
                    skipDefaultValue: false,
                    orderNumber: ($(this).attr('data-order-number') == undefined ? 1 : $(this).attr('data-order-number'))
                }
                answerIdList.push(answer);
            });

            if (answerIdList.length > 0) {
                var endTime = new Date();
                var diff = Math.round((endTime.getTime() / 1000) - (startTime.getTime() / 1000));
                var respondTimeInSeconds = (diff + delayLength);

                var surveyResponseViewModel = {
                    CommercialId: response.data.CommercialId,
                    SurveyQuestionId: response.data.Id,
                    SurveyQuestionTypeId: response.data.QuestionTypeId,
                    DemographicTypeId: response.data.DemographicTypeId,
                    TierId: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.Id),
                    TierNumber: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.TierNumber),
                    SequenceNumber: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.SequenceNumber),
                    ParentId: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.ParentId),
                    SurveyType: response.data.SurveyType,
                    SelectedResponseList: answerIdList,
                    Token: vodus.readCookie(app.cookieName),
                    PartnerCode: app.partner_code,
                    RespondTimeInSeconds: respondTimeInSeconds,
                    PartnerData: vodus.getPartnerData(),
                    ccType: app.ccType,
                };
                submitEnabled = false;
                vodus.setSurveyResponse(surveyResponseViewModel);
                vodus.submitResponse();
                $("#vodusLoader").css('display', 'flex');
            }
        });
    }
    //Grid Question

    else if (response.data.QuestionTypeId === 5) {
        submitEnabled = true;
        var currentRow = 0;
        var currentSelectedRow = 1;
        $(".s-selectable-text").css("border", "none");
        answerIdList = [];

        var isGridBoolean = $(".tingle-modal-box__content").find(".template-preview-answer-to-display-table-content").hasClass('grid-boolean');

        $(response.data.SurveyQuestionAnswers).each(function () {
            if (!isGridBoolean) {
                $(".tingle-modal-box__content").find(".template-preview-answer-to-display-table-content").eq(0).attr('id', this.Id);
            }
            else {
                $(".tingle-modal-box__content").find(".template-preview-answer-to-display-table-content").eq(0).find('.grid-row').eq(answerElementCount).attr('id', this.Id);
            }
            answerElementCount++;
        });
        //Mobile & not Grid Multiple answers question piping
        if (app.isMobile && !$("#GridMultipleAnswersPipingId").length) {
            var templateTable = $(".tingle-modal-box__content").find(".template-preview-answer-to-display-table-content").eq(0).find('table');
            var totalRows = $(templateTable).find('.grid-row').length;
            var mobileGridBackgroundColor = $(templateTable).css('background-color');
            var isGridBoolean = $(".grid-boolean").length > 0;

            var title = $(".question-header-1").eq(0).text();
            var titleExtra = "";

            if ($("#divQuestionaireEditorContainer").find(".question-header-1").first().attr("israndomize") == "true") {
                randomizeGridBooleanRows($("#divQuestionaireEditorContainer"));
            }

            $(templateTable).find('.grid-row').each(function () {
                if (isGridBoolean) {
                    var defaultAnswer = $(this).find('.s-editable-text').attr('default-answer');
                    var answerID = $(this).find(".gridOption").eq(0).attr("id");
                }
                currentRow++;
                titleExtra += '<div class="mobileGridTitle" style="display:none;" answer-ID="' + answerID + '" id="mobileGridRow_' + currentRow + '"><span style="font-style:italic;">(' + currentRow + '/' + totalRows + ')</span><span id="mobileGridRowTitle_' + currentRow + '" style="margin-left:0.3em;" default-answer="' + defaultAnswer + '">' + $(this).find('td').eq(0).find('.s-selectable-text').text() + '</span></div>';
            });

            title += titleExtra;
            $(".question-header-1").eq(0).html(title);
            $(".tingle-modal-box__content").find(".template-preview-answer-to-display-table-content").html('');
            var answerDisplay = '';
            var elementCount = 0;
            var totalResponded = 0;

            $(templateTable).find('.grid-header').eq(0).find('td').each(function () {
                var answer = $(this).find('.s-selectable-text').text();
                if (answer != '') {
                    var defaultAnswer = $(window.vodus_grid_mobile_tag).find('.grid-header').eq(0).find('td').eq(elementCount).find('.s-selectable-text').text();
                    var answerChoices = '<div class="mobile-grid-div answer-box selectGridMobileAnswer" id="selectGridMobileAnswer_' + elementCount + '" style="width: 98%; background-color:' + mobileGridBackgroundColor + '; float:left;" data-answer="' + answer + '" data-default-answer="' + defaultAnswer + '"><div class="s-editable-text">' + answer + '</div></div>';
                    answerDisplay += answerChoices;
                }
                elementCount++;
            });
            $(".tingle-modal-box__content").find(".template-preview-answer-to-display-table-content").eq(0).html(answerDisplay);
            $(templateTable).eq(0).hide();
            $("#mobileGridRow_1").show();

            $("#divQuestionaireEditorContainer").find('.survey-submit-btn').hide();
            $(".answer-box").click(function () {
                totalResponded++;
                $(".mobileGridTitle").hide();
                if (!isGridBoolean) {
                    var defaultRowAnswer = $(window.vodus_grid_mobile_tag).find('.grid-row').eq(currentSelectedRow - 1).find('.s-selectable-text').text();
                    var answer = {
                        id: $(".tingle-modal-box__content").find('.template-preview-answer-to-display-table-content').eq(0).attr('id'),
                        pipeSurveyQuestionAnswerId: ($(this).attr('data-pipe-answer-id') == undefined ? 0 : $(this).attr('data-pipe-answer-id')),
                        isAutoGenPiping: ($(this).hasClass('AutoGenPiping') ? 1 : 0),
                        AnswerSequenceNumber: currentSelectedRow,
                        answerValue: defaultRowAnswer + " -- " + $(this).attr('data-default-answer'),
                        skipDefaultValue: false,
                        orderNumber: ($(this).attr('data-order-number') == undefined ? 1 : $(this).attr('data-order-number'))
                    }
                    answerIdList.push(answer);
                } else {//Grid Boolean Answer Format
                    if ($(this).index() == 0) {
                        var idFromAnswer = response.data.SurveyQuestionAnswers[$("#mobileGridRow_" + currentSelectedRow.toString()).attr("answer-id").split("_")[1]].Id;
                        var defaultRowAnswer = response.data.SurveyQuestionAnswers.filter(x => x.Id == idFromAnswer)[0].AnswerValue;

                        var answer = {
                            id: idFromAnswer,
                            pipeSurveyQuestionAnswerId: ($(this).attr('data-pipe-answer-id') == undefined ? 0 : $(this).attr('data-pipe-answer-id')),
                            isAutoGenPiping: ($(this).hasClass('AutoGenPiping') ? 1 : 0),
                            AnswerSequenceNumber: currentSelectedRow,
                            answerValue: defaultRowAnswer,
                            otherAnswer: defaultRowAnswer,
                            skipDefaultValue: false,
                            orderNumber: ($(this).attr('data-order-number') == undefined ? 1 : $(this).attr('data-order-number'))
                        };
                        answerIdList.push(answer);
                    }
                }
                currentSelectedRow++;
                $("#mobileGridRow_" + currentSelectedRow).fadeIn();

                var endTime = new Date();
                var diff = Math.round((endTime.getTime() / 1000) - (startTime.getTime() / 1000));
                var respondTimeInSeconds = (diff + delayLength);

                if (!isGridBoolean) {
                    if (totalRows == totalResponded) {
                        if (!submitEnabled) {
                            return;
                        }
                        if (answerIdList.length > 0) {
                            var questionTypeID = response.data.QuestionTypeId;
                            var surveyResponseViewModel = {
                                CommercialId: response.data.CommercialId,
                                SurveyQuestionId: response.data.Id,
                                SurveyQuestionTypeId: questionTypeID,
                                DemographicTypeId: response.data.DemographicTypeId,
                                TierId: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.Id),
                                TierNumber: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.TierNumber),
                                SequenceNumber: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.SequenceNumber),
                                ParentId: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.ParentId),
                                SurveyType: response.data.SurveyType,
                                SelectedResponseList: answerIdList,
                                Token: vodus.readCookie(app.cookieName),
                                PartnerCode: app.partner_code,
                                RespondTimeInSeconds: respondTimeInSeconds,
                                PartnerData: vodus.getPartnerData(),
                                ccType: app.ccType,
                            }

                            submitEnabled = false;
                            vodus.setSurveyResponse(surveyResponseViewModel);
                            vodus.submitResponse();
                            $("#vodusLoader").css('display', 'flex');
                        }
                    }
                } else {
                    if (totalRows == totalResponded) {
                        if (!submitEnabled) {
                            return;
                        }
                        vodus.log('answerIdList.length = ' + answerIdList.length);
                        if (answerIdList.length == 0) {

                            var noneOfTheAbove = response.data.SurveyQuestionAnswers.filter(x => x.AnswerValue == 'None of the above')[0];
                            if (noneOfTheAbove == null) {
                                vodus.log('None of the above is not set');
                            }
                            var answer = {
                                id: noneOfTheAbove.Id,
                                pipeSurveyQuestionAnswerId: ($(this).attr('data-pipe-answer-id') == undefined ? 0 : $(this).attr('data-pipe-answer-id')),
                                isAutoGenPiping: ($(this).hasClass('AutoGenPiping') ? 1 : 0),
                                AnswerSequenceNumber: currentSelectedRow,
                                answerValue: 'None of the above',
                                otherAnswer: 'None of the above',
                                skipDefaultValue: false,
                                orderNumber: ($(this).attr('data-order-number') == undefined ? 1 : $(this).attr('data-order-number'))
                            };
                            answerIdList.push(answer);
                        }

                        var questionTypeID = 2;
                        var surveyResponseViewModel = {
                            CommercialId: response.data.CommercialId,
                            SurveyQuestionId: response.data.Id,
                            SurveyQuestionTypeId: questionTypeID,
                            DemographicTypeId: response.data.DemographicTypeId,
                            TierId: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.Id),
                            TierNumber: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.TierNumber),
                            SequenceNumber: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.SequenceNumber),
                            ParentId: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.ParentId),
                            SurveyType: response.data.SurveyType,
                            SelectedResponseList: answerIdList,
                            Token: vodus.readCookie(app.cookieName),
                            PartnerCode: app.partner_code,
                            RespondTimeInSeconds: respondTimeInSeconds,
                            PartnerData: vodus.getPartnerData(),
                            ccType: app.ccType,
                        }
                        surveyResponseViewModel.SelectedResponseList = answerIdList;

                        //  Check if answer is all no
                        submitEnabled = false;
                        vodus.setSurveyResponse(surveyResponseViewModel);
                        vodus.submitResponse();
                        $("#vodusLoader").css('display', 'flex');
                    }
                }


            });
        } else {
            $("#divQuestionaireEditorContainer").find('.survey-submit-btn').hide();
            if ($("#divQuestionaireEditorContainer").find(".question-header-1").first().attr("israndomize") == "true") {
                randomizeGridBooleanRows($("#divQuestionaireEditorContainer"));
            }
            currentRow = 1;
            var currentSelectedRow = 1;
            //  This is for multipiping
            if (app.isMobile && $("#GridMultipleAnswersPipingId").length) {

                var splittedAnswers = [];
                var splittedDefaultAnswers = [];
                for (var i in app.pipeList) {
                    var ans = app.pipeList[i].split(':').pop();
                    var ansDefault = app.pipeListDefault[i].split(':').pop();

                    splittedAnswers = ans.split(' && ');
                    splittedDefaultAnswers = ansDefault.split(' && ');

                    if (app.pipeAnswerIdList != null && app.pipeAnswerIdList.length > 0) {
                        splittedIds = app.pipeAnswerIdList;
                    }
                }

                var totalRows = splittedAnswers.length;

                var isGridBoolean = $(".grid-boolean").length > 0;

                if (isGridBoolean) {
                    var templateTable = $(".tingle-modal-box__content").find(".template-preview-answer-to-display-table-content").eq(0).find('table');
                } else {
                    var templateTable = $(".template-preview-answer-to-display-table-content table");
                }

                var mobileGridBackgroundColor = $(templateTable).css('background-color');

                var title = $(".question-header-1").eq(0).text();
                var titleExtra = "";

                if ($("#divQuestionaireEditorContainer").find(".question-header-1").first().attr("israndomize") == "true") {
                    randomizeGridBooleanRows($("#divQuestionaireEditorContainer"));
                }

                $(splittedAnswers).each(function () {
                    var answerID = splittedIds[currentRow - 1];

                    titleExtra += '<div class="mobileGridTitle" style="display:none;" answer-ID="' + answerID + '" id="mobileGridRow_' + currentRow + '"><span style="font-style:italic;">(' + currentRow + '/' + totalRows + ')</span><span id="mobileGridRowTitle_' + currentRow + '" style="margin-left:0.3em;" default-answer="' + splittedDefaultAnswers[currentRow - 1] + '">' + splittedAnswers[currentRow - 1] + '</span></div>';
                    currentRow++;
                });

                title += titleExtra;
                $(".question-header-1").eq(0).html(title);
                $(".tingle-modal-box__content").find(".template-preview-answer-to-display-table-content").html('');
                var answerDisplay = '';
                var elementCount = 0;
                var totalResponded = 0;

                $(templateTable).find('.grid-header').eq(0).find('td').each(function () {
                    var answer = $(this).find('.s-selectable-text').text();
                    if (answer != '') {
                        var defaultAnswer = $(window.vodus_grid_mobile_tag).find('.grid-header').eq(0).find('td').eq(elementCount).find('.s-selectable-text').text();
                        var answerChoices = '<div class="mobile-grid-div answer-box selectGridMobileAnswer" id="selectGridMobileAnswer_' + elementCount + '" style="width: 98%; background-color:' + mobileGridBackgroundColor + '; float:left;" data-answer="' + answer + '" data-default-answer="' + defaultAnswer + '"><div class="s-editable-text">' + answer + '</div></div>';
                        answerDisplay += answerChoices;
                    }
                    elementCount++;
                });
                $(".tingle-modal-box__content").find(".template-preview-answer-to-display-table-content").eq(0).html(answerDisplay);
                $(templateTable).eq(0).hide();
                $("#mobileGridRow_1").show();

                $("#divQuestionaireEditorContainer").find('.survey-submit-btn').hide();
                $(".answer-box").click(function () {
                    totalResponded++;
                    $(".mobileGridTitle").hide();
                    if (!isGridBoolean) {
                        var defaultRowAnswer = splittedDefaultAnswers[currentSelectedRow - 1];
                        var answer = {
                            id: $(".tingle-modal-box__content").find('.template-preview-answer-to-display-table-content').eq(0).attr('id'),
                            pipeSurveyQuestionAnswerId: ($(this).attr('data-pipe-answer-id') == undefined ? 0 : $(this).attr('data-pipe-answer-id')),
                            isAutoGenPiping: ($(this).hasClass('AutoGenPiping') ? 1 : 0),
                            AnswerSequenceNumber: currentSelectedRow,
                            answerValue: defaultRowAnswer + " -- " + $(this).attr('data-default-answer'),
                            skipDefaultValue: false,
                            orderNumber: ($(this).attr('data-order-number') == undefined ? 1 : $(this).attr('data-order-number'))
                        }
                        answerIdList.push(answer);
                    } else {//Grid Boolean Answer Format
                        if (this.id.split('_')[1] == 1) {
                            var idFromAnswer = response.data.SurveyQuestionAnswers[$("#mobileGridRow_" + currentSelectedRow.toString()).attr("answer-id").split("_")[1]].Id;

                            var defaultRowAnswer = $(window.vodus_grid_tag).find('.template-preview-answer-to-display-table-content').eq(0).find('table').find('.grid-row').eq(currentSelectedRow.toString()).find('.s-editable-text').text();
                            var answer = {
                                id: idFromAnswer,
                                pipeSurveyQuestionAnswerId: ($(this).attr('data-pipe-answer-id') == undefined ? 0 : $(this).attr('data-pipe-answer-id')),
                                isAutoGenPiping: ($(this).hasClass('AutoGenPiping') ? 1 : 0),
                                AnswerSequenceNumber: currentSelectedRow,
                                answerValue: defaultRowAnswer,
                                otherAnswer: defaultRowAnswer,
                                skipDefaultValue: false,
                                orderNumber: ($(this).attr('data-order-number') == undefined ? 1 : $(this).attr('data-order-number'))
                            };
                            answerIdList.push(answer);
                        }

                    }
                    currentSelectedRow++;
                    $(".mobile-question-container").eq(0).find($("#mobileGridRow_" + currentSelectedRow)).fadeIn();

                    var endTime = new Date();
                    var diff = Math.round((endTime.getTime() / 1000) - (startTime.getTime() / 1000));
                    var respondTimeInSeconds = (diff + delayLength);

                    if (!isGridBoolean) {
                        if (totalRows == totalResponded) {
                            if (!submitEnabled) {
                                return;
                            }
                            if (answerIdList.length > 0) {
                                var questionTypeID = response.data.QuestionTypeId;
                                var surveyResponseViewModel = {
                                    CommercialId: response.data.CommercialId,
                                    SurveyQuestionId: response.data.Id,
                                    SurveyQuestionTypeId: questionTypeID,
                                    DemographicTypeId: response.data.DemographicTypeId,
                                    TierId: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.Id),
                                    TierNumber: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.TierNumber),
                                    SequenceNumber: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.SequenceNumber),
                                    ParentId: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.ParentId),
                                    SurveyType: response.data.SurveyType,
                                    SelectedResponseList: answerIdList,
                                    Token: vodus.readCookie(app.cookieName),
                                    PartnerCode: app.partner_code,
                                    RespondTimeInSeconds: respondTimeInSeconds,
                                    PartnerData: vodus.getPartnerData(),
                                    ccType: app.ccType,
                                }

                                submitEnabled = false;
                                vodus.setSurveyResponse(surveyResponseViewModel);
                                vodus.submitResponse();
                                $("#vodusLoader").css('display', 'flex');
                            }
                        }
                    } else {
                        if (totalRows == totalResponded) {
                            if (!submitEnabled) {
                                return;
                            }
                            if (answerIdList.length == 0) {

                                var noneOfTheAbove = response.data.SurveyQuestionAnswers.filter(x => x.AnswerValue == 'None of the above')[0];
                                if (noneOfTheAbove == null) {
                                    vodus.log('None of the above is not set');
                                }
                                var answer = {
                                    id: noneOfTheAbove.Id,
                                    pipeSurveyQuestionAnswerId: ($(this).attr('data-pipe-answer-id') == undefined ? 0 : $(this).attr('data-pipe-answer-id')),
                                    isAutoGenPiping: ($(this).hasClass('AutoGenPiping') ? 1 : 0),
                                    AnswerSequenceNumber: currentSelectedRow,
                                    answerValue: 'None of the above',
                                    otherAnswer: 'None of the above',
                                    skipDefaultValue: false,
                                    orderNumber: ($(this).attr('data-order-number') == undefined ? 1 : $(this).attr('data-order-number'))
                                };
                                answerIdList.push(answer);
                            }

                            var questionTypeID = 2;
                            var surveyResponseViewModel = {
                                CommercialId: response.data.CommercialId,
                                SurveyQuestionId: response.data.Id,
                                SurveyQuestionTypeId: questionTypeID,
                                DemographicTypeId: response.data.DemographicTypeId,
                                TierId: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.Id),
                                TierNumber: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.TierNumber),
                                SequenceNumber: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.SequenceNumber),
                                ParentId: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.ParentId),
                                SurveyType: response.data.SurveyType,
                                SelectedResponseList: answerIdList,
                                Token: vodus.readCookie(app.cookieName),
                                PartnerCode: app.partner_code,
                                RespondTimeInSeconds: respondTimeInSeconds,
                                PartnerData: vodus.getPartnerData(),
                                ccType: app.ccType,
                            }
                            surveyResponseViewModel.SelectedResponseList = answerIdList;

                            //  Check if answer is all no
                            submitEnabled = false;
                            vodus.setSurveyResponse(surveyResponseViewModel);
                            vodus.submitResponse();
                            $("#vodusLoader").css('display', 'flex');
                        }
                    }


                });
            }
            else {
                var currentGridRow = 0;
                $(".grid-row").each(function () {
                    currentGridRow++;
                    $(this).find('.gridOption').each(function () {
                        $(this).attr('name', 'grid_row_' + currentGridRow).attr('id', 'grid_row_' + currentGridRow);
                    });
                });
                $(".gridOption").click(function () {
                    $(this).parent().parent().find('td').removeClass('selectedGridItem');
                    $(this).parent().addClass('selectedGridItem');
                    $("#divQuestionaireEditorContainer").find('.survey-submit-btn').click();
                });
            }

        }

        $("#divQuestionaireEditorContainer").find('.survey-submit-btn').eq(0).click(function () {
            toastr.clear();
            answerIdList = [];
            var haveUnchecked = false;
            var uncheckedCount = 0;
            var currentGridRow = 0;
            var isGridBoolean = $(".tingle-modal-box__content").find(".template-preview-answer-to-display-table-content").hasClass('grid-boolean');


            $($('.tingle-modal-box').find('.template-preview-answer-to-display-table-content').eq(0).find('table').find('.grid-row')).each(function () {

                var name = $(this).find('input[type=radio]').attr('name');
                var rowText = $(this).find('td').eq(0).find('.s-editable-text').text();

                //  Get default value from template

                var defaultRow = $(window.vodus_grid_tag).find('.template-preview-answer-to-display-table-content').eq(0).find('table').find('.grid-row').eq(currentGridRow);
                var defaultName = $(defaultRow).find('input[type=radio]').attr('name');
                var defaultRowText = $(defaultRow).find('td').eq(0).find('.s-editable-text').text();
                var defaultTD = $(".tingle-modal-box__content").find('.template-preview-answer-to-display-table-content').eq(0).find('table');

                var tdLength = $(this).find("td").length;
                if ($("input[name='" + name + "']").is(':checked')) {
                    for (var i = 0; i < tdLength; i++) {
                        if ($(this).find("td").eq(i).hasClass('selectedGridItem')) {
                            if (!isGridBoolean) {
                                var answer = {
                                    id: $('.template-preview-answer-to-display-table-content').eq(0).attr('id'),
                                    pipeSurveyQuestionAnswerId: ($(this).find("td").eq(i).children().attr('data-pipe-answer-id') == undefined ? 0 : $(this).find("td").eq(i).children().attr('data-pipe-answer-id')),
                                    isAutoGenPiping: ($(this).find("td").eq(i).children().hasClass('AutoGenPiping') ? 1 : 0),
                                    AnswerSequenceNumber: ($(this).find("td").eq(i).children().attr('data-pipe-answer-id') == undefined ? ++currentSelectedRow : currentSelectedRow + 100 + currentRow),
                                    //answerValue: rowText + " -- " + $('.grid-header').find('td').eq(i).find('.s-editable-text').text(),
                                    answerValue: defaultRowText + " -- " + $(window.vodus_grid_tag).find('.grid-header').find('td').eq(i).find('.s-editable-text').text(),
                                    skipDefaultValue: false,
                                    orderNumber: ($(this).attr('data-order-number') == undefined ? 1 : $(this).attr('data-order-number'))
                                }
                                answerIdList.push(answer);
                            }
                            else {
                                if (i == tdLength - 1) {

                                }
                                else {
                                    var answer = {
                                        id: $(this).closest('.grid-row').attr('id'),
                                        pipeSurveyQuestionAnswerId: ($(this).find("td").eq(i).children().attr('data-pipe-answer-id') == undefined ? 0 : $(this).find("td").eq(i).children().attr('data-pipe-answer-id')),
                                        isAutoGenPiping: ($(this).find("td").eq(i).children().hasClass('AutoGenPiping') ? 1 : 0),
                                        AnswerSequenceNumber: ($(this).find("td").eq(i).children().attr('data-pipe-answer-id') == undefined ? ++currentSelectedRow : currentSelectedRow + 100 + currentRow),
                                        //answerValue: rowText + " -- " + $('.grid-header').find('td').eq(i).find('.s-editable-text').text(),
                                        answerValue: defaultRowText + " -- " + $(window.vodus_grid_tag).find('.grid-header').find('td').eq(i).find('.s-editable-text').text(),
                                        skipDefaultValue: false,
                                        orderNumber: ($(this).attr('data-order-number') == undefined ? 1 : $(this).attr('data-order-number'))
                                    }
                                    answerIdList.push(answer);
                                }

                            }
                        }
                    }
                } else {
                    haveUnchecked = true;
                    uncheckedCount++;
                }
                currentRow++;
                currentGridRow++;
            });
            currentRow = 0;
            currentSelectedRow = 1;
            if (haveUnchecked) {
                toastr.warning(uncheckedCount + ' more rows left to complete this question');
                return false;
            }

            //  Create a None of the above
            if (answerIdList.length == 0 && isGridBoolean) {
                var noneOfTheAbove = response.data.SurveyQuestionAnswers.filter(x => x.AnswerValue == 'None of the above')[0];
                if (noneOfTheAbove == null) {
                    vodus.log('None of the above is not set');
                }

                var answer = {
                    id: noneOfTheAbove.Id,
                    pipeSurveyQuestionAnswerId: ($(this).attr('data-pipe-answer-id') == undefined ? 0 : $(this).attr('data-pipe-answer-id')),
                    isAutoGenPiping: ($(this).hasClass('AutoGenPiping') ? 1 : 0),
                    AnswerSequenceNumber: 1,
                    answerValue: 'None of the above',
                    otherAnswer: 'None of the above',
                    skipDefaultValue: false,
                    orderNumber: 1
                };
                answerIdList.push(answer);
            }

            if (answerIdList.length > 0) {
                var endTime = new Date();
                var diff = Math.round((endTime.getTime() / 1000) - (startTime.getTime() / 1000));
                var respondTimeInSeconds = (diff + delayLength);

                var surveyResponseViewModel = {
                    CommercialId: response.data.CommercialId,
                    SurveyQuestionId: response.data.Id,
                    SurveyQuestionTypeId: response.data.QuestionTypeId,
                    DemographicTypeId: response.data.DemographicTypeId,
                    TierId: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.Id),
                    TierNumber: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.TierNumber),
                    SequenceNumber: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.SequenceNumber),
                    ParentId: (response.data.SurveyQuestionTier == null ? 0 : response.data.SurveyQuestionTier.ParentId),
                    SurveyType: response.data.SurveyType,
                    SelectedResponseList: answerIdList,
                    Token: vodus.readCookie(app.cookieName),
                    PartnerCode: app.partner_code,
                    RespondTimeInSeconds: respondTimeInSeconds,
                    PartnerData: vodus.getPartnerData(),
                    ccType: app.ccType,
                };

                if (!submitEnabled) {
                    return;
                }
                submitEnabled = false;
                vodus.setSurveyResponse(surveyResponseViewModel);
                vodus.submitResponse();
                $("#vodusLoader").css('display', 'flex');
            }
        });


    } else if (response.data.QuestionTypeId === 999) {
        var commercialId = response.data.CommercialId;
        var surveyResponseViewModel = {
            ChunkId: response.data.ChunkId,
            CommercialId: response.data.CommercialId,
            SurveyQuestionId: 0,
            SurveyQuestionTypeId: response.data.QuestionTypeId,
            DemographicTypeId: 0,
            Token: vodus.readCookie(app.cookieName),
            PartnerCode: app.partner_code,
            RespondTimeInSeconds: 0,
            PartnerData: vodus.getPartnerData(),
            Email: vodus.getEmail(),
            MemberProfileId: response.data.UserToken.MemberProfileId
        }
        $(".referralSkip").click(function () {
            var endTime = new Date();
            var diff = Math.round((endTime.getTime() / 1000) - (startTime.getTime() / 1000));
            var respondTimeInSeconds = (diff + delayLength);
            surveyResponseViewModel.RespondTimeInSeconds = respondTimeInSeconds;

            submitEnabled = false;
            vodus.setSurveyResponse(surveyResponseViewModel);
            vodus.submitResponse();
            $("#vodusLoader").css('display', 'flex');
        });

        $(".question-header-1").html($(".question-header-1").html().replace("{X}", response.data.VPointsPerQuestion));
        $(".question-header-1").html($(".question-header-1").html().replace("{SURVEY_NAME}", response.data.ExternalDisplayName));
        var referralRedirectUrl = "";

        var token = vodus.readCookie(app.cookieName);
        if (token == null || token == "") {
            var tempToken = vodus.readCookie("vodus_temp_token");
            referralRedirectUrl = app.reward3PRootUrl + '/sync?syncType=2&partnerWebsiteId=' + app.partnerWebsiteId + '&questionId=' + app.questionId + '&questionType=' + app.surveyType + '&tempToken=' + tempToken
                + '&referral=' + response.data.ReferralRedirectUrl + '&memberProfileId=' + response.data.UserToken.MemberProfileId + '&redirectUrl=' + encodeURI(window.location.href) + '&host=' + encodeURI(window.location.hostname);

        }
        else {
            referralRedirectUrl = app.reward3PRootUrl + '/sync?syncType=2&partnerWebsiteId=' + app.partnerWebsiteId + '&questionId=' + app.questionId + '&questionType=' + app.surveyType + '&token=' + token
                + '&referral=' + response.data.ReferralRedirectUrl + '&memberProfileId=' + response.data.UserToken.MemberProfileId + '&redirectUrl=' + encodeURI(window.location.href) + '&host=' + encodeURI(window.location.hostname);
        }

        $(".referralRedirect").attr('data-url', referralRedirectUrl);
        $(".referralRedirect").click(function () {
            closeAllVodusModal();

            //surveyResponseViewModel.Token = decodeURIComponent(surveyResponseViewModel.Token);
            /*$.ajax({
                type: "POST",
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(surveyResponseViewModel),
                url: app.serverlessUrl + '/api/referralNotification',
                success: function (response) {
                    vodus.log('Done with email notification');
                }
            });*/
            var redirectUrl = $(this).attr('data-url');// + "&id=" + surveyResponseViewModel.MemberProfileId + "&sn=" + surveyResponseViewModel.ChunkId;
            vodus.log(redirectUrl);
            var win = window.open(redirectUrl, '_blank');
            win.focus();
        });
    }

    // Set language
    try {
        i18next
            .init({
                lng: app.language,
                fallbackLng: 'en',
                resources: {
                    en: {
                        translation: {
                            "login-with-facebook": "Login with Facebook",
                            "login-with-google": "Login with Google",
                            "signup-with-email": "Sign up with Email",
                            //  "close-modal-instruction": "Earn cash vouchers & discounts",
                            //  "one-question": "by answering one survey question",
                            "wait-to-close-1": "Or wait ",
                            "wait-to-close-2": " seconds to close",
                            "click-to-close": "click to close",
                            "rewards-click-to-close": "Click to close",
                            "answered-before": "I have answered this question before",
                            "vodus-or": "Or ",
                            "more-info": "More information",
                            "about-us": "About us",
                            "login-for-double-points": "Login to gain 2\u00D7 points:",
                            "login-for-double-points-mobile": "Login to gain 2\u00D7 points:",
                            "vpoints": "Your VPoints:",
                            "points": " points",
                            "redeem-points": "Redeem rewards",
                            "login-gain-rewards": "Login | Signup",
                            "signup": "Sign up",
                            "login": "Login",
                            "logout": "(Logout)",
                            "back": "Back",
                            "signup-vodus": "Sign up for Vodus",
                            "login-vodus": "Login to Vodus",
                            "rewards-to-be-won": "Rewards to be won:",
                            "sso-description-title": "Rewarding you for your opinion",
                            "sso-list-1-bold": "Gain double VPoints",
                            "sso-list-2-bold": "Exchange your VPoints",
                            "sso-list-1": " by logging into your Vodus account before responding.",
                            "sso-list-2": " for cash vouchers and discounts on ",
                            "forgot-password": "Forgot password?",
                            "email": "Email",
                            "password": "Password",
                            "create-account": "Register",
                            "data-policy": "Data policy",
                            "sign-up-message": "Get rewarded for consuming digital content on any of Vodus’ network of publishers.",
                            "gain-two-times-points": "Gain 2\u00D7 points:",
                            "in-partnership": "In partnership with:",
                            "start-earning-rewards-by-signup": "Start earning double points by signing up!",
                            "not-yet-signed-up": "Not yet signed up?",
                            "already-signed-up": "Already signed up?",
                            "powered-by": "",
                            "ranking-instruction": "Drag and drop to rank:"
                        }
                    },
                    ms: {
                        translation: {
                            "login-with-google": "Masuk dengan Google",
                            "login-with-facebook": "Masuk dengan Facebook",
                            "signup-with-email": "Daftar dengan E-mel",
                            //    "close-modal-instruction": "Dapatkan voucer tunai & diskaun",
                            //   "one-question": "dengan menjawab satu soalan tinjauan",
                            "wait-to-close-1": "Atau tunggu ",
                            "wait-to-close-2": " saat",
                            "click-to-close": "klik untuk tutup",
                            "rewards-click-to-close": "Klik untuk tutup",
                            "answered-before": "Saya pernah menjawab soalan ini",
                            "vodus-or": " Atau ",
                            "more-info": "Maklumat lanjut",
                            "about-us": "Mengenai kami",
                            "login-for-double-points": "Masuk untuk dapat 2\u00D7 mata:",
                            "login-for-double-points-mobile": "Masuk untuk dapat 2\u00D7 mata:",
                            "vpoints": "VPoint anda:",
                            "points": " mata",
                            "redeem-points": "Menebus ganjaran",
                            "login-gain-rewards": "Masuk | Daftar",
                            "signup": "Daftar",
                            "login": "Masuk",
                            "logout": "(Keluar)",
                            "signup-vodus": "Daftar untuk Vodus",
                            "login-vodus": "Masuk ke Vodus",
                            "back": "Balik",
                            "rewards-to-be-won": "Ganjaran untuk diberikan:",
                            "sso-description-title": "Setiap pendapat anda ada ganjaran",
                            "sso-list-1-bold": "Dapatkan dua kali ganjaran",
                            "sso-list-2-bold": "Tukarkan VPoint anda",
                            "sso-list-1": " dengan log masuk ke akaun Vodus anda sebelum menjawab",
                            "sso-list-2": " dengan baucar tunai dan diskaun di ",
                            "forgot-password": "Lupa kata laluan?",
                            "email": "Emel",
                            "password": "Kata laluan",
                            "create-account": "Daftar",
                            "data-policy": "Dasar data",
                            "sign-up-message": "Dapatkan ganjaran semasa melawati laman web rangkaian penerbitan Vodus.",
                            "gain-two-times-points": "Dapat 2\u00D7 mata:",
                            "in-partnership": "Dalam perkongsian dengan:",
                            "start-earning-rewards-by-signup": "Daftar sekarang untuk dapat 2\u00D7 mata!",
                            "not-yet-signed-up": "Belum daftar?",
                            "already-signed-up": "Sudah daftar?",
                            "powered-by": "",
                            "ranking-instruction": "Tarik dan letak untuk susun:"
                        }
                    },
                    zh: {
                        translation: {
                            "login-with-google": "谷歌登入",
                            "login-with-facebook": "面子书登入",
                            "signup-with-email": "电邮登入",
                            //    "close-modal-instruction": "回答一道简单的问题以",
                            //    "one-question": "获得现金与购物折扣",
                            "wait-to-close-1": "或请等 ",
                            "wait-to-close-2": " 秒",
                            "click-to-close": "点击关闭",
                            "rewards-click-to-close": "点击关闭",
                            "answered-before": "我之前已回答过这问题",
                            "vodus-or": " 或",
                            "more-info": "更多信息",
                            "about-us": "关于我们",
                            "vpoints": "你的VPoint:",
                            "points": " 积分",
                            "redeem-points": "兑换奖励",
                            "login-gain-rewards": "登入 | 注册",
                            "signup": "注册",
                            "login": "登入",
                            "logout": "(退出)",
                            "signup-vodus": "注册Vodus",
                            "login-vodus": "登入Vodus",
                            "back": "返回",
                            "gain-double-points": "赢取双倍积分",
                            "rewards-to-be-won": "奖品等待赢取:",
                            "sso-description-title": "奖励您的意见",
                            "sso-list-1-bold": "以赢取双倍V积分",
                            "sso-list-2-bold": "待换您的VPoint",
                            "sso-list-1": " ,请您回复前登入您的Vodus帐户.",
                            "sso-list-2": " 以现金券和折扣在",
                            "forgot-password": "忘记密码?",
                            "email": "电邮",
                            "password": "密码",
                            "create-account": "注册",
                            "data-policy": "数据政策",
                            "sign-up-message": "浏览任何与Vodus有联系的电子媒体以赢取奖励。",
                            "gain-two-times-points": "赢取2\u00D7的积分",
                            "in-partnership": "我们的伙伴:",
                            "start-earning-rewards-by-signup": "立即注册以赢取双倍积分！",
                            "not-yet-signed-up": "还没注册？",
                            "already-signed-up": "已经注册了？",
                            "powered-by": "",
                            "ranking-instruction": "拖放以排名:"
                        }
                    }
                },
                debug: false
            }, function (err, t) {
                // initialized and ready to go!
                jqueryI18next.init(i18next, $);
                $('.i18next').localize();

                //   Do bm inline style here
                if (app.language === 'ms') {
                    $(".ranking-instruction").css('max-width', '195px');
                }
                //   Do cn inline style here
                else if (app.language === 'zh') {
                    $(".close-modal-instruction-container").css('font-size', 'larger');
                    $(".close-modal-instruction").css('font-weight', '400');
                    $(".question-purpose").css('font-weight', '600');
                }
            });
    } catch (ex) {
        vodus.log(ex, app.logStatus.error)
    }

    if (app.thirdPartyEnabled) {
        //  Create temporary points for rewards
        if ($("#reward_3PTest").length === 0) {
            $("<div>").attr({
                'class': "",
                'id': "reward_3PTest"
            }).appendTo("body");
        }
        vodus.log("GetQuestionInternal -> Updating rewards points");
        var encodedToken = vodus.readCookie(app.cookieName);
        $("#reward_3PTest").html('<iframe id="vodus3PTest" width="0" height="0"  src="' + app.reward3PRootUrl + '/token/create-temporary-points?token=' + encodedToken + '&points=' + response.data.AvailablePoints + '&partnerCode=' + app.partner_code + '" frameborder="0" allowfullscreen></iframe>');
        /*
        $("#vodus3PTest").load(function () {
        });
        */
    }

    vodus.log("Skipping countdown");
    $(".survey-mcqsa-div").removeClass("ripple");
    $(".survey-mcqsa-div").removeClass("disabledButtons");
    $(".answer-box").removeClass("ripple");
    $(".ripple-effect").unbind('click', handler);

    if (response.data.QuestionTypeId != 6 && response.data.QuestionTypeId != 7 && response.data.QuestionTypeId != 8) {
        //  submit buttons
        $(".survey-submit-btn").removeClass("disabledButtons");
        $(".survey-submit-btn").prop('disabled', false);
        $(".survey-submit-btn").removeClass("animate");
        $(".survey-submit-btn").removeClass("ripple");
    }

    submitEnabled = true;
    startTime = new Date();
    var twoSecond = 0;
    if (app.ctcTimer > 9) {
        twoSecond = 0;
    }
    var disabledCounter = setInterval(function () {
        twoSecond++;
        counter--;
        if (app.ctcTimer > parseInt(0)) {
            if (twoSecond > 0) {
                var autocloseCounter = app.ctcTimer;
                var autocloseTimer = setInterval(function () {
                    autocloseCounter--;
                    if (autocloseCounter >= 0) {
                        $(".timer-seconds").html(autocloseCounter);
                    }
                    if (autocloseCounter === 0) {
                        clearInterval(autocloseTimer);
                        if (app.modalClosable) {
                            $(".wait-to-close-div").hide();
                            $(".click-to-close-div").show();
                        }
                        $(".click-to-close-div").unbind("click")
                        $(".click-to-close-div").click(function () {
                            if (app.checkCounterTimer != null) {
                                clearInterval(app.checkCounterTimer);
                            }
                            vodus.submitCloseResponse();
                            showCloseMessage();
                        });
                    }
                }, 1000);
            }
        }

        if (counter === 0) {

            $(".survey-mcqsa-div").removeClass("ripple");
            $(".survey-mcqsa-div").removeClass("disabledButtons");
            $(".answer-box").removeClass("ripple");
            $(".ripple-effect").unbind('click', handler);

            if (response.data.QuestionTypeId != 6 && response.data.QuestionTypeId != 7 && response.data.QuestionTypeId != 8) {
                //  submit buttons
                $(".survey-submit-btn").removeClass("disabledButtons");
                $(".survey-submit-btn").prop('disabled', false);
                $(".survey-submit-btn").removeClass("animate");
                $(".survey-submit-btn").removeClass("ripple");
            }

            submitEnabled = true;
            startTime = new Date();
            clearInterval(disabledCounter);
        }
    }, 1000);

    repositionMobileImage($('.tingle-modal-box'));



    //  Hide editing UI
    $("#vodusQuestionModal").find(".overlay").removeClass('overlay');
    $("#vodusQuestionModal").find(".draganddrop-imagebox-text").html("");
    $("#vodusQuestionModal").find(".droppable-template").css("border", "none");
    $("#vodusQuestionModal").find(".remove-imagebox-icon").hide();
    $("#vodusQuestionModal").find(".edit-imagebox-icon").hide();
    $("#vodusQuestionModal").find(".ui-draggable-handle").css("cursor", "default");
    $("#vodusQuestionModal").find(".change-text-image-answer-type-icon").removeClass("change-text-image-answer-type-icon");
    $(".droppable-template").css("z-index", "2");

    //Change submit button values
    $("button.survey-submit-btn").each(function () {

        $(this).html($(this).attr("value"));
    })

    //No Survey Question Callback
    if (response.data.QuestionTemplateContent === "") {
        {
            vodus.log('No questions available (No Survey Callback):' + response.message);
            if (vodus.getNoQuestionCallback() != null) {
                if (vodus.getNoQuestionCallback().length > 0) {
                    vodus.log("Executing callback -> " + vodus.getNoQuestionCallback());
                    window[vodus.getNoQuestionCallback()].apply(this, vodus.getNoQuestionCallArgument());
                    NoCCCheckIsSurveyFallbackScript(app.isSurveyFallbackScript, app.GAMAdUnitId)
                }
            }

        }
    }
    //Reward Callback After Get Question
    if (vodus.getRewardGetQuestionCallback() != null) {
        if (vodus.getRewardGetQuestionCallback().length > 0) {
            vodus.log("Executing callback -> " + vodus.getRewardGetQuestionCallback());
            //window[vodus.getRewardGetQuestionCallback()].apply(this, vodus.getRewardGetQuestionArgument());
            if (app.modalClosable) {
                $(".ctc-container").show();
                $(".vodus-rewards-close-div").show();
                $(".vodus-reward-response-to-close").hide();
                $(".userPoints").html(app.availablePoints);
            } else {
                $(".ctc-container").hide();
                $(".vodus-rewards-close-div").hide();
                $(".vodus-reward-response-to-close").hide();
                $(".userPoints").html(app.availablePoints);
            }

            if (app.email == null || app.email == "") {
                $(".reward-login-top-menu").show();
                $(".reward-logout-top-menu").hide();
                $(".reward-login-username").html('');
            }
            else {
                $(".reward-login-top-menu").hide();
                $(".reward-logout-top-menu").show();
                $(".reward-login-username").html(app.email);
            }

        }
    }
    addLogoutEvent();
}

function showThankYouMessage(appS, pointsGainedS) {
    var thankyou_template = $(appS.rewardsAdsTemplate);

    thankyou_template.find(".thankyou-product-image-url").css("display", "none");

    if (appS.language == "ms") {
        thankyou_template.find(".thankyou-message").html("Terima Kasih");
        thankyou_template.find(".thankyou-current-point").html("Anda kini mempunyai <u>" + (parseInt(appS.availablePoints) + pointsGainedS) + " VPoints</u>");
        thankyou_template.find(".thankyou-product-url").css('font-size', '12px').html("Maklumat Lanjut");
        thankyou_template.find(".autoclose-message").css('font-size', '13px').css('padding-right', '0').html("Ditutup dalam <span>3</span>");
    } else if (appS.language == "zh") {
        thankyou_template.find(".thankyou-message").html("谢谢您");
        thankyou_template.find(".thankyou-current-point").html("您现在拥有 <u>" + (parseInt(appS.availablePoints) + pointsGainedS) + " VPoints</u>");
        thankyou_template.find(".thankyou-product-url").html("更多详情");
        thankyou_template.find(".autoclose-message").html("关闭中 <span>3</span>");
    } else {
        thankyou_template.find(".thankyou-message").html("Thank You");
        thankyou_template.find(".thankyou-current-point").html("You now have <u>" + (parseInt(appS.availablePoints) + pointsGainedS) + " VPoints</u>");
        thankyou_template.find(".autoclose-message").html("Closing in <span>3</span>");
    }

    if ((appS.ccType == "2") || (appS.ccType == "3")) {
        $(".bootstrap-vodus").find(".mobile-bar-vodus").hide();
        $(".bootstrap-vodus").find(".mobile-footer-vodus").hide();
        $(".bootstrap-vodus").addClass("thankyou-banner");

        var responsededMessage = "";
        var respondedHeader = thankyou_template.html();

        $(".close-modal-instruction-container").html("");
        $(".wait-to-close-div").hide();
        $(".click-to-close-div").show().unbind().html("X");
        $("#divQuestionaireEditorContainer").html('<div class="s-editable-text question-header-1 banner-thankyou vodus-responded-toast">' + respondedHeader + responsededMessage + '</div>');
        $(".mobile-footer-vodus").html('');

        clearInterval(appS.checkCounterTimer);
        $(".click-to-close-div").click(function () {
            closeAllVodusModal();
        });
        $(".vodus-responded-toast").click(function () {
            if (!appS.isBannerMode) {
                $('.autoclose-message').hide();
                if (typeof type2CloseTimer != "undefined") {
                    clearInterval(type2CloseTimer);
                }
            }
        });
        if (appS.viewType == "mobile-appS") {
            $(".click-to-close-div").hide();
        }
    } else {
        $("#toast-container").remove();
        if ("http://localhost:63828" == origin || "https://vodus-voupon-uat.azurewebsites.net" == origin || "https://vodus.my" == origin) {

        } else {
            closeAllVodusModal();
        }

        if (appS.notificationPosition == null || appS.notificationPosition == "") {
            appS.notificationPosition = "top-right";
        }
        toastr.options = {
            "closeButton": true,
            "positionClass": "toast-" + appS.notificationPosition,
            "preventDuplicates": false,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut",
            "allowHTML": true,
            "tapToDismiss": true
        }
        var toastCounter = 3;
        $('.autoclose-message span').html(toastCounter);
        var toastrCloseTimer = setInterval(function () {
            toastCounter--;
            $('.autoclose-message span').html(toastCounter);

            if (toastCounter === 0) {
                clearInterval(toastrCloseTimer);
                if (!appS.isBannerMode) {
                    toastr.clear();
                }
            }
        }, 1000);
        var toast = toastr.success('', thankyou_template.html(), {
            tapToDismiss: false,
            closeButton: true,
            timeOut: 0,
            extendedTimeOut: 0,
            allowHtml: true
        });
        toast.on('click', function () {
            clearInterval(toastrCloseTimer);
            $('.autoclose-message').hide();
        });
        $("#toast-container").addClass("vodus-responded-toast");
    }


    if (appS.availablePoints > 5) {
        var timeout = 2000;
    } else {
        var timeout = 0;
    }

    if (appS.reward3PRootUrl.indexOf(document.domain) < 0) {
        setTimeout(function () {
            vodus.updateAdsData()
        }, timeout);
    }
}

function showCloseMessage() {
    var app = vodus.getAppData();

    if ($(".vodusAvailablePoints").html() < 0) {//Disable second/close survey pop-up

        var domainKeywords = ["astroawani"];//Add exception to Awani for showing second pop-up
        var currentDomain = document.domain;

        var containsString = false;
        $.each(domainKeywords, function () {
            containsString = currentDomain.toLowerCase().indexOf(this.toLowerCase()) !== -1
            if (containsString) { return }
        })

        if (!containsString) {
            if (app.ccType == "1") {
                toastr.success('', '<div class="closeMessage-left">' +
                    '<div class= "closeMessage-top"><div class="closeMessage-logo"><img class="partner-logo" src="https://api.vodus.com/cc/images/logo/Vodus%20V3%20Logo%20Favicon.svg"></div>' +
                    '<div class="closeMessage-header"></div></div></div>' +
                    '<div class="closeMessage-right"></div></div><div>', {
                    tapToDismiss: false,
                    closeButton: true,
                    timeOut: 0,
                    extendedTimeOut: 0,
                    allowHtml: true,
                    toastClass: 'closeMessageContent closeMessageType1'
                });

                if (app.language == "ms") {
                    var closeMessage_header = "<h3>Siapakah Vodus?</h3>";
                    var closeMessage_subtitle =
                        "<span>Vodus ialah rakan kongsi penyelidikan pasaran kepada " + app.partnerWebsiteName
                        + " yang memberi <b>ganjaran untuk pendapat anda</b> melalui satu soalan tinjauan yang mudah.</span>";
                    var closeMessage_paragraph =
                        + "<p>VPoint anda boleh ditukar dengan <b>baucar tunai atau diskaun beli-belah</b> (10 VPoint untuk diskaun 10% bagi jenama terkenal!)</p>"
                        + "<p>Lihat tawaran ganjaran kami di <a target='_blank' href='" + $(".syncType4").eq(0).attr("href") + "'>Vodus Rewards</a>.</p>";
                } else if (app.language == "zh") {
                    var closeMessage_header = "<h3>谁是 Vodus?</h3>";
                    var closeMessage_subtitle =
                        "<span>Vodus 是一家与 " + app.partnerWebsiteName
                        + " 合作的市场研究公司，我们会根据<b>您所提供的意见而奖励您</b>。</span>";
                    var closeMessage_paragraph =
                        + "<p>您的 Vpoint 可兑换<b>现金券或购物折扣</b>（10Vpoints 可兑换知名品牌 10% 的折扣！）</p>"
                        + "<p>请登录<a target='_blank' href='" + $(".syncType4").eq(0).attr("href") + "'>Vodus Rewards</a>查看我们的奖励。</p>";
                    $(".closeMessageContent").addClass("chinese");
                } else {
                    var closeMessage_header = "<h3>Who is Vodus?</h3>";
                    var closeMessage_subtitle =
                        "<span>Vodus is a market research partner of " + app.partnerWebsiteName
                        + " that <b>rewards you for your opinion</b> with a simple one-question survey.</span>";
                    var closeMessage_paragraph =
                        + "<p>Your VPoints can be exchanged for <b>cash vouchers or shopping discounts</b> (10 VPoints for 10% discount on popular brands!)</p>"
                        + "<p>Check out our rewards offering on <a target='_blank' href='" + $(".syncType4").eq(0).attr("href") + "'>Vodus Rewards</a>.</p>";
                }

                $(".closeMessageType1 .closeMessage-header").html(closeMessage_header);
                $(".closeMessageType1 .closeMessage-left").append(closeMessage_subtitle);
                $(".closeMessageType1 .closeMessage-right").html(closeMessage_paragraph);
            } else {
                //ccType 2 and 3 Closing Message
                $(".bootstrap-vodus").css("display", "");
                $(".bootstrap-vodus").addClass("closeMessage");
                $(".bootstrap-vodus .partnerLogo").attr("src", "https://api.vodus.com/cc/images/logo/Vodus%20V3%20Logo%20Favicon.svg");
                $(".ctc-container").html("<p class='closeMessage-ctc-button'>&#xd7;</p>");
                $(".wait-to-close-div").hide();
                $(".mobile-footer-vodus").hide();
                $(".closeMessage-ctc-button").click(function () {
                    $(".bootstrap-vodus").hide();
                })
                $("#divQuestionaireEditorContainer").html('<div class="closeMessageContent"></div>');
                if (app.language == "ms") {
                    $(".close-modal-instruction-container").html("<h3>Dapatkan Ganjaran untuk Pendapat Anda</h3>");
                    var closeMessage_subtitle =
                        "<span>Vodus ialah rakan kongsi penyelidikan pasaran kepada " + app.partnerWebsiteName
                        + " yang memberi <b>ganjaran untuk pendapat anda</b> melalui satu soalan tinjauan yang mudah.</span>";
                    var closeMessage_paragraph =
                        "<p>Anda akan mendapat 1 VPoint untuk setiap soalan yang dijawab.</p>"
                        + "<p>VPoint anda boleh ditukar dengan <b>baucar tunai atau diskaun beli-belah</b> (10 VPoint untuk diskaun 10% bagi jenama terkenal!)</p>"
                        + "<p>Lihat tawaran ganjaran kami di <a target='_blank' href='" + $(".syncType4").eq(0).attr("href") + "'>Vodus Rewards</a>.</p>";
                } else if (app.language == "zh") {
                    $(".close-modal-instruction-container").html("<h3>奖励您所提供的意见</h3>");
                    var closeMessage_subtitle =
                        "<span>Vodus 是一家与 " + app.partnerWebsiteName
                        + " 合作的市场研究公司，我们会根据<b>您所提供的意见而奖励您</b>。</span>";
                    var closeMessage_paragraph =
                        "<p>每回答一道调查问题，您将获得 1 Vpoint。</p>"
                        + "<p>您的 Vpoint 可兑换<b>现金券或购物折扣</b>（10Vpoints 可兑换知名品牌 10% 的折扣！）</p>"
                        + "<p>请登录<a target='_blank' href='" + $(".syncType4").eq(0).attr("href") + "'>Vodus Rewards</a>查看我们的奖励。</p>";
                    $(".closeMessageContent").addClass("chinese");
                } else {
                    $(".close-modal-instruction-container").html("<h3>Get Rewarded for Your Opinion</h3>");
                    var closeMessage_subtitle =
                        "<span>Vodus is a market research partner of " + app.partnerWebsiteName
                        + " that <b>rewards you for your opinion</b> with a simple one-question survey.</span>";
                    var closeMessage_paragraph =
                        "<p>You will gain 1 VPoint for every question answered.</p>"
                        + "<p>Your VPoints can be exchanged for <b>cash vouchers or shopping discounts</b> (10 VPoints for 10% discount on popular brands!)</p>"
                        + "<p>Check out our rewards offering on <a target='_blank' href='" + $(".syncType4").eq(0).attr("href") + "'>Vodus Rewards</a>.</p>";
                }
                $(".closeMessageContent").html(closeMessage_subtitle + closeMessage_paragraph);
            }
        }
    }
}

function type2Close(modalCounter) {
    return type2CloseTimer = setInterval(function () {
        modalCounter--;
        $('.autoclose-message span').html(modalCounter);
        if (modalCounter === 0) {
            closeAllVodusModal();
            clearInterval(type2CloseTimer);
        }
    }, 1000);
}

//Google API
var globalGoogleUser;
var auth2;

function onSuccess(googleUser) {
    if (googleUser == null) {
        googleUser = globalGoogleUser;
    }
    var profile = googleUser.getBasicProfile();
    var googleToken = googleUser.getAuthResponse().id_token;
    vodus.emailLogin(profile.getEmail(), '', 'google', googleToken);
}

function onFailure(error) {
    toastr.error("Hmm, fail to login with google, please try again.");
    vodus.log('Google API: ' + error);
}

function initGoogleLogin() {
    gapi.load('auth2', function () {
        auth2 = gapi.auth2.init({
            client_id: '700069321358-1t3lj52il4lrfcbffo31qbj78b46dind.apps.googleusercontent.com',
            fetch_basic_profile: false,
            scope: 'profile email'
        });
        auth2.isSignedIn.listen(signinChanged);
        auth2.currentUser.listen(userChanged);
        auth2.attachClickHandler(document.getElementById('vodusGoogleLogin'), {},
            onSuccess, onFailure);
    });
}

var signinChanged = function (val) { };

var userChanged = function (user) {
    if (user.getId()) {
        globalGoogleUser = user;
    }
};

function scrollFunction(app) {
    if (app.isBannerMode) {
        if (app.viewType == "mobile-app") {
            vodus.getCC();
            app.isCCPageScrollTriggered = true;
            var currentScrollPosition = $(window).scrollTop();
            scrollToBannerDiv(currentScrollPosition);
        }
        else {
            var windowsPosition = $(window).scrollTop();

            var windowHeight = $(window).height();
            var windowBottomPosition = windowsPosition + windowHeight;
            if ($('.vodus-banner').offset().top - windowBottomPosition <= windowHeight) {
                if (!app.isCCPageScrollTriggered) {
                    vodus.getCC();
                    app.isCCPageScrollTriggered = true;
                    var currentScrollPosition = $(window).scrollTop();
                    scrollToBannerDiv(currentScrollPosition);
                }
            }
        }

    } else {
        var distancePX = $(window).scrollTop();
        var windowHeight = $(document).height() - $(window).height();
        var pageScrollPercentage = (distancePX / windowHeight) * 100;
        if (pageScrollPercentage > app.ccPageScrollTrigger) {
            if (!app.isCCPageScrollTriggered) {
                vodus.getCC();
                app.isCCPageScrollTriggered = true;
            }
        }
    }
}
//When There is no CC for any reason
function NoCCCheckIsSurveyFallbackScript(isSurveyFallbackScript, gamAdUnitId) {
    if ($(".vodus-banner").length > 0) {
        //Banner mode with GAM script
        if (gamAdUnitId != "" && gamAdUnitId != undefined && $(".vodus-banner").html() == "" && isSurveyFallbackScript == '1') {
            vodus.log("Displaying Fallback Ad");
            var iframeDiv = document.getElementById(gamAdUnitId);
            $(".vodus-gam-div-style").remove();
            $(".vodus-banner").hide();
        }
        //Banner mode without GAM script (Directly to HTML)
        else if ($(".vodus-banner-tag").length > 0 && $(".vodus-banner").html() == "" && isSurveyFallbackScript == '1') {
            vodus.log("Displaying Fallback Ad");
            var iframeDiv = $(".vodus-banner-tag");
            $(iframeDiv).show();
            $(".vodus-banner").hide();
        }
    }
}
//When Close or Response
function ResponseCloseCheckIsSurveyFallbackScript(isSurveyFallbackScript, gamAdUnitId, fromResponse) {
    if ($(".vodus-banner").length > 0) {
        //Banner mode with GAM script
        if (gamAdUnitId != "" && gamAdUnitId != undefined && isSurveyFallbackScript == '1') {
            if (!fromResponse) {
                vodus.log("Displaying Fallback Ad");
                var iframeDiv = document.getElementById(gamAdUnitId);
                $(".vodus-gam-div-style").remove();
                $(".vodus-banner").hide();
            } else {
                setTimeout(function () {
                    vodus.log("Displaying Fallback Ad");
                    var iframeDiv = document.getElementById(gamAdUnitId);
                    $(".vodus-gam-div-style").remove();
                    $(".vodus-banner").hide();
                }, 10000);
            }
        }
        //Banner mode without GAM script (Directly to HTML)
        else if ($(".vodus-banner-tag").length > 0 && isSurveyFallbackScript == '1') {
            if (!fromResponse) {
                vodus.log("Displaying Fallback Ad");
                var iframeDiv = $(".vodus-banner-tag");
                $(iframeDiv).show();
                $(".vodus-banner").hide();
            } else {
                setTimeout(function () {
                    vodus.log("Displaying Fallback Ad");
                    var iframeDiv = $(".vodus-banner-tag");
                    $(iframeDiv).show();
                    $(".vodus-banner").hide();
                }, 10000);
            }
        }
    }
}

function updateRecoRewardImpression(memberProfileId, rewardsAdDemographicStateId, rewardsAdDemographicAgeId, rewardsAdDemographicEthnicityId, rewardsAdDemographicGenderId, rewardsAdSubgroupId, partnerId, partnerWebsiteId, productRecoId, serverlessUrl) {
    $.ajax({
        type: "POST",
        dataType: 'json',
        async: true,
        global: false,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            MemberProfileId: memberProfileId,
            DemographicstateId: rewardsAdDemographicStateId,
            DemographicAgeId: rewardsAdDemographicAgeId,
            DemographicEthnicityId: rewardsAdDemographicEthnicityId,
            DemographicGenderId: rewardsAdDemographicGenderId,
            SubgroupId: rewardsAdSubgroupId,
            PartnerId: partnerId,
            PartnerWebsiteId: partnerWebsiteId,
            ProductRecoId: productRecoId
        }),
        url: serverlessUrl + '/api/updateRecoRewardImpression',
        success: function (response) {
            if (response.successful) {
                vodus.log(response.message);
            }
        },
        error: function (err) {
        }
    });
}

function logDelay(responseQuestion, responseSubmit, timeSpent, functionType, serverlessUrl, is3POn, memberProfileId, partnerCode, browser) {
    $.ajax({
        type: "POST",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            MemberProfileId: memberProfileId,
            Browser: browser,
            ResponseQuestion: responseQuestion,
            ResponseSubmit: responseSubmit,
            TimeSpent: timeSpent,
            FunctionType: functionType,
            Is3POn: is3POn,
            PartnerCode: partnerCode
        }),
        url: serverlessUrl + '/api/sendErrorLogFunction',
        success: function (response) {
            if (response.successful) {
                vodus.log(response.message);
            }
        },
        error: function (err) {
            vodus.log(err);
        }
    });

}

function getBrowser() {
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
        return 'Opera';
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
        return 'Chrome';
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
        return 'Safari';
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        return 'Firefox';
    } else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) {
        return 'IE';
    } else {
        return 'Unknown';
    }
}
