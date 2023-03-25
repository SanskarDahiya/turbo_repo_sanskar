"use client";

import React, { useEffect } from "react";
import "./../src/css/bootstrap.min.css";
import "./../src/css/open-iconic-bootstrap.min.css";
import "./../src/css/animate.css";
import "./../src/css/owl.carousel.min.css";
import "./../src/css/owl.theme.default.min.css";
import "./../src/css/magnific-popup.css";
import "./../src/css/aos.css";
import "./../src/css/ionicons.min.css";
import "./../src/css/flaticon.css";
import "./../src/css/icomoon.css";
import "./../src/css/style.css";
import ToastModal from "toast-modal";

import { AppPropsType } from "next/dist/shared/lib/utils";
import Link from "next/link";
import { useAppStore } from "../stores/AppStore";
import getFingerprint from "../helper/getFingerprint";

export const menuBar = [
  { name: "Home", link: "/" },
  { name: "Trends", link: "/trends" },
];

export default function MyApp({ Component, pageProps }: AppPropsType) {
  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);
  useEffect(() => {
    getFingerprint().then((res) => {
      useAppStore.getState().setDeviceInfo({ ...res, deviceId: res.visitorId });
    });
    // setUser({
    //   _id: "user_id",
    //   _createdOn: new Date().getTime(),
    //   _updatedOn: new Date().getTime(),
    //   deleted: false,
    //   username: "user_username",
    //   password: "user_password",
    //   name: "user_name",
    //   old_names: [],
    //   device: "user_device",
    //   isAnonymous: false,
    //   sendMessageCount: 0,
    //   getMessageCount: 0,
    // });
    const timer = setTimeout(() => {
      const libs = [
        "jquery.min.js",
        "jquery-migrate-3.0.1.min.js",
        "popper.min.js",
        "bootstrap.min.js",
        "jquery.easing.1.3.js",
        "jquery.waypoints.min.js",
        "jquery.stellar.min.js",
        "owl.carousel.min.js",
        "jquery.magnific-popup.min.js",
        "aos.js",
        "jquery.animateNumber.min.js",
        "scrollax.min.js",
        "main.js",
      ];
      libs.forEach((name) => {
        const elem = document.createElement("script") as HTMLScriptElement;
        elem.async = true;
        elem.id = name;
        elem.src = `/js/${name}`;
        if (!document.getElementById(name)) {
          const divElem = document.getElementById(
            "all_scripts"
          ) as HTMLDivElement;
          //FIXME:
          divElem.appendChild(elem);
        }
      });
    }, 250);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div className="parentContainer">
      <div className="bg-top navbar-light">
        <div className="container">
          <div className="row no-gutters d-flex align-items-center align-items-stretch">
            <div className="col-md-6 d-flex align-items-center py-4">
              <Link className="navbar-brand" href="/">
                <div style={{ color: "#5f5f5f" }}>NAZDEEKIYAAN</div>
              </Link>
            </div>
            {/* <LoginButtonWrapper {...props} /> */}
          </div>
        </div>
      </div>
      <nav
        className="navbar navbar-expand-lg ftco-navbar-light"
        id="ftco-navbar"
      >
        <div className="container d-flex align-items-center px-4">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#ftco-nav"
            aria-controls="ftco-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="oi oi-menu" /> Menu
          </button>

          <div className="collapse navbar-collapse" id="ftco-nav">
            <ul className="navbar-nav mr-auto">
              {menuBar.map((elem, id) => (
                <li key={id} className="nav-item">
                  <Link href={elem.link} className="nav-link">
                    {elem.name}
                  </Link>
                </li>
              ))}
              <li className="nav-item">
                {user ? (
                  <div
                    className="nav-link "
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => setUser(null)}
                  >
                    <span id="username1">Sign-Out: {user?.name}</span>
                  </div>
                ) : (
                  <Link href="/login" className="nav-link">
                    <span id="username">Login</span>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div
        style={{
          zIndex: "1",
          flex: 1,
          height: "100%",
          width: "100%",
        }}
      >
        <div
          style={{
            position: "relative",
            zIndex: "2",
            height: "100%",
            width: "100%",
          }}
        >
          <ToastModal />
        </div>
        <div
          style={{
            position: "relative",
            zIndex: "1",
            height: "100%",
            width: "100%",
          }}
        >
          <Component {...pageProps} />
        </div>
      </div>

      <footer
        className="ftco-footer ftco-bg-dark ftco-section"
        style={{ padding: "3rem 0", width: "100%" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <p>
                This Website Is Made With&nbsp;
                <i className="icon-heart" aria-hidden="true" />
                &nbsp;
              </p>
            </div>
          </div>
        </div>
      </footer>
      <div id="all_scripts"></div>
    </div>
  );
}
