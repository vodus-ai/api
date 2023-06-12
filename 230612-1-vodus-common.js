
//Reset font size to prevent overflow
function resizeMobileFontSize_Preview(container, type) {
    var containerHeight = $(container).find(".questionaire-container-size-variable").height();
    //console.log(container);
    //console.log("containerHeight " + containerHeight);

    var imageHeight = 0;
    if ($(container).find(".template-preview-image-box").length > 0) {
        $(container).find(".template-preview-image-box").each(function () {
            imageHeight += $(this).outerHeight();
        })

        if ($(container).find(".mobileGridTitle").length > 0) {
            $(container).find(".selectGridMobileAnswer").eq(0).parent().addClass("mobile-grid-2-col");
        };
    }

    //Title and Answer

    var maxTitleFontSize = 19;//Answer Font Size Difference= -2
    var minTitleFontSize = 16;
    var fontDifference = 3;

    if ($(container).find(".quesionaire-preview-question-mobile-preview").length > 0) {
        if ($(container).find(".vodus-slider-question-vertical-slider").length <= 0) {
            for (var i = maxTitleFontSize; i >= minTitleFontSize; i--) {

                $(container).find(".question-header-1").css("font-size", i + "px");
                if ($(container).find(".mobileGridTitle").length > 0) {
                    $(container).find(".question-header-1").css("font-size", i - 2 + "px");
                    $(container).find(".mobileGridTitle").css("font-size", i - 2 + "px");
                };
                $(container).find(".answer-box > .s-editable-text").css("font-size", i - fontDifference + "px");
                $(container).find(".survey-submit-btn").css("font-size", i - 3 + "px");

                $(container).find(".vodus-slider-question-vertical-text").css("font-size", i - fontDifference + "px");
                $(container).find(".vodus-slider-question-vertical-title").css("font-size", i - fontDifference + "px");

                $(container).find(".vodus-rating-question-type").css("font-size", (i + 20) + "px");

                var titleHeight = $(container).find(".template-preview-title-to-display").height();
                var answerHeight = $(container).find(".template-preview-answer-to-display").height();

                if (containerHeight >= (titleHeight + answerHeight + imageHeight)) {
                    i = 0;
                }
            }
        };

        //  For grid
        if ($(container).find('.grid-row').length > 0) {
            var templateTable = $(container).eq(0).find('table');
            if (templateTable.length > 0) {
                var newTemplate = [];
                var currentRow = 0;
                var currentSelectedRow = 1;
                $(templateTable).find(".s-selectable-text").css("border", "none");
                var totalRows = $(templateTable).find('.grid-row').length;
                var answerChoices = '';
                var mobileGridBackgroundColor = $(templateTable).css('background-color');

                var title = $(container).eq(0).find(".question-header-1").text();
                var titleExtra = "";
                $(templateTable).find('.grid-row').each(function () {
                    if ($(container).find(".template-preview-answer-to-display-table-content").hasClass("grid-boolean")) {
                        var defaultAnswer = $(this).find('.s-editable-text').attr('default-answer');
                        var answerID = $(this).find(".gridOption").eq(0).attr("id");
                    }
                    currentRow++;
                    titleExtra += '<div class="mobileGridTitle" style="display:none;" answer-ID="' + answerID + '" id="mobileGridRow_' + currentRow + '"><span style="font-style:italic;">(' + currentRow + '/' + totalRows + ')</span><span id="mobileGridRowTitle_' + currentRow + '" style="margin-left:0.3em;" default-answer="' + defaultAnswer + '">' + $(this).find('td').eq(0).find('.s-selectable-text').text() + '</span></div>';
                });
                title += titleExtra;
                $(templateTable).parent().parent().parent().find(".question-header-1").html(title);
                $(container).eq(0).find(".template-preview-answer-to-display-table-content").html('');
                $(templateTable).find('.grid-header').eq(0).find('td').each(function () {
                    var answer = $(this).find('.s-selectable-text').text();
                    if (answer != '') {
                        var answerChoices = '<div class="survey-grid-div answer-box selectGridMobileAnswer" id="0_0" style="width: 98%; background-color: ' + mobileGridBackgroundColor + '; float:left;" data-answer="' + answer + '">' +
                            '<div class ="s-editable-text" style="font-size: 24px;">' + answer + '</div></div>';
                        $(container).eq(0).find(".template-preview-answer-to-display-table-content").append(answerChoices);
                    }
                });

                $(templateTable).eq(0).hide();
                $(container).eq(0).find('.survey-submit-btn').eq(0).hide();
                $("#mobileGridRow_1").show();
            }
        }

        //For Rating
        $(container).find(".quesionaire-preview-question-mobile-preview").find(".template-preview-answer-to-display-table-content").find(".vodus-rating-question-type").each(function () {
            $(this).parent().css("width", "98%");
        })


        //For Open Ended
        $(container).find(".quesionaire-preview-question-mobile-preview").find(".template-preview-answer-to-display-table-content > div.open-ended-answer").each(function () {

            var titleHeight = $(container).find(".template-preview-title-to-display").height();
            var answerButtonHeight = $(container).find(".survey-submit-btn").parent().height();
            var maxHeight = containerHeight - titleHeight - answerButtonHeight - imageHeight - 25;
            var MinHeight = 100;

            maxHeight < MinHeight ? maxHeight = MinHeight : "";

            $(this).css("min-height", MinHeight + "px");
            $(this).css("max-height", maxHeight + "px");

            //Font Size
            var currentFontSize = $(this).parent().css("font-size");
            if (currentFontSize !== undefined || currentFontSize != null) {

                currentFontSize = currentFontSize.replace("px", "");

                if (parseInt(currentFontSize) > 30) {
                    currentFontSize = 30;
                }

                $(this).parent().css("font-size", currentFontSize + "px");
            }
        })

        //For Slider
        if ($(container).find(".vodus-slider-question-vertical-slider").length > 0) {
            $(container).find('.survey-submit-btn').hide();
        }


        $(container).find(".quesionaire-preview-question-mobile-preview").find(".template-preview-answer-to-display-table-content > div").each(function () {

            var screenHeight = $(window).height();

            $(this).find(".vodus-slider-question-vertical-text > div > div").css("overflow", "");

            if ($(".vodus-slider-question-vertical-slider").length > 0) {
                var answerLength = $(this).find(".vodus-slider-question-vertical-text > div").length;
                var sliderHeight = parseFloat($(this).height() - 16);
                var questionContainerHeight = parseFloat($(container).find(".questionaire-container-size-variable").height());
                var maxQuestionContainerHeight = 410; //-30px of vertical padding

                //Adjust Question title height for Slider
                if (answerLength <= 6) {
                    var maxQuestionTitleHeight = (questionContainerHeight * 0.3);
                } else if (answerLength > 6 && answerLength < 10) {
                    var maxQuestionTitleHeight = (maxQuestionContainerHeight * 0.3);
                } else {
                    var maxQuestionTitleHeight = (maxQuestionContainerHeight * 0.2);
                };

                var maxTitleFontSize = 26;
                var minTitleFontSize = 14;
                for (var i = maxTitleFontSize; i >= minTitleFontSize; i--) {
                    $(container).find(".quesionaire-preview-question-mobile-preview").find(".question-header-1").css("font-size", i + "px");
                    var titleHeight = parseFloat($(container).find(".quesionaire-preview-question-mobile-preview").find(".template-preview-title-to-display").height());
                    if (titleHeight <= maxQuestionTitleHeight) {
                        i = 0;
                    }
                }

                var newSliderHeight = questionContainerHeight - maxQuestionTitleHeight - 43;//minus Submit button height and margins

                var newSmallestText = 0;
                var newSliderWidth = 0;

                if (sliderHeight > newSliderHeight) {
                    newSliderHeight = sliderHeight;
                }

                if (answerLength <= 6) {
                    var maxSliderContainerHeight = (questionContainerHeight * 0.7)
                    if (newSliderHeight < maxSliderContainerHeight) {
                        newSliderHeight = maxSliderContainerHeight
                    };
                    $(this).find(".vodus-slider-question-vertical-slider>input").css("top", "0");
                }

                if (answerLength > 6 && answerLength < 10) {
                    var maxSliderContainerHeight = (maxQuestionContainerHeight * 0.7)
                    if (newSliderHeight < 330) {
                        newSliderHeight = 330
                    };
                    $(container).find(".survey-submit-btn").css("font-size", "16px");
                }

                if (answerLength >= 10) {
                    var maxSliderContainerHeight = (maxQuestionContainerHeight * 0.8)
                    if (newSliderHeight < maxSliderContainerHeight) {
                        newSliderHeight = maxSliderContainerHeight;
                    };
                    $(container).find(".survey-submit-btn").css("font-size", "14px");
                    $(this).find(".vodus-slider-question-vertical-slider>input").css("top", "2px");
                }

                $(this).find(".vodus-slider-question-vertical-text").css("height", newSliderHeight + "px");
                $(this).find(".vodus-slider-question-vertical-slider").css("height", newSliderHeight + "px");
                $(this).find(".vodus-slider-question-vertical-title").css("height", newSliderHeight + "px");
                //$(this).find("input[type=range]").css("width", (newHeight - 50) + "px");

                $(this).find(".vodus-slider-question-vertical-text > div").each(function (idx, ele) {

                    if (idx == 0) {
                        newSmallestText = $(this).find("div").height();
                    }
                    else {
                        if ($(this).find("div").height() < newSmallestText) {
                            newSmallestText = $(this).find("div").height();
                        }
                    }

                    newSliderWidth += $(this).height(true);

                    if ((idx + 1) == answerLength) {
                        newSmallestText = $(this).height(true) - newSmallestText;
                    }
                })
                //console.log(newSmallestText + " - END");

                if ($(this).find(".vodus-slider-question-vertical-text").css("height") != undefined &&
                    $(this).find(".vodus-slider-question-vertical-text").css("height").indexOf('%') < 0) {

                    var totalAnswerHeight = 0;
                    var ParentFontSize = $(this).find(".vodus-slider-question-vertical-text").css("font-size").replace("px", "");
                    //var ParentHeight = $(this).find(".vodus-slider-question-vertical-text").height();
                    var ParentHeight = 0;

                    $(this).find(".vodus-slider-question-vertical-text > div").each(function () {
                        totalAnswerHeight += $(this)[0].scrollHeight;
                        ParentHeight += $(this).height();
                    });

                    $(this).find(".vodus-slider-question-vertical-text > div > div").css("overflow", "visible");

                    while (totalAnswerHeight > (ParentHeight + imageHeight)) {

                        ParentFontSize = ParentFontSize - 1;
                        totalAnswerHeight = 0;

                        if (ParentFontSize < 14) {
                            break;
                        }

                        $(this).find(".vodus-slider-question-vertical-text").css("font-size", ParentFontSize + "px");
                        $(this).find(".vodus-slider-question-vertical-title").css("font-size", ParentFontSize + "px");
                        $(this).find(".vodus-slider-question-vertical-text > div").each(function () {
                            totalAnswerHeight += $(this).height();
                        });
                    }
                }

                newSliderWidth = (newSliderWidth * (answerLength - 1) / answerLength) + (ParentFontSize * 0.8);
                //newSliderWidth = newSliderWidth - (newSmallestText * 4);
                $(this).find("input[type=range]").css("min-width", newSliderWidth + "px");

                var childWidth = parseFloat($(this).find(".vodus-slider-question-vertical-slider > input[type=range]").width());
                var parentWidth = parseFloat($(this).find(".vodus-slider-question-vertical-slider").parent().width());
                var newLeft = ((childWidth - parentWidth) / 2) * -1;

                $(this).find("input[type=range]").css("left", newLeft + "px");

                //Resize slider's text font-size to fit slider
                var questionTitleFontSize = parseFloat($(container).find(".quesionaire-preview-question-mobile-preview").find(".question-header-1").css("font-size"));
                var sliderTextContainerHeight = parseFloat($(container).find(".quesionaire-preview-question-mobile-preview").find(".vodus-slider-question-vertical-text-content").height());
                var sliderTextFontSize = (sliderTextContainerHeight * 0.6);

                if (sliderTextFontSize > questionTitleFontSize) {
                    sliderTextFontSize = questionTitleFontSize;
                };
                $(this).find(".vodus-slider-question-vertical-text").css("font-size", sliderTextFontSize + "px");
                $(this).find(".vodus-slider-question-vertical-title").css("font-size", sliderTextFontSize + "px");

            }

        })
    }
}

