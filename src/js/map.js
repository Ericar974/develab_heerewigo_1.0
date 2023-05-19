let map = L.map('map').setView([48.505, 2.4], 9);

const listLieux = data

let layerGroup = L.layerGroup().addTo(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
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

// add place on click
    let addPlaceForm = document.querySelector('#addPlaceForm')
    let positionx = document.querySelector('#positionx')
    let positiony = document.querySelector('#positiony')

    let addPlaceBtn = document.querySelector('#addPlace')
    let canAddPlace = false
    let temporaryMarker = null

    addPlaceBtn.onclick = function () {
        canAddPlace = !canAddPlace
        if(canAddPlace){
            addPlaceForm.className = 'block'
        }else{
            addPlaceForm.className = 'hidden'
            temporaryMarker ? map.removeLayer(temporaryMarker) : ''
        }
    }



        map.on('click', function(e) {
            if(canAddPlace){
                if (temporaryMarker) {
                    // Supprime l'ancien marqueur temporaire s'il existe
                    map.removeLayer(temporaryMarker);
                }
                // Create a temporary marker at the clicked location
                temporaryMarker = L.marker(e.latlng);

                positionx.value = e.latlng.lat;
                positiony.value = e.latlng.lng;

                // Add the temporary marker to the map
                temporaryMarker.addTo(map);

            }

        });





    /*    //
        map.on('click', function(e) {
            // Récupère les coordonnées du clic
            let lat = e.latlng.lat;
            let lng = e.latlng.lng;

            // Redirige vers le formulaire avec les coordonnées pré-remplies
            window.location.href = '/addPlace?lat=' + lat + '&lng=' + lng;
        });*/

    /*newMarker = new L.marker([listLieux[i].position_x, listLieux[i].position_y], {
        draggable: false,
        autoPan: true,
        shadowSize: [0, 0],
        icon: castelIcon
    });
    layerGroup.addLayer(newMarker);*/

    /* L.marker([listLieux[i].position_x, listLieux[i].position_y], {icon: castelIcon}).addTo(map); */
}