// Enquiry form on the Contact page.
// You do not need to edit this file.
//
// 1. Checks the required fields and points to the first one that is missing.
// 2. With Formspree set up, sends the message without leaving the page.
// 3. Without Formspree, opens the visitor's email app with the message filled in.
// 4. A link like /contact/?type=invitation picks the matching topic.

(function () {
  "use strict";

  var form = document.getElementById("enquiry-form");
  if (!form) return;

  var status = document.getElementById("enq-status");
  var type = document.getElementById("enq-type");
  var subject = document.getElementById("enq-subject");
  var button = form.querySelector('button[type="submit"]');

  // Pick the topic from the web address, e.g. ?type=audit
  var wanted = new URLSearchParams(location.search).get("type");
  if (wanted && type.querySelector('option[value="' + wanted + '"]')) type.value = wanted;

  function say(text, kind) {
    status.textContent = text;
    status.className = "form-status" + (kind ? " is-" + kind : "");
  }

  function value(name) {
    var el = form.elements[name];
    return el ? el.value.trim() : "";
  }

  function typeLabel() {
    return type.value ? type.options[type.selectedIndex].text : "Website enquiry";
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Required fields, in the order they appear
    var required = Array.prototype.filter.call(form.elements, function (el) { return el.required; });
    var missing = null;
    required.forEach(function (el) {
      var bad = !el.value.trim() || (el.type === "email" && !el.checkValidity());
      el.setAttribute("aria-invalid", bad ? "true" : "false");
      if (bad && !missing) missing = el;
    });
    if (missing) {
      var label = form.querySelector('label[for="' + missing.id + '"]');
      var name = label ? label.firstChild.textContent.trim().toLowerCase() : "this field";
      say(missing.type === "email" && missing.value.trim()
        ? "Check your email address."
        : "Please fill in " + name + ".", "error");
      missing.focus();
      return;
    }

    subject.value = typeLabel() + " from " + value("name");

    // No Formspree yet: hand the message to the visitor's email app
    var mailto = form.getAttribute("data-mailto");
    if (mailto) {
      var body = [
        value("message"),
        "",
        "Name: " + value("name"),
        "Email: " + value("email"),
        value("organisation") ? "Organisation: " + value("organisation") : "",
        value("date") ? "Date or deadline: " + value("date") : ""
      ].filter(function (line, i) { return i < 4 || line; }).join("\n");
      location.href = "mailto:" + mailto +
        "?subject=" + encodeURIComponent(subject.value) +
        "&body=" + encodeURIComponent(body);
      say("Your email app should open with the message ready. If it doesn't, write to " + mailto + ".");
      return;
    }

    // Formspree: send in the background and stay on the page
    button.disabled = true;
    say("Sending…");
    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    }).then(function (response) {
      if (!response.ok) throw new Error("status " + response.status);
      form.reset();
      say("Thank you. Your message has been sent, and I will reply by email.", "ok");
    }).catch(function () {
      say("The message could not be sent. Please try again, or email me directly.", "error");
    }).then(function () {
      button.disabled = false;
    });
  });
})();
