// How to run
// 1. run "npm install -g typescript" for install package typescript
// 2 run "tsc Question_1.ts" for genarate .js file
// 3 run "node Question_1.js" see output in terminal
function getHandScore(cards) {
    try {
        var list_point = {
            H: 0,
            C: 0,
            D: 0,
            S: 0
        };
        var triple_card = [];
        var list_card = cards.split(" ");
        // validate card number 
        if (list_card.length !== 3) {
            throw "There must be three cards in your hand.!";
        }
        // validate input
        var possibility_input = [];
        for (var _i = 0, _a = Object.keys(list_point); _i < _a.length; _i++) {
            var type = _a[_i];
            for (var _b = 0, _c = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]; _b < _c.length; _b++) {
                var num = _c[_b];
                possibility_input.push(type + num);
                possibility_input.push(num + type);
            }
        }
        for (var _d = 0, list_card_1 = list_card; _d < list_card_1.length; _d++) {
            var card = list_card_1[_d];
            if (possibility_input.indexOf(card) === -1) {
                throw "Wrong format! \nType card is H,C,D,S\nNumber card is A,2,3,4,5,6,7,8,9,10,J,Q,K\nEx: 'S3 H4 2D'";
            }
        }
        // cal point in hand
        for (var _e = 0, list_card_2 = list_card; _e < list_card_2.length; _e++) {
            var card = list_card_2[_e];
            var n = card.match(/\d+/g);
            var s = card.match(/[a-zA-Z]+/g);
            if (n !== null) {
                // cal point
                var number = parseInt(n[0]);
                var key = s[0].toUpperCase();
                triple_card.push(number.toString());
                list_point[key] = list_point[key] + number;
            }
            else {
                // check A, J, Q, K 
                for (var _f = 0, _g = ["A", "J", "Q", "K"]; _f < _g.length; _f++) {
                    var t = _g[_f];
                    var c = card.toUpperCase();
                    if (!(c.indexOf(t) !== -1)) {
                        continue;
                    }
                    var result = c.split(t);
                    result = result.filter(function (k) {
                        if (!!k) {
                            return k;
                        }
                    });
                    if (result.length === 1) {
                        // cal point
                        var number = t === "A" ? 11 : 10;
                        var key = result[0];
                        triple_card.push(t);
                        list_point[key] = list_point[key] + number;
                        break;
                    }
                    else {
                        throw "Wrong format!";
                    }
                }
            }
        }
        // check max point triple card
        if (triple_card[0] === triple_card[1] && triple_card[1] === triple_card[2]) {
            if (triple_card[0] === "A") {
                var max_point = 35;
            }
            else {
                var max_point = 32.5;
            }
            return max_point;
        }
        else {
            // check max point
            var points = [];
            for (var _h = 0, _j = Object.keys(list_point); _h < _j.length; _h++) {
                var type = _j[_h];
                points.push(list_point[type]);
            }
            var max_point = Math.max.apply(Math, points);
            return max_point;
        }
    }
    catch (error) {
        return error;
    }
}
console.log("The score of the hand is: ".concat(getHandScore("S3 H4 2D")));
