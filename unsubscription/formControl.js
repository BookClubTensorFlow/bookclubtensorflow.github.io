


const submit = document.getElementById("submit");
submit.addEventListener("click", validate);

function validate(e) {
  e.preventDefault();

  
  const email = document.getElementById("email");
  const emailInputField = document.getElementById("emailInputField");
  const emailVailfiedHint = document.getElementById("emailVailfiedHint");
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  

  console.log(email.value)
  console.log(email.value.indexOf('@')!==-1)

  document.getElementById("requestEmail-success").innerHTML = email.value;
  document.getElementById("requestEmail-fail").innerHTML = email.value;

  
  if (emailRegex.test(email.value)) {
    email.classList.add("is-valid");
    emailInputField.classList.add("has-success");
    email.classList.remove("is-invalid");
    emailInputField.classList.remove("has-danger");
 
    emailVailfiedHint.style.color = '#2dce89';
    emailVailfiedHint.innerHTML = '<span class="spinner-border text-success spinner-border-sm" role="status" aria-hidden="true"></span> 驗證成功，正在提交您的請求';

    
    console.log("Valid email address");
    
    SaveData()
    .then((status) => {
        console.log("data", e)
        email.classList.remove("is-valid");
        emailInputField.classList.remove("has-success");
        email.classList.remove("is-invalid");
        emailInputField.classList.remove("has-danger");
        
        email.innerHTML = '';
        email.placeholder = 'name@example.com';
        emailVailfiedHint.innerHTML = ``;
          
        console.log("Valid email address");

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

    emailVailfiedHint.style.color = '#fb6340';

  
    if (email.value.length===0) {
      emailVailfiedHint.innerHTML = `這是必填欄位`;  
    }
    else  if (email.value.indexOf('@')===-1){
      emailVailfiedHint.innerHTML = `請在電子郵件地址中包含「＠」，「${email.value}」未包含「＠」`;
    }
    else{
      emailVailfiedHint.innerHTML = '請符合要求的格式';
    }
    
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