function randomizeGridBooleanRows(container) {
    var NoOfGridRows = $(container).find(".grid-row").length;
    var NoOfTables = $(container).find("table").length;

    var gridRowsArray = [];

    $(container).find(".grid-row").each(function () {
        gridRowsArray.push($(this).clone(true, true));
    });

    //Grid Table 1
    var NoOfRowTable1 = Math.ceil(NoOfGridRows / NoOfTables);

    var gridRowParent = $(container).find("tbody").eq(0);
    $(gridRowParent).find(".grid-row").remove();

    for (var i = 0; i < NoOfRowTable1; i++) {
        if (gridRowsArray.length == 0) {
            break;
        }

        var rdmNo = getRandomInt(0, gridRowsArray.length);
        gridRowsArray[rdmNo].insertAfter($(gridRowParent).find(".grid-header"));
        var index = gridRowsArray.indexOf(gridRowsArray[rdmNo]);
        if (index > -1) {
            gridRowsArray.splice(index, 1);
        }
    }

    if (NoOfTables > 1) {
        //Grid Table 2
        NoOfRowTable2 = NoOfGridRows - NoOfRowTable1;

        gridRowParent = $(container).find("tbody").eq(1);
        $(gridRowParent).find(".grid-row").remove();

        for (var i = 0; i < NoOfRowTable2; i++) {
            if (gridRowsArray.length == 0) {
                break;
            }

            var rdmNo = getRandomInt(0, gridRowsArray.length);
            gridRowsArray[rdmNo].insertAfter($(gridRowParent).find(".grid-header"));
            var index = gridRowsArray.indexOf(gridRowsArray[rdmNo]);
            if (index > -1) {
                gridRowsArray.splice(index, 1);
            }
        }
    }
}

