import { MESSAGES } from './constants';

const state = {
    // We store these as an object because we will access by id
    chats: {},
    isLoggedIn: false,
    isLoginPending: true, // We start with our login status unknown
    isChatPending: false,
    username: '',
    lastAddedTextId: '',
    error: '',
    onlineUsers: []
};

export function waitOnLogin() {
    state.isLoggedIn = false;
    state.isLoginPending = true;
    state.username = '';
    state.chats = {};
    state.error = '';
}

export function login(username) {
    state.isLoggedIn = true;
    state.isLoginPending = false;
    state.username = username;
    state.error = '';
    state.lastAddedTextId = '';
}

export function logout() {
    state.isLoggedIn = false;
    state.isLoginPending = false;
    state.username = '';
    state.chats = {};
    state.error = '';
}

export function waitOnChat() {
    state.chats = {};
    state.isChatPending = true;
    state.error = '';
}

export function setChat(chats) {
    state.chats = chats;
    state.isChatPending = false;
    state.error = '';
    state.lastAddedTextId = '';
}

export function addChat({ id, chat }) {
    state.chats[id] = chat;
    state.lastAddedTextId = id;
    state.error = '';
}

export function setOnlineUsers(users) {
    state.onlineUsers = users;
}

export function setError(error) {
    console.log(error);
    if (!error) {
        state.error = '';
        return;
    }
    state.error = MESSAGES[error] || MESSAGES.default;
}

export default state;