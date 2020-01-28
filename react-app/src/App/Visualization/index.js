import React, {useState} from 'react';
import {ascending, descending, extent, max, range} from 'd3-array';
import {scaleLinear, scaleTime} from 'd3-scale';
import moment from 'moment';
import Axes from "./Axes";
import AreaChart from "./AreaChart";

const INCREMENT = 'days';
const INCREMENT_COUNT = 1;

const Visualization = ({distribution}) => {

    // Handle the selected point
    const [selectedItem, setSelectedItem] = useState(null);

    // Set up some constant variables for the visualization
    const width = 1000;
    const height = 600;
    const margin = {
        left: 40,
        right: 40,
        bottom: 40,
        top: 40
    };

    // Retrieve the inner height and width for which we will be drawing on
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    // Create a random sampling of data points, useState to ensure it isn't updated during re-renders
    const [data, setData] = useState(
        range(150)
            .map(() => {
                return {
                    y: distribution.fn()
                };
            }).sort((a, b) => descending(a.y, b.y))
            .map((d, i) => {
                return {
                    ...d,
                    x: moment().subtract(INCREMENT_COUNT * i, INCREMENT)
                }
            })
    );

    // Set up an x- and y-scale
    const xScale = scaleTime()
        .range([0, innerWidth])
        .domain(extent(data, d => d.x));
    const yScale = scaleLinear()
        .range([innerHeight, 0])
        .domain([0, max(data, d => d.y)]);

    // Calculate the distance, in time, between points
    const barWidth = xScale.range()[1] - xScale(moment(xScale.domain()[1]).subtract(INCREMENT_COUNT, INCREMENT));

    // const updateData = () => {
    //     setData(
    //         range(150).map(d => {
    //             return [
    //                 xScale(dt),
    //                 yScale(getTimeForYAxis(dt)),
    //                 {
    //                     id: d,
    //                     name: `name-of-${d}`,
    //                     r: markerRadius
    //                 }
    //             ];
    //         })
    //     )
    // }

    return (
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left},${margin.top})`}>
                <AreaChart data={data} xScale={xScale} yScale={yScale} barWidth={barWidth} selectedItem={selectedItem}
                           setSelectedItem={setSelectedItem}/>
                <Axes height={innerHeight} xScale={xScale}/>
            </g>
        </svg>
    )
};
export default Visualization;
