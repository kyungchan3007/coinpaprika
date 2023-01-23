import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import { IToogleClick } from "../src/type/CoinType";
export default function Router(props: IToogleClick) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:coinId">
          {" "}
          {/* 코인 페이지에서 useParam 으로 파라메터값인 coinId를 잡을수 있다*/}
          <Coin dark={props.dark} />
        </Route>
        <Route path={"/"}>
          <Coins toggleDark={props.toggleDark}></Coins>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
