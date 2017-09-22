var solver = (function() {
    'use strict';
    
    var filterWordList = function(pattern) {
        var filteredWords = _.filter(wordList.getWordList(), function(word) {
            return word.length === pattern.length;
        });
        
        for(var index = 0; index < pattern.length; index++) {
            if(pattern[index] == '_') {
                continue;
            }
            
            filteredWords = _.filter(filteredWords, function(word) {
                return word[index] === pattern[index];
            });
        }
        
        return filteredWords;
    };
    
    var isMatch = function(word, possibleLetters) {
        var lettersInPattern = {};
        var index;
        var letter;
        
        for(index = 0; index < possibleLetters.length; index++) {
            letter = possibleLetters[index];
            
            if(typeof(lettersInPattern[letter]) === 'undefined') {
                lettersInPattern[letter] = 1;
            } else {
                lettersInPattern[letter]++;
            }
        }
        
        for(index = 0; index < word.length; index++) {
            letter = word[index];
            
            if(typeof(lettersInPattern[letter]) !== 'undefined') {
                lettersInPattern[letter]--;
                
                if(lettersInPattern[letter] < 0) {
                    return false;
                }
            } else {
                return false;
            }
        }
        
        return true;
    };
    
    var findMatches = function(possibleWords, possibleLetters) {
        var matches = new Array();
        
        for(var index = 0; index < possibleWords.length; index++) {
            if(isMatch(possibleWords[index], possibleLetters)) {
                matches.push(possibleWords[index]);
            }
        }
        
        return matches;
    };
    
    var findWords = function(pattern, possibleLetters) {
        var filteredWordList = filterWordList(pattern);
        return findMatches(filteredWordList, possibleLetters);
    };
    
    return {
        findWords: findWords
    };
    
})();