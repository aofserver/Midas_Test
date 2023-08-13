// How to run
// 1. run "npm install -g typescript" for install package typescript
// 2 run "tsc Question_1.ts" for genarate .js file
// 3 run "node Question_1.js" see output in terminal

// function getWordlist():string[] {
//   const url: string = "https://raw.githubusercontent.com/GMC254/Wordlist-1/master/master.txt";
//   var requestOptions: {method:string} = { method: "GET" };

//   fetch(url,requestOptions)
//     .then((response) => response.text())
//     .then((result) => { return result.split("\n") })
//     .catch((error) => console.log("error", error));
// }

// function RemoteAssociatesTest(phrases: string[]) {
//   try {
//     var word :{ w1:string[],w2:string[],w3:string[] } = { w1:[],w2:[],w3:[] }
//     var wordlist :string[] = getWordlist();
//     for (const p of phrases) {
//       console.log(p)
//       wordlist.map((w) => {
//         if(w.indexOf(p) !== -1){
//           word.w1.push(w[w.indexOf(p)])
          
//         }
//       })
//     }

//     // return wordlist
//   } catch (error) {
//     // return error;
//   }
// }

function getQuestionPart(phrases: string[]): string[] {
  try {
    // validate input

    var score = {}
    for (const p of phrases) {
      //convolution text 
      for (let idx_start = 0; idx_start < p.length; idx_start++) {
        for (let idx_end = 1; idx_end < p.length; idx_end++) {
          var filter:string = (idx_end - idx_start).toString()
          for (let idx_slide = 0; idx_slide < p.length; idx_slide++) {
            if(idx_start < idx_end){
              var select_word:string = p.slice(idx_start+idx_slide,idx_end+idx_slide)
              if(!select_word){
                break
              }
              if(!score[filter]){
                score[filter] = {}
              }

              if(!score[filter][select_word]){
                score[filter][select_word] = 1
              }
              else{
                score[filter][select_word] = score[filter][select_word] + 1
              }
              // console.log(p,idx_start,idx_end,idx_slide,p.slice(idx_start+idx_slide,idx_end+idx_slide))
            }
          }
        }
      }
    }

    // console.log(JSON.stringify(score))
    var ans = {} 
    for (const filter of Object.keys(score)) {
      for (const k of Object.keys(score[filter])) {
        if(!ans[filter]){
          ans[filter] = k
          continue;
        }
        if(score[filter][ans[filter]] < score[filter][k]){
          ans[filter] = k
        }
      }
    }

    var answer:string = ""
    // ดilter 1 is not used because filter are a,e,i,o,u at most
    for (let filter = 2 ; filter < Object.keys(ans).length-1; filter++) {
      var key:string = filter.toString()
      var key_next:string = (filter+1).toString()
      if(ans[key_next].indexOf(ans[key]) !== -1){
        answer = ans[key_next]
      }
      else{
        break
      }
    }

    // console.log("liat answer:",JSON.stringify(ans))
    var list_ans:string[] = []
    // console.log("answer:",answer)
    for (const p of phrases) {
      list_ans.push(p.replace(answer, ""))
    }

    return list_ans

  } catch (error) {
    // return error;
  }
}

console.log(`ANS : ${getQuestionPart(["BATHROOM", "BATH SALTS", "BLOODBATH"])}`)
console.log(`ANS : ${getQuestionPart(["BEFRIEND", "GIRLFRIEND", "FRIENDSHIP"])}`)