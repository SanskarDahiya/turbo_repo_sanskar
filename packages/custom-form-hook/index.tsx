import "./index.css";
import React, { InputHTMLAttributes, useState } from "react";
import { useForm, RegisterOptions, FieldValues } from "react-hook-form";
const FormWrapper = ({
  onFormSubmit,
  inputs,
}: {
  inputs: {
    name: string;
    label?: string;
    textArea?: boolean;
    formFields?: RegisterOptions<FieldValues>;
    inputField?: InputHTMLAttributes<HTMLInputElement>;
  }[];
  onFormSubmit: (params?: any) => Promise<void> | void;
}) => {
  const [error, setError] = useState<null | string>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isLoading, isSubmitting },
  } = useForm();
  const loading = isLoading || isSubmitting;

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        setError(null);
        if (!loading) {
          try {
            await onFormSubmit(data);
            reset();
          } catch (err: any) {
            setError(err?.message || "something went wrong");
          }
        }
      })}
    >
      {inputs.map((field, index) => {
        let { placeholder, ...restFields } = field.inputField || {};
        placeholder = placeholder || field.label || field.name;
        return (
          <React.Fragment key={field.name + "_" + index}>
            <div className="form-group">
              <label
                className="input-label"
                style={{
                  textTransform: "capitalize",
                  color: errors[field.name] ? "red" : "black",
                }}
                htmlFor={field.name}
              >
                {placeholder}
              </label>

              {field.textArea ? (
                // @ts-ignore
                <textarea
                  {...restFields}
                  {...field.formFields}
                  id={field.name}
                  className="input-form-control"
                  placeholder={placeholder}
                  style={{
                    border: "0px",
                    borderBottom: `1px solid ${
                      errors[field.name] ? "red" : "grey"
                    }`,
                  }}
                  {...register(field.name, field.formFields)}
                />
              ) : (
                // @ts-ignore
                <input
                  {...restFields}
                  {...field.formFields}
                  id={field.name}
                  className="input-form-control"
                  placeholder={placeholder}
                  style={{
                    border: "0px",
                    borderBottom: `1px solid ${
                      errors[field.name] ? "red" : "grey"
                    }`,
                  }}
                  {...register(field.name, field.formFields)}
                />
              )}
            </div>
          </React.Fragment>
        );
      })}
      {error && <div style={{ color: "red" }}>{error}</div>}

      <button
        type="submit"
        className="btn-primary btn-block"
        disabled={loading}
      >
        {loading ? "Getting Info" : "Submit"}
      </button>
      <br />
      {/* {ell && "Please fill all * fields"} */}
    </form>
  );
};

export default FormWrapper;
