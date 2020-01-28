import React, {useState} from 'react';
import {extent, max, range} from 'd3-array';
import {scaleLinear, scaleTime} from 'd3-scale';
import moment from 'moment';
import Axes from "./Axes";
import AreaChart from "./AreaChart";

const INCREMENT = 'days';
const N = 150;

const Visualization = ({incrementCount, selectedItem, setSelectedItem}) => {

    // Set up some constant variables for the visualization
    const width = 960;
    const height = 500;
    const margin = {
        left: 20,
        right: 20,
        bottom: 20,
        top: 20
    };

    // Retrieve the inner height and width for which we will be drawing on
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    // Create a random sampling of data points, useState to ensure it isn't updated during re-renders
    const [data] = useState(
        range(N / incrementCount)
            .map(i => {
                return {
                    y: innerHeight / 2 + 150 * Math.sin(i / 5),
                    x: moment().subtract(incrementCount * i, INCREMENT)
                };
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
    const barWidth = xScale.range()[1] - xScale(moment(xScale.domain()[1]).subtract(incrementCount, INCREMENT));

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
