"use strict";
var createTableForm = document.getElementById("createTableForm");

createTableForm.addEventListener("submit", function (e) {
  e.preventDefault();
  var formData = new FormData(createTableForm);
  console.log('formData');
    fetch('/admin/table', {
      method: 'POST',
      headers: {
        'Accept': 'multipart/form-data',
        'X-CSRF-TOKEN': document.head.querySelector("[name~=csrf-token][content]").content
      },
      body: formData
    })
      .then(response => response.json())
      .then(result => alert(JSON.stringify(result, null, 2)))
});
