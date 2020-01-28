import React from 'react';
import {area as d3_area, curveBasis} from 'd3-shape';
import Area from "./Area";

const AreaChart = ({data, xScale, yScale, selectedItem, setSelectedItem, barWidth = 0}) => {

    // Set up an area chart generator
    const area = d3_area()
        .curve(curveBasis)
        .x(d => d.x)
        .y0(d => d.y0)
        .y1(d => d.y1);

    const onMouseOver = item => () => setSelectedItem(item);

    return (
        <g className="area-chart">
            <defs>
                <mask
                    id='mask-for-area-chart'
                    maskUnits="userSpaceOnUse"
                    maskContentUnits="userSpaceOnUse"
                >
                    <Area
                        d={area(
                            data.map(f => {
                                return {
                                    x: xScale(f.x),
                                    y0: yScale(0),
                                    y1: yScale(f.y)
                                };
                            })
                        )}
                    />
                </mask>
            </defs>
            <rect
                mask='url(#mask-for-area-chart)'
                className="area-chart"
                width={xScale.range()[1]}
                height={yScale.range()[0]}
            />
            <g className="hover-section">
                {data.map((f, i) => {
                    return (
                        <rect
                            key={`hover-section-for-${i}`}
                            onMouseOver={onMouseOver(f)}
                            x={xScale(f.x) - barWidth}
                            width={barWidth}
                            height={yScale.range()[0]}
                        />
                    );
                })}
            </g>
            {
                selectedItem && <rect
                    mask='url(#mask-for-area-chart)'
                    className="area-chart selected"
                    x={xScale(selectedItem.x)}
                    height={yScale.range()[0]}
                    width={barWidth}
                />
            }
        </g>
    )
};
export default AreaChart;
