import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button, ButtonGroup } from "reactstrap";
import VolumeRow from "./VolumeRow";

import instance from "../services/instance";

function Main() {
  const [volumes, setVolumes] = useState([]);
  const [wasClicked, setWasClicked] = useState(false);
  const [orderAlphabetical, setOrderAlphabetical] = useState(true);
  const [orderByDate, setOrderByDate] = useState(false);

  const deletaVolume = (volumeId) => {
    instance
      .delete("/volume/", { data: { id: volumeId } })
      .then(function (response) {
        console.log(response);
        setWasClicked(true);
      })
      .catch(function (error) {})
      .then(function () {});
  };
  // GET Volumes da API
  useEffect(() => {
    instance
      .get("/volume/listar")
      .then(function (response) {
        setVolumes(response.data);
        setWasClicked(false);

        console.log(response);
      })
      .catch(function () {})
      .then(function () {});
  }, [wasClicked, orderAlphabetical, orderByDate]);

  return (
    <>
      <div className="row justify-content-end">
        <h1 className="display-5 col">Volumes</h1>

        <Button
          color="success"
          size="SM"
          className="col-md-2 col-lg-1"
          tag={Link}
          to="/volume/adicionar"
        >
          ADICIONAR VOLUME
        </Button>
      </div>
      <div>
        Ordenar por:{" "}
        <ButtonGroup>
          <Button
            color="primary"
            onClick={() => {
              setOrderAlphabetical(true);
              setOrderByDate(false);
            }}
            active={orderAlphabetical === true}
          >
            Sigla
          </Button>
          <Button
            color="primary"
            onClick={() => {
              setOrderAlphabetical(false);
              setOrderByDate(true);
            }}
            active={orderByDate === true}
          >
            Data
          </Button>
        </ButtonGroup>
      </div>
      <Table>
        <thead>
          <tr>
            <th width="30%">Evento</th>
            <th width="20%">Edição</th>
            <th width="20%">Data</th>
            <th width="30%">Ações</th>
          </tr>
        </thead>
        <tbody>
          {orderAlphabetical
            ? volumes
                .sort((a, b) =>
                  a.siglaEvento > b.siglaEvento
                    ? 1
                    : b.siglaEvento > a.siglaEvento
                    ? -1
                    : 0
                )
                .map((volume) => {
                  return (
                    <VolumeRow
                      key={volume.id}
                      id={volume.id}
                      siglaEvento={volume.siglaEvento}
                      numeroEvento={volume.numeroEvento}
                      dataInicio={volume.dataInicio}
                      onDeletaVolume={deletaVolume}
                    />
                  );
                })
            : volumes
                .sort((a, b) =>
                  a.dataInicio < b.dataInicio
                    ? 1
                    : b.dataInicio < a.dataInicio
                    ? -1
                    : 0
                )
                .map((volume) => {
                  return (
                    <VolumeRow
                      key={volume.id}
                      id={volume.id}
                      siglaEvento={volume.siglaEvento}
                      numeroEvento={volume.numeroEvento}
                      dataInicio={volume.dataInicio}
                      onDeletaVolume={deletaVolume}
                    />
                  );
                })}
        </tbody>
      </Table>
    </>
  );
}

export default Main;
