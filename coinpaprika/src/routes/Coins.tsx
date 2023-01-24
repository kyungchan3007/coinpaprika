import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../Api";
import { CoinInterface } from "../type/CoinType";
import { Helmet } from "react-helmet";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtome } from "../atoms";

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

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

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.textColor};
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  a {
    transition: color 0.2s ease-in;
    display: flex;
    padding: 20px;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Loader = styled.span`
  color: "white";
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

export default function Coins() {
  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //     const data = await response.json();
  //     setCoins(data.slice(0, 100));
  //     setLoading(false);
  //   })();
  // }, []);
  //리엑트 쿼리는 데이터를 캐시에 저장해두기 때문에 리렌더링 하지 않아도 데이터를 가져올수 있따
  const { isLoading, data } = useQuery<CoinInterface[]>("allCoins", fetchCoins);
  const setRecoilState = useSetRecoilState(isDarkAtome);
  const darkModeState = () => setRecoilState((prev) => !prev);
  const dark = useRecoilValue(isDarkAtome);
  return (
    <Container>
      <Helmet>
        <title>Coin</title>
      </Helmet>
      <Header>
        <Title>Coin</Title>
        <button onClick={darkModeState}>
          {dark ? "LightMode" : "DarkMode"}
        </button>
      </Header>
      {isLoading ? (
        <Loader>...Loading</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((el) => (
            <Coin key={el.id}>
              <Link
                to={{
                  pathname: `/${el.id}`,
                  state: { name: el.name },
                }}
              >
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${el.symbol.toLocaleLowerCase()}`}
                />
                {el.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
