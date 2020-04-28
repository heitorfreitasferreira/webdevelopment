/*document.querySelectorAll(".drum").addEventListener("click",handleClicks);

function (){
    alert("Clicou");
}*/

var w = new Audio('sounds/crash.mp3');

var a = new Audio('sounds/kick-bass.mp3');
        
var s = new Audio('sounds/snare.mp3');

var d = new Audio('sounds/tom-1.mp3');
        
var j = new Audio('sounds/tom-2.mp3');
        
var k = new Audio('sounds/tom-3.mp3');
        
var l = new Audio('sounds/tom-4.mp3');

function makeSound(key) {
	switch (key) {
            case "w":
                w.play();
            break;
            
            case "a":
                a.play();
            break;

            case "s":
                s.play();
            break;

            case "d":
                d.play();
            break;

            case "j":
                j.play();
            break;

            case "k":
                k.play();
            break;

            case "l":
                l.play();
            break;
            default: console.log(key);
        }
}

for (let i = 0; i < document.querySelectorAll(".drum").length; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click",function (){
        makeSound(this.innerHTML);
        buttonAnimation(this.innerHTML);
    });
    
}
addEventListener("keydown",function(){
    makeSound(event.key);
    buttonAnimation(event.key);
})

function buttonAnimation(currentKey) {
    var activeButton = document.querySelector("." + currentKey)
    activeButton.classList.add("pressed");
    setTimeout(function(){
        activeButton.classList.remove("pressed");
    },100)
}