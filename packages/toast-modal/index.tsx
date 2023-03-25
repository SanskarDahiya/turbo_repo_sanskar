import React, { useEffect, useMemo, useState } from "react";
import { useToastStore } from "./store";
import { ToastMessage } from "./types";

export const setInfo = useToastStore.getState().setInfo;
export const setSuccess = useToastStore.getState().setSuccess;
export const setWarning = useToastStore.getState().setWarning;
export const setError = useToastStore.getState().setError;

const AlertIcons = {
  INFO: (
    <div
      style={{
        backgroundColor: "rgb(59 130 246)",
        padding: "1.25rem 1rem",
        borderTopLeftRadius: "0.5rem",
        borderBottomLeftRadius: "0.5rem",
        display: "flex",
        alignItems: "center",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{
          color: "white",
          fill: "currentcolor",
        }}
        viewBox="0 0 16 16"
        width="20"
        height="20"
      >
        <path
          fillRule="evenodd"
          d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm6.5-.25A.75.75 0 017.25 7h1a.75.75 0 01.75.75v2.75h.25a.75.75 0 010 1.5h-2a.75.75 0 010-1.5h.25v-2h-.25a.75.75 0 01-.75-.75zM8 6a1 1 0 100-2 1 1 0 000 2z"
        ></path>
      </svg>
    </div>
  ),
  ERROR: (
    <div
      style={{
        backgroundColor: "rgb(220 38 38)",
        padding: "1.25rem 1rem",
        borderTopLeftRadius: "0.5rem",
        borderBottomLeftRadius: "0.5rem",
        display: "flex",
        alignItems: "center",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        style={{
          color: "white",
          fill: "currentcolor",
        }}
        width="20"
        height="20"
      >
        <path
          fillRule="evenodd"
          d="M4.47.22A.75.75 0 015 0h6a.75.75 0 01.53.22l4.25 4.25c.141.14.22.331.22.53v6a.75.75 0 01-.22.53l-4.25 4.25A.75.75 0 0111 16H5a.75.75 0 01-.53-.22L.22 11.53A.75.75 0 010 11V5a.75.75 0 01.22-.53L4.47.22zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5H5.31zM8 4a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 4zm0 8a1 1 0 100-2 1 1 0 000 2z"
        ></path>
      </svg>
    </div>
  ),
  SUCCESS: (
    <div
      style={{
        backgroundColor: "rgb(22 163 74)",
        padding: "1.25rem 1rem",
        borderTopLeftRadius: "0.5rem",
        borderBottomLeftRadius: "0.5rem",
        display: "flex",
        alignItems: "center",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{
          color: "white",
          fill: "currentcolor",
        }}
        viewBox="0 0 16 16"
        width="20"
        height="20"
      >
        <path
          fillRule="evenodd"
          d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
        ></path>
      </svg>
    </div>
  ),
  WARNING: (
    <div
      style={{
        backgroundColor: "rgb(202 138 4)",
        padding: "1.25rem 1rem",
        borderTopLeftRadius: "0.5rem",
        borderBottomLeftRadius: "0.5rem",
        display: "flex",
        alignItems: "center",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        style={{
          color: "white",
          fill: "currentcolor",
        }}
        width="20"
        height="20"
      >
        <path
          fillRule="evenodd"
          d="M8.22 1.754a.25.25 0 00-.44 0L1.698 13.132a.25.25 0 00.22.368h12.164a.25.25 0 00.22-.368L8.22 1.754zm-1.763-.707c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0114.082 15H1.918a1.75 1.75 0 01-1.543-2.575L6.457 1.047zM9 11a1 1 0 11-2 0 1 1 0 012 0zm-.25-5.25a.75.75 0 00-1.5 0v2.5a.75.75 0 001.5 0v-2.5z"
        ></path>
      </svg>
    </div>
  ),
};

const AlertIcon = (toast: ToastMessage) => {
  const toastType = toast.type;
  return AlertIcons[toastType] || null;
};

interface SingleToastModalProps {
  index?: number;
  toast: ToastMessage;
}

const getPendingTime = ({ _createdOn, timeout }: ToastMessage) => {
  return _createdOn.getTime() + timeout - new Date().getTime();
};

const SingleToastModal = ({ toast, index }: SingleToastModalProps) => {
  const removeToast = useToastStore((s) => s.removeToast);

  return (
    <SlideAnimation
      timeout={getPendingTime(toast)}
      onRemove={() => {
        removeToast(toast._id);
      }}
    >
      {({ closeModal }) => (
        <div
          style={{
            display: "flex",
            width: "24rem",
            margin: "1rem 0",
            borderRadius: "0.5rem",
            boxShadow:
              "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
          }}
        >
          {AlertIcon(toast)}
          <div
            style={{
              padding: "1.25rem 1rem",
              background: "white",
              borderTopRightRadius: "0.5rem",
              borderBottomRightRadius: "0.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              border: "1px solid rgb(229 231 235)",
              borderLeftColor: "transparent",
            }}
          >
            <div>
              <div>{toast.message}</div>
            </div>
            <button style={{ alignSelf: "self-start" }} onClick={closeModal}>
              <svg
                style={{
                  color: "rgb(55 65 81)",
                  fill: "currentcolor",
                }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="20"
                height="20"
              >
                <path
                  fillRule="evenodd"
                  d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </SlideAnimation>
  );
};

function ToastModal() {
  const toasts = useToastStore((s) => s.toasts);
  if (!toasts?.length) {
    return null;
  }
  return (
    <div
      style={{
        padding: "0 2rem",
        margin: "1rem 0",
        position: "absolute",
      }}
    >
      {toasts.map((toast, index) => {
        const key = `key__${toast._id}`;
        return <SingleToastModal key={key} toast={toast} index={index} />;
      })}
    </div>
  );
}

export default ToastModal;

interface SlideAnimationProps {
  children?: React.ReactNode | (({ closeModal }: any) => React.ReactNode);
  onRemove?: (value?: any) => void;
  timeout?: number;
  inTransition?: string;
  outTransition?: string;
}

function SlideAnimation(props: SlideAnimationProps) {
  const { timeout, onRemove: onRemoveCb, inTransition, outTransition } = props;
  const [transition_state, set_transition_state] = useState([
    "DISPLAY",
    "BEGAIN",
  ]);

  const startRemoveTransitionProcess = () => {
    set_transition_state(["REMOVE", "ENDS"]);
  };

  const stopStartTransitionProcess = () => {
    set_transition_state(["DISPLAY", "ENDS"]);
  };

  useEffect(() => {
    const startTranisitionRef = setTimeout(stopStartTransitionProcess, 10);
    const expireTransitionRef = setTimeout(
      startRemoveTransitionProcess,
      timeout
    );
    return () => {
      clearTimeout(startTranisitionRef);
      clearTimeout(expireTransitionRef);
    };
  }, [timeout]);

  const ModalTransition = useMemo(() => {
    if (
      transition_state[1] === "BEGAIN"
        ? transition_state[0] === "DISPLAY"
        : transition_state[0] === "REMOVE"
    ) {
      // return "opacity-0 " + (inTransition || "translate-x-[-24rem]");
      return {
        opacity: "0",
        transform: "translateX(-24rem)",
      };
    } else {
      // return "opacity-100 " + (outTransition || "translate-x-0");
      return {
        opacity: "1",
        transform: "translateX(0)",
      };
    }
  }, [transition_state]);

  const ChildComponet =
    typeof props.children === "function"
      ? props.children({ closeModal: startRemoveTransitionProcess })
      : props.children;

  return (
    <div
      style={{
        transitionProperty: "all",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        transitionDuration: "500ms",
        ...ModalTransition,
      }}
      onTransitionEnd={() => {
        if (transition_state.join("_") === "REMOVE_ENDS" && onRemoveCb) {
          onRemoveCb();
        }
      }}
    >
      {ChildComponet}
    </div>
  );
}
