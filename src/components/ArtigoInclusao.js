import { useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Form, FormGroup, Label, Input, Col, Button } from "reactstrap";
import instance from "../services/instance";

const ArtigoInclusao = () => {
  const params = useParams();
  let history = useHistory();

  const [artigoInput, setArtigoInput] = useState({
    enteredOrdem: "",
    enteredIdioma: "",
    enteredTitulo: "",
    enteredTituloEn: "",
    enteredResumo: "",
    enteredResumoEn: "",
    enteredKeywords: "",
    enteredKeywordsEn: "",
    enteredNumPaginas: "",
  });
  console.log(artigoInput);

  const ordemChangeHandler = (event) => {
    setArtigoInput((prevState) => {
      return { ...prevState, enteredOrdem: event.target.value };
    });
  };
  const tituloChangeHandler = (event) => {
    setArtigoInput((prevState) => {
      return { ...prevState, enteredTitulo: event.target.value };
    });
  };
  const tituloEnChangeHandler = (event) => {
    setArtigoInput((prevState) => {
      return { ...prevState, enteredTituloEn: event.target.value };
    });
  };
  const idiomaChangeHandler = (event) => {
    setArtigoInput((prevState) => {
      return { ...prevState, enteredIdioma: event.target.value };
    });
  };
  const numPaginasChangeHandler = (event) => {
    setArtigoInput((prevState) => {
      return { ...prevState, enteredNumPaginas: event.target.value };
    });
  };
  const resumoChangeHandler = (event) => {
    setArtigoInput((prevState) => {
      return { ...prevState, enteredResumo: event.target.value };
    });
  };
  const resumoEnChangeHandler = (event) => {
    setArtigoInput((prevState) => {
      return { ...prevState, enteredResumoEn: event.target.value };
    });
  };
  const keywordsChangeHandler = (event) => {
    setArtigoInput((prevState) => {
      return { ...prevState, enteredKeywords: event.target.value };
    });
  };
  const keywordsEnChangeHandler = (event) => {
    setArtigoInput((prevState) => {
      return { ...prevState, enteredKeywordsEn: event.target.value };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    instance
      .post("/artigo/", {
        ordem: artigoInput.enteredOrdem,
        idioma: artigoInput.enteredIdioma,
        titulo: artigoInput.enteredTitulo,
        tituloEn: artigoInput.enteredTituloEn,
        resumo: artigoInput.enteredResumo,
        resumoEn: artigoInput.enteredResumoEn,
        keywords: artigoInput.enteredKeywords,
        keywordsEn: artigoInput.enteredKeywordsEn,
        numPaginas: artigoInput.enteredNumPaginas,
        volume: { id: params.volumeId },
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
        <h1 className="display-5 col-6 offset-lg-3">Adicionar artigo</h1>
      </div>
      <br />
      <Form onSubmit={submitHandler}>
        <FormGroup row>
          <Label sm={2}>Ordem do artigo: </Label>
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
          <Label sm={2}>Titulo (original):</Label>
          <Col sm={5}>
            <Input
              type="text"
              name="titulo"
              placeholder="Máximo de 256 caracteres"
              onChange={tituloChangeHandler}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Titulo (inglês):</Label>
          <Col sm={5}>
            <Input
              type="text"
              name="tituloEn"
              placeholder="Máximo de 256 caracteres"
              onChange={tituloEnChangeHandler}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Idioma:</Label>
          <Col sm={2}>
            <Input
              type="select"
              name="idioma"
              onChange={idiomaChangeHandler}
              required
            >
              <option disabled selected value>
                Selecione um idioma
              </option>
              <option>PT</option>
              <option>EN</option>
              <option>ES</option>
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Número de páginas: </Label>
          <Col sm={1}>
            <Input
              type="number"
              name="numPaginas"
              min={1}
              step="1"
              pattern={"[0-9]+"}
              onChange={numPaginasChangeHandler}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Resumo (original):</Label>
          <Col sm={15}>
            <Input
              type="textarea"
              name="resumo"
              placeholder="Máximo de 2048 caracteres"
              onChange={resumoChangeHandler}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Resumo (inglês):</Label>
          <Col sm={15}>
            <Input
              type="textarea"
              name="resumoEn"
              placeholder="Máximo de 2048 caracteres"
              onChange={resumoEnChangeHandler}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Palavras-chave (original):</Label>
          <Col sm={5}>
            <Input
              type="text"
              name="keywords"
              placeholder="Máximo de 256 caracteres, separadas por ;"
              onChange={keywordsChangeHandler}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Palavras-chave (inglês):</Label>
          <Col sm={5}>
            <Input
              type="text"
              name="keywordsEn"
              placeholder="Máximo de 256 caracteres"
              onChange={keywordsEnChangeHandler}
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
            to={"/volume/" + params.volumeId}
          >
            CANCELAR
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
};

export default ArtigoInclusao;
