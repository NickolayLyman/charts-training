import { Bar } from "react-chartjs-2";

const PageViewsChart = ({ date, pageViews }) => {
  const data = {
    labels: date,
    datasets: [
      {
        label: "Number of page views",
        data: pageViews,
        fill: false,
        backgroundColor: "#224664",
        borderColor: "#224664",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default PageViewsChart;
