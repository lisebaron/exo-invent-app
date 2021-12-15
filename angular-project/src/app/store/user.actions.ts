import { createAction, props } from "@ngrx/store";
import { User } from "../interfaces/user";

export const create = createAction(
    "[User] Add user",
    props<{user: User}>()
);