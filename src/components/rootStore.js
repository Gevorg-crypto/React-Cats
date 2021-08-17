import { combineReducers  } from "redux"
import {catsStore} from "./store";

export const rootReducer = combineReducers({cats:catsStore})