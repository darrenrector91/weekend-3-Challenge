console.log('js');

$(document).ready(function () {
  console.log('JQ');
  console.log($('.deleteTask').data());
  console.log($('.editTask').data());



  // load existing tasks
  getTasks();
  console.log(getTasks);
  

  // add task button click
  $('#addButton').on('click', newTask); //end addButton on click
  $('#viewTasks').on('click', '.editTask', editTasks);
  $('#viewTasks').on('click', '.deleteTask', deleteTask);

}); // end doc ready

function newTask() {
  console.log('in addButton on click');
  // get user input and put in an object
  // using a test object
  let name = $('#name').val();
  let description = $('#description').val();
  console.log(taskId);

  if (checkInputs(name)) {
    var objectToSend = {
      name: name,
      description: description
    };
    // call saveTasks with the new obejct
    saveTasks(objectToSend);
  }
}

function updateTasks() {

  let name = $('#name').val();
  let description = $('#description').val();

  console.log(task);
  if (checkInputs(task)) {
    let taskId = $(this).val();
    console.log(tasksId);
    let objectToUpdate = {
      name: name,
      description: description

    };
    $.ajax({
      type: 'PUT',
      url: '/tasks/update/' + taskId,
      data: objectToUpdate,
      success: function (response) {
        console.log('response', response);
        getTasks();
        $('#editTask').empty();
        $('#addButton').on('click', newTask); //end addButton on click
        $('#formLabel').text('Add Task');
        $('#addButton').text('Add Task');
        $('#name').val('');
        $('#description').val('');
        $('#addButton').val('');
      }
    });
  }
}

function editTasks() {

  $('#addButton').text('Edit Task');
  $('#formLabel').text('Edit Task');

  $('#addButton').on('click', newTask); //end addButton on click
  $('#addButton').on('click', updateTasks);

  let editDiv = $('#editTasks');
  let taskId = $(this).val();

  $.ajax({
    url: '/tasks/' + taskId,
    method: 'GET',
    success: function (response) {
      console.log('got one task:', taskId, response);

      $('#name').val(response[0].name).focus();
      $('#description').val(response[0].name);
      $('#addButton').val(response[0].id);
    }
  });
}

function checkInputs(name) {
  if (name == '') {
    alert('Name');
    return false;
  } else {
    return true;
  }
}

function getTasks() {
  console.log('in get tasks');
  // ajax call to server to get tasks
  $.ajax({
    url: '/tasks',
    type: 'GET',
    success: function (data) {
      console.log('got task: ', data);
      console.log((data).id);
      
      displayTasks(data);
    } // end success
  }); //end ajax
  // display on DOM with buttons that allow edit of each
} // end getTasks

function displayTasks(data) {
  console.log((data).name);

  $('#viewTasks').empty();

  for (let i = 0; i < data.length; i++) {
    
    let newRow = $('<tr>');
    newRow.append('<td>' + data[i].name + '</td>');
    newRow.append('<td>' + data[i].description + '</td>');
    

    newRow.append('<td><button type="button" id="" class="btn btn-danger deleteTask" value="' + data[i].data + '"><i class="fa fa-trash" aria-hidden="true"></i>Delete</button></td>')
    newRow.append('<td><button type="button" id="" class="btn btn-primary editTask" value="' + data[i].data + '"><i class="fa fa-pencil" aria-hidden="true"></i>Edit</button></td>')
    newRow.data(data[i]);
    $('#viewTasks').append(newRow);
  }
}

function saveTasks(newTask) {
  console.log('in saveTasks', newTask);

  $.ajax({
    url: '/tasks',
    type: 'POST',
    data: newTask,
    success: function (response) {
      console.log('got some tasks: ', response);
      getTasks();

      $('#name').val('').focus();
      $('#description').val('');
      $('#addButton').val('');
    } // end success
  }); //end ajax
}

function deleteTask() {
  console.log('in delete task');

  let taskId = $(this).parents("tr").data().id;
  console.log(taskId);
  $.ajax({
    type: 'DELETE',
    url: '/tasks/' + taskId,
    success: function (response) {
      console.log('response', response);
      getTasks();
    }
  });
}