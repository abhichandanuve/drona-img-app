import React from "react";
import Chart from "react-apexcharts";

const getData = (data) => {
  const result = [];
  data.forEach((item) => {
    result.push(item.name);
  });
  return result;
};

const getAxis = (data, type) => {
  const result = [];
  data.forEach((item) => {
    const val = item[type];
    result.push({
      x: item.name,
      y: ((type === "height" || type === 'isFlagged') ? (typeof val === 'number' ? val : item["height"]) : val * 10 ** 5)?.toFixed(3),
    });
  });
  return result;
};

const MapChart = ({ analyticsData, onClickGraph }) => {
  const options = {
    chart: {
      id: "apexchart-example",
      events: {
        dataPointSelection: (event, chartContext, config) => {
          onClickGraph(config.dataPointIndex);
        },
      },
    },
    stroke: {
      show: true,
      curve: "straight",
      lineCap: "butt",
      // colors: ['red'],
      width: 2,
      dashArray: 0,
    },
    toolbar: {
      tools: {
        download: true,
        selection: true,
        zoom: true,
        zoomin: true,
        zoomout: true,
        pan: false,
        reset: true | '<img src="/static/icons/reset.png" width="20">',
        customIcons: [],
      },
      export: {
        csv: {
          filename: "DronaImage",
          columnDelimiter: ",",
          headerCategory: "category",
          headerValue: "value",
          dateFormatter(timestamp) {
            return new Date(timestamp).toDateString();
          },
        },
        svg: {
          filename: "DronaImage",
        },
        pdf: {
          filename: "DronaImage",
        },
        png: {
          filename: "DronaImage",
        },
      },
      autoSelected: "zoom",
    },
    plotOptions: {
      bar: {
        columnWidth: "75%",
        borderRadius: 8,
      },
    },
    xaxis: {
      categories: getData(analyticsData),
    },
  };
  const series = [
    {
      name: "Height",
      data: getAxis(analyticsData, "height"),
    },
    {
      name: "Speed (speed*10^5)",
      data: getAxis(analyticsData, "speed"),
    },
    {
      name: "isFlagged",
      data: getAxis(analyticsData, "isFlagged"),
    },
  ];
  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="bar"
        width={"100%"}
        height={320}
      />
    </div>
  );
};

export default MapChart;
