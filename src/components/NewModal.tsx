import { useEffect, useState } from "react";
import Modal from "react-modal";
import "../css/NewModal.css";
import separateCapitalise from "../utils/separateCapitalise";
import postData from "../utils/postData";
import TypeFetch from "../utils/TypeFetch";
// import separateCapitalise from "../utils/separateCapitalise";

export default function NewModal(props: { currentUser: number }): JSX.Element {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  // const [message, setMessage] = useState<string>("");
  const [recommend, setRecommend] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [recTypes, setRecTypes] = useState<string[]>([]);

  useEffect(() => {
    TypeFetch().then((result) => {
      if (result) {
        setRecTypes(result);
      }
    });
  }, []);

  function openModal() {
    setIsOpen(true);
  }

  // function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  const recommendText = ["recommended", "not-recommended", "looks-interesting"];

  function handleCheckbox(tickedBox: number) {
    if (recommend !== recommendText[tickedBox]) {
      const message = recommendText[tickedBox];
      setRecommend(message);
    } else {
      setRecommend("");
    }
  }

  function isChecked(str: string): boolean {
    return str === recommend ? true : false;
  }

  const handleSubmitRec = () => {
    if (
      title !== "" &&
      link !== "" &&
      author !== "" &&
      type !== "" &&
      reason !== "" &&
      summary !== ""
    ) {
      postData("/rec", {
        title: title,
        link: link,
        author: author,
        type: type,
        status: recommend,
        reason: reason,
        summary: summary,
        tags: ["creative-coding"],
        user_id: props.currentUser,
      });
    } else {
      window.alert("Cannot submit a recommendation with an empty field.");
    }
  };

  const typeOptions = recTypes.map((type) => (
    <option key={type} value={type}>
      {separateCapitalise(type)}
    </option>
  ));

  useEffect(() => {
    console.log(type);
  }, [type]);

  return (
    <>
      <div className="sidebarbutton" id="newrec" onClick={openModal}>
        <span className="span">+ Create New Recommendation</span>
      </div>
      <Modal
        id="mymodal"
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <div className="nav">
          <div className="title">
            <h1>Create New Recommendation</h1>
          </div>
          <div className="close">
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
        <form className="form" onSubmit={() => handleSubmitRec()}>
          <label htmlFor="titleInput">Title</label>
          <input
            id="titleinput"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="linkInput">URL</label>
          <input
            id="linkInput"
            placeholder="Link"
            onChange={(e) => setLink(e.target.value)}
          />

          <label htmlFor="authorInput">Author</label>
          <input
            id="authorInput"
            placeholder="Author"
            onChange={(e) => setAuthor(e.target.value)}
          />

          {/* <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Category
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {type}
            </div>
          </div> */}

          <label htmlFor="typeInput">Category</label>
          <select
            key="typeInput"
            id="typeInput"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            {typeOptions}
          </select>

          <fieldset>
            <label className="boxes">
              <input
                type="checkbox"
                checked={isChecked("recommended")}
                onChange={() => handleCheckbox(0)}
              />
              {separateCapitalise(recommendText[0])}
            </label>
            <label className="boxes">
              <input
                type="checkbox"
                checked={isChecked("not-recommended")}
                onChange={() => handleCheckbox(1)}
              />
              {separateCapitalise(recommendText[1])}
            </label>
            <label className="boxes">
              <input
                type="checkbox"
                checked={isChecked("looks-interesting")}
                onChange={() => handleCheckbox(2)}
              />
              {separateCapitalise(recommendText[2])}
            </label>
          </fieldset>
          <br />
          <label htmlFor="reasonInput">Reason</label>
          <textarea
            id="reasonInput"
            rows={5}
            placeholder="Explain your choice"
            onChange={(e) => setReason(e.target.value)}
          />

          <label htmlFor="summaryInput">Summary</label>
          <textarea
            id="summaryInput"
            rows={5}
            placeholder="Summary of the description"
            onChange={(e) => setSummary(e.target.value)}
          />

          <button type="submit"> Submit</button>
        </form>
      </Modal>
    </>
  );
}
