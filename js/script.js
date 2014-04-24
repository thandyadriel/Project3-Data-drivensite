$(document).ready(function(){
    var barraW = document.getElementById("barraEx").offsetWidth; //it gets the width of the
    var caminho = "sounds/"; // address of the song in my folder
    var tipo = ".mp3"; //type of the song
    var musicas; //it stores the music list from json
    var i; //it is the index
    var tamanho; // it stores the duration of current music
    var isItPlaying = 0; //it defines what the button play should do
    var waitToGet = 100; //it is a delay to get the total duration of the music because to get this value spend more time


//to get data from json
    $.getJSON("data/data.json",function(data){
        musicas = data.musicas;
    });

//get the music
    var minhaMusica = document.getElementById("myAudio");

    $("#toPlay").click(function(){ //when click
        if(isItPlaying == 0){//first time.. just play starting of the first music
            i = 0;
            executar(musicas);
            isItPlaying = 1;// it is playing
            $("#toPlay").html("Pause");// the button became pause
        }

        else if(isItPlaying == 1){ //it is playing.. so i want to pause it
            minhaMusica.pause();
            isItPlaying = 2;//status paused
            $("#toPlay").html("Play"); //became play again
        }

        else if(isItPlaying == 2){//it is paused
            minhaMusica.play();// continue playing from where you stopped it
            isItPlaying = 1; //it is playing
            $("#toPlay").html("Pause");// the button became pause
        }

        });

    $("#stop").click(function(){
        stopMusic();//it starts from the first music
    });






    function stopMusic(){// stop music
        minhaMusica.load();
        isItPlaying = 0;
        $("#barraIn").css("width","0px");
        $("#toPlay").html("Play");
    }

    function barraStatus(){ //move the status bar
        var barra = ((minhaMusica.currentTime.toFixed(0))*100)/(tamanho/1000);
        barra = (barraW * barra)/100;
        barra = barra.toFixed(0);
        $("#barraIn").css("width",barra);
    }

    function executar(refmusica){
    escreveInfo(refmusica);
        minhaMusica.load();
        minhaMusica.addEventListener("canplay", function(){
            //SomeJavaScriptCode
            console.log("can: "+minhaMusica.duration.toFixed(0));
            tamanho = minhaMusica.duration.toFixed(0);
            tamanho = tamanho*1000;
            escreveTempo();
        });

        minhaMusica.play();

        setInterval(function(){
            var atual = minhaMusica.currentTime.toFixed(0);
            var tam = minhaMusica.duration.toFixed(0);
            console.log("atual: "+atual);
            console.log("duaracao: "+ tam/15);
            if( atual >= tam/10){
                if(i<refmusica.length){
                    i++;
                    executar(refmusica);
                }else{alert("The playlist is over!"); stopMusic();}
            }
            else{}
        }, 1000);
    }

    function escreveTempo(){ //write current and duration time on screen and move the status bar

        $("#totalTime").html(duracaoTime());
        setInterval(function(){
            $("#correnteTime").html(correnteTime());
            barraStatus();
        }, 1000);

    }

    function duracaoTime(){//it formats the number's style of duration time

        var min = 0;
        var seg = 0;
        var dCurrent = minhaMusica.duration.toFixed(0);
            min = dCurrent/60;
            min = parseInt(min);
            seg = dCurrent%60;

        var cMinute = min + ":" + seg;
        return (cMinute);

    }

    function correnteTime(){//it formats the number's style of current time
        var min = 0;
        var seg = 0;
        var Current = minhaMusica.currentTime.toFixed(0);
            min = Current/60;
            min = parseInt(min);
            seg = Current%60;
      var cMinute = min + ":" + seg;
        console.log("Corrente: "+cMinute);
      return (cMinute);

    }

    function escreveInfo(refmusicas){ //it writes author;s name, music's name and music's address
        var vmus = refmusicas;

        $("#nomeMusica").html(vmus[i].nome);
        $("#nomeCantor").html(vmus[i].cantor);
         minhaMusica.src = caminho + vmus[i].caminho + tipo;

    }

});