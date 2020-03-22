import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import UserRegister from "./UserRegister";
import ChatBox from "./ChatBox";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={UserRegister} exact />
        <Route path="/chat" render={() => <ChatBox username={localStorage.getItem("username")} />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
