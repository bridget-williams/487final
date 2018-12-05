//Google Maps API
// Initialize and add the map
var center = {
    lat:35.9155778,
        lng: -79.0523667
};


function initMap() {
    // The map, centered at Chapel Hill, Showing both the Atlantic and Pacific OCeans
    var map = new google.maps.Map(
        document.getElementById('locations'),
        {
            zoom: 2,
            center: center
        });
var urls = ['./coralreefs.geojson'];
var data = [];
urls.forEach(function(url){
    $.ajax({
        type:'GET',
        url: url,
        data: data,
        success: function(data){
            console.log(data);
            for (var i = 0; i < data.features.length; i++) {
                if (data.features[0]) {
                    var coords = data.features[i].geometry.coordinates;
                    var latLng = new google.maps.LatLng(coords[1], coords[0]);
                    var marker = new google.maps.Marker({
                        position: latLng,
                        map: map
                    });
                } else {
                    var coords2 = data.features[i].geometry.coordinates;
                    var latLng2 = new google.maps.LatLng(coords[1], coords[0]);
                    var marker2 = new google.maps.Marker({
                        position: latLng,
                        map: map
                    })
                }
            }
        }, error: function(){
            console.log('couldn\'t load map data');
        }
    });
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
        coralInfo = 'here is some information about coral bodies';
        console.log(coralInfo);
        coralInfoDiv.html(coralInfo);
    });

    $('#stomach').hover(function(){
        console.log('stomach clicked');
        coralInfo = 'here is some information about coral stomachs';
        console.log(coralInfo);
        coralInfoDiv.html(coralInfo);
    });

    $('#mouth').hover(function(){
        console.log('mouth clicked');
        coralInfo = 'here is some information about coral mouths';
        console.log(coralInfo);
        coralInfoDiv.html(coralInfo);
    });

    $('#tentacles').hover(function(){
        console.log('tentacles clicked');
        coralInfo = 'here is some information about coral tentacles';
        console.log(coralInfo);
        coralInfoDiv.html(coralInfo);
    });

    $('#algae').hover(function(){
        console.log('algae clicked');
        coralInfo = 'here is some information about coral algae';
        console.log(coralInfo);
        coralInfoDiv.html(coralInfo);
    });

    $('#stingers').hover(function(){
        console.log('stingers clicked');
        coralInfo = 'here is some information about coral stingers';
        console.log(coralInfo);
        coralInfoDiv.html(coralInfo);
    });

    $('#skeleton').hover(function(){
        console.log('skeleton clicked');
        coralInfo = 'here is some information about coral skeletons';
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