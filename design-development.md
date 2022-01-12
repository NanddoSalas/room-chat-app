# Design and Development of Room Chat App

## Overview

Room Chat App is a Web App that allows you to comunicate with other users through rooms, in order to start using the app you must be Signed in, this can be done using your Google Account, once you're Signed in you can create rooms or join them using an invitation code, you can see all members of a room you are in, to start chatting with other users you must connect to the room, once in the room you can send a message and all the members will receive it and vice versa, you can also see older messages in the room, if you don't want to be in a room you can leave it, if the admin leaves the room, the latest user that joined the room will become the admin or the room will be deleted if there is no one else.

## Expected Features

- Sign up with Google
- Create room (you get an invitation code to share with others users)
- Join room by invitation code
- List all rooms I am in
- List all users in a room
- Send and receive messages in a room
- Load old messages in a room
- Leave room

## User Interface

I've come up with three different pages that represents the state of the app.

### Auth Page - Allows the user to authenticate

![Auth Page](assets/AuthPage.png)

---

### Main Page - Once authenticated the user can

- Create Rooms
- Join Rooms
- See Rooms it belongs
- Connect to Rooms
- Leave Rooms
- Log out

![Main Page](assets/MainPage.png)

---

### Room Page - Once connected to a room the user can

- Send Messages
- Receive Messages
- See old Messages
- See room Members
- Disconnect from the Room

![Room Page](assets/RoomPage.png)

---

## Authentication

In order to authenticate with google, I'll use [React Google Login](https://github.com/anthonyjgrove/react-google-login) to abstract the oAuth flow and get a `tokenId` then send it to the server and receive an `accessToken` in a cookie. Once I have the accessToken I can authenticate to the server by sending it in the `Authorization` header.

![Authentication Flow](assets/AuthenticationFlow.png)

## Real Time Architecture

In order to achieve the real time features, I'm going to implement a [Publish–subscribe pattern](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) using GraphQL Subscriptions.

![Message Subscription Flow](assets/MessageSubscriptionFlow.png)

## GraphQL Schema

I've created the next schema that will be the base for the interaction between the Web App and the server.

```go
type User {
  id: ID!
  name: String!
  avatar: String!
}

type Room {
  id: ID!
  name: String!
  adminId: String!
  invitationCode: String
}

type Message {
  id: ID!
  message: String!
  createdById: String!
  createdAt: String!
}

type MessagesPayload {
  messages: [Message!]!
  cursor: ID
}

type query {
  me: User
  rooms: [Room!]!
  user(userId: ID!): User
  roomMembers(roomId: ID!): [User!]!
  messages(roomId: ID!, cursor: ID): MessagesPayload!
}

type mutation {
  googleAuth(idToken: String!): User
  createRoom(name: String!): Room
  joinRoom(invitationCode: String!): Room
  sendMessage(message: String!, roomId: ID!): Message
  leaveRoom(roomId: ID!): ID
}

type subscription {
  newMessage(roomId: ID!): Message!
  userJoinedRoom(roomId: ID!): User!
  userLeavedRoom(roomId: ID!): String!
}
```

## Database Model

I've come up with the next database model.

![Database Model](assets/DatabaseModel.png)

## Technologies/Libraries

This is a Full Stack `JavaScript/TypeScript` project that uses `GraphQL` for the data layer and some of the key Technologies/Libraries to use are the following:

- [TypeORM](https://typeorm.io/#/) makes database modeling easy.
- [TypeGraphQL](https://typegraphql.com) speeds up the GraphQL development.
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/) handle all the incoming GraphQL operations.
- [GraphQL ws](https://github.com/enisdenjo/graphql-ws) handles the GraphQL Subscription layer.
- [React](https://reactjs.org) because It's Simple to Read and Easy to Use.
- [React Google Login](https://github.com/anthonyjgrove/react-google-login) abstracs the OAuth flow to authenticate with Google
- [urql](https://formidable.com/open-source/urql/) takes care of executing the GraphQL operations and manage the state of the app.