function makeMCQAnswersSortable(container, isMobile) {
    //Randomize MCQ Answer
    var NoOfMCQAnswer = $(container).find(".answer-box").length;

    if ($("#divQuestionaireEditorContainer .answer-box[data-nota='1']").length > 0) {
        NoOfMCQAnswer = NoOfMCQAnswer - 1;
        var answersBoxClass = ".answer-box[data-nota='0']";
    } else {
        var answersBoxClass = ".answer-box";
    }
    var NoOfAnswersInRow = $(container).find(".answer-row").first().find(answersBoxClass).length;
    console.log("answersBoxClass = " + answersBoxClass);
    if (isMobile) {
        var domArray = [];

        $(container).first().find(answersBoxClass).each(function () {
            domArray.push($(this).clone(true, true));
        });
        var answersBoxParent = $(container).first().find(answersBoxClass).first().parent();

        $(answersBoxParent).html("");

        for (var i = 0; i < NoOfMCQAnswer; i++) {
            if (domArray.length == 0) {
                break;
            }

            var rdmNo = getRandomInt(0, domArray.length);
            $(answersBoxParent).append(domArray[rdmNo]);
            var index = domArray.indexOf(domArray[rdmNo]);
            if (index > -1) {
                domArray.splice(index, 1);
            }
        }
    } else {
        var domArray = [];
        console.log("$(container).first().find(answersBoxClass) = " + $(container).first().find(answersBoxClass).length);
        $(container).first().find(answersBoxClass).each(function () {
            $(this).closest(".answer-row").addClass("visible-row");
        })
        $(container).find(".visible-row").each(function () {
            for (var i = 0; i < NoOfAnswersInRow; i++) {
                if ($(this).children().eq(i).length > 0) {
                    domArray.push($(this).children().eq(i).clone(true, true));
                }
            }
            $(this).html("");
        });
        $(container).find(".visible-row").each(function () {
            for (var i = 0; i < NoOfAnswersInRow; i++) {
                if (domArray.length == 0) {
                    break;
                }

                var rdmNo = getRandomInt(0, domArray.length);
                $(this).append(domArray[rdmNo]);
                var index = domArray.indexOf(domArray[rdmNo]);
                if (index > -1) {
                    domArray.splice(index, 1);
                }
            }
        });
    }
}

