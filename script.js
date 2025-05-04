const radioContainers = document.querySelectorAll(".type-container");
const checkBox = document.querySelector(".checkbox-input");


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
}
function handleCheckFocus(){
    const inputBox = checkBox.querySelector("input")

    checkBox.addEventListener("keydown" , event => {
        if (event.key === "Enter" || event.key === " ") {
            inputBox.checked = !inputBox.checked
            checkBox.classList.toggle("active");
        }
    })
}