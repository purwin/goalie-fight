import React from 'react'
import { ResponsiveRadar } from '@nivo/radar'
import styled from 'styled-components'

import Box from './elements/Box'

const ChartBox = styled(Box)`
  width: 100%;
  height:50vh;
  background: #E5F1FF;
  color: #4C9CFF;
`;

const Chart = ({stats}) => {
  console.log(stats)
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
    let statObj = {
      stat: line.name
    }

    // Loop through stats, add relevant stat to object
    stats.forEach((stat, i) => {
      // Assign goalie dude index as key
      // If goalie stat defined, assign as value, otherwise 0
      stat[line.stat] ? statObj[i] = stat[`p_${line.stat}`] : statObj[i] = 0;
      // console.log(statsArrays[line.stat])
    });

    data.push(statObj)
    return data;
  }, []);

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
        borderColor="inherit"
        gridLevels={5}
        gridShape="circular"
        gridLabelOffset={16}
        enableDots={true}
        dotSize={8}
        dotColor="inherit"
        dotBorderWidth={0}
        dotBorderColor="#ffffff"
        enableDotLabel={false}
        dotLabel="value"
        dotLabelYOffset={-12}
        colors="nivo"
        colorBy="key"
        fillOpacity={0.1}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        isInteractive={false}
        tooltip={({ id, value, color }) => (
          <strong style={{ color }}>
            {id}: {value}
          </strong>
        )}
        theme={{
          tooltip: {
            container: {
              background: '#021926',
              color: '#dfe6e9'
            },
          },
        }}
        legends={[
          {
            "anchor": "top-left",
            "direction": "column",
            "translateX": -50,
            "translateY": -40,
            "itemWidth": 80,
            "itemHeight": 20,
            "itemTextColor": "#333",
            "symbolSize": 12,
            "symbolShape": "square",
            "effects": [
              {
                "on": "hover",
                "style": {
                  "itemTextColor": "0066E5"
                }
              },
            ]
          }
        ]}
      />
    </ChartBox>
  )

};

export default Chart