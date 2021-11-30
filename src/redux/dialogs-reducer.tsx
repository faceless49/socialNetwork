import { v1 } from "uuid";
import { InferActionsType } from "./redux-store";
import { DialogType, MessageType } from "../types/types";

let initialState = {
  dialogs: [
    { id: v1(), name: "Dima" },
    { id: v1(), name: "Andrew" },
    { id: v1(), name: "Sveta" },
    { id: v1(), name: "Sasha" },
    { id: v1(), name: "Viktor" },
    { id: v1(), name: "Valera" },
  ] as Array<DialogType>,
  messages: [
    { id: v1(), message: "Hello world" },
    { id: v1(), message: "How is your it-kamasutra?" },
    { id: v1(), message: "Yo" },
    { id: v1(), message: "Yo" },
    { id: v1(), message: "Yo" },
  ] as Array<MessageType>,
};

export type DialogsInitialStateType = typeof initialState;

export const dialogsReducer = (
  state = initialState,
  action: DialogsActionsType
): DialogsInitialStateType => {
  switch (action.type) {
    case "SN/DIALOGS/SEND-MESSAGE": {
      let body = action.newMessageBody;
      return {
        ...state,
        messages: [...state.messages, { id: v1(), message: body }],
      };
    }
    default:
      return state;
  }
};

export type DialogsActionsType = InferActionsType<typeof actions>;
export const actions = {
  sendMessage: (newMessageBody: string) =>
    ({ type: "SN/DIALOGS/SEND-MESSAGE", newMessageBody } as const),
};
