const codeToReason = (code) => {
    const reasons = {
      200: "OK",
      404: "Not Found",
      // ...
    };
  
    return reasons[code];
  };
  
  const objectToLines = (obj) => {
    return Object.entries(obj) // => [['foo', 'bar'], ['baz', 'bazz']]
      .map((pair) => `${pair[0]}: ${pair[1]}`) // => ['foo: bar', 'baz:  bazz']
      .join("\r\n");
  };
  
  const composeHttpResponse = (headers, body, statusCode) => {
    return `
  HTTP/1.1 ${statusCode} ${codeToReason(statusCode)}\r
  ${objectToLines(headers)}
  \r
  ${body}\r
    `;
  };
  
  module.exports = composeHttpResponse;
  