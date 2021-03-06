import { useEffect, useState } from "react";
import Modal from "react-modal";
import "../css/CreateNewRec.css";
import separateCapitalise from "../utils/Helper-Functions/separateCapitalise";
import postData from "../utils/Helper-Functions/postData";
import TypeFetch from "../utils/Helper-Functions/TypeFetch";
import TagsFetch from "../utils/Helper-Functions/TagsFetch";

export default function CreateNewRec(props: {
  currentUser: number;
}): JSX.Element {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [recommend, setRecommend] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [recTypes, setRecTypes] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagsOptions, setTagsOptions] = useState<string[]>([]);

  useEffect(() => {
    TypeFetch().then((result) => {
      if (result) {
        setRecTypes(result);
      }
    });
  }, []);

  useEffect(() => {
    TagsFetch().then((result) => {
      if (result) {
        setTagsOptions(result);
      }
    });
  }, []);
  // console.log(tagsOptions);

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
        tags: tags,
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

  const tagDropdownList = tagsOptions.map((tag) => (
    <option key={tag} value={tag}>
      {tag}
    </option>
  ));

  function handleSetTags(e: React.ChangeEvent<HTMLSelectElement>) {
    if (tags.includes(e.target.value) === false) {
      setTags([...tags, e.target.value]);
    }
  }

  return (
    <>
      <div className="sidebarbutton" id="newrec" onClick={openModal}>
        <span className="span">+ Create New Recommendation</span>
      </div>
      <Modal
        id="mymodal"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        ariaHideApp={false}
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
          <fieldset id="recommendedCheckboxes">
            <label className="boxes">
              <input
                id="recommended"
                type="checkbox"
                checked={isChecked("recommended")}
                onChange={() => handleCheckbox(0)}
                value="recommended"
              />
              {separateCapitalise(recommendText[0])}
            </label>
            <label className="boxes">
              <input
                id="not-recommended"
                type="checkbox"
                checked={isChecked("not-recommended")}
                onChange={() => handleCheckbox(1)}
                value="not-recommended"
              />
              {separateCapitalise(recommendText[1])}
            </label>
            <label className="boxes">
              <input
                id="looks-interesting"
                type="checkbox"
                checked={isChecked("looks-interesting")}
                onChange={() => handleCheckbox(2)}
                value="looks-interesting"
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
          <label htmlFor="tagInput">Please select the tags</label>
          <select
            key="tagInput"
            id="tagInput"
            onChange={(e) => handleSetTags(e)}
          >
            <option value=""> -- select an option -- </option>
            {tagDropdownList}
          </select>
          <ul id="selectedTagList">
            {tags.map((element) => (
              <li id={element} key={element} value={element}>
                {element}
                {"    "}
                <button
                  onClick={() => setTags(tags.filter((tag) => tag !== element))}
                >
                  x
                </button>
              </li>
            ))}
          </ul>
          <button id="submitnewrec" type="submit">
            {" "}
            Submit
          </button>
        </form>
      </Modal>
    </>
  );
}
