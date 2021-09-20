import { Button } from "reactstrap";
import { Link } from "react-router-dom";

const VolumeRow = (props) => {
  return (
    <tr>
      <td>{props.siglaEvento}</td>
      <td>{props.numeroEvento}</td>
      <td>{props.dataInicio}</td>
      <td>
        <Button color="primary" size="sm" tag={Link} to={"/volume/" + props.id}>
          VISUALIZAR
        </Button>{" "}
        <Button
          color="danger"
          size="sm"
          onClick={() => props.onDeletaVolume(props.id)}
        >
          REMOVER
        </Button>
      </td>
    </tr>
  );
};

export default VolumeRow;
