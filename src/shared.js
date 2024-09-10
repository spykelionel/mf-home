import { useCallback, useEffect, useState } from "react";

const BROADCASTER_KEY = "state-broadcaster";

const createSharedStateHook = (key, initialState, origins) => {
  return () => {
    const [state, setState] = useState(() => {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialState;
    });

    const broadcastState = useCallback(
      (newState) => {
        // Broadcast to other tabs in the same origin
        localStorage.setItem(
          BROADCASTER_KEY,
          JSON.stringify({ key, state: newState })
        );
        localStorage.removeItem(BROADCASTER_KEY);

        // Broadcast to other origins
        origins.forEach((origin) => {
          if (origin !== window.location.origin) {
            window.postMessage(
              { type: "stateChange", key, state: newState },
              origin
            );
          }
        });
      },
      [origins]
    );

    const setSharedState = useCallback(
      (newState) => {
        const valueToStore =
          typeof newState === "function" ? newState(state) : newState;
        setState(valueToStore);
        localStorage.setItem(key, JSON.stringify(valueToStore));
        broadcastState(valueToStore);
      },
      [state, broadcastState]
    );

    useEffect(() => {
      const handleStorageChange = (event) => {
        if (event.key === key) {
          setState(JSON.parse(event.newValue));
        } else if (event.key === BROADCASTER_KEY && event.newValue) {
          const { key: broadcastKey, state: broadcastState } = JSON.parse(
            event.newValue
          );
          if (broadcastKey === key) {
            setState(broadcastState);
          }
        }
      };

      const handleMessage = (event) => {
        if (
          origins.includes(event.origin) &&
          event.data &&
          event.data.type === "stateChange" &&
          event.data.key === key
        ) {
          setState(event.data.state);
        }
      };

      window.addEventListener("storage", handleStorageChange);
      window.addEventListener("message", handleMessage);

      return () => {
        window.removeEventListener("storage", handleStorageChange);
        window.removeEventListener("message", handleMessage);
      };
    }, [key, origins]);

    return [state, setSharedState];
  };
};

export default createSharedStateHook;
