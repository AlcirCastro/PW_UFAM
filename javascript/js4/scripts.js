function calcula(){
    const botao = document.getElementById("pressme");
    botao.onclick = function(){
        let area = document.myForm.Raio.value
        document.myForm.Area.value = 3.14*(area*area)
        document.myForm.Circunferencia.value = 2*3.14*(area)   
    }
}calcula();