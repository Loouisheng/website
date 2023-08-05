let calculation = localStorage.getItem('calculation')||'';

        displayResult();

        function updateCalculation(number){
            calculation+=number;
            displayResult();
            localStorage.setItem=('calculation',calculation);

        }
        function displayResult(){
            document.querySelector('.result').innerHTML = calculation;
        }