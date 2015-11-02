var colors = ['#da9753', '#4285f4', '#55b247', '#f44147'];
var map;  
function initialize() {
  var myOptions = {
    zoom: 3,
    center: new google.maps.LatLng(10, 0),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
      myOptions);

  // Initialize JSONP request
  var script = document.createElement('script');
  var url = ['https://www.googleapis.com/fusiontables/v1/query?'];
  url.push('sql=');
  var query = 'SELECT name, kml_4326 FROM ' +
      '1foc3xO9DyfSIF6ofvN0kp2bxSfSeKog5FbdWdQ '+
      "WHERE name IN ('Sudan','Algeria', 'Libya', 'India')";
  var encodedQuery = encodeURIComponent(query);
  url.push(encodedQuery);
  url.push('&callback=drawMap');
  url.push('&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
  script.src = url.join('');
  var body = document.getElementsByTagName('body')[0];
  body.appendChild(script);

}

function drawMap(data) {
  var rows = data['rows'];
  for (var i in rows) {
    if (rows[i][0] != 'Antarctica') {
      var newCoordinates = [];
      var geometries = rows[i][1]['geometries'];
      if (geometries) {
        for (var j in geometries) {
          newCoordinates.push(constructNewCoordinates(geometries[j]));
        }
      } else {
        newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
      }
      var randomnumber = Math.floor(Math.random() * 4);
      var country = new google.maps.Polygon({
        paths: newCoordinates,
        strokeColor: colors[i],
        strokeOpacity: 0,
        strokeWeight: 1,
        fillColor: colors[i],
        fillOpacity: 0.6
      });
      var contentString = "This is country " + i +" with some info about various projects"
      country.infoWindow = new google.maps.InfoWindow({
        content: contentString,
        position: polygonCenter(country)
      });
      google.maps.event.addListener(country, 'mouseover', function() {
        this.setOptions({fillOpacity: 0.7});
        this.infoWindow.open(map, this);
      });
      google.maps.event.addListener(country, 'mouseout', function() {
        this.setOptions({fillOpacity: 0.5});
        this.infoWindow.close();
      });

      country.setMap(map);
    }
  }
}

function constructNewCoordinates(polygon) {
  var newCoordinates = [];
  var coordinates = polygon['coordinates'][0];
  for (var i in coordinates) {
    newCoordinates.push(
        new google.maps.LatLng(coordinates[i][1], coordinates[i][0]));
  }
  return newCoordinates;
}

function polygonCenter(poly) {
  var lowx,
      highx,
      lowy,
      highy,
      lats = [],
      lngs = [],
      vertices = poly.getPath();

  for(var i=0; i<vertices.length; i++) {
    lngs.push(vertices.getAt(i).lng());
    lats.push(vertices.getAt(i).lat());
  }

  lats.sort();
  lngs.sort();
  lowx = lats[0];
  highx = lats[vertices.length - 1];
  lowy = lngs[0];
  highy = lngs[vertices.length - 1];
  center_x = lowx + ((highx-lowx) / 2);
  center_y = lowy + ((highy - lowy) / 2);
  return (new google.maps.LatLng(center_x, center_y));
}

// function initialize() {
  // var mapOptions,
  //   map
  // var country1= "Canada",
  //   country2  = "Mexico",
  //   country3  = "Algeria",
  //   country4  = "Brazil"     

  // mapOptions = {
  //   center: new google.maps.LatLng(26.750315, -105.467271),
  //   zoom: 2,
  //   mapTypeId: google.maps.MapTypeId.NORMAL,
  //   panControl: true,
  //   scaleControl: false,
  //   streetViewControl: true,
  //   overviewMapControl: true
  // };
  // // initializing map
  // map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
  // layer = createFusionLayer(map,country1,country2,country3,country4)
  // layer.setMap(map)
  // drawChart(map,country1)
// }

// function createFusionLayer(map, country1,country2,country3,country4){
//   layer = new google.maps.FusionTablesLayer({
//     query: {
//       select: "geometry", 
//       from: "1AbZIv2wwK1CTfWkO_qx0Dnm9-Uve9_0oRKrj7dM"
//     },
//     styles: [{
//       polygonOptions: {
//         fillColor: '#00FF00',
//         fillOpacity: '0',
//         strokeWeight: '0'
//       }
//     }, {
//       where: "Name = '"+country1+"'",
//       polygonOptions:{
//         strokeWeight: "0",
//         strokeOpacity: "0.8",
//         fillOpacity: ".35",
//         fillColor: "#4285f4"
//       }
//     }, {
//       where: "Name = '"+country2+"'",
//       polygonOptions:{
//         strokeWeight: "0",
//         strokeOpacity: "0.8",
//         fillOpacity: ".35",
//         fillColor: "#da9753"
//       }
//     }, {
//       where: "Name = '"+country3+"'",
//       polygonOptions:{
//         strokeWeight: "0",
//         strokeOpacity: "0.8",
//         fillOpacity: ".35",
//         fillColor: "#55b247"
//       }
//     }, {
//       where: "Name = '"+country4+"'",
//       polygonOptions:{
//         strokeWeight: "0",
//         strokeOpacity: "0.8",
//         fillOpacity: ".35",
//         fillColor: "#f44147"
//       }
//     }] //, {}
//     //suppressInfoWindows: true
//   });
//   return layer;
// }

// this is a simple working layer, keeping it around just in case i need to use it again.
// function createFusionLayer(map, country){
//   layer = new google.maps.FusionTablesLayer({
//     query: {
//       select: "geometry", 
//       from: "1AbZIv2wwK1CTfWkO_qx0Dnm9-Uve9_0oRKrj7dM",
//       where: "Name = '"+country+"'"
//     },
//     styles: [{
//       polygonOptions: {
//         strokeWeight: "0",
//         strokeOpacity: "0.8",
//         fillOpacity: ".35",
//         fillColor: "#4285f4"
//       },
//     }]
//   });
//   return layer;
// }









//Work on this functionality, see if we can draw a chart based on the returned value of the query of the fusion table in order to test
// function drawChart(map,country) {
//   var viz = google.visualization.drawChart({
//     "containerId": "map-canvas2",
//     "dataSourceUrl": "//www.google.com/fusiontables/gvizdata?tq=",
//     "query":"SELECT 'Name' FROM " +
//             "1AbZIv2wwK1CTfWkO_qx0Dnm9-Uve9_0oRKrj7dM" +,
//     "where":"Name = 'Canada'",
//     "refreshInterval": 5,
//     "chartType": "Table",
//     "options": {}
//   });
// }
// function drawChart(map,country) {
//   var viz = google.visualization.drawChart({
//     containerId: "map-canvas2",
//     query: {
//       select: "Name", 
//       from: "1AbZIv2wwK1CTfWkO_qx0Dnm9-Uve9_0oRKrj7dM",
//       where: "Name = '"+country+"'"
//     },
//     refreshInterval: 5,
//     chartType: "Table",
//     options: {}
//   });
// }