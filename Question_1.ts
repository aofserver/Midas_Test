// How to run
// 1. run "npm install -g typescript" for install package typescript
// 2 run "tsc Question_1.ts" for genarate .js file
// 3 run "node Question_1.js" see output in terminal

function getHandScore(cards: string) {
  try {
    let list_point: { H: number; C: number; D: number; S: number } = {
      H: 0,
      C: 0,
      D: 0,
      S: 0,
    };
    var triple_card: string[] = []
    const list_card: string[] = cards.split(" ");

    // validate card number 
    if(list_card.length !== 3){
        throw "There must be three cards in your hand.!"
    }

    // validate input
    var possibility_input:string[] = []
    for (const type of Object.keys(list_point)){
        for (const num of ["A","2","3","4","5","6","7","8","9","10","J","Q","K"]){ 
            possibility_input.push(type+num)
            possibility_input.push(num+type)
        }
    }

    for (const card of list_card) {
        if (possibility_input.indexOf(card) === -1) {
            throw "Wrong format! \nType card is H,C,D,S\nNumber card is A,2,3,4,5,6,7,8,9,10,J,Q,K\nEx: 'S3 H4 2D'";
        }
    }
    

    // cal point in hand
    for (const card of list_card) {
      var n: string[] = card.match(/\d+/g);
      var s: string[] = card.match(/[a-zA-Z]+/g);

      if (n !== null) {
        // cal point
        var number: number = parseInt(n[0]);
        var key: string = s[0].toUpperCase();
        triple_card.push(number.toString())
        list_point[key] = list_point[key] + number
      } else {

        // check A, J, Q, K 
        for (const t of ["A", "J", "Q", "K" ]) {
            var c: string = card.toUpperCase();
            if(!(c.indexOf(t) !== -1)){
                continue;
            }

            var result: string[] = c.split(t); 
            result = result.filter((k) => {
                if (!!k) {
                  return k;
                }
            });
            if (result.length === 1) {
                // cal point
                var number: number = t === "A" ? 11 : 10;
                var key: string = result[0];
                triple_card.push(t)
                list_point[key] = list_point[key] + number
                break;
            } else {
                throw "Wrong format!"
            }
        }
      }
    }

    // check max point triple card
    if(triple_card[0] === triple_card[1] && triple_card[1] === triple_card[2]){
        if(triple_card[0] === "A"){
            var max_point:number = 35
        }
        else{
            var max_point:number = 32.5
        }
        return max_point;
    }
    else{
        // check max point
        var points:number[] = []
        for (const type of Object.keys(list_point)) {
            points.push(list_point[type])
        }
        var max_point:number = Math.max(...points)
        return max_point;
    }
  } catch (error) {
    return error;
  }
}


console.log(`The score of the hand is: ${getHandScore("S3 H4 2D")}`);
