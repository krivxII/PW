const createEventEmitter = () => {
    const handlers = [];
  
    // `on` solamente tiene que "recordar" el handler registrado.
    const on = (eventName, eventHandler) => {
      handlers.push({
        eventName: eventName,
        eventHandler: eventHandler,
      });
    };
  
    // `emit` debe ejecutar los `handlers` cuyo `eventName` coincide con el emitido.
    const emit = (eventName, params) => {
      for (const handler of handlers) {
        if (handler.eventName === eventName) {
          handler.eventHandler(params);
        }
      }
    };
  
    return {
      on: on,
      emit: emit,
    };
  };
  
  module.exports = createEventEmitter;