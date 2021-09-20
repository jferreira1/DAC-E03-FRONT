import { useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Form, FormGroup, Label, Input, Col, Button } from "reactstrap";
import instance from "../services/instance";

const AutorInclusao = () => {
  const params = useParams();
  let history = useHistory();

  const [autorInput, setAutorInput] = useState({
    enteredOrdem: "",
    enteredEmail: "",
    enteredNome: "",
    enteredNomeMeio: "",
    enteredSobrenome: "",
    enteredAfiliacao: "",
    enteredAfiliacaoEn: "",
    enteredPais: "",
    enteredOrcId: "",
  });
  console.log(autorInput);

  const ordemChangeHandler = (event) => {
    setAutorInput((prevState) => {
      return { ...prevState, enteredOrdem: event.target.value };
    });
  };
  const nomeChangeHandler = (event) => {
    setAutorInput((prevState) => {
      return { ...prevState, enteredNome: event.target.value };
    });
  };
  const nomeMeioChangeHandler = (event) => {
    setAutorInput((prevState) => {
      return { ...prevState, enteredNomeMeio: event.target.value };
    });
  };
  const sobrenomeChangeHandler = (event) => {
    setAutorInput((prevState) => {
      return { ...prevState, enteredSobrenome: event.target.value };
    });
  };
  const emailChangeHandler = (event) => {
    setAutorInput((prevState) => {
      return { ...prevState, enteredEmail: event.target.value };
    });
  };
  const afiliacaoChangeHandler = (event) => {
    setAutorInput((prevState) => {
      return { ...prevState, enteredAfiliacao: event.target.value };
    });
  };
  const afiliacaoEnChangeHandler = (event) => {
    setAutorInput((prevState) => {
      return { ...prevState, enteredAfiliacaoEn: event.target.value };
    });
  };
  const paisChangeHandler = (event) => {
    setAutorInput((prevState) => {
      return { ...prevState, enteredPais: event.target.value };
    });
  };
  const orcIdChangeHandler = (event) => {
    setAutorInput((prevState) => {
      return { ...prevState, enteredOrcId: event.target.value };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    instance
      .post("/autor/", {
        ordem: autorInput.enteredOrdem,
        email: autorInput.enteredEmail,
        nome: autorInput.enteredNome,
        nomeMeio: autorInput.enteredNomeMeio,
        sobrenome: autorInput.enteredSobrenome,
        afiliacao: autorInput.enteredAfiliacao,
        afiliacaoEn: autorInput.enteredAfiliacaoEn,
        pais: autorInput.enteredPais,
        orcId: autorInput.enteredOrcId,
        artigo: { id: params.artigoId },
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
        <h1 className="display-5 col-6 offset-lg-3">Adicionar autor</h1>
      </div>
      <br />
      <Form onSubmit={submitHandler}>
        <FormGroup row>
          <Label sm={2}>Ordem do autor: </Label>
          <Col sm={2}>
            <Input
              type="number"
              name="ordem"
              min={1}
              step="1"
              pattern={"[0-9]+"}
              onChange={ordemChangeHandler}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Nome:</Label>
          <Col sm={5}>
            <Input
              type="text"
              name="nome"
              placeholder="Máximo de 64 caracteres"
              onChange={nomeChangeHandler}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Nome do meio:</Label>
          <Col sm={5}>
            <Input
              type="text"
              name="nomeMeio"
              placeholder="Máximo de 64 caracteres"
              onChange={nomeMeioChangeHandler}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Sobrenome:</Label>
          <Col sm={5}>
            <Input
              type="text"
              name="sobrenome"
              placeholder="Máximo de 64 caracteres"
              onChange={sobrenomeChangeHandler}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Email:</Label>
          <Col sm={5}>
            <Input
              type="email"
              name="email"
              placeholder="user@email.com"
              onChange={emailChangeHandler}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Afiliação:</Label>
          <Col sm={5}>
            <Input
              type="text"
              name="afiliacao"
              placeholder="Máximo de 256 caracteres"
              onChange={afiliacaoChangeHandler}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Afiliação (inglês):</Label>
          <Col sm={5}>
            <Input
              type="text"
              name="afiliacao"
              placeholder="Máximo de 256 caracteres"
              onChange={afiliacaoEnChangeHandler}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>País:</Label>
          <Col sm={2}>
            <Input
              type="select"
              name="pais"
              onChange={paisChangeHandler}
              required
            >
              <option disabled selected value>
                Selecione um país
              </option>
              <option>BR</option>
              <option>PT</option>
              <option>US</option>
              <option>FR</option>
              <option>UK</option>
              <option>ES</option>
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>OrcID:</Label>
          <Col sm={5}>
            <Input
              type="text"
              name="orcid"
              placeholder="XXXX-XXXX-XXXX-XXXX"
              onChange={orcIdChangeHandler}
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
            to={"/volume/" + params.volumeId + "/artigo/" + params.artigoId}
          >
            CANCELAR
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
};

export default AutorInclusao;
