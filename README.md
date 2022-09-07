# Assessment Document

## Git

Git is used to display the history of changes happened during the development of this assessment. The commit was executed when functionality was implemented in the project and worked.

## Data structure 

There are one type of data structure used in this project and this is both for the users. This will be the user data structure. I wanted to include the group data structure but didn't happened because of time limitation and skill issue.  User data structure consists of email, password, username, userid, and user role.g

## Angular architecture

**Login Component** 

Login Component is the default route and a component for the login page for the chat system. The login page includes a header called ChatChannel, an username form, password form, and the Login button. When the Login button has pressed, the checkuser function which will check the username and password. If the login ok return true, the user's username and userrole will set as a sessionStorage and sends the page to the chat page. 

If the login ok returns false, it will display an alert saying that the login has been wrong. 


**Chat Component**

Chat component is the main feature of this project. When the user has logged in, the chat page will display which is has multiple actions that users can do. All actions can be done by all roles except normal users cannot create chat rooms. 
| Actions | Explanation | Function |
| Create Channel | Create new chat channel | createroom()|
| Join Room | Joins the room that user has chose on the drop-down menu | joinroom() |
| Leave Room | Leave room that the user is in. This only applies if you are in a room | leaveroom | 
| Chat | Sends the message that user has written. This only applies if user has written a message | chat() |
| Log Out | Logout the user. The page will redirect to Login page | logOut() |

**Services**
This project uses sockets service to use socket.io.

initSocket(): This method initialises socket.

joinroom(): This method send room data to the back-end server to join the chat room.

leaveroom(): This method send room data to the back-end server to leave the chat room.

joined(): This method grabs data from back-end server to display in the front-end server that the user has joined a room. 

createroom(): This method send room data to the back-end server to create the chat room.

reqnumusers(): This method sends roomname to the back-end server to check number of user in the room.

getnumusers(): This method sends roomname to the back-end server to grab number of user in the room.

reqroomList(): This method sends to the back-end server to active roomlist event.

getroomList(): This method sends to the back-end server to grab roomlist array.

notice(): This method send to the back-end server to active notice event with user data.

sendMessage(): This method sends the message to the back end server.

grabMessage(): This method grabs the message send by sendMessage to display it in the page for every user.

## REST API
REST API is used in this project to authenticate user. Authenticating user used POST method to post the login info to the back end. Parameter used was username which is string and password which is a string. If the user and password in in the userlist and correct, it will return {"ok":true, "data": userArray[i]} which means that the user was login and send the user's data to the front-end. If not, it will return {"ok": false} which means that the login is wrong. 

## Communication between Server and Front-end

**Login Function**
When the user inputs their username and password to login, the data is send to the server-side and uses postLogin.js to check the login. in the postLogin.js, the input data is stored as u and p, then reads the users.json file and reads through all user's username and password to check for authentication. If there are user that has the same username and password, the server will send back the user's information to the front-end. If there were no user that has the username and password, it will send back a false to the front.

**Create Room**
When the admin created a new chat room, the front-end sends the new chat room name to the server. Then the server side uses that data to push it to the roomlist array. Then the server side passes the new roomlist array to the front to diplay it. 

**Join Room** 
When user has chosen a room and pressed join button, the joinroom function will call. The front-end side sends the room name to the back-end server to join the room. After the user has joined the server, the front end will send request from the front-end to return the room user number. 

**Leave Room**
When the user pressed the leave button when they're inside the room, leaveroom function will run which send the room name to the server to remove that user from the user list. After the user leaved the room, roomslist, currentroom, roomnotice variable will reset, isinRoom will return false, numusers will return 0, and messages array will reset.

**Send Message**
When the user post a message, the front-end sends the new message and the username to the server. Then the server uses the message and username data to push it to the message array. Then the server side passes the message to the front to diplay it. After the message has sent, the messagecontent variable become empty. 

