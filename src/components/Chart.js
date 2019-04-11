import React from 'react'
import { ResponsiveRadar } from '@nivo/radar'

const Chart = ({stats}) => {
  const statArray = Object.entries(stats);
  const keys = Object.keys(stats);
  const goalie2 = `Goalie 2`
  const data = [
    {
      "stat": "SV%",
      [stats[0].name]: stats[0].sv,
      [goalie2]: 89.7
    },
    {
      "stat": "HDSV%",
      [stats[0].name]: stats[0].hdsv,
      [goalie2]: 77.5
    },
    {
      "stat": "GSAA",
      [stats[0].name]: stats[0].gsaa,
      [goalie2]: -3
    },
    {
      "stat": "HDGSAA",
      [stats[0].name]: stats[0].hdgsaa,
      [goalie2]: 98
    },
    {
      "stat": "xSV%",
      [stats[0].name]: stats[0].xsv,
      [goalie2]: 98
    }
  ];

  return(
    <div className="chart box">
      <ResponsiveRadar
      data={data}
      keys={[stats[0].name, goalie2]}
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
      enableDotLabel={true}
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
          "symbolShape": "circle",
          "effects": [
            {
              "on": "hover",
              "style": {
                "itemTextColor": "0066E5"
              }
            }
          ]
        }
      ]}
    />
    </div>
  )

};

export default Chart