import '../App.css';
import React, { useEffect, useState } from 'react';

function Map() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/map');
                const responseData = await response.json();
                setData(responseData.data);
            } catch (error) {
                console.error('Erreur lors de la requête API:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <p>Map us</p>
            {data && Array.isArray(data) ? (
                <ul>
                    {data.map((item) => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Map;
