# Assessment Document

## Git

Git is used to display the history of changes happened during the development of this assessment. The commit was executed when functionality was implemented in the project and worked. Commits done in this assessment includes initial commit, user login, roomlist working, message function working, message with name, login system using username, assessment part 1 final, 

## Data structure 

There are 3 type of data structure used in this project and this is for the users, rooms and logins. I wanted to include the group data structure but didn't happened because of time limitation and skill issue.  User data structure consists of email, password, username, userid, and user role, which all of the structures are using string as a data type. Login data structure consists on username and password for login component. The room data structures consist of only roomname, which is used for chat component.

## Angular architecture

**Login Component** 

Login Component is the default route and a component for the login page for the chat system. The login page includes a header called ChatChannel, an username form, password form, and the Login button. When the Login button has pressed, the checkuser function which will check the username and password. If either username and password is not available, it will return and error saying "Insert both username and password". If the login ok return true, the system will access to mongodb to access the user's information, and the user's username and userrole will set as a sessionStorage and sends the page to the chat page. If the login ok returns false, it will return an error saying "user or password is not valid".

**Chat Component**

Chat component is the main feature of this project. When the user has logged in, the chat page will display which is has multiple actions that users can do. All actions can be done by all roles except normal users cannot create chat rooms. 
| Actions | Explanation | Function |
| Create Channel | Create new chat channel | createroom()|
| Join Room | Joins the room that user has chose on the drop-down menu | joinroom() |
| Leave Room | Leave room that the user is in. This only applies if you are in a room | leaveroom | 
| Chat | Sends the message that user has written. This only applies if user has written a message | chat() |
| Log Out | Logout the user. The page will redirect to Login page | logOut() |

**Adduser Component**
Adduser component is the component that adds the user into the system. Adduser page includes the form for adding a new user. Adding user needs to include all information aboout users such as username, email, password, userrole and userid. User cannot be created if one or more information is missing. When user form send to the front-end, the database checks if the userid is taken or not. If the userid is not taken, then the user will added to the database and sends the page to the user page. 

**Updateuser Component**
Updateuser component is the component that updates the user into the system. Updateuser page includes the form for updating user information. Updating user needs to include all information aboout users such as username, email, password, userrole and userid. User information cannot be changed if one or more information is missing. When user form send to the front-end, the database checks if the userid is already in the database. If the userid is already there, then the user information will updated to the database and sends the page to the user page. 

**Users Component**
Users Component is the component that displays all user's data into a webpage in a table format. the table consists of user's information such as username, user email, userrole, and each has an edit button to navigate to update user page, and delete button to delete the user. When the user pressed delete button, the user is deleted from the database and the page will be reloaded to see that the user is deleted. 

**Services**
##### Socket Service 
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

##### Users Service
This project uses users service to communicate between front and back-end for mongodb

add(): This method sends new user's information to add user to the database.

getuser(): This method retrieves array of user's data from the database.

updateuser(): This method sends the user's information to update the user's information

deleteuser(): This method sends the user's userid to delete the user from the database

login(login: Login): This method sends the login information to do login authentication for the login component.

##### Image Upload 
This project uses image upload Service to communicate between fornt-end and back-end for image upload.

imgupload(): This method sends image data to the server-side to add image.


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

