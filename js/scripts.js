//Google Maps API
// Initialize and add the map
var center = {
    lat:35.0527,
        lng: -78.8784
};


function initMap() {
    // The map, centered at Chapel Hill, Showing both the Atlantic and Pacific OCeans
    var map = new google.maps.Map(
        document.getElementById('locations'),
        {
            zoom: 7,
            center: center
        });

var reefdata = [];
    $.ajax({
        type:'GET',
        //data locaded from arcgis api based on a North Carolina Dept. Of Environmental Quality Data Set
        url: 'https://opendata.arcgis.com/datasets/7ee54636ff024259a579b7e57d241ae9_0.geojson',
        data: reefdata,
        success: function(reefdata){
            console.log(reefdata);
            for (var i = 0; i < reefdata.features.length; i++) {

                var coords = reefdata.features[i].geometry.coordinates;
                var latLng = new google.maps.LatLng(coords[1], coords[0]);
                var infowindow = new google.maps.InfoWindow({
                    content: reefdata.features[i].properties.reefname + '</br>' + reefdata.features[i].properties.region
                });

                var marker = new google.maps.Marker({
                    icon:'./img/logomd.svg',
                    position: latLng,
                    map: map
                });

                marker.addListener('click', function() {
                    infowindow.open(map, marker);
                });


            }
        }, error: function(){
            console.log('couldn\'t load map data');
        }
    });



}







//Youtube API

//Create a player for the bleaching video

//on click for bleaching open bleaching video
var bleaching = $('#bleaching');
bleaching.click(function(){
    console.log('bleaching clicked');
    $('#player2').toggleClass('hidden');
    $('#closeVideo2').css('display','block');
});

//close player video on click of x
$('#closeVideo2').click(function(){
    $('#player2').toggleClass('hidden');
    $('#closeVideo2').css('display','none');
    player2.pauseVideo();
});

//for spawning video
var heat = $('#heat');
heat.click(function(){
    console.log('bleaching clicked');
    $('#player1').toggleClass('hidden');
    $('#closeVideo1').css('display','block');
});

//close player video on click of x
$('#closeVideo1').click(function(){
    $('#player1').toggleClass('hidden');
    $('#closeVideo1').css('display','none');
});

//for bleaching video
var player;
//for coral heat resistance video
var player2;

