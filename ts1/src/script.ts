function calcula(): void {
    const botao = document.getElementById("pressme") as HTMLButtonElement;
    botao.onclick = function(): void {
        const raio = document.querySelector<HTMLInputElement>('input[name="Raio"]');
        const area = document.querySelector<HTMLInputElement>('input[name="Area"]');
        const circ = document.querySelector<HTMLInputElement>('input[name="Circunferencia"]');

        if (raio && area && circ) {
            if(raio.value === "") {
                alert("Informe o valor do raio!");
                return;
            }else{
            const areaValue = parseFloat(raio.value);
            area.value = (3.14 * (areaValue * areaValue)).toFixed(2);
            circ.value = (2 * 3.14 * areaValue).toFixed(2);
            }
        } else {
            console.log("Erro");
        }
    };
}

calcula();
