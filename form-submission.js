const form = document.querySelector("form");
const inputContainers = document.querySelectorAll(".input-container");
const emailField = document.querySelector(".email-container");
const EmailError = emailField.querySelector("#eerror-msg");


/**
 * Handling the form Submission
*/
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    data["query-type"] = data["query-type"] || ""; // ensuring the radio input
    data["check"] = data["check"] || ""; // ensuring the check input

    /**
     * validaing the data 
    */
    let all = validateData(data);
    if (!all) {
        return;
    }

    let validEmail = validateEmail(data.email);
    if (!validEmail) {
        addEmailError()
    }

    PopUpToastMessage();
    ResetAllFields();
})

/**
 * If the change occur then remove the errors 
*/
inputContainers.forEach(inputContainer => {
    HandleChange(inputContainer)
});
function HandleChange(inputContainer) {
    const input = inputContainer.querySelector("input") || inputContainer.querySelector("textarea");
    let span = inputContainer.lastElementChild;

    if (input.type == "text" || input.type == "email" || input.tagName.toLowerCase() == "textarea") {
        input.addEventListener("input", () => {

            if(!input.value){
                inputContainer.classList.add("error");
                span.removeAttribute("hidden");
                return;
            }

            if(input.type=="email" && !validateEmail(input.value)){
                addEmailError();
                return;
            }

            inputContainer.classList.remove("error");
            span.setAttribute("hidden" , true)

        })
    }

    // removal of error state from the checkbox and the radio btns is done in their input handling.
}

/**
 * Utility Method 
*/
function validateData(data) {

    let allPresent = true

    /** Display error Message for all missing inputs */
    for (let key in data) {
        if (!data[key]) {
            addError(key);
            allPresent = false
        }
    }

    return allPresent;
}
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email);
}
function addError(fieldName) {
    inputContainers.forEach(container => {
        let input = container.querySelector("input") || container.querySelector("textarea");
        if (input.name === fieldName) {
            let span = container.lastElementChild;

            container.classList.add("error");
            span.removeAttribute("hidden");
        }
    })
}
function addEmailError(){
    emailField.classList.add("error");
    EmailError.innerHTML = "Please Enter a Valid Email."
    EmailError.removeAttribute("hidden");
}
function ResetAllFields(){
    form.reset();

    const checkBox = document.querySelector(".checkbox-input");
    const radioContainers = queryTypeConainer.querySelectorAll(".type-container");

    const checkBoxInput = checkBox.querySelector("input");
    checkBox.classList.remove("active");

    radioContainers.forEach(container=>{
        container.classList.remove("active");
    })
}
function PopUpToastMessage(){
    const toast = document.querySelector(".toast-message");

    toast.classList.add("active");

    setTimeout(()=>{
        toast.classList.remove("active");
    } , 1000)
}