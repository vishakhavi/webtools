import {
    fetchLogin,
    fetchLogout,
    fetchChat,
    fetchAddChat,
    getOnlineUsers
} from './services';
import {
    waitOnChat,
    setChat,
    setError,
    login,
    logout,
    addChat,
    setOnlineUsers
} from './state';
import render from './render';

export function addAbilityToLogin({
    state,
    appEl
}) {
    // Using 'submit' so we can get both submit via button-click and by "enter"
    appEl.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!e.target.classList.contains('login__form')) {
            return;
        }

        const username = appEl.querySelector('.login__username').value;
        waitOnChat();
        render({
            state,
            appEl
        }); // show loading state
        fetchLogin(username)
            .then(chats => {
                login(username);
                setChat(chats);
                render({
                    state,
                    appEl
                });
            })
            .catch(err => {
                setError(err ?.error || 'ERROR'); // Ensure that the error ends up truthy
                render({
                    state,
                    appEl
                });
            });

    });
}

export function addAbilityToLogout({
    state,
    appEl
}) {
    appEl.addEventListener('click', (e) => {
        if (!e.target.classList.contains('controls__logout')) {
            return;
        }
        logout();
        render({
            state,
            appEl
        });
        fetchLogout() // We don't really care about results
            .catch(err => {
                setError(err ?.error || 'ERROR'); // Ensure that the error ends up truthy
                render({
                    state,
                    appEl
                });
            });
    });
}

export function addAbilityToRefresh({
    state,
    appEl
}) {
    appEl.addEventListener('click', (e) => {
        if (!e.target.classList.contains('controls__refresh')) {
            return;
        }

        waitOnChat(); // Show loading state
        render({
            state,
            appEl
        });
        fetchChat()
            .then(chats => {
                setChat(chats);
                  getOnlineUsers()
                .then(users => {
                    setOnlineUsers(users);
                    render({ state, appEl });
                })
                .catch(err => {
                    setError(err ?.error || 'ERROR'); // Ensure that the error ends up truthy
                    render({ state, appEl });
                });
            })
            .catch(err => {
                setError(err ?.error || 'ERROR'); // Ensure that the error ends up truthy
                render({
                    state,
                    appEl
                });
            });
    });
}

export function addAbilityToAddMessage({
    state,
    appEl
}) {
    appEl.addEventListener('submit', (e) => {
        if (!e.target.classList.contains('add__form')) {
            return;
        }
        const text = appEl.querySelector('.add__task').value;
        // Here I elect not show a waiting status...what impact could that have?
        fetchAddChat(text)
            .then(chat => {
                // Notice we get the id of the new todo from the returned todo
                //addChat({ id: chat.id, chat });
                state.chats = chat;
                getOnlineUsers()
                    .then(users => {
                        setOnlineUsers(users);
                        render({ state, appEl });
                    })
                    .catch(err => {
                        setError(err ?.error || 'ERROR'); // Ensure that the error ends up truthy
                        render({ state, appEl });
                    });

            })
            .catch(err => {
                setError(err ?.error || 'ERROR'); // Ensure that the error ends up truthy
                render({ state, appEl });
            });
    });
}

export function  getPollChats({
    state,
    appEl
}) {
    fetchChat()
        .then(chats => {
            setChat(chats);
            getOnlineUsers()
                .then(users => {
                    setOnlineUsers(users);
                    render({ state, appEl });
                })
                .catch(err => {
                    setError(err ?.error || 'ERROR'); // Ensure that the error ends up truthy
                    render({ state, appEl });
                });
        })
        .catch(err => {
            setError(err ?.error || 'ERROR'); // Ensure that the error ends up truthy
            render({
                state,
                appEl
            });
        });
}