// src/redux/authReducer.ts (example path)

import {
    SET_USER_CREDENTIALS,
    SET_USER_INFO,
    SET_USER_ROLES,
    SET_USER_PERMISSIONS,
    SET_USER_SERVICES,
    SET_USER_GOALS,
    SET_USER_MENTORS,
    SET_USER_MENTEES,
} from './actions';

// ---------------------------------------
// TYPES
// ---------------------------------------
export interface UserCredentials {
    userID: string | null;
    apiKey: string | null;
    accessToken: string | null;
    loginName: string | null;
}

export interface AuthState extends UserCredentials {
    userInfo: Record<string, any>;
    roles: string[];
    permissions: string[];
    services: any[];
    goals: any[];
    mentors: any[];
    mentees: any[];
}

export interface AuthAction {
    type: string;
    payload?: any;
}

// ---------------------------------------
// INITIAL STATE
// ---------------------------------------
const initialState: AuthState = {
    userID: null,
    apiKey: null,
    accessToken: null,
    loginName: null,

    userInfo: {},
    roles: [],
    permissions: [],
    services: [],
    goals: [],
    mentors: [],
    mentees: [],
};

// ---------------------------------------
// REDUCER
// ---------------------------------------
export const authReducer = (
    state: AuthState = initialState,
    action: AuthAction
): AuthState => {
    switch (action.type) {
        case SET_USER_CREDENTIALS:
            return {
                ...state,
                userID: action.payload?.userID ?? null,
                apiKey: action.payload?.apiKey ?? null,
                accessToken: action.payload?.accessToken ?? null,
                loginName: action.payload?.loginName ?? null,
            };

        case SET_USER_INFO:
            return { ...state, userInfo: action.payload ?? {} };

        case SET_USER_ROLES:
            return { ...state, roles: action.payload ?? [] };

        case SET_USER_PERMISSIONS:
            return { ...state, permissions: action.payload ?? [] };

        case SET_USER_SERVICES:
            return { ...state, services: action.payload ?? [] };

        case SET_USER_GOALS:
            return { ...state, goals: action.payload ?? [] };

        case SET_USER_MENTORS:
            return { ...state, mentors: action.payload ?? [] };

        case SET_USER_MENTEES:
            return { ...state, mentees: action.payload ?? [] };

        default:
            return state;
    }
};

export default authReducer;
