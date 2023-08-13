// How to run
// 1. run "npm install -g typescript" for install package typescript
// 2 run "tsc Question_1.ts" for genarate .js file
// 3 run "node Question_1.js" see output in terminal


function getClockAngle(hh_mm:string):number {
  try {
    // validate input
    if(hh_mm.indexOf(":") === -1){
      throw "Wrong input!"
    }

    var list:string[] = hh_mm.split(":");
    var regx_number = /^-?\d+$/;
    if(!regx_number.test(list[0]) || !regx_number.test(list[1])){
      throw "Wrong input!"
    }

    var list:string[] = hh_mm.split(":");
    var h:number = parseInt(list[0])
    var m:number = parseInt(list[1])
    var oneminute_degree:number = 360/60
    var onehours_degree:number = 360/12
    var degree_m_base0 = m * oneminute_degree
    var degree_h_base0 = h * onehours_degree + m*(onehours_degree/60)
    return  Math.abs(degree_m_base0 - degree_h_base0)
  } catch (error) {
    return NaN;
  }
}

let degrees:number = getClockAngle("09:30")
if(!isNaN(degrees)){
  console.log(`The angle between the hour and minute hands clockwise is ${degrees} degrees.`);
}
else{
  console.log(`Wrong input!\nEx: '09:30'`);
}

