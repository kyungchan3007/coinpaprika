import { useQuery } from "react-query";
import { ICoinHistory } from "../type/CoinType";
import { fetchCoinHistory } from "../Api";
import ApexChart from "react-apexcharts";

interface CoinChart {
  coinId: string;
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
                mode: "dark",
                palette: "palette1",
                monochrome: {
                  enabled: false,
                  color: "#255aee",
                  shadeTo: "light",
                  shadeIntensity: 0.65,
                },
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
              dataLabels: {
                enabled: true,
                enabledOnSeries: undefined,
                formatter: function (
                  value,
                  { seriesIndex, dataPointIndex, w }
                ) {
                  // return w.config.series[seriesIndex].name + "ele:  " + value;
                  return `${props.coinId}: ` + value;
                },
                textAnchor: "middle",
                distributed: false,
                offsetX: 0,
                offsetY: 0,
                style: {
                  fontSize: "14px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: "bold",
                  colors: undefined,
                },
                background: {
                  enabled: true,
                  foreColor: "#fff",
                  padding: 4,
                  borderRadius: 2,
                  borderWidth: 1,
                  borderColor: "#fff",
                  opacity: 0.9,
                  dropShadow: {
                    enabled: false,
                    top: 1,
                    left: 1,
                    blur: 1,
                    color: "#000",
                    opacity: 0.45,
                  },
                },
                dropShadow: {
                  enabled: false,
                  top: 1,
                  left: 1,
                  blur: 1,
                  color: "#000",
                  opacity: 0.45,
                },
              },
            }}
          />
        )}
      </div>
    </>
  );
}
