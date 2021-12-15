import { User } from "../interfaces/user";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectUserDatas = createSelector(
    createFeatureSelector("userState"),
    (state: User) => {
        return state;
    }
)