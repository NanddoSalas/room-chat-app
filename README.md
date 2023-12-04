# Room Chat App

Real-time messaging application designed to facilitate seamless communication through virtual rooms. This web application offers users the ability to create, join, and participate in different chat rooms.

## Features

* Real-Time Communication: Experience instant messaging with real-time updates.
* Multi-Room Functionality: Create or join multiple rooms, each serving as a dedicated space for specific topics.
* User-Friendly Interface: The app has an intuitive, respoinsive and user-friendly interface, making it easy to navigate through different rooms effortlessly.
* Google Sign-In: It provides a convenient way for users to access the app using their Google Account, eliminating the need for manual account creation.

[Try Demo](https://room-chat-web-app.netlify.app)

[Design and Development of the app](design-development.md)

## Packages

This project is made up of 2 packages.

- server (GraphQL TypeScript server)
- web (Single Page Application made with React)

## Prerequisites

- Google Client ID for the authentication process, you can find more information [here](https://docs.expo.dev/guides/authentication/#google)
- PostgreSQL database, get a free one [here](https://www.elephantsql.com)

## Installation

1. Get the code into your local machine and install all dependencies

   ```bash
   git clone https://github.com/NanddoSalas/room-chat-app.git
   cd room-chat-app
   yarn install
   ```

2. Setup environment at `.env`

   ```bash
   cp .env.example .env
   ```

3. Copy `.env` file to the `web` package

   ```bash
   cp .env packages/web
   ```

4. Build the `TypeScript Server`

   ```bash
   yarn build:server
   ```

5. Setup database

   ```bash
   yarn db:setup
   ```

6. Start the server and web app

   ```bash
   yarn start
   ```

## License

[MIT](LICENSE)
