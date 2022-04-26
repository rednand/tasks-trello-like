import React, { useState } from "react";
import { AppState } from "./AppStateContext";
import { load } from "./api";

const appData = {
  draggedItem: undefined,
  lists: [
    {
      id: "0",
      text: "To Do",
      tasks: [{ id: "c0", text: "Generate app scaffold" }],
    },
    {
      id: "1",
      text: "In Progress",
      tasks: [{ id: "c2", text: "Learn Typescript" }],
    },
    {
      id: "2",
      text: "Done",
      tasks: [{ id: "c3", text: "Begin to use static typing" }],
    },
  ],
};

export const withInitialState = (
  WrappedComponent: React.ComponentType<
    React.PropsWithChildren<{ initialState: AppState }>
  >
) => {
  return ({ children }: React.PropsWithChildren<{}>) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | undefined>();

    const [initialState, setInitialState] = useState<AppState>({
      lists: appData.lists,
      draggedItem: undefined,
    });

    React.useEffect(() => {
      const fetchInitialState = async () => {
        try {
          const data = await load();
          setInitialState({ ...data });
        } catch (e) {
          setError(undefined);
        }
        setIsLoading(false);
      };
      fetchInitialState();
    }, []);

    if (isLoading) {
      return <div>Loading</div>;
    }

    if (error) {
      return <div>{error.message}</div>;
    }

    return (
      <WrappedComponent initialState={initialState}>
        {children}
      </WrappedComponent>
    );
  };
};
