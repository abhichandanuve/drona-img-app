import React from "react";
import Chart from "react-apexcharts";

const getData = (data) => {
  const result = [];
  data.forEach((item) => {
    result.push(item.metadata.name);
  });
  return result;
};

const getAxis = (data, type) => {
  const result = [];
  data.forEach((item) => {
    const val = item.metadata[type];
    result.push({
      x: item.metadata.name,
      y: (type === "height" ? val : val * 10 ** 5).toFixed(3),
    });
  });
  return result;
};

const MapChart = ({ images }) => {
  const data = [
    {
      metadata: {
        width: 5472,
        height: 403.93700787401576,
        make: "DJI\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000",
        model:
          "FC6310\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000",
        dateTime: "2022:09:26 12:58:53",
        speed: 0.0005002718862464851,
        lat: 170.18611111111113,
        lng: 128.51638888888888,
        isFlaged: true,
        name: "DJI_0010.JPG",
      },
    },
    {
      metadata: {
        width: 5472,
        height: 403.93700787401576,
        make: "DJI\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000",
        model:
          "FC6310\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000",
        dateTime: "2022:09:26 12:57:51",
        speed: 0.00040019756232300617,
        lat: 166.18611111111113,
        lng: 128.01638888888888,
        isFlaged: true,
        name: "DJI_0009.JPG",
      },
    },
    {
      metadata: {
        width: 5472,
        height: 403.93700787401576,
        make: "DJI\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000",
        model:
          "FC6310\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000",
        dateTime: "2022:09:26 12:57:50",
        speed: 0.00040019756232300617,
        lat: 166.83083333333335,
        lng: 128.09527777777777,
        isFlaged: true,
        name: "DJI_0008.JPG",
      },
    },
    {
      metadata: {
        width: 5472,
        height: 403.93700787401576,
        make: "DJI\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000",
        model:
          "FC6310\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000",
        dateTime: "2022:09:26 12:57:45",
        speed: 0.0005002718862464851,
        lat: 169.8025,
        lng: 128.46583333333334,
        isFlaged: true,
        name: "DJI_0005.JPG",
      },
    },
    {
      metadata: {
        width: 5472,
        height: 403.93700787401576,
        make: "DJI\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000",
        model:
          "FC6310\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000",
        dateTime: "2022:09:26 12:57:44",
        speed: 0.0005002718862464851,
        lat: 170.08916666666667,
        lng: 128.49916666666667,
        isFlaged: true,
        name: "DJI_0004.JPG",
      },
    },
  ];
  const options = {
    chart: {
      id: "apexchart-example",
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
      categories: getData(data),
    },
  };
  const series = [
    {
      name: "Height",
      data: getAxis(data, "height"),
    },
    {
      name: "Speed (speed*10^5)",
      data: getAxis(data, "speed"),
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
