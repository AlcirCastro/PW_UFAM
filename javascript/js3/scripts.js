class IntegerSet {
    constructor(valorMax) {
        this.valorMax = valorMax;
        this.conjunto = new Array(valorMax + 1).fill(false);
    }

    inserir(valor){
        if(valor >= 0 && valor < this.valorMax){
            this.conjunto[valor] = true;
        }else{
            console.log("Valor fora do intervalo");
        }
    }
    excluir(valor){
        if(this.conjunto.includes(valor)){
            this.conjunto[valor] = false;
        }else{
            console.log("Valor inexistente");
        }
    }
    uniao(outroConjunto){
        const valorMaximo = Math.max(this.conjunto.length,outroConjunto.conjunto.length);

        const uniaoConjunto = new IntegerSet(valorMaximo);

        for(let i = 0; i<uniaoConjunto.conjunto.length;i++){
            if(this.conjunto[i] || outroConjunto.conjunto[i]){
                uniaoConjunto.conjunto[i] = true;
            }
        }
        return uniaoConjunto;
        }

    intersec(outroConjunto){
        const conjuntoIntersec = new IntegerSet(Math.min(this.conjunto.length, outroConjunto.conjunto.length));
        for (let i = 0; i < conjuntoIntersec.conjunto.length; i++) {
            conjuntoIntersec.conjunto[i] = this.conjunto[i] && outroConjunto.conjunto[i];
        }
        return conjuntoIntersec;
    }

    diferenca(outroConjunto){
        const conjuntoDiferenca = new IntegerSet(Math.max(this.conjunto.length, outroConjunto.conjunto.length));
        for (let i = 0; i < conjuntoDiferenca.conjunto.length; i++) {
            conjuntoDiferenca.conjunto[i] = this.conjunto[i] && !outroConjunto.conjunto[i] || !this.conjunto[i] && outroConjunto.conjunto[i];
        }
        return conjuntoDiferenca;
    }

    toString() {
        return '[' + this.conjunto.map((value, index) => value ? index : '').filter(String).join(',') + ']';
    }
}

const conjunto1 = new IntegerSet(10);
const conjunto2 = new IntegerSet(10);
conjunto1.inserir(1);
conjunto1.inserir(2);
conjunto1.inserir(3);
conjunto1.inserir(4);
conjunto1.inserir(5);
conjunto1.inserir(6);

conjunto2.inserir(4);
conjunto2.inserir(5);
conjunto2.inserir(6);
conjunto2.inserir(7);
conjunto2.inserir(8);
conjunto2.inserir(9);

console.log("Conjunto 1:" + " " + conjunto1.toString());
console.log("Conjunto 2:" + " " + conjunto2.toString());

const conjuntoUniao = conjunto1.uniao(conjunto2);
console.log("União:" + " " + conjuntoUniao.toString());

const conjuntoIntersec = conjunto1.intersec(conjunto2);
console.log("Intersecção:" + " " + conjuntoIntersec.toString());

const conjuntoDiferenca = conjunto1.diferenca(conjunto2);
console.log("Diferença:" + " " + conjuntoDiferenca.toString());


