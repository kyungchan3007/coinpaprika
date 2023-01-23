import { useQuery } from "react-query";
import { ICoinHistory } from "../type/CoinType";
import { fetchCoinHistory } from "../Api";
import ApexChart from "react-apexcharts";

interface CoinChart {
  coinId: string;
  dark?: boolean;
}

export default function Carht(props: CoinChart) {
  const { isLoading, data } = useQuery<ICoinHistory[]>(
    ["ohlcv", props.coinId], // 배열을 만들어서 고유ID 부여
    () => fetchCoinHistory(props.coinId)
  );

  return (
    <>
      <div>
        {isLoading ? (
          "Loading chart..."
        ) : (
          <ApexChart
            type="line"
            series={[
              {
                name: props.coinId,
                data: data?.map((el) => Number(el?.close)) as number[],
              },
            ]}
            options={{
              theme: {
                mode: props.dark ? "dark" : "light",
              },
              stroke: {
                curve: "smooth",
                width: 5,
              },
              chart: {
                toolbar: {
                  show: false,
                },
              },
              legend: {
                markers: {
                  fillColors: ["#ff4040"],
                },
              },
              grid: {
                show: false,
              },
              xaxis: {
                labels: {
                  show: false,
                },
                axisBorder: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
              },
              fill: {
                type: "gradient",
                // gradient: { gradientToColors: ["blue"] },
                gradient: {
                  colorStops: [
                    {
                      offset: 0,
                      color: "blue",
                      opacity: 1,
                    },
                    {
                      offset: 20,
                      color: "blue",
                      opacity: 1,
                    },
                    {
                      offset: 60,
                      color: "yellow",
                      opacity: 1,
                    },
                    {
                      offset: 100,
                      color: "red",
                      opacity: 1,
                    },
                  ],
                },
              },

              // dataLabels: {
              //   enabled: true,
              //   enabledOnSeries: undefined,
              //   formatter: function (
              //     value,
              //     { seriesIndex, dataPointIndex, w }
              //   ) {
              //     // return w.config.series[seriesIndex].name + "ele:  " + value;
              //     return +value;
              //   },
              //   textAnchor: "middle",
              //   distributed: false,
              //   offsetX: 0,
              //   offsetY: 0,
              //   style: {
              //     fontSize: "14px",
              //     fontFamily: "Helvetica, Arial, sans-serif",
              //     fontWeight: "bold",
              //     colors: undefined,
              //   },
              //   background: {
              //     enabled: true,
              //     foreColor: "#fff",
              //     padding: 4,
              //     borderRadius: 2,
              //     borderWidth: 1,
              //     borderColor: "#fff",
              //     opacity: 0.9,
              //     dropShadow: {
              //       enabled: false,
              //       top: 1,
              //       left: 1,
              //       blur: 1,
              //       color: "#000",
              //       opacity: 0.45,
              //     },
              //   },
              //   dropShadow: {
              //     enabled: false,
              //     top: 1,
              //     left: 1,
              //     blur: 1,
              //     color: "#000",
              //     opacity: 0.45,
              //   },
              // },
            }}
          />
        )}
      </div>
    </>
  );
}
