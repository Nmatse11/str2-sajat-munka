'use strict';

class User {
  constructor(first_name, last_name) {
    this.first_name = first_name;
    this.last_name = last_name;
  }

  postFunction(data) {
    try {
      fetch("http://localhost:3000/users/", {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      })
      document.querySelector(".message").innerHTML =
        "New user (" + data.first_name + ' ' + data.last_name + ") created successfully.";
      setTimeout(function () {
        document.querySelector(".message").innerHTML = ''
      }, 5000);
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  getFunction = async (id) => {
    let fetchOptions = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache'
    }
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, fetchOptions);
      const data = await response.json();
      document.querySelector(".message").innerHTML =
        "The user you are looking for: " + data.first_name + ' ' + data.last_name;
      setTimeout(function () {
        document.querySelector(".message").innerHTML = ''
      }, 5000);
    } catch (error) {
      console.error('Error: ID not found')
    }
  }

  putFunction = async (id, data) => {
    try {
      fetch(`http://localhost:3000/users/${id}`, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      })
      document.querySelector(".message").innerHTML =
        "Data modification successful! " + id + ". user: " + data.first_name + ' ' + data.last_name;
      setTimeout(function () {
        document.querySelector(".message").innerHTML = ''
      }, 5000);
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  deleteFunction = async (id) => {
    try {
      fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      })
      document.querySelector(".message").innerHTML =
        "Delete successful!";
      setTimeout(function () {
        document.querySelector(".message").innerHTML = ''
      }, 5000);
    } catch (error) {
      console.error('Error: ', error)
    }
  }
}

const user = new User('John', 'Doe');
//user.postFunction(user)
//user.getFunction(10)
//user.putFunction(2, user)
//user.deleteFunction(101)
