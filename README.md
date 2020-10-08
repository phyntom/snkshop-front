# Sneaker City

Sneaker City is a brand new online-only store for sneaker enthusiasts.

-  Easy to easy to use
-  Decent look and feel
-  Done for demo purpose

# Features!

-  List items and item paginations
-  Search items based on multiple criteria
   -- product name
   -- releaseDate
   -- brand name
   -- description
-  Select sneaker based in size
-  Add quantity per size availability
-  Add to cart
-  Cart Review
   -- Increase or decrease quantity in cart
   -- Remove items from the cart
-  Login and Register
-  Logout
   You can also:

## Tech

Sneaker City is build using a number of open source projects to work properly:

-  [ReactJS] - HTML enhanced for web apps!
-  [Axios] - awesome web-based text editor
-  [React-Bootrap] - A set of react ui component base on boostrap. Fast and easy to extend.
-  [Twitter Bootstrap] - great UI boilerplate for modern web apps
-  [Node.js] - evented I/O for the backend
-  [yarn] - javascript yarn package manager like npm
-  [React-Router-Dom] - a package used to handle routing in react.js application
-  [Context Api]- context api is built-in function for managing state in React. Used by some to replace the popular libray called Redux

## Running the application

To run this application you will need to make sure the backend is running too. Since all the data will be server from there. So clone both applications from the following repository and follow the instruction of each. Another requirement is to make sure you have nodejs latest( node10+ ) version installed on your local machine.You can check the version by issuing the command **node -v**.

1. #### Backend https://github.com/phyntom/snkshop-backend
       1. git clone https://github.com/phyntom/snkshop-frontend.git
       2. cd snkshop-frontend
       3. npm install
       4. touch .env
       6. echo "NODE_ENV=developpment \nPORT=6000\nDB_URI=mongodb://127.0.0.1:27017/snkshop?poolSize=20\nJWT_SECRET_KEY=snkshop20101156" >> .env
       7. node seeder.js -d
       8. node seeder.js -im
       9. npm run start

Prior to the following process you will need to change some lines in package.json file in order to allow your front-end to query the backend. Find the **proxy** entry in package.json and replace by URL on which the backend will be running. If the backend is running on port 6000 no change needed. 2. ### Frontend https://github.com/phyntom/snkshop-frontend/ 1. git clone https://github.com/phyntom/snkshop-frontend.git 2. cd snkshop-frontend 3. npm install 4. npm yarn start

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
