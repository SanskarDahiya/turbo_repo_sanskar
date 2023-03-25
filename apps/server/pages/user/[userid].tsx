import React, { useState } from "react";
import { GetServerSideProps } from "next";

import { useAppStore } from "../../stores/AppStore";
import { IUser } from "../../types";
import { getClientDb } from "mongo-client";
import { TABLES } from "../../constants";
// import { getUserByUserId, sendMessage } from "../../sampleData/loginSetup";

const Wait = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg className="circular" width="48px" height="48px">
        <circle
          className="path-bg"
          cx="24"
          cy="24"
          r="22"
          fill="none"
          stroke-width="4"
          stroke="#eeeeee"
        />
        <circle
          className="path"
          cx="24"
          cy="24"
          r="22"
          fill="none"
          stroke-width="4"
          stroke-miterlimit="10"
          stroke="#F96D00"
        />
      </svg>
      Finding User
    </div>
  );
};

const SingleBlogSection = ({ user }: { user: IUser | null }) => {
  return (
    <>
      <section className="ftco-section">
        <div className="container">
          {user ? <ShowUser toUser={user} /> : <NoUser />}
        </div>
      </section>
    </>
  );
};
export default SingleBlogSection;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userid = context.query.userid as any;
  const db = await getClientDb();
  const user = await db.collection(TABLES.user).findOne({ _id: userid });
  return {
    props: { user },
  };
};

const NoUser = () => {
  return (
    <div className="row">
      <div className="col-lg-8 ">
        <h2 className="mb-3">{"NO USER FOUND"}</h2>
        Unable to find User, THere might be an problem with url Please try again
      </div>
    </div>
  );
};

const ShowUser = (props: { toUser: IUser }) => {
  const thisUser = useAppStore((state) => state.user);
  const [name, nameUpdater] = useState("");
  const [message, messageUpdater] = useState("");
  const [alertzz, alertUpdater] = useState(false);
  const [loading, loadingUpdater] = useState(false);

  const setName = (e: any) => {
    alertzz && alertUpdater(false);
    nameUpdater(e.target.value);
  };

  const setMessage = (e: any) => {
    alertzz && alertUpdater(false);
    messageUpdater(e.target.value);
  };

  const formHandle = async (e: any) => {
    if (loading) {
      return;
    }
    loadingUpdater(true);
    console.log("sending message");

    // let deviceId = localStorage.getItem(deviceUuid);
    // if (!deviceId) {
    //   deviceId = uuid();
    //   localStorage.setItem(deviceUuid, deviceId);
    // }
    alertUpdater(false);
    if (!message || !message.trim()) {
      alertUpdater(true);
      return;
    }
    if (!props.toUser) {
      alert("Encounter an error\nPlease Refresh");
      return;
    }
    // let myUser = props.user || {};
    // if (!myUser["device"]) {
    //   myUser["device"] = { _id: deviceId };
    // }
    const newMessage = {
      to: props.toUser,
      message: {
        name,
        message,
      },
      // from: myUser,
    };
    // try {
    //   let result = await sendMessage(newMessage);
    //   result = result && result[0];
    //   props.history.push("/", { messageSent: result });
    // } catch (err) {
    //   alert("Please refresh");
    //   console.log(err);
    // }
    nameUpdater("");
    messageUpdater("");
    loadingUpdater(false);
    return;
  };

  return (
    <>
      <div className="comment-form-wrap pt-5">
        <h3 className="mb-5 h4 font-weight-bold">
          Send a Message {props.toUser._id ? " to #" + props.toUser._id : ""}
        </h3>
        {props.toUser._id === "nazdeekiyaan" && (
          <code>*All messages will be public</code>
        )}
        <form onSubmit={formHandle} className="p-5 bg-light">
          <div className="form-group">
            <label htmlFor="name">From / Ur Name</label>
            <input
              placeholder="unknown"
              type="text"
              className="form-control"
              id="name"
              onChange={setName}
              value={name}
            />
          </div>
          <div
            className="form-group"
            style={{ border: alertzz ? "1px solid red" : "none" }}
          >
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              className="form-control"
              value={message}
              onChange={setMessage}
            />
          </div>
          <div className="form-group">
            <br />
            <input
              type="submit"
              value={loading ? "SENDING" : "SEND"}
              className="py-3 px-4 btn-primary"
            />
          </div>
        </form>
      </div>
    </>
  );
};
