import { useEffect, useReducer } from 'react';
import './App.css';
import reducer, { initialState } from './reducer';
import {BrowserRouter} from 'react-router-dom';
import logo from './690-6909074_reddit-logo-png-transparent-png.png';
import {
  LOGIN_STATUS,
  CLIENT,
  SERVER,
  ACTIONS,
} from './constants';
import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchTopics,
  fetchAddTopic,
  fetchUpdateUpVote,
  fetchAddPosts
} from './services';

import LoginForm from './LoginForm';
import Topics from './Topics';
import Loading from './Loading';
import Controls from './Controls';
import Status from './Status';
import CreateTopic from './CreateTopic';

function App() {

  // All our global state is from the reducer
  // Some "local" state will remain in various components
  const [state, dispatch] = useReducer(reducer, initialState);

  // We also pass "action" functions that do things and update state
  // The top level state has a BUNCH of these
  // We can move these elsewhere if we think it helps
  // - to move, these would have to get dispatch somehow
  // - such as adding dispatch to the params
  // - or having a function that takes dispatch and returns these functions
  // For now, recognize the benefit of keeping the JSX returned at the bottom of this component
  // clean and readable because we have all of these state-management functions here

  function onLogin( username ) {
    dispatch({ type: ACTIONS.START_LOADING_TOPICS });
    fetchLogin(username)
    .then( fetchedTopics => {
      dispatch({ type: ACTIONS.LOG_IN, username });
      dispatch({ type: ACTIONS.REPLACE_TOPICS, topics: fetchedTopics });
    })
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  function onLogout() {
    dispatch({ type: ACTIONS.LOG_OUT });
    fetchLogout() // We don't really care about server results
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  function onRefresh() {
    dispatch({ type: ACTIONS.START_LOADING_TOPICS });
    fetchTopics()
    .then( topics => {
      dispatch({ type: ACTIONS.REPLACE_TOPICS, topics });
    })
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  function onUpdateUpVote(id) {
    fetchUpdateUpVote(id, { votes: state.topics[id].votes+1 } )
    .then( topic => { // Service call returns the updated topic
      dispatch({ type: ACTIONS.UPVOTE_TOPIC, topic});
    })
    fetchTopics()
    .then( topics => {
      dispatch({ type: ACTIONS.REPLACE_TOPICS, topics });
    })  
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }
 function onUpdateDownVote(id) {
    fetchUpdateUpVote(id, { votes: state.topics[id].votes-1 } )
    .then( topic => { // Service call returns the updated topic
      dispatch({ type: ACTIONS.DOWNVOTE_TOPIC, topic});
    })
    fetchTopics()
    .then( topics => {
      dispatch({ type: ACTIONS.REPLACE_TOPICS, topics });
    })
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  function onCreateTopic(topic) {
    fetchAddTopic(topic)
    .then( topic => {
      dispatch({ type: ACTIONS.ADD_TOPIC, topic});
    })
    fetchTopics()
    .then( topics => {
      dispatch({ type: ACTIONS.REPLACE_TOPICS, topics });
    })
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  function onCreatePost(post) {
    fetchAddPosts(post)
    .then( post => {
      dispatch({ type: ACTIONS.ADD_POST, post});
    })
    fetchTopics()
    .then( topics => {
      dispatch({ type: ACTIONS.REPLACE_TOPICS, topics });
    })
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  function checkForSession() {
    fetchSession()
    .then( session => { // The returned object from the service call
      dispatch({ type: ACTIONS.LOG_IN, username: session.username });
      return fetchTopics(); // By returning this promise we can chain the original promise
    })
    .catch( err => {
      if( err?.error === SERVER.AUTH_MISSING ) {
        return Promise.reject({ error: CLIENT.NO_SESSION }) // Expected, not a problem
      }
      return Promise.reject(err); // Pass any other error unchanged
    })
    .then( topics => {
      dispatch({ type: ACTIONS.REPLACE_TOPICS, topics});
    })
    .catch( err => {
      if( err?.error === CLIENT.NO_SESSION ) { // expected "error"
        dispatch({ type: ACTIONS.LOG_OUT });
        // Not yet logged in isn't a reported error
        return;
      }
      // For unexpected errors, report them
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
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
<BrowserRouter>
    <div className="app">
      <main className="container">
        { state.error && <Status error={state.error}/> }
        { state.loginStatus === LOGIN_STATUS.PENDING && <Loading className="login__waiting">Loading user...</Loading> }
        { state.loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <LoginForm onLogin={onLogin}/> }
        { state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <div className="content">
            <div className='app__header'>
            <img className='app__logo' src= {logo} />
            <div className='app__header--content'> Reddit <span className='app__username'>Welcome {state.username}</span></div>
            <Controls onLogout={onLogout} onRefresh={onRefresh}/>
            </div>
            <Topics
              isTopicPending={state.isTopicPending}
              topics={state.topics}
              lastAddedTopicId={state.lastAddedTopicId}
              onUpdateUpVote={onUpdateUpVote}
              onUpdateDownVote={onUpdateDownVote}
              onCreatePost={onCreatePost}
              
            />
            <CreateTopic onCreateTopic={onCreateTopic} />

          </div>
        )}

      </main>
    </div>
</BrowserRouter>
  );
}

export default App;
