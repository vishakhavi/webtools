import {
    LOGIN_STATUS,
    CLIENT,
    ACTIONS,
} from './constants';

export const initialState = {
    error: '',
    username: '',
    loginStatus: LOGIN_STATUS.PENDING,
    isTopicPending: false,
    topics: {},
    lastAddedTopicId: '',
};

function reducer(state, action) {
    switch (action.type) {

        case ACTIONS.LOG_IN: // actions are the change in state, not how that change happened
            return {
                ...state,
                error: '', // constantly resetting this is a "pain point", and a sign of something to improve!
                loginStatus: LOGIN_STATUS.IS_LOGGED_IN,
                username: action.username,
            };

        case ACTIONS.LOG_OUT:
            return {
                ...state,
                error: '',
                isTopicPending: false,
                topics: {},
                loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
                lastAddedTopicId: '',
                username: '',
            };
        case ACTIONS.START_LOADING_TOPICS:
            return {
                ...state,
                error: '',
                isTopicPending: true, // Perhaps make this a "status" value like login?
            };
        case ACTIONS.UPVOTE_TOPIC:
            return {
                ...state,
                topics: { // because todos is an object, we have to make an altered copy
                    ...state.topics, // copy the existing todos...
                    [action.topic.id]: action.topic // ...but override this one
                },
            };
        case ACTIONS.DOWNVOTE_TOPIC:
            return {
                ...state,
                topics: { // because todos is an object, we have to make an altered copy
                    ...state.topics, // copy the existing todos...
                    [action.topic.id]: action.topic // ...but override this one
                },
            };
        case ACTIONS.DISPLAY_POST:
            return {
                ...state,
                topics: { // because todos is an object, we have to make an altered copy
                    ...state.topics, // copy the existing todos...
                    [action.topic.id]: action.topic // ...but override this one
                },
            };

        case ACTIONS.REPLACE_TOPICS:
            return {
                ...state,
                error: '',
                isTopicPending: false,
                lastAddedTopicId: '',
                topics: action.topics,
            };

        case ACTIONS.REPORT_ERROR:
            // We could move the "pick the message" logic from Status.jsx here. Better? It depends.
            return {
                ...state,
                error: action.error || 'ERROR', // ERROR is just to ensure a truthy value
            };
        case ACTIONS.ADD_TOPIC:
            return {
                ...state,
                topics: {
                    ...state.topics,
                    [action.topic.id]: action.topic,
                },
            };
        case ACTIONS.ADD_POST:
            return {
                ...state,
                topics: {
                    ...state.topics,
                    [action.topic.id]: action.post,
                },
            };

        default:
            throw new Error({
                error: CLIENT.UNKNOWN_ACTION,
                detail: action
            }); // reporting detail for debugging aid, not shown to user
    }
}

export default reducer;