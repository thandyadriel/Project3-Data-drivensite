$(document).ready(function(){
    var barraW = document.getElementById("barraEx").offsetWidth; //it gets the width of the
    var caminho = "music/"; // address of the song in my folder
    var tipo = ".mp3"; //type of the song
    var musicas; //it stores the music list from json
    var index = 0; //it is the index
    var tamanho; // it stores the duration of current music
    var isItPlaying = 0; //it defines what the button play should do
    var playingNow = new Array();
    var ocupado = 0;
    var biografia;
    var setCu;
    var setDu;
    var loading;

//$(".btnMusicArt").click(function(){
    //   $(".misicasSlide").slideToggle("slow");
    // });


//to get data from json
    $.getJSON("data/listaM.json",function(data){
       musicas = data.music;
       // playingNow = musicas;
        //console.log(musicas);
    //    escreveLista();
    });








showArt();

//get the music
   var minhaMusica = document.getElementById("myAudio");

    $("#playingNow").unbind().click(function(){
       escreveLista();
    });

    $("#CurrentArt").unbind().click(function(){
        showArtist();
    });

   $("#toPlay").unbind().click(function(){

        if(isItPlaying == 0){//first time.. just play starting of the first music
            index = 0;

            executar(playingNow);
            escreveLista();


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

    $("#stop").unbind().click(function(){
            console.log(" lista e I");
            console.log(playingNow);
            console.log(index);
        stopMusic();//it starts from the first music
    });

    $("#artista").unbind().click(function(){
        showArt();
    })

    $("#genero").unbind().click(function(){
        showGen();
    })

    $("#album").unbind().click(function(){
        showAlb();
    })

    $("#btnPesquisa").unbind().click(function(){
        $("#resultado").css("backgroundColor", "#696969").css("color", "#fff");
        $("#album, #genero, #artista").css("backgroundColor", "transparent").css("color", "#101052");

        var consulta = $("#getTexto").val();
        var consulta = consulta.toLowerCase();
        var resultS =0;
        var resultString;
        console.log(consulta);

        $("#page").html("");

        for(var j= 0; j<musicas.length; j++){
            var strN = musicas[j].name;
            var strC = musicas[j].artist;
            var strG = musicas[j].genre;
            var strA = musicas[j].album;

            strN = strN.toLowerCase();
            strC = strC.toLowerCase();
            strG = strG.toLowerCase();
            strA = strA.toLowerCase();


            strN = strN.search(consulta);
            strC = strC.search(consulta);
            strG = strG.search(consulta);
            strA = strA.search(consulta);

            if(strA != -1 || strG != -1 || strC != -1 || strN != -1){
                resultString = "<div class='itemResult "+ musicas[j].name.replace(/\s/g, "") +"' value = '"+ musicas[j].name.replace(/\s/g, "") +"'>"+
                    "<div class='playMusic "+ musicas[j].name.replace(/\s/g, "") +"' value = '"+ musicas[j].name.replace(/\s/g, "") +"'> > </div>"+
                    "<div class='addMusic "+ musicas[j].name.replace(/\s/g, "") +"'value = '"+ musicas[j].name.replace(/\s/g, "") +"'> + </div>"+
                    "<div class= 'nomeMusica "+ musicas[j].name.replace(/\s/g, "") +"' value = '"+ musicas[j].name.replace(/\s/g, "") +"'>"+ musicas[j].name+"</div>"+
                    "<div class='albumMusica "+ musicas[j].album.replace(/\s/g, "") +"' value = '"+ musicas[j].album.replace(/\s/g, "") +"'> "+musicas[j].album+" </div>"+
                    "<div class='generoMusica "+ musicas[j].genre.replace(/\s/g, "") +"' value = '"+ musicas[j].genre.replace(/\s/g, "") +"'> "+musicas[j].artist+" </div>"+
                    "</div>";

                console.log(musicas[j].name);
                $("#page").append(resultString);
            }
        }




        $('.itemResult div').click(function(){
            var idvalue = $(this).attr('value');
            var idclass = $(this).attr("class");

            console.log("Musicas value "+idvalue);
            console.log("Musicas class "+idclass);
            idclass = idclass.replace(" "+idvalue, "");

//ADICIONAR MUSICA A LISTA

            if (idclass == "addMusic"){
                var size = playingNow.length;

                console.log("playlist notmal: ");
                console.log(playingNow);

                for(var j=0; j < musicas.length; j++){
                    if(musicas[j].name.replace(/\s/g, "") == idvalue){
                        playingNow[size] = musicas[j];
                    }
                }
                console.log("depois de add>");
                console.log(playingNow);

                var escreve =  "<div class='agora "+ playingNow[size].local +"'>"+
                    "<div class= 'nomeAgora'> "+ playingNow[size].name +" </div>"+
                    "<div class='albumAgora'> "+ playingNow[size].album +" </div>"+
                    "<div class='autorAgora'> "+ playingNow[size].artist +" </div>"+
                    "</div>";
                $("#tocandoPage").append(escreve);

            }


//TOCAR UMA NOVA MUSICA

            else if (idclass == "playMusic"){
                index = 0;
                playingNow.length = 1;
                console.log("playlist notmal: ");
                console.log(playingNow);

                for(var j=0; j < musicas.length; j++){
                    if(musicas[j].name.replace(/\s/g, "") == idvalue){
                        playingNow[0] = musicas[j];
                    }
                }
                ocupado = 0;
                executar(playingNow);
                escreveLista();
                //showPlaylist();
            }
        })










    });


 //FUNCAO RELACIONADA AOS ALBUMS
    function showAlb(){
        $("#page").html("");
        $("#album").css("backgroundColor", "#696969").css("color", "#fff");
        $("#artista, #genero, #resultado").css("backgroundColor", "transparent").css("color", "#101052");

        $.getJSON("data/listaM.json",function(data){
            musicas = data.music;

            var arArt = new Array();
            var genero;
            var varPageArt;

            for(var x=0; x < musicas.length; x++){
                var existe=0;
                for (var y=0; y<arArt.length; y++){
                    if(arArt[y] == musicas[x].album){ existe=1;}
                }
                if(existe == 0){
                    arArt[y] = musicas[x].album;

                }
            }
           // console.log("meuArray "+arArt);


// CRIA MENU SANFONA ARTISTA

//CRIA LISTA DE ARTISTAS
            for(var x=0; x< arArt.length;x++){
                varPageArt = "<div class='pageArt'>"+
                        "<div class='btnPlayArt "+ arArt[x].replace(/\s/g, "") +"'  value = '"+ arArt[x].replace(/\s/g, "") +"'> Play </div>"+
                        "<div class='btnMusicArt "+ arArt[x].replace(/\s/g, "") +"' value = '"+ arArt[x].replace(/\s/g, "") +"'> M</div>"+
                        "<div class='btnGenreArt "+ arArt[x].replace(/\s/g, "") +"' value = '"+ arArt[x].replace(/\s/g, "") +"'> G</div>"+
                        "<div class='nomeArt "+ arArt[x].replace(/\s/g, "") +"' value = '"+ arArt[x].replace(/\s/g, "") +"'>"+ arArt[x] +"</div>"+
           "<div class='musicasSlide "+ arArt[x].replace(/\s/g, "") +"' value = '"+ arArt[x].replace(/\s/g, "") +"'> Musics <div class='listaMusicasAqui'>";



//CRIA LISTA DE MUSICAS
                for(var j=0; j < musicas.length; j++){
                    if(musicas[j].album == arArt[x]){
                        genero = musicas[j].genre;
                         varPageArt = varPageArt +"<div class='itemMusica "+musicas[j].name.replace(/\s/g, "")+"' value = '"+ musicas[j].name.replace(/\s/g, "") +"'>"+
                            "<div class='playMusic "+ musicas[j].name.replace(/\s/g, "") +"' value = '"+ musicas[j].name.replace(/\s/g, "") +"'> > </div>"+
                            "<div class='addMusic "+ musicas[j].name.replace(/\s/g, "") +"'value = '"+ musicas[j].name.replace(/\s/g, "") +"'> + </div>"+
                            "<div class= 'nomeMusica "+ musicas[j].name.replace(/\s/g, "") +"' value = '"+ musicas[j].name.replace(/\s/g, "") +"'>"+ musicas[j].name+"</div>"+
                            "<div class='albumMusica "+ musicas[j].album.replace(/\s/g, "") +"' value = '"+ musicas[j].album.replace(/\s/g, "") +"'> "+musicas[j].artist+" </div>"+
                            "<div class='generoMusica "+ musicas[j].genre.replace(/\s/g, "") +"' value = '"+ musicas[j].genre.replace(/\s/g, "") +"'> "+musicas[j].genre+" </div>"+
                       "</div>";


                    }

                }





         varPageArt = varPageArt +"</div></div><div class='genreSlide "+ arArt[x].replace(/\s/g, "") +"' value = '"+ arArt[x].replace(/\s/g, "") +"'>"+ genero +"<div class='listaGenreAqui'>";


//CRIA LISTA DE GENRE
                for(var j=0; j < musicas.length; j++){
                    if(musicas[j].genre == genero){
                        varPageArt = varPageArt +
                           "<div class='itemMusica "+ musicas[j].name.replace(/\s/g, "") +"' value = '"+ musicas[j].name.replace(/\s/g, "") +"'>"+
                                "<div class='playMusic "+ musicas[j].name.replace(/\s/g, "") +"' value = '"+ musicas[j].name.replace(/\s/g, "") +"'> > </div>"+
                                "<div class='addMusic "+ musicas[j].name.replace(/\s/g, "") +"'value = '"+ musicas[j].name.replace(/\s/g, "") +"'> + </div>"+
                                "<div class= 'nomeMusica "+ musicas[j].name.replace(/\s/g, "") +"' value = '"+ musicas[j].name.replace(/\s/g, "") +"'>"+ musicas[j].name+"</div>"+
                                "<div class='albumMusica "+ musicas[j].album.replace(/\s/g, "") +"' value = '"+ musicas[j].album.replace(/\s/g, "") +"'> "+musicas[j].album+" </div>"+
                                "<div class='generoMusica "+ musicas[j].genre.replace(/\s/g, "") +"' value = '"+ musicas[j].genre.replace(/\s/g, "") +"'> "+musicas[j].artist+" </div>"+
                            "</div>";


                    }

                }





                varPageArt = varPageArt + "</div></div></div>";
                $("#page").append(varPageArt);

            }

//FAZER COISAS RELACIONADAS AOS ARTISTAS

            $('.pageArt .btnPlayArt, .pageArt .btnMusicArt, .pageArt .nomeArt, .btnGenreArt').click(function(){
                var idvalue = $(this).attr('value');
                var idclass = $(this).attr("class");



               // console.log("class "+idclass);
               // console.log("value "+idvalue);
                idclass = idclass.replace(" "+idvalue, "");
               // console.log("thandy: "+idclass)

//MOSTRA  E OCULTA MUSICAS DO ARTISTA

                if(idclass == "btnMusicArt"){// show music
                    var correnteArtMusic;
                    correnteArtMusic = idvalue;
                    //console.log("class "+idvalue);

                    $(".musicasSlide, .genreSlide").slideUp("slow");
                    $(".musicasSlide."+correnteArtMusic).slideDown("slow");

                    //console.log("o que esta sendo mostrado: "+correnteArtMusic);
                    //$("."+correnteArtMusic).slideToggle("slow");

                }



//MOSTRA  E OCULTA genero DO ARTISTA

                if(idclass == "btnGenreArt"){// show genre
                    var correnteArtMusic;
                    correnteArtMusic = idvalue;
                    //console.log("class "+idvalue);

                    $(".musicasSlide, .genreSlide").slideUp("slow");
                    $(".genreSlide."+correnteArtMusic).slideDown("slow");
                    //$("."+correnteArtMusic).slideToggle("slow");

                }




// TOCA TODAS AS MUSICAS DO ARTISTA QUE FOR CLICADO

                else  if(idclass == "btnPlayArt"){ //play the list
                    index = 0;

                    var posicao = -1;
                    var currentPlaylist = new Array();
                    for(var j=0; j < musicas.length; j++){
                        if(musicas[j].album.replace(/\s/g, "") == idvalue){
                            //currentPlaylist.push(musicas[j]);
                            posicao++;
                            currentPlaylist[posicao] = musicas[j];
                        }
                    }
                   // console.log("lista de repro: before>");
                    console.log(currentPlaylist);
                    playingNow.splice(0,playingNow.length);
                    // playingNow = new Array();
                    //playingNow.length = 1;
                    playingNow.length = currentPlaylist.length;
                    playingNow = currentPlaylist;
                   // console.log("lista de repro: after>");
                   // console.log(playingNow);
                    ocupado = 0;
                    executar(playingNow);
                    escreveLista();


                    // alert("play artist'songs:"  + "."+idclass+"."+idvalue);
                    //$("."+idclass+"."+idvalue).css("backgroundColor", "#0f0");
                }

// MOSTRA A BIOGRAFIA DO ARTISTA CLICADO

                else if (idclass == "nomeArt"){ // show artist info

                    for(var i = 0; i<biografia.length; i++){

                        if (biografia[i].artist.replace(/\s/g, "") == idvalue){

                            var varPageArt = "<div class = 'biogragiaArt'>"+
                                "<div class='photoArt'></div> <div class='bioNameArt'> "+ biografia[i].artist +" </div>"+
                                "<div class='bioTexto'> "+ biografia[i].texto +" </div>"+
                                "</div>";

                            showArtist();
                            $("#artistPage").html(varPageArt);
                            $(".photoArt").css("background-image", "url('photo/"+ biografia[i].picture +"')");
                            //console.log(biografia[i].picture);

                        }
                    }
                }

// ADICIONA UMA UNICA MUSICA DO ARTISTA PARA A PLAYLIST




            });


//FAZER COISAS RELACIONADAS AS MUSICAS

            $('.itemMusica div').click(function(){
                var idvalue = $(this).attr('value');
                var idclass = $(this).attr("class");

                console.log("Musicas value "+idvalue);
                console.log("Musicas class "+idclass);
                idclass = idclass.replace(" "+idvalue, "");

//ADICIONAR MUSICA A LISTA

                if (idclass == "addMusic"){
                    var size = playingNow.length;

                    console.log("playlist notmal: ");
                    console.log(playingNow);

                    for(var j=0; j < musicas.length; j++){
                        if(musicas[j].name.replace(/\s/g, "") == idvalue){
                            playingNow[size] = musicas[j];
                        }
                    }
                    console.log("depois de add>");
                    console.log(playingNow);

                    var escreve =  "<div class='agora "+ playingNow[size].local +"'>"+
                        "<div class= 'nomeAgora'> "+ playingNow[size].name +" </div>"+
                        "<div class='albumAgora'> "+ playingNow[size].album +" </div>"+
                        "<div class='autorAgora'> "+ playingNow[size].artist +" </div>"+
                        "</div>";
                    $("#tocandoPage").append(escreve);

                }


//TOCAR UMA NOVA MUSICA

                else if (idclass == "playMusic"){
                    index = 0;
                    playingNow.length = 1;
                    console.log("playlist notmal: ");
                    console.log(playingNow);

                    for(var j=0; j < musicas.length; j++){
                        if(musicas[j].name.replace(/\s/g, "") == idvalue){
                            playingNow[0] = musicas[j];
                        }
                    }
                    ocupado = 0;
                    executar(playingNow);
                    escreveLista();
                    //showPlaylist();
                }
            })

        });

    }

//FUNCAO RELACIONADA AOS GENEROS
    function showGen(){
        $("#page").html("");
        $("#genero").css("backgroundColor", "#696969").css("color", "#fff");
        $("#album, #artista, #resultado").css("backgroundColor", "transparent").css("color", "#101052");

        $.getJSON("data/listaM.json",function(data){
            musicas = data.music;

            var arArt = new Array();

            for(var x=0; x < musicas.length; x++){
                var existe=0;
                for (var y=0; y<arArt.length; y++){
                    if(arArt[y] == musicas[x].genre){ existe=1;}
                }
                if(existe == 0){
                    arArt[y] = musicas[x].genre;

                }
            }
            //console.log("meuArray "+arArt);


// CRIA MENU SANFONA ARTISTA

//CRIA LISTA DE ARTISTAS
            for(var x=0; x< arArt.length;x++){
                var varPageArt = "" +
                    "<div class='pageArt'>"+
                    "<div class='btnPlayArt "+ arArt[x].replace(/\s/g, "") +"'  value = '"+ arArt[x].replace(/\s/g, "") +"'> Play </div>"+
                    "<div class='btnMusicArt "+ arArt[x].replace(/\s/g, "") +"' value = '"+ arArt[x].replace(/\s/g, "") +"'> Music</div>"+
                    "<div class='nomeArt "+ arArt[x].replace(/\s/g, "") +"' value = '"+ arArt[x].replace(/\s/g, "") +"'>"+ arArt[x] +"</div>"+
                    "<div class='musicasSlide "+ arArt[x].replace(/\s/g, "") +"' value = '"+ arArt[x].replace(/\s/g, "") +"'>Musicas"+
                    "<div class='listaMusicasAqui "+ arArt[x].replace(/\s/g, "") +"' value = '"+ arArt[x].replace(/\s/g, "") +"'>";


//CRIA LISTA DE MUSICAS
                for(var j=0; j < musicas.length; j++){
                    if(musicas[j].genre == arArt[x]){
                        var varPageArt = varPageArt +
                            "<div class='itemMusica "+ musicas[j].name.replace(/\s/g, "") +"' value = '"+ musicas[j].name.replace(/\s/g, "") +"'>"+
                            "<div class='playMusic "+ musicas[j].name.replace(/\s/g, "") +"' value = '"+ musicas[j].name.replace(/\s/g, "") +"'> > </div>"+
                            "<div class='addMusic "+ musicas[j].name.replace(/\s/g, "") +"'value = '"+ musicas[j].name.replace(/\s/g, "") +"'> + </div>"+
                            "<div class= 'nomeMusica "+ musicas[j].name.replace(/\s/g, "") +"' value = '"+ musicas[j].name.replace(/\s/g, "") +"'>"+ musicas[j].name+"</div>"+
                            "<div class='albumMusica "+ musicas[j].album.replace(/\s/g, "") +"' value = '"+ musicas[j].album.replace(/\s/g, "") +"'> "+musicas[j].album+" </div>"+
                            "<div class='generoMusica "+ musicas[j].genre.replace(/\s/g, "") +"' value = '"+ musicas[j].genre.replace(/\s/g, "") +"'> "+musicas[j].artist+" </div>"+
                            "</div>";


                    }

                }

                varPageArt = varPageArt + "</div>"+   "</div>";
                $("#page").append(varPageArt);

            }

//FAZER COISAS RELACIONADAS AOS ARTISTAS

            $('.pageArt .btnPlayArt, .pageArt .btnMusicArt, .pageArt .nomeArt').click(function(){
                var idvalue = $(this).attr('value');
                var idclass = $(this).attr("class");



                //console.log("class "+idclass);
                //console.log("value "+idvalue);
                idclass = idclass.replace(" "+idvalue, "");
               // console.log("thandy: "+idclass)

//MOSTRA  E OCULTA MUSICAS DO ARTISTA

                if(idclass == "btnMusicArt"){// show music
                    var correnteArtMusic;
                    correnteArtMusic = idvalue;
                   // console.log("class "+idvalue);

                    $(".musicasSlide").slideUp("slow");
                    $("."+correnteArtMusic).slideDown("slow");
                    //$("."+correnteArtMusic).slideToggle("slow");

                }

// TOCA TODAS AS MUSICAS DO ARTISTA QUE FOR CLICADO

                else  if(idclass == "btnPlayArt"){ //play the list
                    index = 0;

                    var posicao = -1;
                    var currentPlaylist = new Array();
                    for(var j=0; j < musicas.length; j++){
                        if(musicas[j].genre.replace(/\s/g, "") == idvalue){
                            //currentPlaylist.push(musicas[j]);
                            posicao++;
                            currentPlaylist[posicao] = musicas[j];
                        }
                    }
                   // console.log("lista de repro: before>");
                   // console.log(playingNow);
                    playingNow.splice(0,playingNow.length);
                    // playingNow = new Array();
                    //playingNow.length = 1;
                    playingNow.length = currentPlaylist.length;
                    playingNow = currentPlaylist;
                   // console.log("lista de repro: after>");
                  //  console.log(playingNow);
                    ocupado = 0;
                    executar(playingNow);
                    escreveLista();


                    // alert("play artist'songs:"  + "."+idclass+"."+idvalue);
                    //$("."+idclass+"."+idvalue).css("backgroundColor", "#0f0");
                }

// MOSTRA A BIOGRAFIA DO ARTISTA CLICADO

                else if (idclass == "nomeArt"){ // show artist info

                    for(var i = 0; i<biografia.length; i++){

                        if (biografia[i].artist.replace(/\s/g, "") == idvalue){

                            var varPageArt = "<div class = 'biogragiaArt'>"+
                                "<div class='photoArt'></div> <div class='bioNameArt'> "+ biografia[i].artist +" </div>"+
                                "<div class='bioTexto'> "+ biografia[i].texto +" </div>"+
                                "</div>";

                            showArtist();
                            $("#artistPage").html(varPageArt);
                            $(".photoArt").css("background-image", "url('photo/"+ biografia[i].picture +"')");
                           // console.log(biografia[i].picture);

                        }
                    }
                }

// ADICIONA UMA UNICA MUSICA DO ARTISTA PARA A PLAYLIST




            });


//FAZER COISAS RELACIONADAS AS MUSICAS

            $('.itemMusica div').click(function(){
                var idvalue = $(this).attr('value');
                var idclass = $(this).attr("class");

              //  console.log("Musicas value "+idvalue);
                //console.log("Musicas class "+idclass);
                idclass = idclass.replace(" "+idvalue, "");

//ADICIONAR MUSICA A LISTA

                if (idclass == "addMusic"){
                    var size = playingNow.length;

                  //  console.log("playlist notmal: ");
                    //console.log(playingNow);

                    for(var j=0; j < musicas.length; j++){
                        if(musicas[j].name.replace(/\s/g, "") == idvalue){
                            playingNow[size] = musicas[j];
                        }
                    }
                   // console.log("depois de add>");
                   // console.log(playingNow);

                    var escreve =  "<div class='agora "+ playingNow[size].local +"'>"+
                        "<div class= 'nomeAgora'> "+ playingNow[size].name +" </div>"+
                        "<div class='albumAgora'> "+ playingNow[size].album +" </div>"+
                        "<div class='autorAgora'> "+ playingNow[size].artist +" </div>"+
                        "</div>";
                    $("#tocandoPage").append(escreve);

                }


//TOCAR UMA NOVA MUSICA

                else if (idclass == "playMusic"){
                    index = 0;
                    playingNow.length = 1;
                    //console.log("playlist notmal: ");
                    //console.log(playingNow);

                    for(var j=0; j < musicas.length; j++){
                        if(musicas[j].name.replace(/\s/g, "") == idvalue){
                            playingNow[0] = musicas[j];
                        }
                    }
                    ocupado = 0;
                    executar(playingNow);
                    escreveLista();
                    //showPlaylist();
                }
            })

        });

    }

//FUNCAO RELACIONADA AOS ARTISTAS

    function showArt(){
        $("#page").html("");
        $("#artista").css("backgroundColor", "#696969").css("color", "#fff");
        $("#album, #genero, #resultado").css("backgroundColor", "transparent").css("color", "#101052");

        $.getJSON("data/listaM.json",function(data){
            musicas = data.music;
            biografia = data.information;
            var arArt = new Array();
            console.log(biografia);
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


// CRIA MENU SANFONA ARTISTA

//CRIA LISTA DE ARTISTAS
            for(var x=0; x< arArt.length;x++){
                var varPageArt = "" +
                "<div class='pageArt'>"+
                   "<div class='btnPlayArt "+ arArt[x].replace(/\s/g, "") +"'  value = '"+ arArt[x].replace(/\s/g, "") +"'> Play </div>"+
                   "<div class='btnMusicArt "+ arArt[x].replace(/\s/g, "") +"' value = '"+ arArt[x].replace(/\s/g, "") +"'> Music</div>"+
                   "<div class='nomeArt "+ arArt[x].replace(/\s/g, "") +"' value = '"+ arArt[x].replace(/\s/g, "") +"'>"+ arArt[x] +"</div>"+
                   "<div class='musicasSlide "+ arArt[x].replace(/\s/g, "") +"' value = '"+ arArt[x].replace(/\s/g, "") +"'>Musicas"+
                    "<div class='listaMusicasAqui "+ arArt[x].replace(/\s/g, "") +"' value = '"+ arArt[x].replace(/\s/g, "") +"'>";


//CRIA LISTA DE MUSICAS
                for(var j=0; j < musicas.length; j++){
                    if(musicas[j].artist == arArt[x]){
                        var varPageArt = varPageArt +
                            "<div class='itemMusica "+ musicas[j].name.replace(/\s/g, "") +"' value = '"+ musicas[j].name.replace(/\s/g, "") +"'>"+
                                "<div class='playMusic "+ musicas[j].name.replace(/\s/g, "") +"' value = '"+ musicas[j].name.replace(/\s/g, "") +"'> > </div>"+
                                "<div class='addMusic "+ musicas[j].name.replace(/\s/g, "") +"'value = '"+ musicas[j].name.replace(/\s/g, "") +"'> + </div>"+
                                "<div class= 'nomeMusica "+ musicas[j].name.replace(/\s/g, "") +"' value = '"+ musicas[j].name.replace(/\s/g, "") +"'>"+ musicas[j].name+"</div>"+
                                 "<div class='albumMusica "+ musicas[j].album.replace(/\s/g, "") +"' value = '"+ musicas[j].album.replace(/\s/g, "") +"'> "+musicas[j].album+" </div>"+
                                "<div class='generoMusica "+ musicas[j].genre.replace(/\s/g, "") +"' value = '"+ musicas[j].genre.replace(/\s/g, "") +"'> "+musicas[j].genre+" </div>"+
                            "</div>";


                    }

                }

                varPageArt = varPageArt + "</div>"+   "</div>";
                $("#page").append(varPageArt);

            }

//FAZER COISAS RELACIONADAS AOS ARTISTAS

                $('.pageArt .btnPlayArt, .pageArt .btnMusicArt, .pageArt .nomeArt').click(function(){
                    var idvalue = $(this).attr('value');
                    var idclass = $(this).attr("class");



                    console.log("class "+idclass);
                    console.log("value "+idvalue);
                    idclass = idclass.replace(" "+idvalue, "");
                    console.log("thandy: "+idclass)

//MOSTRA  E OCULTA MUSICAS DO ARTISTA

                    if(idclass == "btnMusicArt"){// show music
                        var correnteArtMusic;
                            correnteArtMusic = idvalue;
                            console.log("class "+idvalue);

                        $(".musicasSlide").slideUp("slow");
                        $("."+correnteArtMusic).slideDown("slow");
                        //$("."+correnteArtMusic).slideToggle("slow");

                    }

// TOCA TODAS AS MUSICAS DO ARTISTA QUE FOR CLICADO

                   else  if(idclass == "btnPlayArt"){ //play the list
                        index = 0;

                        var posicao = -1;
                        var currentPlaylist = new Array();
                        for(var j=0; j < musicas.length; j++){
                            if(musicas[j].artist.replace(/\s/g, "") == idvalue){
                                //currentPlaylist.push(musicas[j]);
                                posicao++;
                                currentPlaylist[posicao] = musicas[j];
                            }
                        }
                        console.log("lista de repro: before>");
                        console.log(playingNow);
                       playingNow.splice(0,playingNow.length);
                       // playingNow = new Array();
                        //playingNow.length = 1;
                        playingNow.length = currentPlaylist.length;
                        playingNow = currentPlaylist;
                        console.log("lista de repro: after>");
                        console.log(playingNow);
                        ocupado = 0;    
                        executar(playingNow);
                        escreveLista();


                       // alert("play artist'songs:"  + "."+idclass+"."+idvalue);
                        //$("."+idclass+"."+idvalue).css("backgroundColor", "#0f0");
                    }

// MOSTRA A BIOGRAFIA DO ARTISTA CLICADO

                   else if (idclass == "nomeArt"){ // show artist info

                        for(var i = 0; i<biografia.length; i++){

                            if (biografia[i].artist.replace(/\s/g, "") == idvalue){

                                var varPageArt = "<div class = 'biogragiaArt'>"+
                                    "<div class='photoArt'></div> <div class='bioNameArt'> "+ biografia[i].artist +" </div>"+
                                    "<div class='bioTexto'> "+ biografia[i].texto +" </div>"+
                                    "</div>";

                                showArtist();
                                $("#artistPage").html(varPageArt);
                                $(".photoArt").css("background-image", "url('photo/"+ biografia[i].picture +"')");
                                console.log(biografia[i].picture);

                            }
                        }
                    }

// ADICIONA UMA UNICA MUSICA DO ARTISTA PARA A PLAYLIST




                });


//FAZER COISAS RELACIONADAS AS MUSICAS

            $('.itemMusica div').click(function(){
                var idvalue = $(this).attr('value');
                var idclass = $(this).attr("class");

                console.log("Musicas value "+idvalue);
                console.log("Musicas class "+idclass);
                idclass = idclass.replace(" "+idvalue, "");

//ADICIONAR MUSICA A LISTA

                if (idclass == "addMusic"){
                    var size = playingNow.length;

                    console.log("playlist notmal: ");
                    console.log(playingNow);

                    for(var j=0; j < musicas.length; j++){
                        if(musicas[j].name.replace(/\s/g, "") == idvalue){
                            playingNow[size] = musicas[j];
                        }
                    }
                   console.log("depois de add>");
                   console.log(playingNow);

                        var escreve =  "<div class='agora "+ playingNow[size].local +"'>"+
                            "<div class= 'nomeAgora'> "+ playingNow[size].name +" </div>"+
                            "<div class='albumAgora'> "+ playingNow[size].album +" </div>"+
                            "<div class='autorAgora'> "+ playingNow[size].artist +" </div>"+
                            "</div>";
                        $("#tocandoPage").append(escreve);

                }


//TOCAR UMA NOVA MUSICA

                else if (idclass == "playMusic"){
                    index = 0;
                    playingNow.length = 1;
                    console.log("playlist notmal: ");
                    console.log(playingNow);

                    for(var j=0; j < musicas.length; j++){
                        if(musicas[j].name.replace(/\s/g, "") == idvalue){
                            playingNow[0] = musicas[j];
                        }
                    }
                    ocupado = 0;
                    executar(playingNow);
                    escreveLista();
                        //showPlaylist();
                    }
            })

        });

    }

    function stopMusic(){// stop music
        minhaMusica.load();
        isItPlaying = 2;
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

        if (ocupado == 0){
            ocupado =1;
            
            //console.log("ocupado: "+ ocupado);
             escreveInfo(refmusica);
             minhaMusica.load();
             minhaMusica.addEventListener("canplay", function(){
            
            //console.log("can: "+minhaMusica.duration.toFixed(0));
            tamanho = minhaMusica.duration.toFixed(0);
            tamanho = tamanho*1000;
            escreveTempo(refmusica);
        });

            minhaMusica.play(); 
            return;
        }

    }

    setInterval(function(){

            var atual = minhaMusica.currentTime.toFixed(0);
            var tam = minhaMusica.duration.toFixed(0);
           // console.log("atual: "+atual);
            //console.log("duaracao: "+ tam/15);
           // console.log("contador: "+index);
            $("#inde").html(index);
        var hsua = index+1;
        var info = "Playing music "+hsua+" of "+playingNow.length+"...";
            $("#numberMusic").html(info);
            $("#vete").html(playingNow.length);


            if( atual >= tam/80){
                //console.log("tamoamj; ");
                //console.log(playingNow.length);
                if(index<playingNow.length-1){
                    index++;
                    //exeW = executar(refmusica);
                    //exeW = clearTimeout(exeW);
                    //setCu = clearTimeout(setCu);
                    setDu = clearTimeout(setDu);
                    ocupado = 0;
                    stopMusic();
                    executar(playingNow);
                    
                }else{alert("The playlist is over!"); stopMusic(); index=0;}
            }
            else{}
        }, 1000);

    setCu = setInterval(function(){
            $("#correnteTime").html(correnteTime());
            barraStatus();
        }, 1000);

    function escreveTempo(ref){ //write current and duration time on screen and move the status bar

        $("#totalTime").html(duracaoTime());
        mudaCor(ref);
        showArtInformation();
        

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
        //console.log("Corrente: "+cMinute);
      return (cMinute);

    }

    function escreveInfo(refmusicas){ //it writes author;s name, music's name and music's address
        var vmus = refmusicas;
        //console.log(vmus[index].name);
        $("#nomeMusica").html(vmus[index].name);
        $("#nomeCantor").html(vmus[index].artist);
         minhaMusica.src = caminho + vmus[index].local + tipo;

    }

    function mudaCor(ref){

        console.log ("mudando cor");
        $(".agora").css("font-weight", "normal").css("backgroundColor","#5c5c5c");

        $('.agora.'+ref[index].local).css("font-weight", "bold").css("backgroundColor", "#464646");
       console.log ("ja foi mudando cor");
    }

    function showArtist(){
        console.log("playinNow");
        console.log(playingNow);
        $("#artistPage").css("display", "block");
        $("#tocandoPage").css("display", "none");
        $("#CurrentArt").css("backgroundColor", "#696969").css("color", "#fff");
        $("#playingNow").css("backgroundColor", "transparent").css("color", "#101052");
    }

    function showPlaylist(){
        $("#artistPage").css("display", "none");
        $("#tocandoPage").css("display", "block");
        $("#playingNow").css("backgroundColor", "#696969").css("color", "#fff");
        $("#CurrentArt").css("backgroundColor", "transparent").css("color", "#101052");
    }

    function escreveLista(){
        $("#tocandoPage").html("");
        for(var j=0; j < playingNow.length; j++){
           // console.log(playingNow[j].local);
            var escreve =  "<div class='agora "+ playingNow[j].local +"'>"+
                "<div class= 'nomeAgora'> "+ playingNow[j].name +" </div>"+
                "<div class='albumAgora'> "+ playingNow[j].album +" </div>"+
                "<div class='autorAgora'> "+ playingNow[j].artist +" </div>"+
                "</div>";
            $("#tocandoPage").append(escreve);
            showPlaylist();
        }
    }

    function showArtInformation(){
        for(var i = 0; i<biografia.length; i++){

            if (biografia[i].artist.replace(/\s/g, "") == playingNow[index].artist.replace(/\s/g, "")){

                var varPageArt = "<div class = 'biogragiaArt'>"+
                    "<div class='photoArt'></div> <div class='bioNameArt'> "+ biografia[i].artist +" </div>"+
                    "<div class='bioTexto'> "+ biografia[i].texto +" </div>"+
                    "</div>";


                $("#artistPage").html(varPageArt);
                $(".photoArt").css("background-image", "url('photo/"+ biografia[i].picture +"')");
                console.log(biografia[i].picture);

            }
        }
    }


});