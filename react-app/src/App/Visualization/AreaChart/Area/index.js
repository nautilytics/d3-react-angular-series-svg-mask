import React, {useEffect, useRef, useState} from "react";
import {select} from "d3-selection";
import "d3-transition";
import {interpolate} from "flubber";
import {DURATION} from "../../../../constant";

const Area = ({d}) => {
    const [path, setPath] = useState(d);

    const areaRef = useRef();

    useEffect(() => {
        const ref = areaRef.current;
        const interpolator = interpolate(path, d);

        select(ref)
            .transition()
            .duration(DURATION)
            .attrTween("d", () => interpolator)
            .on("end", () => setPath(d));
        return () => {
            select(ref).interrupt();
        };
    }, [d, path]);

    return <path ref={areaRef} style={{fill: "white"}}/>;
};
export default Area;
