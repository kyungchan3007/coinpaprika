import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Price from "./routes/Price";
export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:coinId">
          <Coin />
        </Route>
        <Route path={"/"}>
          <Coins></Coins>
        </Route>
        {/* <Route path={"/"}>
          <Price />
        </Route> */}
      </Switch>
    </BrowserRouter>
  );
}
