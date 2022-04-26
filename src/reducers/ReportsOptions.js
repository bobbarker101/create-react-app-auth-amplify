import {Auth} from "aws-amplify/lib-esm/index";

export const SET_USER = 'USER_OPTIONS/SET_USER';
export const SET_SENDERS = 'USER_OPTIONS/SET_SENDERS';
export const SET_REPORTS = 'USER_OPTIONS/SET_REPORTS';
export const SET_SUBSCRIPTIONS = 'USER_OPTIONS/SET_SUBSCRIPTIONS';
export const SET_SUBSCRIBERS = 'USER_OPTIONS/SET_SUBSCRIBERS';

export const SET_KEYWORDS = 'USER_OPTIONS/SET_KEYWORDS';
export const ADD_KEYWORDS = 'USER_OPTIONS/ADD_KEYWORDS';
export const UPDATE_KEYWORDS = 'USER_OPTIONS/UPDATE_KEYWORDS';
export const DELETE_KEYWORDS = 'USER_OPTIONS/DELETE_KEYWORDS';


/**
 * Users
 */
export const setUser = (user) =>  ({
        type: SET_USER,
        user
    });

/**
 * Senders
 */
export const setSenders = (senders) => ({
    type: SET_SENDERS,
    senders
});

/**
 * Reports
 */
export const setReports = (reports) => ({
    type: SET_REPORTS,
    reports
});

/**
 * Subscriptions
 */
export const setSubscriptions = (subscriptions) => ({
    type: SET_SUBSCRIPTIONS,
    subscriptions
});

/**
 * Subscribers
 */
export const setSubscribers = (subscribers) => ({
    type: SET_SUBSCRIBERS,
    subscribers
});

/**
 * Keywords
 */

export const setKeywords = (keywords) => {
    return ({
                type: SET_KEYWORDS,
                keywords
            });
}

export const addKeywords = (keywords) => ({
    type: ADD_KEYWORDS,
    keywords
});

export const updateKeywords = (keywords) => ({
    type: UPDATE_KEYWORDS,
    keywords
});

export const deleteKeywords = (keywords) => ({
    type: DELETE_KEYWORDS,
    keywords
});




export default function reducer(
    state = {
        user: {},
        senders: {},
        reports: {},
        keywords: {},
        subscriptions: {},
        subscribers: {},
    },
    action
) {
    switch (action.type) {


        // User
        case SET_USER:
            return {
                ...state,
                user: action.user
            };

        // Senders
        case SET_SENDERS:
            return {
                ...state,
                senders: action.senders
            };

        // Reports
        case SET_REPORTS:
            return {
                ...state,
                reports: action.reports
            };
        // Subscriptions
        case SET_SUBSCRIPTIONS:
            return {
                ...state,
                subscriptions: action.subscriptions
            };
        // subscribers
        case SET_SUBSCRIBERS:
            return {
                ...state,
                subscribers: action.subscribers
            };

            /**
             * Keywords
             */
        case SET_KEYWORDS:
            return {
                ...state,
                keywords: action.keywords
            };
        case ADD_KEYWORDS:
            return {
                ...state,
                keywords: action.keywords
            };
        case UPDATE_KEYWORDS:
            return {
                ...state,
                keywords: action.keywords
            };
        case DELETE_KEYWORDS:
            return {
                ...state,
                keywords: action.keywords
            };
        default:
            break;
    }
    return state;
}
