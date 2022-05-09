import axios from "axios";
import React from "react";
import { Bar } from "react-chartjs-2";

const GroupedBar = (props) => {
  const { chartData, impact } = props;
  // const [chartData, setChartData] = React.useState([]);

  // const Chart = () => {
  //   axios
  //     .get(
  //       `http://localhost:4000/api/get/us-projects-graph?id=${id}&impact_id=1`
  //     )
  //     .then((res) => {
  //       console.log(res.data);
  //       setChartData([res.data.chartData]);
  //     });
  // };
  // React.useEffect(() => {
  //   Chart();
  //   console.log(impact);
  // }, []);

  return (
    <div>
      {chartData.map((data, i) => {
        return (
          <Bar
            key={i}
            data={data}
            options={{
              responsive: true,
              scales: {
                y: {
                  title: {
                    display: true,
                    text: `ผลกระทบด้าน${impact}`,
                  },
                  ticks: {
                    display: true,
                  },
                },
              },
            }}
          />
        );
      })}
    </div>
  );
};

export default GroupedBar;
