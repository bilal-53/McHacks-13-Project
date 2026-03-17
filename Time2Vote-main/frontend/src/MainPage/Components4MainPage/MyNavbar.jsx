import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import CapitolDome from "../../images/CapitolDome.png"

function MyNavbar(props) {
  const questionModalHandler = () => {
    props.onQuestionClicked();
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <img src={CapitolDome} height="40px"></img>
        <Navbar.Brand href="#home">Time2Vote</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button onClick={questionModalHandler} variant="light">
            Ask Question
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default MyNavbar;
