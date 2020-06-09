require('dotenv').config()
const axios = require('axios');
const apiHost = 'https://api.github.com';


module.exports = {

  // grab user data
  grabUserInfo: function () {
    return axios.get('/user', {
        baseURL: apiHost,
        headers: {
          'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN
        }
      })
      .then((response) => {
        // console.log(response.data)
        console.log('Welcome ' + response.data.name);
        return
      }, (error) => {
        console.log(error.response.data);
      });
  },

  // write user data
  updateUsername: function (newName) {
    return axios(`${apiHost}/user`, {
        method: 'PATCH',
        data: {
          name: newName
        },
        headers: {
          'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN
        }
      })
      .then((response) => {
        // console.log(response.data)
        console.log('Your new username is: ' + response.data.name);
        return
      }, (error) => {
        console.log(error.response.data);
      });
  },

  // create new repo
  createRepo: function (repoData) {
    return axios(`${apiHost}/user/repos`, {
        method: 'post',
        data: repoData,
        headers: {
          'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN
        }
      })
      .then((response) => {
        // console.log(response.data)
        console.log('New repo created: ' + response.data.name);
        return
      }, (error) => {
        console.log('error')
        console.log(error.response.data);
      });
  }

}