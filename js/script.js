$(document).ready(function(){
    var barraW = document.getElementById("barraEx").offsetWidth; //it gets the width of the
    var caminho = "music/"; // address of the song in my folder
    var tipo = ".mp3"; //type of the song
    var musicas; //it stores the music list from json
    var i; //it is the index
    var tamanho; // it stores the duration of current music
    var isItPlaying = 0; //it defines what the button play should do
    var waitToGet = 100; //it is a delay to get the total duration of the music because to get this value spend more time
    var correnteArtMusic;
//$(".btnMusicArt").click(function(){
    //   $(".misicasSlide").slideToggle("slow");
    // });


//to get data from json
    $.getJSON("data/listaM.json",function(data){
        musicas = data.music;
        console.log("all data: "+musicas);
    });







showArt();

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













    function showGen(){
        $("#genero").css("backgroundColor", "#696969").css("color", "#fff");
        $("#album, #artista").css("backgroundColor", "transparent").css("color", "#101052");
    }


    function showArt(){
        $("#artista").css("backgroundColor", "#696969").css("color", "#fff");
        $("#album, #genero").css("backgroundColor", "transparent").css("color", "#101052");

        $.getJSON("data/listaM.json",function(data){
            musicas = data.music;
            var arArt = new Array();

            for(var x=0; x < musicas.length; x++){
                var existe=0;
                for (var y=0; y<arArt.length; y++){
                    if(arArt[y] == musicas[x].artist){ existe=1;}
                }
                if(existe == 0){
                    arArt[y] = musicas[x].artist;
                }
            }

            console.log("meuArray "+arArt);
            for(var x=0; x< arArt.length;x++){
                var varPageArt = "" +
                "<div class='pageArt'>"+
                   "<div class='btnPlayArt "+ arArt[x].replace(/\s/g, "") +"'  value = '"+ arArt[x].replace(/\s/g, "") +"'> Play </div>"+
                   "<div class='btnMusicArt "+ arArt[x].replace(/\s/g, "") +"' value = '"+ arArt[x].replace(/\s/g, "") +"'> Music</div>"+
                   "<div class='nomeArt "+ arArt[x].replace(/\s/g, "") +"' value = '"+ arArt[x].replace(/\s/g, "") +"'>"+ arArt[x] +"</div>"+
                   "<div class='musicasSlide "+ arArt[x].replace(/\s/g, "") +"' value = '"+ arArt[x].replace(/\s/g, "") +"'>Musicas"+
                    "<div class='listaMusicasAqui "+ arArt[x].replace(/\s/g, "") +"' value = '"+ arArt[x].replace(/\s/g, "") +"'>";



                for(var j=0; j < musicas.length; j++){
                    if(musicas[j].artist == arArt[x]){
                        var varPageArt = varPageArt +
                            "<div class='itemMusica "+ musicas[j].name.replace(/\s/g, "") +"' value = '"+ musicas[j].name.replace(/\s/g, "") +"'>"+
                                "<div class='playMusic "+ musicas[j].name.replace(/\s/g, "") +"' value = '"+ musicas[j].name.replace(/\s/g, "") +"'> > </div>"+
                                "<div class='addMusic "+ musicas[j].name.replace(/\s/g, "") +"'value = '"+ musicas[j].name.replace(/\s/g, "") +"'> + </div>"+
                                "<div class= 'nomeMusica "+ musicas[j].name.replace(/\s/g, "") +"' value = '"+ musicas[j].name.replace(/\s/g, "") +"'>"+ musicas[j].name+"</div>"+
                                "<div class='generoMusica "+ musicas[j].genre.replace(/\s/g, "") +"' value = '"+ musicas[j].genre.replace(/\s/g, "") +"'> "+musicas[j].genre+" </div>"+
                            "</div>";


                    }

                }

                varPageArt = varPageArt + "</div>"+   "</div>";
                $("#page").append(varPageArt);

            }

            //deve fazer coisas relacioadas ao artis

                $('.pageArt .btnPlayArt, .pageArt .btnMusicArt, .pageArt .nomeArt').unbind().click(function(){
                    var idvalue = $(this).attr('value');
                    var idclass = $(this).attr("class");


                    console.log("value "+idvalue);
                    console.log("class "+idclass);
                    idclass = idclass.replace(" "+idvalue, "");

                    if(idclass == "btnMusicArt"){// show music

                            correnteArtMusic = idvalue;
                            console.log("class "+idvalue);

                        $(".musicasSlide").slideUp("slow");
                        $("."+correnteArtMusic).slideDown("slow");
                        //$("."+correnteArtMusic).slideToggle("slow");

                    }

                   else  if(idclass == "btnPlayArt"){ //play the list
                        alert("play artist'songs:"  + "."+idclass+"."+idvalue);
                        $("."+idclass+"."+idvalue).css("backgroundColor", "#0f0");
                    }

                    else if (idclass == "nomeArt"){ // show artist info
                        $("#listConteudo").html("."+idclass+"."+idvalue);

                    }

                });


            $('.itemMusica div').unbind().click(function(){
                var idvalue = $(this).attr('value');
                var idclass = $(this).attr("class");

                console.log("Musicas value "+idvalue);
                console.log("Musicas class "+idclass);

            })

        });

    }

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
        console.log(vmus[i].name);
        $("#nomeMusica").html(vmus[i].name);
        $("#nomeCantor").html(vmus[i].artist);
         minhaMusica.src = caminho + vmus[i].local + tipo;

    }

});