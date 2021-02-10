var userService = new UserServiceClient();
var $tableBody;
var $usernameFld
var $passwordFld
var $fnameFld
var $lnameFld
var $roleFld
var $updateBtn
var $createBtn
var $selectBtn

var users = [];

var selectedUser = null;

function createUser(user) {
  (userService.createUser)(user)
    .then(function (actualUser) {
      users.push(actualUser);
      renderUsers(users);
      selectedUser = null;
    })
}

function renderUsers(users) {
  $tableBody.empty();
  for(let i=0; i<users.length; i++) {
    let user = users[i];
    $tableBody.prepend(`
      <tr>
              <td>${user.username}</td>
              <td></td>
              <td>${user.first}</td>
              <td>${user.last}</td>
              <td>${user.role}</td>
              <td><span class="pull-right" style="white-space: nowrap">
              <i id="${user._id}" class="fas fa-2x fa-hand-pointer wbdv-select"></i>
              <i id="${i}" class="fas fa-2x fa-trash wbdv-delete"></i>
              </span></td>
            </tr>
    `
    )
  }
  $(".wbdv-delete").click(deleteUser);
  $(".wbdv-select").click(selectUser);
}

function deleteUser(event) {
  let deleteBtn = $(event.target);
  let userIndex = deleteBtn.attr("id");
  let userId = users[userIndex]._id;

  userService.deleteUser(userId)
    .then(function(status) {
      users.splice(userIndex, 1);
      renderUsers(users);
    })
}

function updateUser(event) {
  if(selectedUser == null) {
    alert("No user selected")
    return;
  }
  selectedUser.username = $usernameFld.val();
  selectedUser.password = $passwordFld.val();
  selectedUser.first = $fnameFld.val();
  selectedUser.last = $lnameFld.val();
  selectedUser.role = $roleFld.val();

  userService.updateUser(selectedUser._id, selectedUser)
    .then(function(status) {
      let index = users.find(user => user._id === selectedUser._id);
      users[index] = selectedUser;
      renderUsers(users);
      selectedUser = null;
      $usernameFld.val("");
      $passwordFld.val("");
      $fnameFld.val("");
      $lnameFld.val("");
    })
}

function selectUser(event) {
  let selectBtn = $(event.target);
  let userId = selectBtn.attr("id");
  console.log(userId);
  selectedUser = users.find(user => user._id == userId);
  $usernameFld.val(selectedUser.username);
  $passwordFld.val(selectedUser.password);
  $fnameFld.val(selectedUser.first);
  $lnameFld.val(selectedUser.last);
  $roleFld.val(selectedUser.role);
}


function main() {
  $tableBody = $('.wbdv-tbody');
  $usernameFld = $('#username-fld');
  $passwordFld = $('#password-fld');
  $fnameFld = $('#first-name-fld');
  $lnameFld = $('#last-name-fld');
  $roleFld = $('#role-fld');
  $updateBtn = $('.wbdv-update');
  $createBtn = $('.wbdv-create');
  $selectBtn = $('.wbdv-select');

  $createBtn.click(() => {
    if($usernameFld.val() == "" ||
      $passwordFld.val() == "" ||
      $fnameFld.val() == "" ||
      $lnameFld.val() == "") {
      alert("All user fields are required")
      return;
    }
    createUser({
      username: $usernameFld.val(),
      password: $passwordFld.val(),
      first: $fnameFld.val(),
      last: $lnameFld.val(),
      role: $roleFld.val()
    })

    $usernameFld.val("");
    $passwordFld.val("");
    $fnameFld.val("");
    $lnameFld.val("");
  })

  $updateBtn.click(updateUser)
  userService.findAllUsers()
    .then(function(actualUsers) {
      users = actualUsers;
      renderUsers(users);
    })

}

jQuery(main);