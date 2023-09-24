import { useState, useEffect } from "react";

//components
import Button from "./components/Button";
import Modal from "./components/Modal";
import ContactModal from "./components/Contact.model";

//style
import "./App.css";

import callApi from "./utils/Rest.service";

function App() {
  const [isModalA, setModalA] = useState(false);
  const [isModalB, setModalB] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsPageLoading] = useState(false);
  const [allResults, setAllResults] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  function changeModalA() {
    setModalA(!isModalA);
  }

  function changeModalB() {
    setModalB(!isModalB);
  }

  function showModal(modal) {
    if (modal == 1) {
      setModalA(true);
      setModalB(false);
    } else {
      setModalA(false);
      setModalB(true);
    }
  }

  function unselectContact() {
    setSelectedContact(null);
  }

  function updatePage() {
    //scroll is at bottom
    setPage(page + 1);
  }

  useEffect(() => {
    if (isModalA || isModalB) {
      setSearch("");
      setContacts([]);
      setPage(1);
      setAllResults(false);

      (async function getData() {
        const result = await callApi(1);

        if (result.data.contacts) {
          setContacts(Object.values(result.data.contacts));
        }
      })();
    }
  }, [isModalA, isModalB]);

  useEffect(() => {
    (async function getData() {
      if (page > 1 && !isLoading && !allResults) {
        setIsPageLoading(true);

        const result = await callApi(page, search);

        if (result.data.contacts.length == 0) {
          setAllResults(true);
        } else {
          if (Array.isArray(contacts)) {
            setContacts([...contacts, ...Object.values(result.data.contacts)]);
          }
        }

        setIsPageLoading(false);
      }
    })();
  }, [page, allResults]);

  async function collectSearch() {
    setContacts([]);
    setPage(1);
    setAllResults(false);

    const result = await callApi(1, search);

    if (result.data.contacts) {
      setContacts(Object.values(result.data.contacts));
    }
  }

  var delayDebounceFn = null;

  useEffect(() => {
    delayDebounceFn = setTimeout(async () => {
      if (search) {
        collectSearch();
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();

        if (delayDebounceFn) {
          clearTimeout(delayDebounceFn);
        }
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return (
    <div style={{ height: "100vh" }} className="container-fluid">
      <div className="row h-100 d-flex align-items-center justify-content-center">
        <div className="col-4  d-flex align-items-center justify-content-center">
          <Button onClick={changeModalA} redirect={"all"} color="#46139f">
            Button A
          </Button>
          <Button onClick={changeModalB} redirect={"us"} color="#ff7f50">
            Button B
          </Button>
        </div>
      </div>

      {/* //general modals */}
      <Modal
        isVisible={isModalA}
        close={changeModalA}
        showModal={showModal}
        title={"ModalA"}
        filter=""
        contacts={contacts}
        selectContact={setSelectedContact}
        setPage={updatePage}
        isLoading={isLoading}
        search={search}
        setSearch={setSearch}
      ></Modal>
      <Modal
        isVisible={isModalB}
        close={changeModalB}
        showModal={showModal}
        title={"ModalB"}
        filter="226"
        contacts={contacts}
        selectContact={setSelectedContact}
        setPage={updatePage}
        isLoading={isLoading}
        search={search}
        setSearch={setSearch}
      ></Modal>

      {/* //contact modal */}
      {contacts.length > 0 && (
        <ContactModal
          isVisible={selectedContact != null}
          isModalA={isModalA}
          close={unselectContact}
          contact={contacts.find((contact) => contact.id == selectedContact)}
        ></ContactModal>
      )}
    </div>
  );
}

export default App;
