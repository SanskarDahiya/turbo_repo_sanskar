export interface Toast {
  title?: string;
  message: string | React.ReactElement;
}

export interface ToastMessage extends Toast {
  readonly _id: string;
  _createdOn: Date;
  type: "INFO" | "SUCCESS" | "WARNING" | "ERROR";
  _expireOn: Date;
  timeout: number;
}

export type ToastType = "INFO" | "SUCCESS" | "WARNING" | "ERROR";
export type IToast = {
  toasts: ToastMessage[];
  addToast: (toast: string | Toast, type: ToastType, timeout?: number) => void;
  setInfo: (toast: string | Toast, timeout?: number) => void;
  setSuccess: (toast: string | Toast, timeout?: number) => void;
  setWarning: (toast: string | Toast, timeout?: number) => void;
  setError: (toast: string | Toast, timeout?: number) => void;
  removeToast: (toastId?: string) => void;
};
