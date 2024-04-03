showloginform = () => {
    loginform = document.querySelector(".loginform");
    loginform.classList.add("signupformshow")
    close = document.querySelector(".close")
    close.style.display = "block"


}
hideform = () => {
    loginform = document.querySelector(".loginform");
    loginform.classList.remove("signupformshow")
    close = document.querySelector(".close")
    close.style.display = "none"

}


close = document.querySelector(".close")
close.addEventListener("click", hideform)