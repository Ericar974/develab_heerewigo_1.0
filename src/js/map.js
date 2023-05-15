var map = L.map('map').setView([48.505, 2.4], 9);

const listLieux = data

let layerGroup = L.layerGroup().addTo(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

for (let i = 0; i < listLieux.length; i++) {
    newMarker = new L.circle([listLieux[i].position_x, listLieux[i].position_y], {
        draggable: false,
        autoPan: true,

        shadowSize: [0, 0],
    });
    layerGroup.addLayer(newMarker);
    /*var iconUrl = 'data:image/svg+xml;base64,' + btoa(svg);

    var icon = L.icon( {
        iconUrl: iconUrl,
    } ); */

    var castelIcon = L.icon({
        iconUrl: './images/castelodotempo.svg',
        iconSize:     [25, 80], // size of the icon
        iconAnchor:   [listLieux[i].position_y+10, listLieux[i].position_x], // point of the icon which will correspond to marker's location
    });
    L.marker([listLieux[i].position_x, listLieux[i].position_y], {icon: castelIcon}).addTo(map);



    /*newMarker = new L.marker([listLieux[i].position_x, listLieux[i].position_y], {
        draggable: false,
        autoPan: true,
        shadowSize: [0, 0],
        icon: castelIcon
    });
    layerGroup.addLayer(newMarker);*/

    /* L.marker([listLieux[i].position_x, listLieux[i].position_y], {icon: castelIcon}).addTo(map); */
}