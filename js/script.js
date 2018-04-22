const vetor = [document.getElementsByClassName('hour')[0],document.getElementsByClassName('anthour')[0],document.getElementsByClassName('hour')[1],document.getElementsByClassName('anthour')[1],document.getElementsByClassName('hour')[2],document.getElementsByClassName('anthour')[2],document.getElementsByClassName('hour')[3],document.getElementsByClassName('anthour')[3],document.getElementsByClassName('hour')[4],document.getElementsByClassName('anthour')[4]];
let a=0;
setInterval(function() { 
    a+=1;
    for(i=0;i<vetor.length;i+=2){
        vetor[i].style.transform = "rotate("+(a%369)+"deg)";
        vetor[i+1].style.transform = "rotate(-"+(a%360)+"deg)";        
    }
 }, 60);
 