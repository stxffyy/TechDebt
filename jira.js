const downloadsRepositories = require('./downloadsRepositories.js')

console.log(process.env.TOKEN);

const requstUrl = 'https://stxffyy.atlassian.net/rest/api/2/issue'

function sendRequest(method, url, body = null) {

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

return fetch(url, {
  method: method,
  headers: headers,
  body: JSON.stringify(bodyData)
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
