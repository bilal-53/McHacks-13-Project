import { useParams } from "react-router-dom";
import { useState, useEffect, Component, useRef } from "react";
import { db } from "../api/firebase";
import { onValue, ref, set } from "firebase/database";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/esm/Container";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function MyFeedbackPage() {
  const { voteId } = useParams();

  const [issue, setIssue] = useState([]);
  const [options, setOptions] = useState([]);
  const [communityPost, setCommunityPost] = useState();
  const [votes, setVotes] = useState();
  const [myobj, setMyobj] = useState();

  const [score, setScore] = useState(0);
  const [oldScore, setOldScore] = useState(0);

  

  useEffect(() => {
    const query = ref(db, `votes/${voteId}`);
    return onValue(query, async (snapshot) => {
      const res = await snapshot.val();
      await setVotes(res);

      if (issue.options !== undefined) {
        console.log("In");
        console.log(votes);

        let obj = {};
        for (const key of issue.options) {
          obj[key] = 0;
        }

        for (const key in votes) {
          let arr = votes[key].vote;
          for (let i = 0; i < arr.length; i++) {
            obj[arr[i]] = obj[arr[i]] + i;
          }
        }

        console.log(obj);
        const max = issue.options.length * Object.keys(votes).length;

        for (const key in obj) {
          obj[key] = (100 - (obj[key] / max) * 100).toFixed(2);
        }
        console.log(obj);
        setMyobj(obj);
      }
    });
  }, [issue]);

  useEffect(() => {
    const query = ref(db, `issues/${voteId}`);
    return onValue(query, async (snapshot) => {
      const issue = await snapshot.val();
      setIssue(issue);
      setOptions(issue.options);
    });
  }, []);

  console.log(myobj);
  console.log("vrevrv");

  const handleSubmit = () => {
    event.preventDefault();

    set(ref(db, `issues/${voteId}`), {
      title: issue.title,
      context: issue.context,
      options: issue.options,
      expertField: issue.expertField,
      targetAudience: issue.targetAudience,
      communityNotes: communityPost,
    });
  };

  useEffect(() => {
    const query = ref(db, `score`);

    return onValue(query, async (snapshot) => {
      const data = await snapshot.val();
      setOldScore(data.value)
    });
  }, []);

  const handleScore = (event) => {
    console.log(score)

    set(ref(db, `score`), {
      value: parseInt(oldScore) + parseInt(score)
    });

    setScore('')


  }

  const handleChange = (event) => {
    setScore(event.target.value)
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Time2Vote</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end"></Navbar.Collapse>
        </Container>
      </Navbar>
      <Container style={{ marginTop: "20px", textAlign: "center" }}>
        <h1>Judging Time</h1>
        <h6>Has the decision-maker delivered on their promises?</h6>
      </Container>
      <Container style={{ maxWidth: "600px" }}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <InputGroup className="mb-3" style={{ width: "30%", margin: "auto", marginTop: "30px" }}>
              <Form.Control onChange={handleChange} value={score} aria-describedby="basic-addon2" />
              <InputGroup.Text id="basic-addon2"> / 10</InputGroup.Text>
              <Button onClick={handleScore}>Submit</Button>
            </InputGroup>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder={issue.title} disabled />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Context</Form.Label>
              <FloatingLabel controlId="floatingTextarea2" label={issue.context}>
                <Form.Control as="textarea" style={{ height: "150px" }} className="mb-3" disabled />
              </FloatingLabel>
            </Form.Group>
            {myobj !== undefined && (
              <Form.Group className="mb-3">
                <Form.Label>Options</Form.Label>

                {options.map((option, index) => {
                  return <Form.Control key={index} style={{ marginBottom: "10px" }} type="text" placeholder={`${option} scored ${myobj[option]}%`} disabled />;
                })}
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Community Note</Form.Label>
              <FloatingLabel controlId="floatingTextarea2" label="Enter your opinion on the matter">
                <Form.Control as="textarea" style={{ height: "150px" }} className="mb-3" defaultValue={issue.communityNotes} disabled />
              </FloatingLabel>
            </Form.Group>
          </Modal.Body>
          <div style={{height: "50px"}}></div>
        </Form>
      </Container>
    </>
  );
}

export default MyFeedbackPage;
