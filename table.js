$('#logOut').click(function () {
  localStorage.removeItem('code')
  localStorage.removeItem("currentUser")
  localStorage.removeItem("imageSrc")
})
if (!('code' in localStorage)) {
  window.location = 'login.html'
}
var currentUser = JSON.parse(localStorage.getItem('currentUser'))
$("#adminUserName").append(currentUser)

$('#changeProfilePic').on('click', function () {
  $('#file-input').trigger('click');
});
$('#file-input').on('change', function () {
  var reader = new FileReader();
  reader.onload = function (event) {
    var imageSrc = event.target.result;
    $("#profileImg").attr('src', imageSrc)
    $("#userNameImg").attr('src', imageSrc)
    localStorage.setItem('imageSrc', imageSrc);
  };
  reader.readAsDataURL(this.files[0]);
});
var storedImageUrl = localStorage.getItem("imageSrc")
if (storedImageUrl) {
  $("#profileImg").attr('src', storedImageUrl)
  $("#userNameImg").attr('src', storedImageUrl)
}

// // For changing username
var currentObject
var nonCurrentObject
$("#currentUserName").text(JSON.parse(localStorage.getItem('currentUser')))
$("#saveUserName").click(function () {
  var newUserName = $("#form29").val()
  if (newUserName == "") {
    $("#errorUserNameChange").css("display", "block")
  }
  else {
    currentObject = JSON.parse(localStorage.getItem("SignUp")).filter(obj => obj.userName === currentUser)
    nonCurrentObject = JSON.parse(localStorage.getItem("SignUp")).filter(obj => obj.userName !== currentUser)
    currentObject[0].userName = newUserName
    nonCurrentObject.push(currentObject[0])
    localStorage.removeItem("SignUp")
    localStorage.setItem("SignUp", JSON.stringify(nonCurrentObject))
    localStorage.removeItem("currentUser")
    localStorage.setItem("currentUser", JSON.stringify(newUserName))
    $("#saveUserName").css("data-bs-dismiss", "modal")
    alert("User name updated successfully.")
    window.location.reload(true)
  }
})

// For changing password
$("#resetPasswordButton").click(function () {
  var currentPassword = $("#currentPassword").val()
  var newPassword = $("#newPassword").val()
  var newConfirmPassword = $("#newConfirmPassword").val()
  currentObject = JSON.parse(localStorage.getItem("SignUp")).filter(obj => obj.userName === currentUser)
  nonCurrentObject = JSON.parse(localStorage.getItem("SignUp")).filter(obj => obj.userName !== currentUser)
  var current = true;
  var ne = true;
  var confirm = true;
  if(currentPassword != currentObject[0].password){
    $("#errorCurrentPasswordChange").css('display', 'block')
    current = false;
  }else{$("#errorCurrentPasswordChange").css('display', 'none')}
  if(newPassword != newConfirmPassword){
      $("#errorConfirmPasswordChange").css("display", "block")
      confirm = false;
  }else{$("#errorConfirmPasswordChange").css("display", "none")}
  if(newPassword.length<3){
    $("#errorPasswordChange").css("display", "block")
    ne = false;
  }else{$("#errorPasswordChange").css("display", "none")}
  if(current && ne && confirm){
    currentObject[0].password = newConfirmPassword;
    nonCurrentObject.push(currentObject[0])
    localStorage.removeItem("SignUp")
    localStorage.setItem("SignUp", JSON.stringify(nonCurrentObject))
    // $("#resetPasswordButton").attr("data-bs-dismiss", "modal")
    alert("Password changed successfully")
    window.location.reload(true)
  }
})

