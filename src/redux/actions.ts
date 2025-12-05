// src/redux/actions.ts

// ---------------------------------------
// ACTION TYPE CONSTANTS
// ---------------------------------------
export const SET_USER_CREDENTIALS = 'SET_USER_CREDENTIALS' as const;
export const SET_USER_INFO = 'SET_USER_INFO' as const;
export const SET_USER_ROLES = 'SET_USER_ROLES' as const;
export const SET_USER_PERMISSIONS = 'SET_USER_PERMISSIONS' as const;
export const SET_USER_SERVICES = 'SET_USER_SERVICES' as const;
export const SET_USER_GOALS = 'SET_USER_GOALS' as const;
export const SET_USER_MENTORS = 'SET_USER_MENTORS' as const;
export const SET_USER_MENTEES = 'SET_USER_MENTEES' as const;

// ---------------------------------------
// INTERFACES
// ---------------------------------------

export interface UserCredentialsPayload {
    userID: string | null;
    apiKey: string | null;
    accessToken: string | null;
    loginName: string;
}

export interface SetUserCredentialsAction {
    type: typeof SET_USER_CREDENTIALS;
    payload: UserCredentialsPayload;
}

export interface SetUserInfoAction {
    type: typeof SET_USER_INFO;
    payload: Record<string, any>;
}

export interface SetUserRolesAction {
    type: typeof SET_USER_ROLES;
    payload: string[];
}

export interface SetUserPermissionsAction {
    type: typeof SET_USER_PERMISSIONS;
    payload: string[];
}

export interface SetUserServicesAction {
    type: typeof SET_USER_SERVICES;
    payload: any[];
}

export interface SetUserGoalsAction {
    type: typeof SET_USER_GOALS;
    payload: any[];
}

export interface SetUserMentorsAction {
    type: typeof SET_USER_MENTORS;
    payload: any[];
}

export interface SetUserMenteesAction {
    type: typeof SET_USER_MENTEES;
    payload: any[];
}

// Union Type (optional but useful)
export type AuthActions =
    | SetUserCredentialsAction
    | SetUserInfoAction
    | SetUserRolesAction
    | SetUserPermissionsAction
    | SetUserServicesAction
    | SetUserGoalsAction
    | SetUserMentorsAction
    | SetUserMenteesAction;

// ---------------------------------------
// ACTION CREATORS
// ---------------------------------------

export const setUserCredentials = (
    userID?: string | null,
    apiKey?: string | null,
    accessToken?: string | null,
    loginName?: string | null
): SetUserCredentialsAction => ({
    type: SET_USER_CREDENTIALS,
    payload: {
        userID: userID ?? null,
        apiKey: apiKey ?? null,
        accessToken: accessToken ?? null,
        loginName: loginName ?? "",
    },
});

export const setUserInfo = (userInfo?: Record<string, any>): SetUserInfoAction => ({
    type: SET_USER_INFO,
    payload: userInfo ?? {},
});

export const setUserRoles = (roles?: string[]): SetUserRolesAction => ({
    type: SET_USER_ROLES,
    payload: roles ?? [],
});

export const setUserPermissions = (permissions?: string[]): SetUserPermissionsAction => ({
    type: SET_USER_PERMISSIONS,
    payload: permissions ?? [],
});

export const setUserServices = (services?: any[]): SetUserServicesAction => ({
    type: SET_USER_SERVICES,
    payload: services ?? [],
});

export const setUserGoals = (goals?: any[]): SetUserGoalsAction => ({
    type: SET_USER_GOALS,
    payload: goals ?? [],
});

export const setUserMentors = (mentors?: any[]): SetUserMentorsAction => ({
    type: SET_USER_MENTORS,
    payload: mentors ?? [],
});

export const setUserMentees = (mentees?: any[]): SetUserMenteesAction => ({
    type: SET_USER_MENTEES,
    payload: mentees ?? [],
});
