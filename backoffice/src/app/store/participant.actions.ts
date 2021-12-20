import { createAction, props } from "@ngrx/store";
import { Participant } from "../interfaces/participant";

export const create = createAction(
    "[Participant] Add participants",
    props<{participants: Array<Participant>}>()
);