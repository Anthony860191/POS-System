import React, { useState } from 'react';
import { GoogleMap, MarkerF, InfoWindowF, useJsApiLoader } from '@react-google-maps/api';

export default function MyMap() {
    const containerStyle = {
        width: '400px',
        height: '400px'
    };

    const center = {
        lat: 30.612319932831028,
        lng: -96.3414465
    };

    const [selected, setSelected] = useState(null);

    const { isLoaded } = useJsApiLoader({
        id: "script-loader",
        googleMapsApiKey: "AIzaSyDpmXxXhpZTrQ0HaYxin1n7K2X1ezBrrbY",
        version: "3.47"
    });

    return (
        <>
            {isLoaded && (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={14}
                >
                    <>
                        <MarkerF
                            position={center}
                            onClick={() => setSelected(center)}
                        />
                        {selected && (
                            <InfoWindowF
                                position={center}
                                clickable={true}
                                onCloseClick={() => setSelected(null)}
                            >
                                <div>
                                    <h6><b>Spin 'N Stone Pizza - MSC</b></h6>
                                    <p>
                                        275 Joe Routt Blvd
                                        <br />
                                        College Station, TX 77840
                                    </p>
                                </div>
                            </InfoWindowF>
                        )}
                    </>
                </GoogleMap>
            )}
        </>
    )
}