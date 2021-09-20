import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Form, FormGroup, Label, Input, Col, Button, Table } from "reactstrap";

import instance from "../services/instance";

const VolumeDetalhe = () => {
  const params = useParams();
  let history = useHistory();

  const [volume, setVolume] = useState({});
  const [artigos, setArtigos] = useState({});
  const [isArtigosLoaded, setIsArtigosLoaded] = useState(false);
  const [wasDeleted, setWasDeleted] = useState(false);

  const [volumeInput, setVolumeInput] = useState({
    enteredSiglaEvento: "",
    enteredCidadeEvento: "",
    enteredDataInicio: "",
    enteredDescPt: "",
    enteredDescEn: "",
    enteredNumeroEvento: "",
  });

  useEffect(() => {
    instance
      .get("/volume/listar/" + params.volumeId)
      .then(function (response) {
        setVolume(response.data);
      })
      .catch(function () {})
      .then(function () {});
  }, [params.volumeId]);

  useEffect(() => {
    instance
      .get("/artigo/listar/volume/" + params.volumeId)
      .then(function (response) {
        setArtigos(response.data);
        setIsArtigosLoaded(true);
        setWasDeleted(false);
      })
      .catch(function () {})
      .then(function () {});
  }, [params.volumeId, wasDeleted]);

  const deletaArtigo = (artigoId) => {
    instance
      .delete("/artigo/", { data: { id: artigoId } })
      .then(function (response) {
        setWasDeleted(true);
        console.log(response);
      })
      .catch(function (error) {})
      .then(function () {});
  };

  const siglaEventoChangeHandler = (event) => {
    setVolumeInput((prevState) => {
      return { ...prevState, enteredSiglaEvento: event.target.value };
    });
  };

  const cidadeEventoChangeHandler = (event) => {
    setVolumeInput((prevState) => {
      return { ...prevState, enteredCidadeEvento: event.target.value };
    });
  };

  const dataInicioChangeHandler = (event) => {
    setVolumeInput((prevState) => {
      return { ...prevState, enteredDataInicio: event.target.value };
    });
  };

  const descPtChangeHandler = (event) => {
    setVolumeInput((prevState) => {
      return { ...prevState, enteredDescPt: event.target.value };
    });
  };

  const descEnChangeHandler = (event) => {
    setVolumeInput((prevState) => {
      return { ...prevState, enteredDescEn: event.target.value };
    });
  };

  const numeroEventoChangeHandler = (event) => {
    setVolumeInput((prevState) => {
      return { ...prevState, enteredNumeroEvento: event.target.value };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (volumeInput.enteredCidadeEvento === "")
      volumeInput.enteredCidadeEvento = volume.cidadeEvento;
    if (volumeInput.enteredSiglaEvento === "")
      volumeInput.enteredSiglaEvento = volume.siglaEvento;
    if (volumeInput.enteredDataInicio === "")
      volumeInput.enteredDataInicio = volume.dataInicio;
    if (volumeInput.enteredDescPt === "")
      volumeInput.enteredDescPt = volume.descPt;
    if (volumeInput.enteredDescEn === "")
      volumeInput.enteredDescEn = volume.descEn;
    if (volumeInput.enteredNumeroEvento === "")
      volumeInput.enteredNumeroEvento = volume.numeroEvento;

    instance
      .put("/volume/", {
        id: params.volumeId,
        cidadeEvento: volumeInput.enteredCidadeEvento,
        siglaEvento: volumeInput.enteredSiglaEvento,
        dataInicio: volumeInput.enteredDataInicio,
        descPt: volumeInput.enteredDescPt,
        descEn: volumeInput.enteredDescEn,
        numeroEvento: volumeInput.enteredNumeroEvento,
      })
      .then(function (response) {
        console.log(response);
        history.goBack();
      })
      .catch(function () {})
      .then(function () {});
  };

  return (
    <div>
      <div className="row justify-content-center">
        <h1 className="display-5 col-6 offset-lg-3">Editar volume</h1>
      </div>
      <br />
      <Form onSubmit={submitHandler}>
        <FormGroup row>
          <Label sm={2}>Sigla do evento:</Label>
          <Col sm={5}>
            <Input
              type="text"
              name="siglaEvento"
              placeholder="Máximo de 32 caracteres"
              defaultValue={volume.siglaEvento}
              onChange={siglaEventoChangeHandler}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Número do evento:</Label>
          <Col sm={2}>
            <Input
              type="number"
              name="numeroEvento"
              min={1}
              step="1"
              pattern={"[0-9]+"}
              defaultValue={volume.numeroEvento}
              onChange={numeroEventoChangeHandler}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Cidade:</Label>
          <Col sm={5}>
            <Input
              type="text"
              name="cidade"
              placeholder="Máximo de 64 caracteres"
              defaultValue={volume.cidadeEvento}
              onChange={cidadeEventoChangeHandler}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Data de início:</Label>
          <Col sm={2}>
            <Input
              type="date"
              name="dataInicio"
              defaultValue={volume.dataInicio}
              onChange={dataInicioChangeHandler}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Descrição:</Label>
          <Col sm={15}>
            <Input
              type="textarea"
              name="descPt"
              placeholder="Máximo de 2048 caracteres"
              defaultValue={volume.descPt}
              onChange={descPtChangeHandler}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Descrição (inglês):</Label>
          <Col sm={15}>
            <Input
              type="textarea"
              name="descEn"
              placeholder="Máximo de 2048 caracteres"
              defaultValue={volume.descEn}
              onChange={descEnChangeHandler}
              required
            />
          </Col>
        </FormGroup>
        <br />
        <FormGroup row className="row justify-content-around">
          <Button color="success" size="sm" className="col-4" type="submit">
            ENVIAR
          </Button>{" "}
          <Button
            color="danger"
            size="sm"
            className="col-4"
            tag={Link}
            to={"/"}
          >
            CANCELAR
          </Button>
        </FormGroup>
      </Form>
      <br />
      <br />
      <div className="row justify-content-around">
        <h1 className="display-5 col">Artigos associados</h1>
        <Button
          color="success"
          size="SM"
          className="col-md-2 col-lg-1"
          tag={Link}
          to={"/volume/" + params.volumeId + "/artigo/adicionar"}
        >
          ADICIONAR ARTIGO
        </Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th width="50%">Título</th>
            <th width="15%">Ordem</th>
            <th width="25%">Ações</th>
          </tr>
        </thead>
        <tbody>
          {isArtigosLoaded &&
            artigos
              .sort((a, b) =>
                a.ordem > b.ordem ? 1 : b.ordem > a.ordem ? -1 : 0
              )
              .map((artigo) => (
                <tr key={artigo.id}>
                  <td>{artigo.titulo}</td>
                  <td>{artigo.ordem}</td>
                  <td>
                    <Button
                      color="primary"
                      size="sm"
                      tag={Link}
                      to={"/volume/" + volume.id + "/artigo/" + artigo.id}
                    >
                      VISUALIZAR
                    </Button>{" "}
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => deletaArtigo(artigo.id)}
                    >
                      REMOVER
                    </Button>
                  </td>
                </tr>
              ))}
        </tbody>
      </Table>
    </div>
  );
};

export default VolumeDetalhe;
