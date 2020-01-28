import React, {useState} from 'react';
import {randomLogNormal, randomNormal} from "d3-random";
import Visualization from "./Visualization";

const App = () => {
    const [distributions, setDistributions] = useState([
        {'id': 'normal', fn: randomNormal(.5, 1), isActive: true},
        {'id': 'log-normal', fn: randomLogNormal(.5, 1), isActive: false}
    ]);
    return (
        <div className="app">
            <Visualization distribution={distributions.find(d => d.isActive)}/>
        </div>
    );
};

export default App;
