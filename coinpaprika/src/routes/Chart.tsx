import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { CoinParam, IInfodata } from "../type/CoinType";
import { fetchCoinHistory } from "../Api";

interface CoinChart {
  coinId: string;
}

export default function Carht(props: CoinChart) {
  const { isLoading, data } = useQuery(
    ["ohlcv", props.coinId], // 배열을 만들어서 고유ID 부여
    () => fetchCoinHistory(props.coinId)
  );
  console.log(data);

  return (
    <>
      <div>Chart</div>
    </>
  );
}
