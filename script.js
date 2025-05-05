const queryTypeConainer = document.querySelector(".query-type-input-container");
const qError = queryTypeConainer.querySelector("#qerror-msg");
const radioContainers = queryTypeConainer.querySelectorAll(".type-container");

const checkBoxContainer = document.querySelector(".checkbox-container");
const cError = checkBoxContainer.querySelector("#cerror-msg");
const checkBox = checkBoxContainer.querySelector(".checkbox-input");

/**
 * Handling the custom Radio Behaiviour
*/
radioContainers[0].addEventListener("focus", HandleRadioFocus)
radioContainers.forEach(element => {
    const radio = element.querySelector("input");

    element.addEventListener("focus" , ()=>{
        handleRadioInput(radio , element);
    });
    element.addEventListener("click" , ()=>{
        handleRadioInput(radio , element);
    });
})

/**
 * Handling the custom checkBox Behavour 
*/
checkBox.querySelector(".custom-checkbox").addEventListener("focus" , handleCheckFocus);
checkBox.addEventListener("click" , handleInput);


function HandleRadioFocus() {
    let index = 0;

    function handlekeyDown(event) {
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            let nextIndex = (index + 1) % radioContainers.length;
            radioContainers[nextIndex].setAttribute("tabindex", "0");
            radioContainers[index].removeAttribute("tabindex");
            radioContainers[nextIndex].focus();
            index = nextIndex;
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            let prevIndex = (index - 1 + radioContainers.length) % radioContainers.length;
            radioContainers[prevIndex].setAttribute("tabindex", "0");
            radioContainers[index].removeAttribute("tabindex")
            radioContainers[prevIndex].focus();
            index = prevIndex;
        }
    }

    radioContainers.forEach(e=>{
        e.addEventListener("keydown" , handlekeyDown);
    })
}
function handleRadioInput(radio , container){
    radioContainers.forEach(element => {
        element.classList.remove("active");
    })

    radio.checked = true;
    container.classList.add("active");
    queryTypeConainer.classList.remove("error");
    qError.setAttribute("hidden" , true);
}

function handleCheckFocus(){

    checkBox.addEventListener("keydown" , event => {
        if (event.key === "Enter" || event.key === " ") {
            handleInput(event);
        }
    })
}

function handleInput(event){
    event.preventDefault();

    const inputBox = checkBox.querySelector("input");

    inputBox.checked = !inputBox.checked
    checkBox.classList.toggle("active");
    if(inputBox.checked){
        checkBoxContainer.classList.remove("error");
        cError.setAttribute("hidden" , true);
    }else{
        checkBoxContainer.classList.add("error");
        cError.removeAttribute("hidden");
    }
}