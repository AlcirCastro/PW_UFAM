function geraGrafico() {

    const input1 = document.getElementById('altura1').value;
    const input2 = document.getElementById('altura2').value;
    const input3 = document.getElementById('altura3').value;
    const input4 = document.getElementById('altura4').value;
    const input5 = document.getElementById('altura5').value;
    const larguraBarra = document.getElementById('largura').value;

    const alturas = [input1, input2, input3, input4, input5].map(Number);
    const graficoDiv = document.getElementById('grafico');

    graficoDiv.innerHTML = '';

    alturas.forEach(altura => {
        const barra = document.createElement('div');
        barra.className = 'barra';
        barra.style.height = altura + 'px';
        barra.style.width = larguraBarra + 'px';
        graficoDiv.appendChild(barra);
    });
}