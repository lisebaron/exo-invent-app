import { Participant } from "../interfaces/participant";
import { createReducer, on } from "@ngrx/store";
import * as ParticipantActions from './participant.actions'

export const initialParticipants: Array<Participant> = [];

export const createParticipantReducer = createReducer(
    initialParticipants,
    on(ParticipantActions.create, (entries, action) => {
        entries = action.participants;
        return entries;
    })
)