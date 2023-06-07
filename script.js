// EmailJS //
(function () {
  emailjs.init("3dHGHFhvDMh-UJ_fA");
})();
window.onload = function () {
  var btnSend = document.getElementById("btn-send");
  var btnLoad = document.getElementById("btn-load");
  var Asuccess = document.getElementById("a-success");
  var Aerror = document.getElementById("a-error");
  var form = document.getElementById("contact-form"); // Define form variable inside the event listener function
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    btnLoad.classList.toggle("d-none");
    btnSend.classList.toggle("d-none");
    emailjs.sendForm("service_l9suqrm", "template_p43ej3t", this).then(
      function () {
        btnLoad.classList.toggle("d-none");
        btnSend.classList.toggle("d-none");
        Asuccess.classList.toggle("d-none");
        form.reset();
        console.log("SUCCESS!");
      },
      function (error) {
        Aerror.classList.toggle("d-none");
        btnLoad.classList.toggle("d-none");
        btnSend.classList.toggle("d-none");
        form.reset();
        console.log("FAILED...", error);
      }
    );
  });
};
// Email JS End //
