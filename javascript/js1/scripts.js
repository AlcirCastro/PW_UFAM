function tabuada(){
    document.write("<div style='display: flex; flex-wrap: wrap;'>");
    for( let i = 1; i<=10;i++){
        document.write("<table border = '1' style='margin: 10px;'>")
        document.write("<tr>")
        document.write("<th colspan='2'>Produtos de " + i + "</th>");
        document.write("</tr>")
        for(let j = 1; j<=10; j++){
            document.writeln("<tr>")
            document.writeln("<td style='text-align: center;'>" + i + "x" + j + "</td>");
            document.writeln("<td style='text-align: center;'>" + i*j + "</td>");
            document.writeln("</tr>");
        }
        document.write("</table>");
    }
    document.write("</div>")
}tabuada();
