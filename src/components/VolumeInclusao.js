import { useState } from "react";
import { Form, FormGroup, Label, Input, Col, Button } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import instance from "../services/instance";

const VolumeInclusao = () => {
  let history = useHistory();

  const [volumeInput, setVolumeInput] = useState({
    enteredSiglaEvento: "",
    enteredCidadeEvento: "",
    enteredDataInicio: "",
    enteredDescPt: "",
    enteredDescEn: "",
    enteredNumeroEvento: "",
  });
  console.log(volumeInput);

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

    instance
      .post("/volume/", {
        cidadeEvento: volumeInput.enteredCidadeEvento,
        siglaEvento: volumeInput.enteredSiglaEvento,
        dataInicio: volumeInput.enteredDataInicio,
        descPt: volumeInput.enteredDescPt,
        descEn: volumeInput.enteredDescEn,
        numeroEvento: volumeInput.enteredNumeroEvento,
      })
      .then(function (response) {
        console.log(response);
        history.push("/");
      })
      .catch(function () {})
      .then(function () {});
  };

  return (
    <div>
      <div className="row justify-content-center">
        <h1 className="display-5 col-6 offset-lg-3">Adicionar volume</h1>
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
              onChange={dataInicioChangeHandler}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Descrição (português):</Label>
          <Col sm={15}>
            <Input
              type="textarea"
              name="descPt"
              placeholder="Máximo de 2048 caracteres"
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
    </div>
  );
};

export default VolumeInclusao;
