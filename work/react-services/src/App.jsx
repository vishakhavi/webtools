import { useState, useEffect } from 'react';

import './App.css';
import {
  LOGIN_STATUS,
  CLIENT,
  SERVER,
} from './constants';
import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchStoredWord,
  fetchAddStoredWord,
  fetchUpdateStoredWord
} from './services';

import LoginForm from './LoginForm';
import StoredWord from './StoredWord';
import Loading from './Loading';
import Controls from './Controls';
import Status from './Status';
import AddStoredWordForm from './AddStoredWordForm';

function App() {

  // Here we define our "top level" state
  // These values are passed down to other components
  // We COULD have fewer states if we used objects to track multiple state values
  // But here I've done them as individual values to keep it basic
  //
  const [ error, setError ] = useState('');
  const [ username, setUsername] = useState('');
  const [ loginStatus, setLoginStatus ] = useState(LOGIN_STATUS.PENDING); // one variable covers multiple cases
  const [ isStoredWordPending, setIsStoredWordPending ] = useState(false);
  const [ storedWord, setStoredWord ] = useState({});

  // We also pass "action" functions that do things and update state
  // The top level state has a BUNCH of these
  // We can move these elsewhere - we'll look at that later
  // For now, recognize the benefit of keeping the JSX returned at the bottom of this component
  // clean and readable because we have all of these state-management functions here

  function onLogin( username ) {
    setIsStoredWordPending(true);
    fetchLogin(username)
    .then( fetchedStoredWords => {
      setError(''); // in case another action had set an error
      setStoredWord( fetchedStoredWords );
      setIsStoredWordPending(false);
      setUsername(username);
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
    })
    .catch( err => {
      setError(err?.error || 'ERROR');
    });
  }

  function onLogout() {
    setError('');
    setUsername('');
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    setStoredWord({});
    fetchLogout() // We don't really care about results
    .catch( err => {
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
    });
  }

  // function onRefresh() {
  //   setError('');
  //   setIsStoredWordPending(true); // Show loading state
  //   fetchStoredWord()
  //   .then( word => {
  //     setStoredWord(word);
  //     setIsStoredWordPending(false);
  //   })
  //   .catch( err => {
  //     setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
  //   });
  // }


  function onAddStoredWord(word) {
    fetchAddStoredWord(word)
    .then( storedWord => {
      // Notice we get the id of the new todo from the returned todo
      // Don't modify existing state object!
      setStoredWord({ // Create new object
       // ...todos, // copy contents of existing state object
        [storedWord.id]: storedWord, // add new todo
      });
     // setLastAddedStoredWordId(todo.id);
    })
    .catch( err => {
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
    });
    fetchStoredWord()
    .then( word => {
      setStoredWord(word);
      setIsStoredWordPending(false);
    })
    .catch( err => {
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
    });

  }

  function checkForSession() {
    fetchSession()
    .then( session => { // The returned object from the service call
      setUsername(session.username);
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN); // We do not have todos yet!
      return fetchStoredWord(); // By returning this promise we can chain the original promise
    })
    .catch( err => {
      if( err?.error === SERVER.AUTH_MISSING ) {
        return Promise.reject({ error: CLIENT.NO_SESSION }) // Expected, not a problem
      }
      return Promise.reject(err); // Pass any other error unchanged
    })
    .then( storedWord => {
      setStoredWord(storedWord);
    })
    .catch( err => {
      if( err?.error === CLIENT.NO_SESSION ) { // expected "error"
        setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        // Not yet logged in isn't a reported error
        return;
      }
      // For unexpected errors, report them
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
    });

  }

  // Here we use a useEffect to perform the initial loading
  // Initial loading isn't triggered by an event like most service calls
  useEffect(
    () => {
      checkForSession();
    },
    [] // Only run on initial render
  );

  return (
    <div className="app">
      <main className="">
        { error && <Status error={error}/> }
        { loginStatus === LOGIN_STATUS.PENDING && <Loading className="login__waiting">Loading user...</Loading> }
        { loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <LoginForm onLogin={onLogin}/> }
        { loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <div className="content">
            <p className="logged-in__username">Hello, {username}</p>
            <Controls onLogout={onLogout}/>
            <StoredWord
              isStoredWordPending={isStoredWordPending}
              storedWord={storedWord}
            />
            <AddStoredWordForm onAddStoredWord={onAddStoredWord}/>
          </div>
        )}

      </main>
    </div>
  );
}

export default App;
