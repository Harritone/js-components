// don queries
const chatList = document.querySelector('.chat-list');
// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', 'shaun');


//get the chat and render
chatroom.getChats(data => chatUI.render(data));
