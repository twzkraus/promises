/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var request = require('request');



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {

  return new Promise((resolve, reject) => {
    fs.readFile(readFilePath, (e1, content) => {
      if (e1) {
        reject(e1);
      } else {
        // console.log(content.toString().slice(0, content.toString().indexOf('\n')));
        resolve(content.toString().slice(0, content.toString().indexOf('\n')));
      }
    });
  }).then( (username) => {
    return new Promise((resolve, reject) => {
      request.get(`https://api.github.com/users/${username}`, (e2, response, body) => {
        // console.log(body);
        // SOMETHING IS FAILING HERE--WE CAN CONSOLE.LOG BODY, BUT IT WON'T PASS INTO NEXT FUNC
        // IDEA FROM https://javascript.info/promise-chaining: make new promise inside of then. This is probably going to fix it.
        resolve(body);
      });
    });
  }).then((githubOutput) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(writeFilePath, githubOutput, (e3) => {
        if (e3) {
          reject(e3);
        } else {
          resolve();
        }
      });
    });
  });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
