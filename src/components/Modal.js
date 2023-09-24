import { Scrollbars } from "react-custom-scrollbars-2";

import { useState, useEffect, useRef } from "react";

import Button from "./Button";

export default function Modal(props) {
  const modals = {
    A: 1,
    B: 2,
  };

  const [contactList, setContactList] = useState([]);
  const [evenFilter, setEvenFilter] = useState(false);
  const ref = useRef(null); // ref => { current: null }

  useEffect(() => {
    var contactList = props.contacts;
    if (Array.isArray(contactList) && contactList.length > 0) {
      //filter by country code
      contactList = contactList.filter((contact) =>
        String(contact.country_id).includes(props.filter)
      );

      //filter even id
      if (evenFilter) {
        contactList = contactList.filter((contact) => contact.id % 2 === 0);
      }

      setContactList([...contactList]);
    }
  }, [props.contacts, evenFilter]);

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.scrollToTop();
    }
  }, [props.isVisible]);

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
            <h5 className="modal-title">{props.title}</h5>
            <Button
              onClick={() => props.showModal(modals.A)}
              redirect={"all"}
              color="#46139f"
            >
              All Contacts
            </Button>
            <Button
              onClick={() => props.showModal(modals.B)}
              redirect={"us"}
              color="#ff7f50"
            >
              US Contacts
            </Button>
            <Button
              onClick={props.close}
              redirect={""}
              color="white"
              border="#46139f"
            >
              Close
            </Button>
          </div>

          {/* BODY */}
          <div className="modal-body">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="query"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={props.search}
                onChange={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  props.setSearch(event.target.value);
                }}
              />
            </div>
            <Scrollbars
              style={{ height: "60vh" }}
              onUpdate={(value) => {
                if (value.top == 1) {
                  props.setPage();
                }
              }}
              ref={ref}
            >
              {contactList.length > 0 &&
                contactList.map((contact) => {
                  return (
                    <p
                      key={`contact_${contact.id}`}
                      role="button"
                      onClick={() => props.selectContact(contact.id)}
                    >{`${contact.id} ${contact.first_name} ${contact.last_name} ${contact.country.iso}`}</p>
                  );
                })}

              {props.isLoading && (
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}

              {!props.isLoading && contactList.length == 0 && <p>No data</p>}
            </Scrollbars>
          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <input
                    type="checkbox"
                    aria-label="Checkbox for following text input"
                    className="me-2"
                    onChange={(event) => {
                      setEvenFilter(event.target.checked);
                    }}
                    value={evenFilter}
                  />
                  Only even
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
