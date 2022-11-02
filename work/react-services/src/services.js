// Each of these functions is a bit repetitive
// We COULD write a function that they each use to reduce that
// But
// (1) While these services all use the same structure, not all services will
// (2) I wanted to demonstrate what was happening rather than abstract it away
//     so that you will be able to write a different way to handle different services
//
// Key lesson: These functions all handle:
// - MAKING the service calls
// - Passing the data
// - Parsing the results
//
// But these functions DO NOT
// - change the state
// - change the DOM
//
// This makes these functions fully decoupled and reuseable
//
// Notice they each return a promise. This is essential.
// It allows the caller to attach reactions in then() and catch() clauses
export function fetchAddStoredWord(word) {
    return fetch('/api/word', {
            method: 'POST',
            headers: new Headers({
                'content-type': 'application/json',
            }),
            body: JSON.stringify({
                word
            }),
        })
        .catch(() => Promise.reject({
            error: 'networkError'
        }))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch(error => Promise.reject({
                    error
                }))
                .then(err => Promise.reject(err));
        });
}
export function fetchStoredWord() {
    return fetch('/api/word')
        .catch(() => Promise.reject({
            error: 'networkError'
        }))
        .then(response => {
            console.log({
                response
            })
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch(error => Promise.reject({
                    error
                }))
                .then(err => Promise.reject(err));
        });
}
export function fetchSession() {
    return fetch('/api/session', {
            method: 'GET',
        })
        .catch(() => Promise.reject({
            error: 'networkError'
        }))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch(error => Promise.reject({
                    error
                }))
                .then(err => Promise.reject(err));
        });
}

export function fetchLogout() {
    return fetch('/api/session', {
            method: 'DELETE',
        })
        .catch(() => Promise.reject({
            error: 'networkError'
        }))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch(error => Promise.reject({
                    error
                }))
                .then(err => Promise.reject(err));
        });
}

export function fetchLogin(username) {
    return fetch('/api/session', {
            method: 'POST',
            headers: new Headers({
                'content-type': 'application/json'
            }),
            body: JSON.stringify({
                username
            }),
        })
        .catch(() => Promise.reject({
            error: 'networkError'
        }))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch(error => Promise.reject({
                    error
                }))
                .then(err => Promise.reject(err));
        });
}