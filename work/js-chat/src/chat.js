import { SERVER, CLIENT } from './constants';
import state, {
    login,
    logout,
    setChat,
    setError,
} from './state';
import {
    fetchChat,
    fetchSession,
} from './services';
import render from './render';
import {
    addAbilityToLogin,
    addAbilityToLogout,
    addAbilityToRefresh,
    addAbilityToAddMessage,
    getPollChats
} from './listeners';


const appEl = document.querySelector('#chat-app');
render({ state, appEl });
addAbilityToLogin({ state, appEl });
addAbilityToLogout({ state, appEl });
addAbilityToRefresh({ state, appEl });
addAbilityToAddMessage({ state, appEl });
getPollChats({ state, appEl });



checkForSession();

//////////

function checkForSession() {
    fetchSession()
        .then(session => { // The returned object from the service call
            login(session.username); // We do not have todos yet!
            render({ state, appEl }); // Show we are logged in but don't have todos
            return fetchChat(); // By returning this promise we can chain the original promise
        })
        .catch(err => {
            if (err ?.error === SERVER.AUTH_MISSING) {
                return Promise.reject({ error: CLIENT.NO_SESSION }) // Expected, not a problem
            }
            return Promise.reject(err); // Pass any other error unchanged
        })
        .then(chats => {
            setChat(chats);
            render({ state, appEl });
        })
        .catch(err => {
            if (err ?.error == CLIENT.NO_SESSION) { // expected "error"
                logout(); // No longer waiting, set to logged out case
                render({ state, appEl });
                return;
            }
            // For unexpected errors, report them
            setError(err ?.error || 'ERROR'); // Ensure that the error ends up truthy
            render({ state, appEl });
        });
}