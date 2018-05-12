var result;
var map;
var markers=[];
var requestTerm;
var pos;
var bounds;
//On Load
$(function(){
    //Search Button
    $('#validationForm').on('submit', function(e) {
        e.preventDefault();
        search();
    });
});
//Search
function search(){
    clearMarkers();
    $("#loader").removeClass("hidden");
    $("#resultTable > tbody > tr").empty();
    $("#stopWatch > tbody > tr").empty();
    requestTerm = $("#search").val().trim();
    var searchTerm=encodeURI(requestTerm);
    console.log(searchTerm);
    console.log(requestTerm);
    var center=map.getCenter();
    console.log('lat--'+center.lat()+' long-'+center.lng());
    console.log($('#ResultSizeThreshold').val());
    var url;
    //url="http://localhost:8080/GoogleMaps_BigData_Assignment_1/restservices/helloworld?search="+"1 "+0.225038+" "+0.95817+" "+searchTerm+"&resultSizeThreshold="+$('#ResultSizeThreshold').val();
    //url="http://localhost:8080/GoogleMaps_BigData_Assignment_1/restservices/helloworld?search="+"1 "+0.237138+" "+0.942659+" "+searchTerm+"&resultSizeThreshold="+$('#ResultSizeThreshold').val();
    url="http://localhost:8080/GoogleMaps_BigData_Assignment_1/restservices/helloworld?search="+"1 "+((center.lat()+39)/5)+" "+(((center.lng()-140)/5)-0.05)+" "+searchTerm+"&resultSizeThreshold="+$('#ResultSizeThreshold').val();
    req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
        	console.log(this.responseText);
            result = JSON.parse(this.responseText);
            console.log(result);
            $("#loader").addClass("hidden");
            $("#resultTable").show();
            if (result != null) {
                console.log("result---- "+result);
                var ObjList=Object.values(result)[0];
                console.log(ObjList);
                var stopWatch=Object.keys(result)[0];
                console.log(stopWatch);
            	var resp =new Array(ObjList.length);
            	//Add current location to Bounds
            	bounds = new google.maps.LatLngBounds();
            	bounds.extend(pos);
                for(var i=0;i<ObjList.length;i++){
                    console.log(ObjList[i]);
                    console.log(ObjList[i].name);
                    console.log(ObjList[i].queryType);
                    resp[i]=ObjList[i].name;
                    /*******Add to Map and Table****/
                    var row = "<tr>"
                        + "<td>" + ObjList[i].name + "</td><td>" + ((ObjList[i].lat*5)-39) + "</td><td>" + (((ObjList[i].lon+0.05)*5)+140) + "</td><td>" + ObjList[i].queryType
                    	//+ "<td>" + result[i].name + "</td><td>" + result[i].lat + "</td><td>" + result[i].lon + "</td><td>"
                        + "</td>"
                        + "</tr>"
                    $("#resultTable").append(row);
                    console.log($("#resultTable"));
                    /***Create Map Marker***/
                    var lat = ObjList[i].lat*5-39;
                    var long = (ObjList[i].lon+0.05)*5+140;
                    //var lat = result[i].lat;
                    //var long = result[i].lon;

                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(lat, long),
                        map: map,
                        animation: google.maps.Animation.DROP
                    });
                    console.log(marker);
                    /***Add Listener to Marker***/
                    /*google.maps.event.addListener(marker, 'click', (function (marker, i) {
                            return function () {
                                var infowindow = new google.maps.InfoWindow();
                                infowindow.setContent("<input type='button' data-target='#myModal' data-toggle='modal' class='ui label' style='width: 100% !important;' value='" + result[i].name + "' id='" + i + "' name='" + result[i].name + "'>");
                                infowindow.open(map, marker);
                            }
                        })(marker, i));*/
                    markers.push(marker);
                    // Adjust bounds to show new Markers
                    var position = new google.maps.LatLng(lat, long);
                    bounds.extend(position);
                }
                map.fitBounds(bounds);
                console.log("stopWatch--"+stopWatch);
                var stopWatchResult=stopWatch.split("\n");
                console.log("stopWatchResult--"+stopWatchResult);
                for(var i=1;i<stopWatchResult.length-1;i++){
                	var line=stopWatchResult[i].split("\t");
                	var row = "<tr>"
                        + "<td>" + line[0] + "</td><td>" + line[1] + "</td><td>" + line[2] + "</td><td>" + line[3]
                        + "</td>"
                        + "</tr>"
                    $("#stopWatch").append(row);
                }
                //$("#stopWatch").html(stopWatch.replace(/\n/g,"<br/>"));
            }
        }
    }
    req.open("GET", url, true);
    req.send();
}

//Map
function initMap() {
    var myLatLng = {lat: -37.8136, lng: 144.9631};
	//var myLatLng= {lat: 0.2372799999999998, lng: 0.942619999999988};
	//var myLatLng = {lat: (0.2326311498194414+39)/5, lng: (((0.9473168505880494-140)/5)-0.05)};
	pos=myLatLng;
    // Create a map object and specify the DOM element for display.
    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 12,
        useCurrentLocation: false,
        disableDefaultUI: true
    });
    // Create a marker and set its position.
    var image = {
        url: "img/location.png",
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(128,128),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32)
    };
    var marker = new google.maps.Marker({
        map: map,
        icon: image,
        position: myLatLng,
        animation: google.maps.Animation.DROP,
        title: 'Your Current Location'
    });
    // Try HTML5 geolocation.
    infoWindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            marker.setPosition(pos);
            map.panTo(pos);
            map.setZoom(14);
        }, function() {
            //handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        //handleLocationError(false, infoWindow, map.getCenter());
    }
}
function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}