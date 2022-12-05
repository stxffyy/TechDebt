// const fetch = import("node-fetch");
// import fetch from "node-fetch";
// global.Buffer = global.Buffer || require('buffer').Buffer
// import { Buffer } from 'buffer';
// const { kMaxLength } = require('buffer')

const downloadsRepositories = require('./downloadsRepositories.js')

const requstUrl = 'https://stxffyy.atlassian.net'


// const requstUrl = 'https://stxffyy.atlassian.net/rest/api/3/issue'
// Response: 400 Bad Request

function sendRequest(method, url, body = null) {

const headers = {
  'Authorization': `Basic ${Buffer.from(
    'izsett210516@gmail.com:72dybao9zA2RYyx3R93g48D7'
  ).toString('base64')}`,
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

return fetch(url, {
  method: method,
  headers: headers,
  body: bodyData
})
  .then(response => {
    console.log(
      `Response: ${response.status} ${response.statusText}`
    );
    return response.text();
  })
}

const bodyData = {
  "fields": {
     "project":
     {
        "id": "10001"
     },
     "summary": "Correct the code",
     "description": downloadsRepositories.collection.allErrorsInRepository,
     "issuetype": {
        "id": "10005"
     }
 }
}
  
sendRequest('POST', requstUrl, bodyData)
  .then(text => console.log(text))
  .catch(err => console.error(err));
