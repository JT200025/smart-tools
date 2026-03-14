let textarea = document.getElementById("textInput");

textarea.addEventListener("input", function(){
  let text = textarea.value.trim();
  let words = text ? text.split(/\s+/).length : 0;
  let chars = text.length;
  document.getElementById("wordResult").innerText = `Words: ${words} | Characters: ${chars}`;
});