function generatePassword(){
  let length = parseInt(document.getElementById("pwdLength").value);
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  let pwd = "";

  for(let i=0;i<length;i++){
    pwd += chars.charAt(Math.floor(Math.random()*chars.length));
  }

  document.getElementById("passwordOutput").innerText = pwd;
}