"use strict";
function calcula() {
    const botao = document.getElementById("pressme");
    console.log("Testando");
    botao.onclick = function () {
        const raio = document.querySelector('input[name="Raio"]');
        const area = document.querySelector('input[name="Area"]');
        const circ = document.querySelector('input[name="Circunferencia"]');
        if (raio && area && circ) {
            if (raio.value === "") {
                alert("Informe o valor do raio!");
                return;
            }
            else {
                const areaValue = parseFloat(raio.value);
                area.value = (3.14 * (areaValue * areaValue)).toFixed(2);
                circ.value = (2 * 3.14 * areaValue).toFixed(2);
            }
        }
        else {
            console.log("Erro");
        }
    };
}
calcula();
