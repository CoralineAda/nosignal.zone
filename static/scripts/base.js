'use strict';
const form = document.getElementsByTagName('form')[0];
if (form) {
  form.addEventListener('submit', (e) => {
    this.formDidSubmit(e);
    e.preventDefault();
  });
}
function formDidSubmit(event) {
  const formData = new FormData(event.target);
  fetch(event.target.action, {
    method: 'POST',
    body: formData
  }).then((res) => {
    if (!res.ok) throw new Error(`There was an error submitting the form. (${res.status})`);
    return res.text();
  }).then(() => {
    document.getElementsByTagName('form')[0].style.display = "none"
    document.getElementsByName('instructions')[0].style.display = "none"
    document.getElementsByName('thanks')[0].style.display = "block"
  }, (err) => {
    console.error(`Oh no, something went wrong: ${err}`);
  });
};
