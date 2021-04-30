const filter = (predicate, xs) => {
    const valoresConservados = [];
    for (const x of xs) {
      if (predicate(x)) {
        valoresConservados.push(x)
      }
    }
    return valoresConservados
  }
  
  const filterR = (predicate, xs) => {
    if (xs.length === 0) return [];
    
    const [head, ...tail] = xs;
    return predicate(head) 
      ? [ head, ...filterR(predicate, tail) ]
      : filterR(predicate, tail);
  };
  
  const oneTwoThree = filter(
    (x) => x > 1, 
    [1, 2, 3]
  );
  
  
  
  
  
  const map = (transformación, xs) => {
    const elementosTransformados = [];
  
    for (const x of xs) {
      elementosTransformados
        .push(transformación(x));
    }
  
    return elementosTransformados;
  }
  
  
    map((x) => x + 1, [1, 3, 5])
  
  // => [2, 4, 6]
  
  const reduce = (reducer, initial, xs) => {
    let acumulador = initial
  
    for (const x of xs) {
      acumulador = reducer(acumulador, x)
    }
  
    return acumulador
  }
  
  
  const reduceR = (reducer, initial, xs) => {
    if(xs.length === 0) return initial
    const [head, ...tail] = xs
    return reduceR(reducer, reducer(initial, head) ,tail)
  }
  
  console.log(
  reduce(
    (acumulador, x) => acumulador + x,
    0, // <- valor inicial
    [1, 3, 5]
  )
  )
  // => 9
  
  reduce(
    (acumulador, x) => acumulador && x,
    true, // <- valor inicial
    [true, false, false]
  )
  // => false
  
  const curry2 = (f) => (x) => (y) => f(x, y)
  const curry3 = (f) => (x) => (y) => (z) => f(x, y, z)
  
  const add = (a, b) => a + b
  const curriedReduce = curry3(reduce)
  const sum = curriedReduce(add)(0)
  sum([1, 2, 3]) // => 6
  
  const doubleElements = map(x => x * 2)
  doubleElements([1, 2, 3]) // => [2, 4, 6]
  
  // Todas las siguientes expresiones son equivalentes*.
  
  add()
  
  const add = (a, b) => a + b
  
  const add = (a, b) => { return a + b }
  
  function add (a, b) {
    return a + b
  }
  
  const add = function add (a, b) {
    return a + b
  }
  
  const add = function (a, b) {
    return a + b
  }