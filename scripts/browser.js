require('dotenv').config()
const express = require('express');
const simpleOauth = require('simple-oauth2');
const axios = require('axios');
const saveEnv = require('./saveEnv')

/* Create your github OAuth app on github settings
 * Homepage URL: http://localhost:3000
 * Callback URL: http://localhost:3000/oauth/redirect
 */

/* --- Fill in your app config here --- */
const port = 8080;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = `http://localhost:${port}/oauth/redirect`;
// uncomment the scopes you need
// list of scopes: https://github.com...
const scopes = [
  'user',
  'repo',
  ];
/* --- End of your app config --- */

/* --- github config --- */
const tokenHost = 'https://github.com';
const authorizePath = '/login/oauth/authorize';
const tokenPath = '/login/oauth/access_token';
const apiHost = 'https://api.github.com';
/* --- End of github config --- */

const oauth2 = simpleOauth.create({
  client: {
    id: clientId,
    secret: clientSecret,
  },
  auth: {
    tokenHost,
    tokenPath,
    authorizePath,
  },
});

const state = Math.random().toString(36).substring(2);
const authorizationUri = `${tokenHost}${authorizePath}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&state=${state}`;

const app = express();


// Show the "log in with github" link
app.get('/', (req, res) => res.send('Hello<br><a href="/auth">Log in with github</a>'));

// Initial page redirecting to github
app.get('/auth', (req, res) => {
  console.log(authorizationUri);
  res.redirect(authorizationUri);
});

// Redirect URI: parse the authorization token and ask for the access token
app.get('/oauth/redirect', async (req, res) => {
  try {
    const result = await oauth2.authorizationCode.getToken({
      code: req.query.code,
      redirect_uri: redirectUri
    });
    console.log(result);
    const token = oauth2.accessToken.create(result);

    // console.log(token)
    console.log(`Saving token.`)
    saveEnv({
      [`ACCESS_TOKEN`]: token.token.access_token
    })
    console.log('Saved.')
    console.log()
    
    const userInfo = await getUserInfo(token.token);
    res.send(`<h1>Success!</h1>Your github user info: <pre>${JSON.stringify(userInfo.data)}</pre>`);
    
    // const repoInfo = await getRepoInfo(token.token);
    // res.send(`Your repo info: <pre>${JSON.stringify(repoInfo.data)}</pre>`);

    // const userChanged = await updateUser(token.token);
    // res.send(`Your new name: <pre>${JSON.stringify(userChanged.data.name)}</pre>`);
    // console.log(userChanged.data)

  } catch(error) {
    console.error('Error', error.message);
    res.status(500).json('Authentication failed');
  }
});

app.listen(port, () => console.log(`Express server started on port ${port}`));
console.log(`Browse to http://localhost:${port}`)


// grab user data
function getUserInfo(token) {
  return axios.get('/user', {
    baseURL: apiHost,
    headers: { 'Authorization': 'Bearer ' + token.access_token }
  });
}

// grab repo info
function getRepoInfo(token) {
  return axios.get('/user/repos', {
    baseURL: apiHost,
    headers: { 'Authorization': 'Bearer ' + token.access_token }
  });
}

// write user info
function updateUser(token) {
  return axios(`${apiHost}/user`, {
    method: 'PATCH',
    data: {name: 'blairun'},
    headers: { 'Authorization': 'Bearer ' + token.access_token }
  })
  // .then((response) => {
  //   console.log(response);
  // }, (error) => {
  //   console.log(error);
  // });
}