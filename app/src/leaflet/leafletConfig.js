import L from 'leaflet';

const initMap = (data) => {
    let map = L.map('map').setView([48.505, 2.4], 9);

    const listLieux = data

    let layerGroup = L.layerGroup().addTo(map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    for (let i = 0; i < listLieux.length; i++) {

        // Create an icon for pins
        let castelIcon = L.icon({
            iconUrl: process.env.PUBLIC_URL + '/img/castleodotempo.svg',
            iconSize:     [25, 80], // size of the icon
            iconAnchor:   [listLieux[i].position_y+10, listLieux[i].position_x], // point of the icon which will correspond to marker's location
        });
        let pins = L.marker([listLieux[i].position_x, listLieux[i].position_y], {icon: castelIcon});

        // Create a popup when click on a pin
        let img
        if(listLieux[i].images_id == "{}"){
            img ="https://www.fontainebleau-tourisme.com/wp-content/uploads/2023/02/Escalier-Thibaut-Chapotot.jpg"
        }else{
            img = listLieux[i].images_id
        }

        let popupContent = `<div class="pinsPopup">
                            <img class="imgPopup" src=${img} alt="blas">
                            <h2> ${ listLieux[i].name } </h2>
                            <p>Une description du lieu à visiter</p>
                            <p>
                                Curabitur rhoncus interdum metus quis hendrerit. 
                                In vel nisl eu augue posuere lobortis et in ante. 
                                Integer nulla purus, imperdiet in semper ut, luctus sed elit. 
                                Proin tincidunt neque a tortor dapibus, at malesuada lorem ornare.
                            </p>
                        </div>`

        pins.bindPopup(popupContent);
        pins.addTo(map);

        // add place on click
        /*
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

        // Create a temporary pin where the user cliqued on the map
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

        */
    }
};

export default initMap;
