import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Price from "./routes/Price";
export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:coinId">
          {" "}
          {/* 코인 페이지에서 useParam 으로 파라메터값인 coinId를 잡을수 있다*/}
          <Coin />
        </Route>
        <Route path={"/"}>
          <Coins></Coins>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
