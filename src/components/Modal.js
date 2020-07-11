import React, { useState, useEffect } from "react";
import axios from "axios";
const Modal = ({ modalData, showModal, closeModal }) => {
  const [firstName, setFirstName] = useState(modalData.first_name);
  const [lastName, setLast_name] = useState(modalData.last_name);
  const [Email, setEmail] = useState(modalData.email);

  useEffect(() => {
    if (!showModal) {
      setFirstName("");
      setLast_name("");
      setEmail("");
    } else {
      setFirstName(modalData.first_name);
      setLast_name(modalData.last_name);
      setEmail(modalData.email);
    }
  }, [showModal]);

  const updateData = (e) => {
    const url = `https://reqres.in/api/users/${modalData.id}`;
    if (firstName && lastName && Email) {
      axios
        .put(url, { firstName, lastName, Email })
        .then((res) => {
          console.log(res);
          alert(JSON.stringify(res.data));
          closeModal();
        })
        .catch((e) => {
          alert(`something went wrong`);
          console.log(e.response);
        });
    } else {
      alert("please enter valid characters in the fields");
    }
  };
  return (
    <>
      <form className="modal-container">
        <h2>Edit Details</h2>
        <div className="modal-details">
          <span>
            <label htmlFor="first-name">First Name</label>{" "}
            <input
              id="first-name"
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </span>
          <span>
            <label htmlFor="first-name">Last Name</label>{" "}
            <input
              id="last-name"
              type="text"
              required
              value={lastName}
              onChange={(e) => setLast_name(e.target.value)}
            />
          </span>
          <span>
            <label htmlFor="email">Email</label>{" "}
            <input
              id="email"
              type="email"
              required
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </span>
        </div>
        <div className="modal-btns">
          <input
            type="submit"
            value="Save"
            onClick={(e) => {
              e.persist();
              e.preventDefault();
              updateData(e);
            }}
          />
          <button
            className="cancel"
            onClick={(e) => {
              e.preventDefault();
              closeModal();
            }}
          >
            cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default Modal;
