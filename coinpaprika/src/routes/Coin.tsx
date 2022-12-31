import { useParams } from "react-router-dom";
import { CoinParam } from "../type/CoinType";

export default function Coin() {
  const { coinId } = useParams<CoinParam>();

  return <h1>Coin: {coinId}</h1>;
}
