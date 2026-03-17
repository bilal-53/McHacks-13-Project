import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Row className="mb-3">
      <Col sm={12}>
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
          <Card body style={{backgroundColor: "lightgrey"}}>
            {props.id}
          </Card>
        </div>
      </Col>
    </Row>
  );
}
