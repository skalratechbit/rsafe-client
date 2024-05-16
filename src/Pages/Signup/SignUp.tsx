import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import usePasswordToggle from "../../Hook/usePasswordToggle";
import {
  Association,
  personAssociations,
  logoutUser,
} from "../../Redux/Feature/Auth-slice";
import { useNavigate } from "react-router-dom";
import SpinnerLoader from "../../Component/Common/SpinnerLoader/SpinnerLoader";

const VectorImage = React.lazy(
  () => import("../../Component/VectorImage/VectorImage")
);

const getCharacterValidationError = (str: string) => {
  return `Your password must have at least 1 ${str} character`;
};

const validationSchema = Yup.object({
  email: Yup.string().required("email required").email("Enter valid email"),
  password: Yup.string()
    .required("Please enter a password")
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
    .matches(/[-@#$%^&]/, getCharacterValidationError("Special Character"))
    .min(7, "Password must have at least 7 characters")
    .max(18, "Password can not be more then 15 characters long"),
});

export default function SignupAssociation(props: any) {
  useEffect(() => {
    let userData = localStorage.getItem("user");
    if (userData && typeof userData === "string") {
      const userDeails = JSON.parse(userData);
      if (userDeails.loginSessionFlag === true) {
        dispatch(logoutUser());
      }
    }
  }, []);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  const [serverError, setServerError] = useState<number>(0);
  const [serverErrorMsg, setServerErrorMsg] = useState<string>("");
  const [passwordVal, setPasswordValidation] = useState({
    displayVal: "none",
    //startWithLetter:false,
    uppercase: false,
    lowercase: false,
    specialchar: false,
    numeral: false,
    minchar: false,
    maxchar: true,
    valid: false,
  });
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setServerError(0);
      setServerErrorMsg("");
      handleSubmit(values);
    },
  });

  const handleSubmit = async (signUpAssociation: any) => {
    dispatch(Association(signUpAssociation)).then((res: any) => {
      if (res.payload.statusCode == 200 && res?.payload?.data?.user) {
        dispatch(personAssociations(res?.payload?.data?.user.id)).then(
          (personAsso: any) => {
            if (personAsso?.payload) {
              if (personAsso?.payload?.length > 0) {
                navigate("/account");
              } else {
                navigate("/no-association");
              }
            }
          }
        );
      } else {
        setServerErrorMsg(res?.payload?.data?.error);
        setServerError(res?.payload?.data?.statusCode);
      }
      setLoading(false);
    });
  };

  const renderServerError = (errorCode: Number) => {
    switch (errorCode) {
      case 500:
        return <p style={{ color: "#DE1344" }}>Server Error</p>;
      case 400:
        return <p style={{ color: "#DE1344" }}>{serverErrorMsg}</p>;
      case 401:
        return <p style={{ color: "#DE1344" }}>Unauthorized</p>;
      case 403:
        return <p style={{ color: "#DE1344" }}>{serverErrorMsg}</p>;
      case 404:
        return <p style={{ color: "#DE1344" }}>{serverErrorMsg}</p>;
      default:
        return "";
    }
  };

  const checkPasswordHandler = (pass: string) => {
    setPasswordValidation((passwordVal) => {
      return { ...passwordVal, displayVal: "block" };
    });

    var lowerCaseLetters = new RegExp("[a-z]");
    if (pass.match(lowerCaseLetters)) {
      setPasswordValidation((passwordVal) => {
        return { ...passwordVal, lowercase: true };
      });
    } else {
      setPasswordValidation((passwordVal) => {
        return { ...passwordVal, lowercase: false };
      });
    }
    //Validate capital letters
    var upperCaseLetters = new RegExp("[A-Z]");
    if (pass.match(upperCaseLetters)) {
      setPasswordValidation((passwordVal) => {
        return { ...passwordVal, uppercase: true };
      });
    } else {
      setPasswordValidation((passwordVal) => {
        return { ...passwordVal, uppercase: false };
      });
    }
    //Validate a number
    var numbers = new RegExp("[0-9]");
    if (pass.match(numbers)) {
      setPasswordValidation((passwordVal) => {
        return { ...passwordVal, numeral: true };
      });
    } else {
      setPasswordValidation((passwordVal) => {
        return { ...passwordVal, numeral: false };
      });
    }
    // Validate minimum length
    var regex = new RegExp("[.*]{8,}");
    if (pass.length < 7) {
      setPasswordValidation((passwordVal) => {
        return { ...passwordVal, minchar: false };
      });
    } else {
      setPasswordValidation((passwordVal) => {
        return { ...passwordVal, minchar: true };
      });
    }
    // Validate maximum length
    var regex = new RegExp("[.*]{7,15}");
    if (pass.length > 18) {
      setPasswordValidation((passwordVal) => {
        return { ...passwordVal, maxchar: false };
      });
    } else {
      setPasswordValidation((passwordVal) => {
        return { ...passwordVal, maxchar: true };
      });
    }
    //Validate Special Character
    var regex = new RegExp("[-@#$%^&]");
    if (pass.match(regex)) {
      setPasswordValidation((passwordVal) => {
        return { ...passwordVal, specialchar: true };
      });
    } else {
      setPasswordValidation((passwordVal) => {
        return { ...passwordVal, specialchar: false };
      });
    }
  };

  const inputFieldStyle = {
    "& .MuiFormLabel-root": {
      color: "text.primary",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "text.primary",
    },
    "& .input": {
      color: "text.primary",
    },
  };
  const inputStyle = { padding: "14px 14px", borderRadius: "15px" };
  return (
    <>
      <SpinnerLoader loading={loading} />
      <Box className="formPage">
        <Box className="formBlock">
          <Box className="formBlock__head">
            <Typography
              component="h1"
              className="formBlock__title"
              sx={{ color: "text.primary" }}
            >
              Sign up
            </Typography>
            <Typography
              component="h1"
              className="formBlock__text"
              sx={{ color: "text.primary" }}
            >
              Please fill in the fields below to create a Zayuk Safe account!
            </Typography>
          </Box>
          <form className="StepperForm__form" onSubmit={formik.handleSubmit}>
            <Box className="formGroup">
              <TextField
                fullWidth
                type="email"
                name="email"
                label={"Email"}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{ ...inputFieldStyle }}
                inputProps={{
                  style: inputStyle,
                  autoComplete: "off",
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Box className="formGroup">
              <TextField
                type={PasswordInputType as string}
                name="password"
                label={"Password"}
                value={formik.values.password}
                onChange={(event) => {
                  formik.handleChange(event);
                  checkPasswordHandler(event.target.value);
                }}
                onBlur={formik.handleBlur}
                className="lastIconField"
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  form: {
                    autoComplete: "off",
                  },
                  style: inputStyle,
                }}
                sx={{ ...inputFieldStyle, width: "100%" }}
              />
              {ToggleIcon}
            </Box>
            {renderServerError(serverError)}
            <Box sx={{ mb: "10px" }}>
              <h5 style={{ color: "#FFF" }}>
                Password must contain the following:
              </h5>
              <p
                id="letter"
                className={passwordVal.lowercase ? "valid" : "invalid"}
              >
                Must have 1 Lower Case Alphabet
              </p>
              <p
                id="capital"
                className={passwordVal.uppercase ? "valid" : "invalid"}
              >
                Must have 1 Upper Case Alphabet
              </p>
              <p
                id="number"
                className={passwordVal.numeral ? "valid" : "invalid"}
              >
                Must have 1 Number
              </p>
              <p
                id="length"
                className={passwordVal.minchar ? "valid" : "invalid"}
              >
                Minimum 7 characters required
              </p>
              <p
                id="length"
                className={passwordVal.maxchar ? "valid" : "invalid"}
              >
                Maximum of 18 characters only
              </p>
              <p
                id="specialchar"
                className={passwordVal.specialchar ? "valid" : "invalid"}
              >
                Must have 1 Special Character [-@#$%^&]
              </p>
            </Box>

            <Box className="BtnPart">
              <Button
                variant="contained"
                className="button btn-theme"
                type="submit"
                // onClick={(e) => {
                //   handleSubmit(e);
                // }}
                // data-testid="stepper-form-submit-button"
                // disabled={isFetching}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Box>
        <Box textAlign={"center"}>
          <React.Suspense fallback={<>...</>}>
            <VectorImage />
          </React.Suspense>
        </Box>
      </Box>
    </>
  );
}
