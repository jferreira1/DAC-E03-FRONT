import Main from "./components/Main";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import VolumeInclusao from "./components/VolumeInclusao";
import VolumeDetalhe from "./components/VolumeDetalhe";
import ArtigoInclusao from "./components/ArtigoInclusao";
import ArtigoDetalhe from "./components/ArtigoDetalhe";
import AutorInclusao from "./components/AutorInclusao";
import AutorDetalhe from "./components/AutorDetalhe";

function App() {
  return (
    <BrowserRouter>
      <div className="App container my-2">
        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>
          <Route path="/volume/adicionar">
            <VolumeInclusao />
          </Route>
          <Route path="/volume/:volumeId" exact>
            <VolumeDetalhe />
          </Route>
          <Route path="/volume/:volumeId/artigo/adicionar">
            <ArtigoInclusao />
          </Route>
          <Route path="/volume/:volumeId/artigo/:artigoId" exact>
            <ArtigoDetalhe />
          </Route>
          <Route path="/volume/:volumeId/artigo/:artigoId/autor/adicionar">
            <AutorInclusao />
          </Route>
          <Route path="/volume/:volumeId/artigo/:artigoId/autor/:autorId" exact>
            <AutorDetalhe />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
