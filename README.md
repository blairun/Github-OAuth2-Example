# Github OAuth2 API example application

This is an example node application that implements Githubs OAuth2 API.

## Run this example

1. Create a Github OAuth app at https://github.com/settings/applications
  - Homepage URL: http://localhost:3000
  - Callback URL: http://localhost:3000/oauth/redirect
2. Edit index.js with your app config
3. Install dependencies with `yarn install` or `npm install`
4. Run the webserver with `node index.js`
5. Browse to http://localhost:3000

reference:
https://github.com/sohamkamani/node-oauth-example
https://github.com/lichess-org/api/tree/master/example/oauth-authorization-code