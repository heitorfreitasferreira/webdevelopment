/**
 * Comandos aprendidos até aqui:
 * 
 * 
 * document.getElementBy"ALGUMA COISA(id,class,TagName)"(PARAMETRO)
 * document.querySelector(parametro igual faria pra indentificar o elemento no css)
 * style.coisaQueQuerMudarDoCss
 * classList ->RETORNA UM VETOR COM AS CLASSES DO OBJ
 * classList.add("classeQueSeráAdicionada")
 * classList.remove("classeQueSeráRemovida")
 * classList.toggle("classeQueSeráAdicionadaOuRemovida") -> se já tiver a class vai tirar, se não tiver, adiciona
 * innerHTML -> retorna o HTML dentro do obj, pode receber valores para alterar o conteudo do obj (tem q ser string)
 * textContent = "Texto adicionado"
 * attributes -> retorna os atributos do obj em forma de array
 * getAttribute("atributo") -> retorna um atributo expecifico do obj
 * setAttribute("atributoASerMudado, atributoQueSeraTrocado") -> retorna um atributo expecifico do obj
 * Math.floor(Math.random() * 10);     // returns a random integer from 0 to 9
 */



//INICIO DO CÓDIGO


//ESCOLHENDO O VALOR DO DADO DE 1 A 6 (ok)

var diceOneValue= Math.floor(Math.random() * 6)+1;
var diceTwoValue= Math.floor(Math.random() * 6)+1;

//MUDANDO A MENSAGEM DE VITORIA OU EMPATE (bugado)

if (diceOneValue > diceTwoValue) {
    document.querySelector("h1").innerHTML = "🚩 Play 1 Wins!";
  }
  else if (diceTwoValue > diceOneValue) {
    document.querySelector("h1").innerHTML = "Player 2 Wins! 🚩";
  }
  else {
    document.querySelector("h1").innerHTML = "Draw!";
  }
  

//MUDANDO A IMAGEM DO DADO PARA A CORRESPONDENTE AO VALOR DADO A VARIÁVEL (ok)

if(diceOneValue===1)
{
    document.querySelector("img.img1").setAttribute("src", "images/dice1.png");
}
else if(diceOneValue===2)
{
    document.querySelector("img.img1").setAttribute("src", "images/dice2.png");
}
else if(diceOneValue===3)
{
    document.querySelector("img.img1").setAttribute("src", "images/dice3.png");
}
else if(diceOneValue===4)
{
    document.querySelector("img.img1").setAttribute("src", "images/dice4.png");
}
else if(diceOneValue===5)
{
    document.querySelector("img.img1").setAttribute("src", "images/dice5.png");
}
else if(diceOneValue===6)
{
    document.querySelector("img.img1").setAttribute("src", "images/dice6.png");
}
if(diceTwoValue===1)
{
    document.querySelector("img.img2").setAttribute("src", "images/dice1.png");
}
else if(diceTwoValue===2)
{
    document.querySelector("img.img2").setAttribute("src", "images/dice2.png");
}
else if(diceTwoValue===3)
{
    document.querySelector("img.img2").setAttribute("src", "images/dice3.png");
}
else if(diceTwoValue===4)
{
    document.querySelector("img.img2").setAttribute("src", "images/dice4.png");
}
else if(diceTwoValue===5)
{
    document.querySelector("img.img2").setAttribute("src", "images/dice5.png");
}
else if(diceTwoValue===6)
{
    document.querySelector("img.img2").setAttribute("src", "images/dice6.png");
}