import orderdata from "./json/data.js";
// var editor;
// let variable = orderdata
let newOrder
if (localStorage) {
  var updatedData = JSON.parse(localStorage.getItem('newOrder'))
  newOrder = updatedData
}
else {
  localStorage.setItem("newOrder", JSON.stringify(orderdata))
  newOrder = JSON.parse(localStorage.getItem('newOrder'))
}
$(document).ready(function () {
  $("#newOrderAlert").hide()
  $("#deleteOrderAlert").hide()
  $("#editOrderAlert").hide()

  $("#submitButton").click(function (e) {

    var addOrderId = $("#addOrderId").val()
    var addItemName = $("#addItemName").val()
    var addQuantities = $("#addQuantities").val()
    var addPrice = $("#addPrice").val()
    newOrder.push({
      OrderId: addOrderId,
      ItemName: addItemName,
      Quantities: addQuantities,
      Price: addPrice
    })
    localStorage.removeItem("newOrder")
    let newOne = newOrder;
    localStorage.setItem("newOrder", JSON.stringify(newOrder));
    alert("New order created")
    e.preventDefault()
    location.reload(true)

  })
  // let lastItem = JSON.parse(localStorage.getItem("newOrder")).slice(-1)
  // console.log(lastItem[0])
  // let object = {
  //   "OrderId": lastItem[0].OrderId,
  //   "ItemName": lastItem[0].ItemName,
  //   "Quantities": lastItem[0].Quantities,
  //   "Price": lastItem[0].Price
  // }
  // console.log(object)
  // orderdata.push(object)

  let cols = []
  console.log(orderdata[0]);
  var keys = Object.keys(orderdata[0]);

  //for each key, add a column definition
  keys.forEach(function (k) {
    cols.push({
      title: k,
      data: k
    });
  });


  let datatable = $("#orderTable").DataTable({
    columns: cols,
  });


  var select;
  var selected_Id

  var items = new Array();
  datatable.rows.add(JSON.parse(localStorage.getItem("newOrder"))).draw();
  $('#orderTable tbody').on('click', 'tr', function () {
    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected');
      select = false;
      hideButtons()
    } else {
      datatable.$('tr.selected').removeClass('selected');
      showButtons()
      $(this).addClass('selected');
      // console.log($(this).find('.sorting_1').html())

      items = []
      $($(this).find('td')).each(function () {
        items.push($(this).html());
      })
      selected_Id = $(this).find('.sorting_1').html()
      console.log("selected")
      select = true;
    }
  });
  function showButtons() {
    $('#deleteButton').removeAttr('disabled')
    $('#editButton').removeAttr('disabled')
  }
  function hideButtons() {
    $('#deleteButton').attr('disabled', true)
    $('#editButton').attr('disabled', true)
  }
  $('#deleteButton').click(function () {
    // console.log("pehle select kar ")

    $("#deleteModalButton").click(function () {

      datatable.row('.selected').remove().draw(false);
      // console.log("Deleted bruhhh")
      console.log(selected_Id)
      let after_delete = JSON.parse(localStorage.getItem('newOrder')).filter(function (obj) {
        return obj.OrderId !== selected_Id;
      })
      // console.log(after_delete)
      localStorage.removeItem('newOrder')
      localStorage.setItem("newOrder", JSON.stringify(after_delete))
      window.location.reload(true)
    })


  });

  $("#editButton").click(function () {

    $("#editModal form #editOrderId").val(items[0])
    $("#editModal form #editItemName").val(items[1])
    $("#editModal form #editQuantities").val(items[2])
    $("#editModal form #editPrice").val(items[3])
    // console.log(selected_Id)
    console.log(items, "this one")


  })
  $("#updateButton").click(function () {

    if (window.confirm("Are you sure?")) {
      let editedOrderId = $("#editModal form #editOrderId").val()
      let editedItemName = $("#editModal form #editItemName").val()
      let editedQuantities = $("#editModal form #editQuantities").val()
      let editedPrice = $("#editModal form #editPrice").val()


      // Below code is for delete purpose

      datatable.row('.selected').remove().draw(false);
      let after_delete = JSON.parse(localStorage.getItem('newOrder')).filter(function (obj) {
        return obj.OrderId !== selected_Id;
      })
      localStorage.removeItem('newOrder')
      localStorage.setItem("newOrder", JSON.stringify(after_delete))

      // Below code is for adding updated records.

      var updatedOrder = JSON.parse(localStorage.getItem('newOrder'))
      updatedOrder.push({
        OrderId: editedOrderId,
        ItemName: editedItemName,
        Quantities: editedQuantities,
        Price: editedPrice
      })
      localStorage.removeItem('newOrder')
      localStorage.setItem('newOrder', JSON.stringify(updatedOrder))
      console.log(JSON.parse(localStorage.getItem('newOrder')))
      // alert("Order updated successfully")
      // $("#updateAlert").css('display', 'block')
      window.location.reload()
    }

  })
  console.log(JSON.parse(localStorage.getItem('newOrder')))
});