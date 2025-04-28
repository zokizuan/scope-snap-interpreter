
export const examples = [
  {
    name: "Counter Closure",
    code: `function createCounter() {
  let count = 0;
  return function() {
    count++;
    console.log(count);
  };
}

const myCounter = createCounter();

myCounter(); // Output: 1
myCounter(); // Output: 2`
  },
  {
    name: "Simple Closure",
    code: `function makeGreeter(greeting) {
  return function(name) {
    console.log(greeting + ', ' + name + '!');
  };
}

const sayHello = makeGreeter('Hello');
const sayHi = makeGreeter('Hi');

sayHello('John'); // Output: Hello, John!
sayHi('Jane');    // Output: Hi, Jane!`
  },
  {
    name: "Nested Scopes",
    code: `let globalVar = 'global';

function outer() {
  let outerVar = 'outer';
  
  function inner() {
    let innerVar = 'inner';
    console.log(globalVar, outerVar, innerVar);
  }
  
  inner();
}

outer(); // Output: global outer inner`
  },
  {
    name: "IIFE with Closure",
    code: `const counter = (function() {
  let count = 0;
  
  return {
    increment: function() {
      count++;
      return count;
    },
    reset: function() {
      count = 0;
      return count;
    }
  };
})();

console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.reset());     // 0`
  },
  {
    name: "Loop with Closure",
    code: `function createFunctions() {
  const funcs = [];
  
  for (var i = 0; i < 3; i++) {
    funcs.push(function() {
      console.log(i);
    });
  }
  
  return funcs;
}

const functions = createFunctions();
functions[0](); // 3
functions[1](); // 3
functions[2](); // 3`
  }
];
