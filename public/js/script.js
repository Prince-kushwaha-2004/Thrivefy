showloginform = () => {
    console.log("hello")
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

function filterCalculators() {
    var input, filter, calculators, i;
    input = document.getElementById('medicinesearch');
    filter = input.value.toUpperCase();
    calculators = document.querySelectorAll('.medicine');

    for (i = 0; i < calculators.length; i++) {
        var calculator = calculators[i];
        var h2 = calculator.querySelector('#medicinename');
        var calculatorName = h2.textContent || h2.innerText;

        if (calculatorName.toUpperCase().indexOf(filter) > -1) {
            calculator.style.display="flex";
        } else {
            calculator.style.display="none";
        }
    }
}