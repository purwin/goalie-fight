import React from 'react'
import { ResponsiveRadar } from '@nivo/radar'
import styled from 'styled-components'
import {percentile} from '../utils/maths'

import Box from './elements/Box'

const ChartBox = styled(Box)`
  width: 50%;
  background: #E5F1FF;
  color: #4C9CFF;
`;

const Chart = ({stats}) => {
  console.log(stats)
  // Store goalie index as chart keys
  const keys = stats.map((item, i) => i);

  const stats_test = [
    {
      id: 1,
      name: `Andy Moog`,
      gsaa: 18.5,
      sv: 92.1,
      xsv: 91.8,
      hdsv: 88.78,
      hdgsaa: -4.33,
      w: 22
    }
  ];

  // Set up stat keys
  const statMap = [
    {
      name: `SV%`,
      stat: `sv`,
    },
    {
      name: `xSV%`,
      stat: `xsv`,
    },
    {
      name: `GSAA`,
      stat: `gsaa`,
    },
    {
      name: `HDSV%`,
      stat: `hdsv`,
    },
    {
      name: `HDGSAA`,
      stat: `hdgsaa`,
    },
  ];

  const statsArrays = stats.reduce((data, line) => {
    if (line.name) {
      Object.keys(line).forEach(key => {
        data[key] ? data[key].push(line[key]) : data[key] = [line[key]];
      });
    }

    return data;
  }, {});


  // Combine stats prop and statMap to single array of objects
  const data = statMap.reduce((data, line) => {
    let statObj = {
      stat: line.name
    }

    // Loop through stats, add relevant stat to object
    stats.forEach((stat, i) => {
      // Assign goalie dude index as key
      // If goalie stat defined, assign as value, otherwise 0
      stat[line.stat] ? statObj[i] = percentile(stat[line.stat], statsArrays[line.stat]) : statObj[i] = 0;
      // console.log(statsArrays[line.stat])
    });

    data.push(statObj)
    return data;
  }, []);

  console.log(data);

  // const data_test = [
  //   {
  //     "stat": "SV%",
  //     [stats[0].name]: stats[0].sv,
  //     [goalie2]: 89.7
  //   },
  //   {
  //     "stat": "HDSV%",
  //     [stats[0].name]: stats[0].hdsv,
  //     [goalie2]: 77.5
  //   },
  //   {
  //     "stat": "GSAA",
  //     [stats[0].name]: stats[0].gsaa,
  //     [goalie2]: -3
  //   },
  //   {
  //     "stat": "HDGSAA",
  //     [stats[0].name]: stats[0].hdgsaa,
  //     [goalie2]: 98
  //   },
  //   {
  //     "stat": "xSV%",
  //     [stats[0].name]: stats[0].xsv,
  //     [goalie2]: 98
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
        borderColor="inherit"
        gridLevels={5}
        gridShape="circular"
        gridLabelOffset={36}
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
        isInteractive={true}
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