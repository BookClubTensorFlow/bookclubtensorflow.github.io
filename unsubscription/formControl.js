


const submit = document.getElementById("submit");
submit.addEventListener("click", validate);

function validate(e) {
  e.preventDefault();

  
  const email = document.getElementById("email");
  const emailInputField = document.getElementById("emailInputField");
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  

  console.log(email.value)
  console.log(emailRegex.test(email.value))
  document.getElementById("requestEmail").innerHTML = email.value;

  
  if (emailRegex.test(email.value)) {
    email.classList.add("is-valid");
    emailInputField.classList.add("has-success");
    email.classList.remove("is-invalid");
    emailInputField.classList.remove("has-danger");
    console.log("Valid email address");
    
    SaveData()
    .then((status) => {
        console.log("data", e)
        if (status.result==='success'){
          let Modal = new bootstrap.Modal(document.getElementById('modal-notification-success'), {});
          Modal.show();
        }
        else{
          let Modal = new bootstrap.Modal(document.getElementById('modal-notification-fail'), {});
          Modal.show();

        }
    });

  } else {
    email.classList.remove("is-valid");
    emailInputField.classList.remove("has-success");
    email.classList.add("is-invalid");
    emailInputField.classList.add("has-danger");

    console.log("Invalid email address");
  }
  
  document.getElementById("email").placeholder = email.value;
  document.getElementById("email").value = '';
}


const SaveData = () => {

  var formData = new FormData(document.getElementById("form"));

  return fetch('https://script.google.com/macros/s/AKfycbwqK_NXk3kIJkiKn5w4KGPoyW-m4AGyR18ODHSSbDtd14Isfw3Ea_xH1uNVZY03NQOc/exec', 
      {
    method: 'post',
    body: formData,
    })
    .then((res) => res.json()).then((responseData) => {
      console.log(responseData);
      return responseData;
    })

}