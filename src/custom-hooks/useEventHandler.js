import React from "react";

const useEventHandler = (eventSideEffectMap, initialState) => {
  const [state, dispatch] = React.useReducer((currentState, action) => {
    const actionIsObj = typeof action === "object";
    const event = actionIsObj ? action.event : action;
    const payload = actionIsObj ? action.payload : undefined;

    if (!event) {
      throw new Error(`no event is recieved: ${event}`);
    }

    const handler =
      eventSideEffectMap[event.toLowerCase()] || eventSideEffectMap[event];

    if (typeof handler !== "function") {
      throw new Error(`Event ${event} does not map to a function`);
    }

    return handler(currentState, payload);
  }, initialState);

  function dispatchEvent(...args) {
    dispatch(...args);

    return {
      prevent(event) {
        event.preventDefault();
      },
    };
  }

  return [state, dispatchEvent];
};

export default useEventHandler;
