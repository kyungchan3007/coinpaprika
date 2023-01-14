import {
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
  Link,
} from "react-router-dom";
import { CoinParam, RouteState, IInfodata, IPriceData } from "../type/CoinType";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Price from "./Price";
import Chart from "./Chart";

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

const Overiew = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OveriewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  text-transform: uppercase;
  margin-top: 1px;
  span {
    font-size: 20px;
    margin-top: 13px;
  }
`;
const OveriewItem2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  text-transform: uppercase;
`;

const OveriewItem3 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-transform: uppercase;
  width: 100%;
  span {
    font-size: 20px;
    margin-top: 13px;
  }
`;
const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-top: 5px;
`;

const Description = styled.p`
  margin: 20px 0px 20px 10px;
  align-items: center;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* grid-template-columns: 1fr 1fr 1fr 1fr; */
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

export default function Coin() {
  const { coinId } = useParams<CoinParam>();
  const [loading, setLoading] = useState(true);
  const { state } = useLocation<RouteState>();
  const [info, setInfo] = useState<IInfodata>();
  const [priceInfo, setPriceInfo] = useState<IPriceData>();
  const priceMatch = useRouteMatch("/:coinId/price"); // Url이 있는지 검사
  const chartMatch = useRouteMatch("/:coinId/chart");
  console.log(priceMatch !== null);
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
          <Title>
            {state?.name ? state.name : loading ? "Loading..." : info?.name}
          </Title>
        </Header>

        {loading ? (
          <Loader>...Loading</Loader>
        ) : (
          <>
            <Overiew>
              <OveriewItem>
                Rank
                <span>{info?.rank}</span>
              </OveriewItem>
              <OveriewItem2>
                Symbol
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${info?.symbol.toLocaleLowerCase()}`}
                />
              </OveriewItem2>
              <OveriewItem3>
                Open Source
                <span>{info?.open_source ? "YES" : "NO"}</span>
              </OveriewItem3>
            </Overiew>
            <Description>{info?.description}</Description>
            <Overiew>
              <OveriewItem>
                Total Suply
                <span>{priceInfo?.total_supply}</span>
              </OveriewItem>
              <OveriewItem3>
                Max Supply
                <span>{priceInfo?.max_supply}</span>
              </OveriewItem3>
            </Overiew>
            <Tabs>
              <Tab isActive={chartMatch !== null}>
                <Link to={`/${coinId}/chart`}>Chart</Link>
              </Tab>
              <Tab isActive={priceMatch !== null}>
                <Link to={`/${coinId}/price`}>Price</Link>
              </Tab>
            </Tabs>

            <Switch>
              <Route path={`/:coinId/price`}>
                <Price />
              </Route>
              <Route path={`/:coinId/chart`}>
                <Chart />
              </Route>
            </Switch>
          </>
        )}
      </Container>
    </>
  );
}
