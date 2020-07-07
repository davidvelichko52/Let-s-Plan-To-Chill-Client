# lets-plan-to-chill(Server-side)

## let's-plan-to-chill
This is a Website site that is meant for creating events and planning them out. On this website you can view all events created and comment on individual events.

### live link https://lets-plan-to-chill.herokuapp.com/



# Models

### event model
#### chat
- content
- user

#### event
- location 
- pic
- description
- date
- things
- chats
- user



### user
#### user
- firstname
- lastname
- email
- password
- pic
- admin


**in controllers/auth.js**

| Method | path | purpose |
| ----| ------------------------- | --------------- |
| POST  | `/auth/login` | find and validate user; send token |
| POST  | `/auth/signup` | create user; generate token |
| create  | `/` | create user |


**in controllers/event.js**

| Method | path | purpose |
| ----| ------------------------- | --------------- |
| get | `/` | get events |
| POST  | `/new` | make new event |
| get  | `/singleEvent/:id` | get single event |
| post  | `/singleEvent/:id` | add event |
| delete  | `/:id` | delete event |
| get  | `/edit` | get edit page |
| put  | `/edit/:id` | update a event |

**in controllers/profile.js**

| Method | path | purpose |
| ----| ------------------------- | --------------- |
| get  | `/` | User should be logged in to access this route |



For local development

1. Fork and clone
2. Run `npm i` (run `npm audit fix` if needed - stuff changes a lot in React!)
3. Create a `.env.local` file at the top level 
4. Create an environment variable called REACT_APP_SERVER_URL set to the localhost server's url
