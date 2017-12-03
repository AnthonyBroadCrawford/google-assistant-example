'use strict';

process.env.DEBUG = 'actions-on-google:*';

const App = require('actions-on-google').DialogflowApp;
const functions = require('firebase-functions');

const NAME_ACTION = 'make_name';
const COLOR_ARGUMENT = 'color';
const NUMBER_ARGUMENT = 'number';

exports.sillyNameMaker = functions.https.onRequest((request, response) => {
  const app = new App({request, response});


  //I'm logging this into my firebase console so I can learn the data-structures Google is passing to the app.
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));

  function makeName (app) {
    let number = app.getArgument(NUMBER_ARGUMENT);
    let color = app.getArgument(COLOR_ARGUMENT);

    //copy & paste code from their tutorial .... 
    app.tell('Alright, your silly name is ' +
      color + ' ' + number +
      '! I hope you like it. See you next time.');
  }

  // d. build an action map, which maps intent names to functions
  let actionMap = new Map();
  actionMap.set(NAME_ACTION, makeName);

  app.handleRequest(actionMap);
});
