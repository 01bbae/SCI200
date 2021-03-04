// var data = loadJSON(function(reponse){
//     var actual_JSPN = JSON.parse(respose)
// });
let jsondata;
// const { clearPrewarmedResources } = require("mapbox-gl");
let myRequest = new Request('los_angeles_censustracts.json');
fetch(myRequest)
    .then(response => response.json())
    .then(data =>{
        // jsondata=data
        var mymap = L.map('mapid').setView([34.052235, -118.243683], 13);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiMDFiYmFlIiwiYSI6ImNrbHRjbmxkNjFnZ2kycG8wNmE2cWlpd2kifQ.B9u7L2HX_DUF71cqsZiXnA'
        }).addTo(mymap);

        //reversing coordinates
        for(var i=0;i<data.features.length;++i){
            for(var j=0;j<data.features[i].geometry.coordinates[0].length;++j)
            data.features[i].geometry.coordinates[0][j] = data.features[i].geometry.coordinates[0][j].reverse();
        }
        console.log(data.features[1].geometry.coordinates[0])
        var polygons = new Array();
        //storing polygon objects and adding to map
        for(var i=0;i<data.features.length;++i){
            polygons[i] = L.polygon(data.features[i].geometry.coordinates[0]).addTo(mymap);
            // console.log(polygons[i])
            // polygons[i].addTo(mymap);
        }

        //test
        let coord = data.features[0].geometry.coordinates[0].reverse();
        var polygon = L.polygon(coord).addTo(mymap);
        // var popup = L.popup()
        // .setLatLng(coord[0][0])
    })
// var mymap = L.map('mapid').setView([34.052235, -118.243683], 13);

// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: 'pk.eyJ1IjoiMDFiYmFlIiwiYSI6ImNrbHRjbmxkNjFnZ2kycG8wNmE2cWlpd2kifQ.B9u7L2HX_DUF71cqsZiXnA'
// }).addTo(mymap);

// let coord = jsondata.features[0].geometry.coordinates[0];
// // console.log(coord)
// var polygon = L.polygon(coord).addTo(mymap);






// const data = require('./los_angeles_censustracts.json')
// console.log(data.features[0].properties.DISPLAY_NAME)

// function loadJSON(callback){
//     var xobj = new XMLHttpRequest();
//     xobj.open('GET', 'los_angeles_censustracts.json', true);
//     xobj.onreadystatechange = function(){
//         if(xobj.readyState == 4 && xobj.status=="200"){
//             callback(xobj.responseText);
        
//         }
//     };
//     xobj.send(null);
// }