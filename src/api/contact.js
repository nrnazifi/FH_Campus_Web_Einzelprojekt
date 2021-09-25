require("../api/main");
import { isEmpty } from './utils';

function init() {
    let form = document.getElementById("contactForm");
    form.addEventListener('submit', function (event) {
        if (checkValidity()) {
            addToContactList();
        }

        event.preventDefault();
        event.stopPropagation();
    }, false);
}

function checkValidity() {
    let isValidated = true;
    let forms = document.getElementById("contactForm").querySelectorAll("input");

    forms.forEach(function (input, index, array) {
        if (!validateField(input)) {
            input.closest("div").classList.remove("form-valid");
            input.closest("div").classList.add("form-invalid");
            isValidated = false;
        } else {
            input.closest("div").classList.remove("form-invalid");
            input.closest("div").classList.add("form-valid");
        }
    });

    return isValidated;
}

function validateField(field) {
    let isValid = false;
    let type = field.getAttribute("type")
    let required = field.hasAttribute("required");

    if(field.value === "") {
        if(!required) {
            return true;
        } else {
            return false;
        }
    }

    if(type === "text") {
        let nameRegex = new RegExp(/^[a-z\-]+$/i);
        isValid = nameRegex.test(field.value);
    } else if (type === "email") {
        let emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        isValid = emailRegex.test(field.value);
    } else if (type === "tel") {
        let telRegex = new RegExp(/^[\+]?[0-9]+$/i);
        isValid = telRegex.test(field.value);
    }
    return isValid;
}

function addToContactList() {
    let contactList = document.getElementById("contactList");
    let contactCounter = document.getElementById("contactCounter");


    let fname = document.getElementById("firstName");
    let lname = document.getElementById("lastName");
    let email = document.getElementById("email");
    let tel = document.getElementById("tel");

    let htmlContent = `
        <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
                <h6 class="my-0">`+ (fname.value + " " + lname.value) +`</h6>
                <small class="text-muted">`+ email.value +`</small><br/>
                <small class="text-muted">`+ tel.value +`</small>
            </div>
        </li>
    `;

    contactList.innerHTML += htmlContent;
    contactCounter.innerHTML = contactList.querySelectorAll("li").length;
    resetForm();
}

function resetForm() {
    let forms = document.getElementById("contactForm").querySelectorAll("input");

    forms.forEach(function (input, index, array) {
        input.closest("div").classList.remove("form-valid");
        input.closest("div").classList.remove("form-invalid");
        input.value = "";
    });
}

// run api
init();