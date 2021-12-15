import { User } from "../interfaces/user";
import { createReducer, on } from "@ngrx/store";
import * as UserActions from './user.actions'

export const initialUser: User = {
    uid: "",
    firstname: "",
    lastname: "",
    genre: 1,
    birthdate: "",
    email: "",
    password: ""
};

export const createUserReducer = createReducer(
    initialUser,
    on(UserActions.create, (entries, action) => {
        entries = action.user;
        return entries;
    })
)