function onYouTubeIframeAPIReady() {
    console.log('iframe loaded');
    player = new YT.Player('player2', {
        height: '100%',
        width: '100%',
        modestbranding: 1,
        videoId: 'bFdPmiwZzVE',
        events: {
            'onReady': onPlayerReady
        }
    });

        player2 = new YT.Player('player1', {
            height: '100%',
            width: '100%',
            modestbranding: 1,
            videoId: 'GTkqNb-eENs',
            events: {
                'onReady': onPlayerReady
            }
    });

    $('#closeVideo2').click(function(){
        player2.stopVideo();
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    console.log('player loaded');
    event.target.loadVideo();
    event.target.playVideo();
}














//ready function
$(function(){
    console.log('scripts loaded');

    //open hamburger menu
    $('#hamburger').click(function(){
        $('#hamburger-menu').toggleClass('hidden');
    });


    $('#coralsvg').mousemove(function(e) {
        window.x = e.pageX;
        window.y = e.pageY;
        showHover();
    });

    function showHover() {
        $("#coral-diagram-text").css("top", y + 10);
        $("#coral-diagram-text").css("left", x + 10);
    }

    //Functions for interactive coral
    var coralInfo= '';
    var coralInfoDiv = $('#coral-diagram-text');
;

    $('#coralsvg').click(function(){
        console.log('coral clicked');
    });

    $('#body').hover(function(){
        console.log('body clicked');
        coralInfo = 'The coral polyp body is soft, and resembles a tiny sea anemone. ';
        console.log(coralInfo);
        coralInfoDiv.html(coralInfo);
    });

    $('#stomach').hover(function(){
        console.log('stomach clicked');
        coralInfo = 'If a coral is using its mouth to gather food, it is digested here. Most corals cannot rely solely on digested food to live, and will die if this is their only source of nutrition. ';
        console.log(coralInfo);
        coralInfoDiv.html(coralInfo);
    });

    $('#mouth').hover(function(){
        console.log('mouth clicked');
        coralInfo = 'When a coral expells its algae due to stress, it can use its mouth to suck in small particulates from the sea water to maintain its energy levels for a short period of time. ';
        console.log(coralInfo);
        coralInfoDiv.html(coralInfo);
    });

    $('#tentacles').hover(function(){
        console.log('tentacles clicked');
        coralInfo = 'Many corals have tiny tentacles to help draw particulates into their mouthes for heterotrophy, or the use of food that was not self-produced. ';
        console.log(coralInfo);
        coralInfoDiv.html(coralInfo);
    });

    $('#algae').hover(function(){
        console.log('algae clicked');
        coralInfo = 'Corals get their bright colors from the algae that live in its tissue. Coral polyps themselves are usually transparent or colorless.';
        console.log(coralInfo);
        coralInfoDiv.html(coralInfo);
    });

    $('#stingers').hover(function(){
        console.log('stingers clicked');
        coralInfo = 'Some corals have stingers that help them catch prey, much like their cousins the sea anemone.';
        console.log(coralInfo);
        coralInfoDiv.html(coralInfo);
    });

    $('#skeleton').hover(function(){
        console.log('skeleton clicked');
        coralInfo = 'The large coral structures we see on reefs are actually just  Calcium Carbonate deposits created as corals grow covered by a thin layer of living tissue.';
        console.log(coralInfo);
        coralInfoDiv.html(coralInfo);
    });










    //for the to top button
    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById("toTop").style.display = "block";
        } else {
            document.getElementById("toTop").style.display = "none";
        }
    }

    // When the user clicks on the button, scroll to the top of the document
    $('#toTop').click(function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });


    //for the find a coral search
        $('#search').on('click', function(){
          search();
        });

        $('#place').on('keyup', function(e){
            if(e.keyCode===13) {
                search();
            }
        });

    var data=[];

    function search (){
           input = $('#place').val();
            console.log(input);
            var naturalistURL = 'https://api.inaturalist.org/v1/observations?taxon_id=47533&q=' + input;
            $.ajax({
                type: 'GET',
                url: naturalistURL,
                dataType: 'json',
                data: data,
                success: function (data) {
                    console.log(data);
                    if(data.total_results === 0){
                        console.log('no results');
                        html = 'Sorry, your search didn\'t return any results, try something else.';
                        console.log(html);
                        $('#results').html(html);

                    } else{
                        html='';
                        console.log(html);
                        console.log(data.results);

                        for(var i =0; i< data.results.length; i++){
                            console.log(data.results[i]);
                            var photo = data.results[i].photos[0].url;
                            if(data.results[i].photos[0].url === 'null' || data.results[i].photos[0].url == null){
                                photo = 'No photo provided.';
                            }
                            var description = data.results[i].description;
                            if(data.results[i].description === 'null' || data.results[i].description == null){
                                description = 'No description provided.';
                            }
                            var species = data.results[i].species_guess;
                            if(data.results[i].species_guess === 'null' || data.results[i].species_guess == null){
                                species = 'No exact species provided.';
                            }
                            var location = data.results[i].place_guess;
                            if(data.results[i].place_guess === 'null' || data.results[i].place_guess == null){
                                location = 'No location provided.';
                            }
                            html += '<div class="card flex col">';
                            html += '<div class="photo flex col">';
                            if (photo !== 'null' || photo != null){
                                html += '<img  class="photo" src="' + photo + '">';
                            }
                            html += '</div>';
                            html += '<div class="cardText flex col">';
                           if(species !== 'null' || species != null){
                               html+= '<div id="species"> <span class="subhead">Species: </span></br>' + species + '</div>';
                           }
                           if(location !== 'null' || location != null){
                               html+= '<div id="description"> <span class="subhead">Location: </span> </br>' + location + '</div>';
                           }
                            html+= '<div id="description"><span class="subhead">Description: </span> </br>' + description + '</div>';

                           html += '</div>';
                           html += '</div>';
                            $('#results').html(html);
                        }



                    }
                }, error: function(){
                    console.log('Couldn\'t load data');
                }
            });

        }


    //Ajax





    //close ready function
});