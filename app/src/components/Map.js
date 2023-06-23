import React, { useEffect, useState } from 'react';
import initMap from '../leaflet/leafletConfig';
import '../leaflet/leafletStyles.css';

function Map() {
    const [data, setData] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/map');
                const responseData = await response.json();
                setData(responseData.data);

                const mapContainer = document.getElementById('map');
                if (mapContainer && mapContainer._leaflet_id) {
                    mapContainer._leaflet_id = null;
                    mapContainer.innerHTML = '';
                }

                initMap(responseData.data); // Passer les données à initMap()
            } catch (error) {
                console.error('Erreur lors de la requête API:', error);
            }
        };

        fetchData();

    }, []);

    return (
        <div>
            <div id="pageMap">
                <h1>HEEREWIGO</h1>
                <div id="map" style={{ height: '90vh' }}></div>
            </div>

        </div>
    );
}

export default Map;
