
// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
function setViewportHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // Optional: If you want to access window height as JS variable elsewhere
    window.Wh = window.innerHeight;
}

// Initial run
setViewportHeight();

// Update on resize
window.addEventListener('resize', setViewportHeight);


const form = document.querySelector('#form')
const firstNameEl = document.querySelector('#firstName');
const lastNameEl = document.querySelector('#lastName');
const emailEl = document.querySelector('#email');
const msgEl = document.querySelector('#message');
function showSuccessToast() {
    const toast = document.getElementById("successToast");
    toast.classList.remove("hidden");

    setTimeout(() => {
        toast.classList.add("show");
    }, 10);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
            toast.classList.add("hidden");
        }, 400);
    }, 4000);
}

function clearErrorOnInput(inputId, errorSelector) {
    const input = document.getElementById(inputId);
    input.addEventListener("input", () => {
        input.classList.remove("border-red")
        document.querySelector(errorSelector).style.display = "none";
    });
}

// Hide radio button error when any selected
function clearRadioErrorOnChange(name, errorSelector) {
    const radios = document.querySelectorAll(`input[name='${name}']`);
    radios.forEach(radio => {
        radio.addEventListener("change", () => {
            document.querySelector(errorSelector).style.display = "none";
        });
    });
}

// Hide checkbox error on change
function clearCheckboxErrorOnChange(checkboxId, errorSelector) {
    const checkbox = document.getElementById(checkboxId);
    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            document.querySelector(errorSelector).style.display = "none";
        }
    });
}
function onSubmitForm(e) {
    e.preventDefault()
    const firstName = firstNameEl.value.trim();
    const lastName = lastNameEl.value.trim();
    const email = emailEl.value.trim();
    const msg = msgEl.value.trim();
    const queryTypeEnquiry = document.getElementById("enquiry").checked;
    const queryTypeSupport = document.getElementById("support").checked;
    const consent = document.querySelector("#consent").checked;
    let isValid = true;

    if (!firstName) {
        document.querySelector("#firstName + .error").style.display = "block";
        document.querySelector("#firstName").classList.add("border-red");
        isValid = false;
    }
    if (!lastName) {
        document.querySelector("#lastName + .error").style.display = "block";
        document.querySelector("#lastName").classList.add("border-red");
        isValid = false;
    }
    if (!email) {
        document.querySelector("#email + .error").textContent = "This field is required";
        document.querySelector("#email + .error").style.display = "block";
        document.querySelector("#email").classList.add("border-red");
        isValid = false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.querySelector("#email + .error").textContent = "Please enter a valid email address";
        document.querySelector("#email + .error").style.display = "block";
        document.querySelector("#email").classList.add("border-red");
        isValid = false;
    }
    if (!msg) {
        document.querySelector("#message + .error").style.display = "block";
        document.querySelector("#message").classList.add("border-red");
        isValid = false;
    }
    if (!queryTypeEnquiry && !queryTypeSupport) {
        document.querySelector("#enquiry + label + .error ").style.display = "block";
        isValid = false;
    }
    if (!consent) {
        document.querySelector('#consent + label + .error ').style.display = "block";
        isValid = false;
    }
    if (!isValid) return;

    const formData = {
        firstName,
        lastName,
        email,
        queryType: queryTypeEnquiry ? "General Enquiry" : "Support Request",
        msg,
        consent,
    }
    console.log(formData)
    const errorSpans = document.querySelectorAll(".error");
    errorSpans.forEach(span => span.style.display = "none");
    const errorInput = document.querySelectorAll(".border-red");
    errorInput.forEach(errorBorder => errorBorder.classList.remove("border-red"));
    showSuccessToast();
    document.getElementById("form").reset();
}

//  error removal handlers

clearErrorOnInput("firstName", "#firstName + .error");
clearErrorOnInput("lastName", "#lastName + .error");
const emailInput = document.getElementById("email");
emailInput.addEventListener("input", () => {
    const email = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailPattern.test(email)) {
        document.querySelector("#email + .error").style.display = "none";
        document.querySelector("#email").classList.remove("border-red")
    } else {
        document.querySelector("#email + .error").style.display = "block";
        document.querySelector("#email").classList.add("border-red")
    }
});
clearErrorOnInput("message", "#message + .error");
clearRadioErrorOnChange("query", "input[name='query'] + label + .error");
clearCheckboxErrorOnChange("consent", "#consent + label + .error");

form.addEventListener("submit", onSubmitForm)
