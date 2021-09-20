import { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Form, FormGroup, Label, Input, Col, Button } from "reactstrap";
import instance from "../services/instance";

const AutorDetalhe = () => {
  const params = useParams();
  let history = useHistory();
  const [autor, setAutor] = useState({});

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

  useEffect(() => {
    instance
      .get("/autor/listar/" + params.autorId)
      .then(function (response) {
        setAutor(response.data);
      })
      .catch(function () {})
      .then(function () {});
  }, [params.autorId]);

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

    if (autorInput.enteredOrdem === "") autorInput.enteredOrdem = autor.ordem;
    if (autorInput.enteredNome === "") autorInput.enteredNome = autor.nome;
    if (autorInput.enteredNomeMeio === "")
      autorInput.enteredNomeMeio = autor.nomeMeio;
    if (autorInput.enteredSobrenome === "")
      autorInput.enteredSobrenome = autor.sobrenome;
    if (autorInput.enteredEmail === "") autorInput.enteredEmail = autor.email;
    if (autorInput.enteredAfiliacao === "")
      autorInput.enteredAfiliacao = autor.afiliacao;
    if (autorInput.enteredAfiliacaoEn === "")
      autorInput.enteredAfiliacaoEn = autor.afiliacaoEn;
    if (autorInput.enteredPais === "") autorInput.enteredPais = autor.pais;
    if (autorInput.enteredOrcId === "") autorInput.enteredOrcId = autor.orcId;

    instance
      .put("/autor/", {
        id: params.autorId,
        ordem: autorInput.enteredOrdem,
        nome: autorInput.enteredNome,
        nomeMeio: autorInput.enteredNomeMeio,
        sobrenome: autorInput.enteredSobrenome,
        email: autorInput.enteredEmail,
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
        <h1 className="display-5 col-6 offset-lg-3">Editar autor</h1>
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
              defaultValue={autor.ordem}
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
              defaultValue={autor.nome}
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
              defaultValue={autor.nomeMeio}
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
              defaultValue={autor.sobrenome}
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
              defaultValue={autor.email}
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
              defaultValue={autor.afiliacao}
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
              defaultValue={autor.afiliacaoEn}
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
              selected={autor.pais}
              required
            >
              <option disabled>Selecione um país</option>
              {autor.pais === "BR" ? (
                <option selected>BR</option>
              ) : (
                <option>BR</option>
              )}
              {autor.pais === "PT" ? (
                <option selected>PT</option>
              ) : (
                <option>PT</option>
              )}
              {autor.pais === "US" ? (
                <option selected>US</option>
              ) : (
                <option>US</option>
              )}
              {autor.pais === "FR" ? (
                <option selected>FR</option>
              ) : (
                <option>FR</option>
              )}
              {autor.pais === "UK" ? (
                <option selected>UK</option>
              ) : (
                <option>UK</option>
              )}
              {autor.pais === "ES" ? (
                <option selected>ES</option>
              ) : (
                <option>ES</option>
              )}
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
              defaultValue={autor.orcId}
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

export default AutorDetalhe;
