LIBRARIES USED : 

React.JS
React-beautiful-dnd
uuid

INSTRUCTIONS:

1. Clone the repository
2. Perform yarn or npm install in the cli inside the local directory of the repo.
3. Then type yarn start to run gthe application on localhost:3000



NOTE: If it doesnt render, replace package.json content with the following :

{
  "name": "react",
  "version": "1.0.0",
  "description": "",
  "keywords": [],
  "main": "src/index.js",
  "dependencies": {
    "react": "16.12.0",
    "react-beautiful-dnd": "12.2.0",
    "react-dom": "16.12.0",
    "react-scripts": "3.0.1",
    "uuid": "3.3.3"
  },
  "devDependencies": {
    "typescript": "3.3.3"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
  "browserslist": [
    ">0.2%",
    "not dead",
    "not ie <= 11",
    "not op_mini all"
  ]
}

Delete node modules folder from local dir and run YARN again.
