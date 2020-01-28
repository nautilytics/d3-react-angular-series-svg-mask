import React, {useState} from 'react';
import Visualization from "./Visualization";

const App = () => {
    const [incrementCount, setIncrementCount] = useState(5);
    const [selectedItem, setSelectedItem] = useState(null);

    const onChange = d => () => {
        setSelectedItem(null);
        setIncrementCount(d);
    }

    return (
        <div className="app">
            <div className="form-group">
                <p>Please select an increment count, in days, for hover:</p>
                {[1, 2, 5, 10].map(d => {
                    return (
                        <div key={`increment-count-radio-${d}`}>
                            <input type="radio"
                                   name="increment-count"
                                   value={d}
                                   onChange={onChange(d)}
                                   checked={incrementCount === d}/>
                            {`${d} days`}
                        </div>
                    )
                })}
            </div>
            <Visualization selectedItem={selectedItem} setSelectedItem={setSelectedItem}
                           incrementCount={incrementCount}/>
        </div>
    );
};

export default App;
