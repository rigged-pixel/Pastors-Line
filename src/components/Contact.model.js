import Button from "./Button";

export default function ContactModel(props) {
  return (
    <div
      style={{ display: props.isVisible ? "block" : "none" }}
      className="modal"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title">Modal C</h5>
          </div>

          {/* BODY */}
          <div className="modal-body">
            <p>{props.contact?.id || ""}</p>
            <p>{props.contact?.first_name || ""}</p>
            <p>{props.contact?.last_name || ""}</p>
          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <Button
              onClick={props.close}
              redirect={props.isModalA ? "all" : "us"}
              color="white"
              border="#46139f"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
