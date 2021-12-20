import { Participant } from "../interfaces/participant";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectParticipantDatas = createSelector(
    createFeatureSelector("participantState"),
    (state: Participant) => {
        return state;
    }
)