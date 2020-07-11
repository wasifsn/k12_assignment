import React, { useState, useCallback } from "react";
import Card from "./Card";
import useSearch from "../hooks/useData";
import Modal from "./Modal";

const Scroll = () => {
  const [query, setQuery] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const { loading, error, users, hasMore } = useSearch(query, pageNum);
  console.log(users);
  const observer = React.createRef();
  const paginateEl = useCallback(
    (element) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNum((prevPageNum) => prevPageNum + 1);
        }
      });
      if (element) observer.current.observe(element);
    },
    [loading, hasMore]
  );

  let img = users.map((el, index) => {
    if (users.length === index + 1) {
      return (
        <div
          key={index}
          onClick={() => {
            setShowModal(!showModal);
            setModalData(el);
          }}
        >
          <Card data={el} />
        </div>
      );
    } else {
      return (
        <div
          key={index}
          onClick={() => {
            setShowModal(!showModal);
            setModalData(el);
          }}
        >
          <Card data={el} />
        </div>
      );
    }
  });
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <div className={showModal ? "modal" : ""}>
        <div style={{ display: showModal ? "" : "none" }}>
          <Modal
            closeModal={closeModal}
            showModal={showModal}
            modalData={modalData}
          />
        </div>
        <div>
          <div className="container">{img}</div>
          <div className="paginate" ref={paginateEl} />
          <div className="container-text">{loading && `...loading`}</div>
          <div className="container-text">{error && `...ERROR`}</div>
        </div>
      </div>
    </>
  );
};

export default Scroll;
