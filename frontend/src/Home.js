import React from 'react';
import MyMap from "./GoogleMaps"

const Home = () => {
    return (
        <div className="Home">
            <center>
                <h1>Spin 'N Stone Pizza</h1>
                <div>
                    <MyMap />
                </div>
            </center>
        </div>
    );
}

export default Home;