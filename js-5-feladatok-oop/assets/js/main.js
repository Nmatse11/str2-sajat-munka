'use strict';

class User {
  constructor(first_name, last_name) {
    this.first_name = first_name;
    this.last_name = last_name;
  }

  static postFunction(data) {
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
      console.log('Success!')
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  static getFunction = async (id) => {
    let fetchOptions = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache'
    }
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, fetchOptions);
      const data = await response.json();
      return console.log(data.first_name + ' ' + data.last_name)
    } catch (error) {
      console.error('Error: ID not found')
    }
  }

  static putFunction = async (id, data) => {
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
      console.log('Success!')
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  static deleteFunction = async (id) => {
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
      console.log('Success!')
    } catch (error) {
      console.error('Error: ', error)
    }
  }
}

const user = new User('John', 'Doe');
//User.postFunction(user)
//User.getFunction(10)
//User.putFunction(2, user)
//User.deleteFunction(101)



