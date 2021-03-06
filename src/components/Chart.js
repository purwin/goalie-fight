import React from 'react'
import { ResponsiveRadar } from '@nivo/radar'
import styled from 'styled-components'

import Box from './elements/Box'

const ChartBox = styled(Box)`
  width: 100%;
  height:50vh;
  background: #E5F1FF;
  color: #4C9CFF;
  overflow-y: visible;
`;


const LabelComponent = ({ id, anchor }) => (
  <g transform={`translate(${id === 'HDGSAA/60' ? -75 : anchor === 'end' ? -40 : anchor === 'middle' ? -15 : 0}, 0)`}>
    <text
      style={{
        fontSize: 14,
        fontWeight: 'bold',
        fill: '#0066E5',
      }}
    >
      {id}
    </text>
  </g>
);


const Chart = ({stats}) => {
  // Store goalie index as chart keys
  const keys = stats.map((item, i) => i);

  // Set up stat keys
  const statMap = [
    {
      name: `SV%`,
      stat: `sv`,
    },
    {
      name: `dSV%`,
      stat: `dsv`,
    },
    {
      name: `GSAA/60`,
      stat: `gsaa60`,
    },
    {
      name: `HDGSAA/60`,
      stat: `hdgsaa60`,
    },
    {
      name: `HDSV%`,
      stat: `hdsv`,
    },
  ];

  // Combine stats prop and statMap to single array of objects
  const data = statMap.reduce((data, line) => {
    // Set stat/stat name key/value pair
    let statObj = {
      stat: line.name
    }

    // Loop through stats, add relevant stat to object
    stats.forEach((stat, i) => {
      // Assign goalie dude index as key
      // If goalie stat defined, assign as value, otherwise 0
      stat.percentile && stat.percentile[line.stat]
      ? statObj[i] = stat.percentile[line.stat]
      : statObj[i] = 0;
    });

    data.push(statObj)
    return data;
  }, []);

  // const nivo_data = [
  //   {
  //     "stat": "SV%",
  //     [goalie1]: stats[0].sv,
  //     [goalie2]: 89.7
  //   },
  //   {
  //     "stat": "HDSV%",
  //     [goalie1]: stats[0].hdsv,
  //     [goalie2]: 77.5
  //   },
  // ];

  return(
    <ChartBox>
      <ResponsiveRadar
        data={data}
        keys={keys}
        indexBy={`stat`}
        maxValue={100}
        margin={{
          "top": 70,
          "right": 60,
          "bottom": 40,
          "left": 60
        }}
        curve="linearClosed"
        borderWidth={2}
        borderColor={{
          "from": "color",
          "modifiers": []
        }}
        gridLevels={5}
        gridShape="circular"
        gridLabelOffset={16}
        enableDots={true}
        dotSize={8}
        dotColor={{ from: 'color', modifiers: [] }}
        dotBorderWidth={2}
        dotBorderColor={{
            "from": "color"
        }}
        enableDotLabel={false}
        dotLabel="value"
        dotLabelYOffset={-12}
        colors={{
          "scheme": "nivo"
        }}
        colorBy="key"
        fillOpacity={0.05}
        blendMode="multiply"
        animate={true}
        motionStiffness={120}
        motionDamping={15}
        isInteractive={false}
        tooltip={({ id, value, color, ...args}) => {
          console.log(args);
          return (
          <strong style={{ color }}>
            {id}: {value}
          </strong>
        )}}
        theme={{
          tooltip: {
            container: {
              background: '#021926',
              color: '#dfe6e9'
            },
          },
        }}
        gridLabel={LabelComponent}
      />
    </ChartBox>
  )

};

export default Chart