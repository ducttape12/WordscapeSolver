var ui = (function() {
    'use strict';
    
    const SCROLL_SPEED = 250;
    const NAV_HEIGHT = 56;

    var cleanText = function(text) {
        return text.trim().replace(/ /g, '').toLowerCase();
    };

    var cleanPossibleLetters = function() {
        return cleanText($('#possibleLetters').val());
    };

    var cleanPattern = function() {
        return cleanText($('#pattern').val());
    };

    var formValid = function() {
        var possibleLetters = cleanPossibleLetters();
        var pattern = cleanPattern();
        var valid = true;

        $('#invalidPossibleLetters').addClass('d-none');
        $('#invalidPattern').addClass('d-none');

        if (pattern.length === 0 || !pattern.includes('?')) {
            $('#invalidPattern').removeClass('d-none');
            valid = false;

            $('#pattern').focus();
            $('#pattern').select();
        }

        if (possibleLetters.length === 0 || possibleLetters.length < pattern.length) {
            $('#invalidPossibleLetters').removeClass('d-none');
            valid = false;

            $('#possibleLetters').focus();
            $('#possibleLetters').select();
        }

        return valid;
    };

    var findMatches = function() {
        $('#solutionSection').addClass('d-none');
        $('#solutionList').addClass('d-none');
        $('#noSolutions').addClass('d-none');

        if (formValid()) {
            var matches = solver.findWords(cleanPattern(), cleanPossibleLetters());

            var solutions = $('#solutionList');

            solutions.empty();

            if (matches.length > 0) {
                $('#solutionList').removeClass('d-none');
                for (var index = 0; index < matches.length; index++) {
                    solutions.append('<li class="list-group-item">' + matches[index] + '</li>')
                }
            }
            else {
                $('#noSolutions').removeClass('d-none');
            }

            $('#solutionSection').removeClass('d-none');
            $('html, body').animate({
                scrollTop: $("#solutionSection").offset().top - NAV_HEIGHT
            }, SCROLL_SPEED);
        }
    };

    var reset = function() {
        $('#invalidPossibleLetters').addClass('d-none');
        $('#invalidPattern').addClass('d-none');
        $('#solutionSection').addClass('d-none');
        $('#solutionList').addClass('d-none');
        $('#noSolutions').addClass('d-none');

        $('#pattern').val('');
        $('#possibleLetters').val('');

        $('#possibleLetters').focus();
        
        $('html, body').animate({
            scrollTop: 0
        }, SCROLL_SPEED);
    };

    var newUnknownWord = function() {
        $('#pattern').focus();
        $('#pattern').select();
        
        $('html, body').animate({
            scrollTop: 0
        }, SCROLL_SPEED);
    };

    var initialize = function() {
        $('#submit').click(findMatches);
        $('#possibleLetters').on('keyup', function(e) {
            if (e.keyCode === 13) {
                findMatches();
            }
        });
        $('#pattern').on('keyup', function(e) {
            if (e.keyCode === 13) {
                findMatches();
            }
        });
        $('#reset').click(reset);
        $('#newUnknownWord').click(newUnknownWord);

        $('#loading').fadeOut(function() {
            $('#contents').removeClass('d-none');
            reset();
        });
    };

    return {
        initialize: initialize
    };

})();
