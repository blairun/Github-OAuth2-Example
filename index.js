require('dotenv').config()

var tools = require('./scripts/terminal')


// read user data
tools.grabUserInfo()

// // write user data
// tools.updateUsername('blairun')

// var repoData = {
//   "name": "Github OAuth2 Example",
//   "description": "This is an example node application that implements Githubs OAuth2 API.",
//   "private": false,
//   "has_issues": false,
//   "has_projects": true,
//   "has_wiki": true
// }

// tools.createRepo(repoData)
