import { FC, useReducer } from "react";
import { Column } from "./Column";
import { Card } from "./Card";
import { AddNewItem } from "./AddNewItem";
import { AppContainer } from "./styles";
import { useAppState } from "./AppStateContext";

export const App = () => {
  const { state, dispatch } = useAppState();

  return (
    <AppContainer>
      {state.lists.map((list, i) => (
        <Column text={list.text} key={list.id} index={i} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another list"
        onAdd={(text) => dispatch({ type: "ADD_LIST", payload: text })}
      />
    </AppContainer>
  );
};
