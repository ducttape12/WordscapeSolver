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

        if (possibleLetters.length === 0) {
            $('#invalidPossibleLetters').removeClass('d-none');
        }
        else {
            $('#invalidPossibleLetters').addClass('d-none');
            valid = false;
        }

        if (pattern.length === 0) {
            $('#invalidPattern').removeClass('d-none');
        }
        else {
            $('#invalidPattern').addClass('d-none');
            valid = false;
        }

        return valid;
    };

    var initialize = function() {
        $('#submit').click(function() {
            if(formValid()) {
                
            }
        });
    };

    return {
        initialize: initialize
    };

})();
