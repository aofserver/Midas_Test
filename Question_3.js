// How to run
// 1. run "npm install -g typescript" for install package typescript
// 2 run "tsc Question_1.ts" for genarate .js file
// 3 run "node Question_1.js" see output in terminal
function getQuestionPart(phrases) {
    try {
        // validate input
        if (phrases.length !== 3) {
            throw "Wrong input!";
        }
        for (var index = 0; index < phrases.length; index++) {
            phrases[index] = phrases[index].toUpperCase();
        }
        var score = {};
        for (var _i = 0, phrases_1 = phrases; _i < phrases_1.length; _i++) {
            var p = phrases_1[_i];
            //convolution text 
            for (var idx_start = 0; idx_start < p.length; idx_start++) {
                for (var idx_end = 1; idx_end < p.length; idx_end++) {
                    var filter = (idx_end - idx_start).toString();
                    for (var idx_slide = 0; idx_slide < p.length; idx_slide++) {
                        if (idx_start < idx_end) {
                            var select_word = p.slice(idx_start + idx_slide, idx_end + idx_slide);
                            if (!select_word) {
                                break;
                            }
                            if (!score[filter]) {
                                score[filter] = {};
                            }
                            if (!score[filter][select_word]) {
                                score[filter][select_word] = 1;
                            }
                            else {
                                score[filter][select_word] = score[filter][select_word] + 1;
                            }
                            // console.log("Conv:",p,idx_start,idx_end,idx_slide,p.slice(idx_start+idx_slide,idx_end+idx_slide))
                        }
                    }
                }
            }
        }
        // console.log("Conv Score",JSON.stringify(score))
        var ans = {};
        for (var _a = 0, _b = Object.keys(score); _a < _b.length; _a++) {
            var filter_1 = _b[_a];
            for (var _c = 0, _d = Object.keys(score[filter_1]); _c < _d.length; _c++) {
                var k = _d[_c];
                if (!ans[filter_1]) {
                    ans[filter_1] = k;
                    continue;
                }
                if (score[filter_1][ans[filter_1]] < score[filter_1][k]) {
                    ans[filter_1] = k;
                }
            }
        }
        var answer = "";
        // filter 1 is not used because filter are a,e,i,o,u at most
        for (var filter_2 = 2; filter_2 < Object.keys(ans).length - 1; filter_2++) {
            var key = filter_2.toString();
            var key_next = (filter_2 + 1).toString();
            if (ans[key_next].indexOf(ans[key]) !== -1) {
                answer = ans[key_next];
                answer = answer.trim();
            }
            else {
                break;
            }
        }
        // console.log("List answer:",JSON.stringify(ans))
        var list_ans = [];
        // console.log("Answer:",answer)
        for (var _e = 0, phrases_2 = phrases; _e < phrases_2.length; _e++) {
            var p = phrases_2[_e];
            list_ans.push(p.replace(answer, ""));
        }
        return list_ans;
    }
    catch (error) {
        console.log(error);
    }
}
console.log("ANS : ".concat(getQuestionPart(["BATHROOM", "BATH SALTS", "BLOODBATH"])));
console.log("ANS : ".concat(getQuestionPart(["BEFRIEND", "GIRLFRIEND", "FRIENDSHIP"])));
console.log("ANS : ".concat(getQuestionPart(["SWISS CHEESE", "CHEESE CAKE", "COTTAGE CHEESE"])));
console.log("ANS : ".concat(getQuestionPart(["BOAT SHOW", "LIFE BOAT", "ROW BOAT"])));
console.log("ANS : ".concat(getQuestionPart(["COMMON SENSE", "COURTESY COMMON", "COMMONPLACE"])));
