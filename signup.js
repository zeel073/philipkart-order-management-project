
$(document).ready(function () {
  console.log('hello world')
  $("#signUpForm").validate({
    rules: {
      username: {
        required: true,
        minlength: 3,
      },
      password: {
        required: true,
        minlength: 3
      },
      confirmPassword: {
        required: true,
        equalTo: "#password",
      }
    },
    messages: {
      username: {
        required: "required",
        minlength: "minimum 3 chars required"
      },
      password: {
        required: "required",
        minlength: "minimum 3 chars required"
      },
      confirmPassword: {
        required: "required",
        equalTo: "password should match",
      }
    }

  });
  let signUpDetails = [];
  let abc = JSON.parse(localStorage.getItem('SignUp'))
  
  // console.log($.each(abc, function(key,value){
  //     value;
  // }))
  for (let i = 0; i < abc.length; i++) {
    signUpDetails.push(abc[i])
  }
  console.log(signUpDetails)
  $('#signUpButton').on('click', function (e) {
    e.preventDefault();
    let userNameSignUp = $('#username').val()
    let passwordSignUp = $('#password').val()
    let private = 0;
    signUpDetails.forEach(function (obj) {
      if (obj.userName == userNameSignUp && obj.password !== passwordSignUp) {
        alert("This username is already chosen.");
        $('#username').val("")
        // console.log(obj.userName)
      }
      // console.log(obj.userName)
      if (obj.userName == userNameSignUp && obj.password == passwordSignUp) {
        alert("You have already signed up. You can login now with your username and password.")
        var url = $("#signUpButton").data('target');
        location.replace(url);
        private = 1
      }
    })
    if ($("#signUpForm").valid()) {   
      if(private ==0){
        signUpDetails.push({
          userName: userNameSignUp,
          password: passwordSignUp
        })
      } 
      localStorage.setItem("SignUp", JSON.stringify(signUpDetails))
      var url = $("#signUpButton").data('target');
      location.replace(url);
    }
    // console.log(this)
  })
})
