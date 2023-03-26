import React, { useState, useEffect } from "react";
import Link from "next/link";
import SingleMessageCard from "../components/SingleMessageCard";
import { useAppStore } from "../stores/AppStore";
import { SITE_URL } from "../constants";
// import { getScribbleMessages } from "../sampleData/loginSetup";

const Trends = () => {
  const user = useAppStore((state) => state.user);
  const [messages, messagesUpdater] = useState([]);
  const [loading, loadingUpdater] = useState(false);

  const getInitialMessage = async () => {
    try {
      loadingUpdater(true);
      //   let result = await getScribbleMessages();
      //   //   console.log(result);
      //   messagesUpdater(result);
    } catch (err) {}
    loadingUpdater(false);
  };
  useEffect(() => {
    getInitialMessage();
  }, []);

  return (
    <>
      <section className="ftco-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h2 className="mb-3">{"SCRIBBLE 2020"}</h2>
              <div style={{ position: "relative" }}>
                <div style={{ position: "relative" }}>
                  <code>
                    Anything is possible when you have the right people there to
                    support you{" "}
                  </code>
                  <sub
                    style={{
                      position: "absolute",
                      bottom: -20,
                      right: 0,
                    }}
                  >
                    ~Misty Copeland
                  </sub>
                </div>
                <br />
                <br />
                {!user && (
                  <Link href="/login">Click here to login/signup!</Link>
                )}
                <h2>Soon Adding This Exiting Feature</h2>
                <p>
                  Here, you can post your scribble as public or write anything
                  to us via username{" "}
                  <Link href={"/user/nazdeekiyaan"}>
                    <code
                      style={{
                        color: "#666666",
                      }}
                    >
                      {SITE_URL}/user/
                      <span style={{ color: "#e83e8c" }}>nazdeekiyaan</span>
                    </code>{" "}
                    or click here
                  </Link>
                  <br />
                </p>
              </div>
              <div>
                {messages && messages.length ? (
                  <>
                    <div>Thank you Guys for supporting us.</div>
                    {messages.map((message, index) => (
                      <SingleMessageCard key={index} message={message} />
                    ))}
                  </>
                ) : loading ? (
                  <code>Loading Messages</code>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Trends;
