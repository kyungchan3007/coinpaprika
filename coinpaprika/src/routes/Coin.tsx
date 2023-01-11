import { useLocation, useParams } from "react-router-dom";
import { CoinParam, RouteState, IInfodata, IPriceData } from "../type/CoinType";
import styled from "styled-components";
import { useEffect, useState } from "react";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

const Loader = styled.span`
  color: "white";
  text-align: center;
  display: block;
`;

export default function Coin() {
  const { coinId } = useParams<CoinParam>();
  const [loading, setLoading] = useState(true);
  const { state } = useLocation<RouteState>();
  const [info, setInfo] = useState<IInfodata>();
  const [priceInfo, setPriceInfo] = useState<IPriceData>();

  console.log(coinId);
  useEffect(() => {
    (async () => {
      const response = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();

      const priceDate = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();

      setInfo(response);
      setPriceInfo(priceDate);
      setLoading(false);
    })();
  }, [coinId]);

  return (
    <>
      <Container>
        <Header>
          <Title>{state?.name || "loading.."}</Title>
        </Header>
        {loading ? <Loader>...Loading</Loader> : null}
      </Container>
    </>
  );
}
