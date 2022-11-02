// Here we rebuild ALL the HTML whenever the state changes
// That is not the most efficient way to do it
// We COULD make these functions smarter about noticing what state changed
// and what HTML is dependent on that state
// and only replace the HTML that needs to be replaced
// but we'll be moving to React soon where someone has already written that
// The key part here is to see how the HTML is based on state
// - at this stage, the "action" is not visible, only the state
// - so our render is decoupled from the actions and events
function render({ state, appEl }) {
    const html = `
   <main class="">
     ${ generateStatusHtml( state ) }
     ${ generateLoginHtml( state ) }
     ${ displayOnlineUSers( state ) }
     ${ generateContentHtml( state ) }
   </main>
  `;
    appEl.innerHTML = html;
}

function generateStatusHtml(state) {
    return `
      <div class="status">${state.error}</div>
  `;
}

function generateLoginHtml(state) {
    if (state.isLoginPending) {
        return `
      <div class="login__waiting">Loading user...</div>
    `
    }
    if (state.isLoggedIn) {
        return ``;
    }

    // The #/login below isn't "real" - the form should never navigate
    // I included it merely as a hint to what the form does
    return `
      <div class="login">
        <form class="login__form" action="#/login">
          <label>
            <span>Username:</span>
            <input class="login__username" value="">
          </label>
          <button class="login__button" type="submit">Login</button>
        </form>
      </div>
  `;
}

function generateContentHtml(state) {
    if (!state.isLoggedIn) {
        return ``;
    }
    if (state.isChatPending) {
        return `
      <div class="content">
        ${generateControlsHtml( state )}
        <div class="chat__waiting">Loading Messages...</div>
      </div>
    `;
    }
    return `
      <div class="content">
        ${generateControlsHtml( state )}
        ${generateChatsHtml( state )}
        ${generateAddChatHtml( state )}
      </div>
  `;
}

function generateControlsHtml(state) {
    return `
        <div class="controls">
          <button class="controls__refresh">Refresh</button>
          <button class="controls__logout">Logout</button>
        </div>
  `;
}

function generateChatsHtml(state) {
    return `
   <ol class="messages">` +
        // Fill in
        // Generate the HTML for the list of messages
        Object.values(state.chats).map(chat => `
        <li>
          <div class="message">
              <img class="avatar" alt="avatar of ${chat.username}" src="https://avatars.dicebear.com/api/personas/${chat.username}.svg"/>
              <div class="sender-info">
              <span class="username">${chat.username}</span>
              <p class="message-time">${chat.time}</p>
              <p class="message-text">${chat.text}</p>
              </div>
          </div>
        </li>
        `).join('') +
        `</ol> `;
}

function generateAddChatHtml(state) {
    return `
        <form class="add__form" action="#/add">
          <input class="add__task">
          <button type="submit" class="add__button">Send</button>
        </form>
  `;
}

function displayOnlineUSers(state) {

    if (!state.isLoggedIn) {
        return ``;
    }

    const onlineUsersName = state.onlineUsers.filter(user => user !== state.username);
    if (onlineUsersName.length == 0) {
        return `<p> No one is online`;
    }
    const onlineUser = `<h3> The online users are</h3>`
    return onlineUser + `

    <ul class="display-online-users">
    
    ` +
        Object.values(onlineUsersName).map(username => `
    <li>
        ${username}
    </li>
  `).join('') +
        `</ul>`;

    // return messagesHtml;
}

export default render;