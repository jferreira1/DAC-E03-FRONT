import { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Form, FormGroup, Label, Input, Col, Button, Table } from "reactstrap";
import instance from "../services/instance";

const ArtigoDetalhe = () => {
  const params = useParams();
  let history = useHistory();
  const [artigo, setArtigo] = useState({});
  const [autores, setAutores] = useState({});
  const [isAutoresLoaded, setIsAutoresLoaded] = useState(false);
  const [wasDeleted, setWasDeleted] = useState(false);

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

  useEffect(() => {
    instance
      .get("/artigo/listar/" + params.artigoId)
      .then(function (response) {
        setArtigo(response.data);
      })
      .catch(function () {})
      .then(function () {});
  }, [params.artigoId]);

  useEffect(() => {
    instance
      .get("/autor/listar/artigo/" + params.artigoId)
      .then(function (response) {
        setAutores(response.data);
        setIsAutoresLoaded(true);
        setWasDeleted(false);
      })
      .catch(function () {})
      .then(function () {});
  }, [params.artigoId, wasDeleted]);

  const deletaAutor = (autorId, autorEmail, autorOrcId) => {
    instance
      .delete("/autor/", {
        data: { id: autorId, email: autorEmail, orcId: autorOrcId },
      })
      .then(function (response) {
        console.log(response);
        setWasDeleted(true);
      })
      .catch(function (error) {})
      .then(function () {});
  };

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

    if (artigoInput.enteredOrdem === "")
      artigoInput.enteredOrdem = artigo.ordem;
    if (artigoInput.enteredIdioma === "")
      artigoInput.enteredIdioma = artigo.idioma;
    if (artigoInput.enteredTitulo === "")
      artigoInput.enteredTitulo = artigo.titulo;
    if (artigoInput.enteredTituloEn === "")
      artigoInput.enteredTituloEn = artigo.tituloEn;
    if (artigoInput.enteredResumo === "")
      artigoInput.enteredResumo = artigo.resumo;
    if (artigoInput.enteredResumoEn === "")
      artigoInput.enteredResumoEn = artigo.resumoEn;
    if (artigoInput.enteredKeywords === "")
      artigoInput.enteredKeywords = artigo.keywords;
    if (artigoInput.enteredKeywordsEn === "")
      artigoInput.enteredKeywordsEn = artigo.keywordsEn;
    if (artigoInput.enteredNumPaginas === "")
      artigoInput.enteredNumPaginas = artigo.numPaginas;

    instance
      .put("/artigo/", {
        id: params.artigoId,
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
    <>
      <div className="row justify-content-center">
        <h1 className="display-5 col-6 offset-lg-3">Editar artigo</h1>
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
              defaultValue={artigo.ordem}
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
              defaultValue={artigo.titulo}
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
              defaultValue={artigo.tituloEn}
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
              defaultValue={artigo.idioma}
              required
            >
              <option disabled>Selecione um idioma</option>
              {artigo.idioma === "PT" ? (
                <option selected>PT</option>
              ) : (
                <option>PT</option>
              )}
              {artigo.idioma === "EN" ? (
                <option selected>EN</option>
              ) : (
                <option>EN</option>
              )}
              {artigo.idioma === "ES" ? (
                <option selected>ES</option>
              ) : (
                <option>ES</option>
              )}
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
              defaultValue={artigo.numPaginas}
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
              defaultValue={artigo.resumo}
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
              defaultValue={artigo.resumoEn}
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
              defaultValue={artigo.keywords}
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
              defaultValue={artigo.keywordsEn}
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
      <br />
      <br />
      <div className="row justify-content-around">
        <h1 className="display-5 col">Autores associados</h1>
        <Button
          color="success"
          size="SM"
          className="col-md-2 col-lg-1"
          tag={Link}
          to={
            "/volume/" +
            params.volumeId +
            "/artigo/" +
            params.artigoId +
            "/autor/adicionar"
          }
        >
          ADICIONAR AUTOR
        </Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th width="50%">Nome</th>
            <th width="15%">Ordem</th>
            <th width="25%">Ações</th>
          </tr>
        </thead>
        <tbody>
          {isAutoresLoaded &&
            autores
              .sort((a, b) =>
                a.ordem > b.ordem ? 1 : b.ordem > a.ordem ? -1 : 0
              )
              .map((autor) => (
                <tr key={autor.id}>
                  <td>
                    {(
                      autor.nome +
                      " " +
                      autor.nomeMeio +
                      " " +
                      autor.sobrenome
                    ).trim()}
                  </td>
                  <td>{autor.ordem}</td>
                  <td>
                    <Button
                      color="primary"
                      size="sm"
                      tag={Link}
                      to={
                        "/volume/" +
                        params.volumeId +
                        "/artigo/" +
                        params.artigoId +
                        "/autor/" +
                        autor.id
                      }
                    >
                      VISUALIZAR
                    </Button>{" "}
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() =>
                        deletaAutor(autor.id, autor.email, autor.orcId)
                      }
                    >
                      REMOVER
                    </Button>
                  </td>
                </tr>
              ))}
        </tbody>
      </Table>
    </>
  );
};

export default ArtigoDetalhe;
