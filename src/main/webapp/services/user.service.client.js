function UserServiceClient() {
  this.createUser = createUser;
  this.findAllUsers = findAllUsers;
  this.findUserById = findUserById;
  this.deleteUser = deleteUser;
  this.updateUser = updateUser;
  this.url = 'https://wbdv-generic-server.herokuapp.com/api/001377106/users';
  var self = this;

  function createUser(user) {
    return fetch(this.url, {
      method: 'POST',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify(user)
    }).then(function(response) {
      return response.json();
    })
  }

  function findAllUsers() {
    return fetch(this.url)
    .then(function (response) {
      return response.json()
    })
  }

  function updateUser(userId, user) {
    return fetch(`${this.url}/${userId}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(response => response.json())
  }
  function deleteUser (userId) {
    return fetch(`${this.url}/${userId}`,
        {method: 'DELETE'})
  }
}