//Ranking functions
function makeRankingAnswerSortable(container, isMobile) {
    //Randomize Ranking Answer
    var isRandomize = $("#divQuestionaireEditorContainer").find(".question-header-1").first().attr("israndomize");
    if (isRandomize == "true" || isRandomize == undefined) {
        var NoOfRankingAnswer = $(container).find(".survey-ranking-div").length;
        for (var i = 0; i < NoOfRankingAnswer; i++) {

            var rdmNo = getRandomInt(i, NoOfRankingAnswer);

            if (isMobile) {
                $(container).find(".survey-ranking-div").eq(i).insertAfter($(container).find(".survey-ranking-div").eq(rdmNo))
            }
            else {
                $(container).find(".survey-ranking-div").eq(i).parent().insertAfter($(container).find(".survey-ranking-div").eq(rdmNo).parent())
            }
        }
    }
    //Make Answer Sortable
    if (isMobile) {
        try {
            $(container).find(".survey-ranking-div").parent().sortable({
                stop: function (event, ui) {
                    //  submit buttons
                    enableSubmitButtonRanking();
                    updateRankingAnswerOrderNumber(container);
                }
            });
        }
        catch (err) {
            console.log(err);
        }

    }
    else {
        try {
            $(container).find(".survey-ranking-div").eq(0).parents().eq(1).sortable({
                stop: function (event, ui) {

                    //  submit buttons
                    enableSubmitButtonRanking();
                    updateRankingAnswerOrderNumber(container);
                }
            });
        }
        catch (err) {
            console.log(err);
            $(container).find(".survey-ranking-div").parent().sortable({
                stop: function (event, ui) {
                    //  submit buttons
                    enableSubmitButtonRanking();
                    updateRankingAnswerOrderNumber(container);
                }
            });
        }
    }

    //Enable Submit Button, Append Move Up and Down arrow to Answer Box
    $(container).find("div.survey-ranking-div").each(function () {
        //$(this).hover(function () {

        $(this).click(function () {

            //  submit buttons
            enableSubmitButtonRanking();
        })

        $(this).find("div.ranking-answer-move-up").remove();
        $(this).find("div.ranking-answer-move-down").remove();

        var divUp = $("<div>", { "class": "ranking-answer-move-up" }).html('<span class="fa fa-chevron-up" aria-hidden="true"></span>');
        var divDown = $("<div>", { "class": "ranking-answer-move-down" }).html('<span class="fa fa-chevron-down" aria-hidden="true"></span>');

        $(this).append(divUp).append(divDown);

        //if ($(this).find(".ranking-answer-move-up").length == 0) {
        //    $(this).append('<div class="ranking-answer-move-up"><span class="fa fa-chevron-up" aria-hidden="true"></span></div>').append('<div class="ranking-answer-move-down"><span class="fa fa-chevron-down" aria-hidden="true"></span></div>');
        //}

        $(divUp)
            .click(function () {

                if (isMobile) {
                    if ($(this).parent().hasClass("survey-ranking-div") && $(this).parent().prev("div").hasClass("survey-ranking-div")) {
                        $(this).parent().insertBefore($(this).parent().prev("div"));
                    }
                }
                else {
                    if ($(this).parents().eq(1).hasClass("answer-row") && $(this).parents().eq(1).prev("div").hasClass("answer-row")) {
                        $(this).parents().eq(1).insertBefore($(this).parents().eq(1).prev("div"));
                    }
                }

                //  submit buttons
                enableSubmitButtonRanking();
                updateRankingAnswerOrderNumber(container);
            });

        $(divDown)
            .click(function () {

                if (isMobile) {
                    if ($(this).parent().hasClass("survey-ranking-div") && $(this).parent().next("div").hasClass("survey-ranking-div")) {
                        $(this).parent().insertAfter($(this).parent().next("div"));
                    }
                }
                else {
                    if ($(this).parents().eq(1).hasClass("answer-row") && $(this).parents().eq(1).next("div").hasClass("answer-row")) {
                        $(this).parents().eq(1).insertAfter($(this).parents().eq(1).next("div"));
                    }
                }

                //  submit buttons
                enableSubmitButtonRanking();
                updateRankingAnswerOrderNumber(container);
            });

        //  }, function () {
        //    $(this).find("div.ranking-answer-move-up").remove();
        //    $(this).find("div.ranking-answer-move-down").remove();
        //  })
    })

    //Append Sortable Place Holder
    if ($(container).find("div.survey-ranking-div").length > 0) {
        $(container).find(".template-preview-answer-to-display").each(function () {

            $(this).find(".ranking-instruction").remove();
            $(this).prepend("<div class='ranking-instruction i18next' data-i18n='ranking-instruction'>Drag and drop to rank:</div>");
        })
    }

    updateRankingAnswerOrderNumber(container);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function updateRankingAnswerOrderNumber(container) {
    $(container).find("div.survey-ranking-div").each(function (idx, ele) {

        $(this).find("div.ranking-answer-order-number").remove();
        $(this).append("<div class='ranking-answer-order-number'>" + (idx + 1) + "</div>");
    })
}
function enableSubmitButtonRanking() {
    //    $(".survey-submit-btn").css('display', 'block');
    //    $(".ranking-instruction").css('display', 'none');
    $(".survey-submit-btn").removeClass("disabledButtons");
    $(".survey-submit-btn").prop('disabled', false);
    $(".survey-submit-btn").removeClass("animate");
    $(".survey-submit-btn").removeClass("ripple");
    $(".survey-submit-btn").removeClass("greyOutButton");
}


//Open Ended
function displayPlaceholderContent(obj) {

    var defaultText = "";
    //console.log($(obj).find(".open-ended-answer"))

    $(obj).find(".open-ended-answer").unbind("focus");
    $(obj).find(".open-ended-answer").unbind("blur");

    $(obj).find(".open-ended-answer").focus(function () {
        //console.log($(this).html());
        if ($(this).html() == "") {
            defaultText = $(this).attr("data-text");
            $(this).html(defaultText);
        }
    })

    $(obj).find(".open-ended-answer").blur(function () {

        if ($(this).html() == defaultText) {
            $(this).html("");
        }
    })
}

function initMcqOpenEndedAnswer(container, isMobile) {
    $(container).find(".open-ended-mcq").each(function () {

        $(this).find(".s-editable-text").css("display", "block");
        $(this).find(".mcqsa-mcqma-image-answer").css("display", "block");
        $(this).find(".mcq-open-ended-textarea").css("display", "none");

        $(this).find(".s-editable-text").unbind("click");
        $(this).find(".s-editable-text").unbind("onclick");

        $(this).find(".mcq-open-ended-textarea > textarea").unbind("blur");
        $(this).find(".mcq-open-ended-textarea > textarea").unbind("onblur");
        $(this).find(".mcq-open-ended-textarea > textarea").unbind("click");
        $(this).find(".mcq-open-ended-textarea > textarea").unbind("onclick");

        if ($(this).hasClass("survey-mcqsa-div")) {
            //For MCQSA
            $(this).unbind("click");
            $(this).unbind("onclick");

            $(this).on("click", function (e) {
                $(this).find(".s-editable-text").css("display", "none");
                $(this).find(".mcqsa-mcqma-image-answer").css("display", "none");
                $(this).find(".mcq-open-ended-textarea").css("display", "flex");
                $(this).find(".mcq-open-ended-textarea").find("textarea").focus();

                e.stopPropagation();
            })
        }
        else if ($(this).hasClass("survey-mcqma-div")) {
            //For MCQMA
            $(this).unbind("click");
            $(this).unbind("onclick");

            $(this).find(".s-editable-text").on("click", function (e) {

                if (!$(this).parent().hasClass("selectedAnswer")) {

                    $(this).parent().addClass("selectedAnswer");

                    $(this).css("display", "none");
                    $(this).siblings(".mcqsa-mcqma-image-answer").css("display", "none");
                    $(this).siblings(".mcq-open-ended-textarea").css("display", "flex");
                    $(this).siblings(".mcq-open-ended-textarea").find("textarea").focus();
                }
                e.stopPropagation();
            })

            $(this).find(".mcq-open-ended-textarea > textarea").on("click", function (e) {

                e.stopPropagation();
            })

            $(this).on("click", function () {

                if ($(this).hasClass("selectedAnswer")) {

                    $(this).removeClass("selectedAnswer")
                    $(this).find(".mcq-open-ended-textarea").css("display", "none");
                    $(this).find(".mcqsa-mcqma-image-answer").css("display", "block");
                    $(this).find(".s-editable-text").css("display", "block");
                }
                else {

                    $(this).addClass("selectedAnswer")
                    $(this).find(".mcq-open-ended-textarea").css("display", "flex");
                    $(this).find(".mcqsa-mcqma-image-answer").css("display", "none");
                    $(this).find(".s-editable-text").css("display", "none");
                }
            })
        }

        $(this).find(".mcq-open-ended-textarea > textarea").on("click", function (e) {
            e.stopPropagation();
        })
    })

    /**
    * For mcqma selected answer
    * disable mouse over effect when answer is selected
    */
    /* if ($(container).find("style[id='styleForSelectedAnswer']").length === 0) {
   
       $(container).find(".questionaire-editor-container").prepend("<style id='styleForSelectedAnswer'>" +
           ".selectedAnswer {" +
           "box-shadow : rgba(0, 0, 0, 0.4) 0px -8px 20px 0px inset, rgb(112, 48, 160) 0px 0px 6px 6px inset, rgb(112, 48, 160) 0px 0px 3px 0px !important" +
           "}" +
           "</style>")
     }*/
}

//For Logictree
function getCurrentQuestionTier(obj) {

    var currentTier = 1;
    var currentLogicTeeObj = $logicTree.getLogicTreeData(obj.objectID);

    while (currentLogicTeeObj.length > 0 && currentLogicTeeObj[0].question !== undefined && currentLogicTeeObj[0].parentID !== 0) {

        currentLogicTeeObj = $logicTree.getLogicTreeData(currentLogicTeeObj[0].parentID);
        currentTier = currentTier + 1;
    }

    return currentTier;
}

function resetFakePassAndFailAnswer(currentObj, ScreeningTier) {

    var currentTier = getCurrentQuestionTier(currentObj);

    //Change Fake Fail Pass Answer Target ID
    if (currentObj.answer != null) {

        for (var j = 0; j < currentObj.answer.length; j++) {
            if (currentObj.answer[j].targetID === 3473) {
                currentObj.answer[j].targetID = 1;
            }
        }
    }

    //Make the question is / not screening question
    if (currentObj != null && currentObj.question != null && currentObj.question.questionID !== '0') {
        currentObj.question.showScreeningOption = (currentTier <= ScreeningTier) ? 1 : 0;
    }

    if (currentObj.children != null) {

        for (var m = 0; m < currentObj.children.length; m++) {

            resetFakePassAndFailAnswer(currentObj.children[m], ScreeningTier);
        }
    }
}
