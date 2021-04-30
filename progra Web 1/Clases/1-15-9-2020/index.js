const add = (a, b) => {
    return a + b;
  };
  
  const head = (xs) => {
    return xs[0];
  };
  
  const dos = 2;
  
  const foobar = {
    [dos]: 2,
    foo: 1,
    bar: "baz",
    add: (a, b) => {
      return a + b;
    },
  };
  
  const prop = (obj, k) => {
    return obj[k];
  };
  
  const incrementFoo = (obj) => {
    obj.foo = obj.foo + 1;
    return obj;
  };
  
  incrementFoo(foobar);
  
  const increment = (x) => {
    return x + 1;
  };
  
  const increment2 = (x) => {
    return x + 2;
  };
  
  const compose = (f, g) => {
    return (x) => f(g(x));
  };
  
  const increment3 = compose(increment, increment2);
  
  console.log(increment3(1)); // 4