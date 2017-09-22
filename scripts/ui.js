var ui = (function() {
    'use strict';

    var cleanText = function(text) {
        return text.trim().replace(/ /g, '');
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

        if (possibleLetters.length === 0 || possibleLetters.length < pattern.length) {
            $('#invalidPossibleLetters').removeClass('d-none');
            valid = false;
        }

        if (pattern.length === 0 || !pattern.includes('?')) {
            $('#invalidPattern').removeClass('d-none');
            valid = false;
        }

        return valid;
    };

    var findMatches = function() {
        if (formValid()) {
            var matches = solver.findWords(cleanPattern(), cleanPossibleLetters());

            var solutions = $('#solutions');

            solutions.empty();
            $('#solutionGroup').removeClass('d-none');

            for (var index = 0; index < matches.length; index++) {
                solutions.append('<li class="list-group-item">' + matches[index] + '</li>')
            }
        }
    };
    
    var reset = function() {
        $('#invalidPossibleLetters').addClass('d-none');
        $('#invalidPattern').addClass('d-none');
        $('#solutionGroup').addClass('d-none');
        
        $('#pattern').focus();
    };


    var initialize = function() {
        $('#submit').click(findMatches);
        $('#possibleLetters').on('keyup', function(e) {
            if(e.keyCode === 13) {
                findMatches();
            }
        });
        $('#pattern').on('keyup', function(e) {
            if(e.keyCode === 13) {
                findMatches();
            }
        });
        $('#reset').click(reset);
        
        reset();
    };

    return {
        initialize: initialize
    };

})();
