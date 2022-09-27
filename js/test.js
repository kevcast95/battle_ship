/* var calPoints = function (ops) {
     console.log('ops;', ops);
     var result = null;
     let records = [];
     for (let i = 0; i < ops.length; i++) {
          let recrodLenght = records.length;
          if (parseInt(ops[i]) === parseInt(ops[i], 10)) {
               records.push(parseInt(ops[i]));
          };
          if (ops[i] === '+' && recrodLenght >= 1) {
               const addRecord = records[recrodLenght - 1] + records[recrodLenght - 2];
               records.push(addRecord);
          }
          if (ops[i] === 'C') {
               records.pop();
          }
          if (ops[i] === 'D' && recrodLenght >= 1) {
               const multiRecords = 2 * records[recrodLenght - 1]
               records.push(multiRecords);
          }
          console.log('recr', records, ops[i])
     }
     result = records.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
     console.log('hola', result)
     return result;
}
var ops = ['5','2','C','D','+']
console.log(calPoints(ops)); */

function solution(A=[1,3,7,4,1,2]) {
     const maxNum = Math.max(...A)
     const minNum = Math.min(...A)
     let allNumbers = []
     //let notInArray = []
     if (minNum < 1) {
          return 1
     }
     for(i = minNum; i <= maxNum; i++ ) {
         allNumbers.push(i)
     }
     let isFounded = allNumbers.some( ai => {
          console.log(ai);
          if (A.includes(ai)) {
               return ai
          }
     } );
     console.log('notInArray:', isFounded);
     return 0
     // write your code in JavaScript (Node.js 8.9.4)
 }
 
 console.log(solution())