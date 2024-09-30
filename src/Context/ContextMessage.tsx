import React from "react";
import ActionTypeEnum from "../enum/ActionTypeEnum";

interface ContextMessageProps {
    children: React.ReactNode;
}

interface InitUseReducerType {
    success: string,
    error: string,
}

interface ActionType {
    type: ActionTypeEnum,
    message: string,
}

const message = React.createContext<InitUseReducerType>({success:"", error: ""});
const dispatchMessage = React.createContext<React.Dispatch<ActionType>>(() => {});

const ContextMessage: React.FC<ContextMessageProps> = ({children}) => {

    const initialState: InitUseReducerType = {
        success: "",
        error: ""
    };

    const reducer = (state: InitUseReducerType, action: ActionType) => {
        switch (action.type) {
            case ActionTypeEnum.SUCCESS:
                return {
                    ...state,
                    success: action.message,
                };
            case ActionTypeEnum.ERROR:
                return {
                    ...state,
                    error: action.message
                };
            default:
                return state;
        }
    }
    const [state, dispatch] = React.useReducer(reducer, initialState);

    return (
        <message.Provider value={state}>
            <dispatchMessage.Provider value={dispatch}>
                {children}
            </dispatchMessage.Provider>
        </message.Provider>
    );
}

export default ContextMessage;

export const useMessage = () => {
    return React.useContext(message);
}

export const useDispatchMessage = () => {
    return React.useContext(dispatchMessage);
}