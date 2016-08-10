$(document).ready( function() {
  var list = $('#task_list');

  $.ajax({
    url:'/tasks',
    type: 'GET',
    dataType: 'JSON'
  }).done( function(tasks) {
    tasks.forEach( function(task) {
      list.prepend('<li id=' + task._id + '>' + task.title + '<i class="material-icons">remove_circle_outline</i></li>');
    });
  });

  $('#add_task').on('submit', function(e) {
    e.preventDefault();
    var title = $(this).children('input').val();

    $.ajax({
      url: '/tasks',
      type: 'POST',
      data: { title: title },
      dataType: 'JSON'
    }).done( function(task) {
      list.prepend('<li id=' + task._id + '>' + task.title + '<i class="material-icons">remove_circle_outline</i></li>');
      $('input[name="title"]').val("");
    });
  });

  $('#task_list').on({
    mouseenter: function() {
      $("i", this).css("display", "inline-block");
    },
    mouseleave: function() {
      $("i", this).css("display", "none");
    }
  }, "li");

  $('#task_list').on('click', "i", function(e) {
    var item = $(this).parent('li');
    var itemId = item.attr('id');
    console.log(itemId);
    $.ajax({
      url: '/tasks',
      type: 'DELETE',
      data: { id: itemId },
      dataType: 'JSON'
    }).done( function(delItem) {
      console.log(delItem);
      item.remove();
    });
  });



});
