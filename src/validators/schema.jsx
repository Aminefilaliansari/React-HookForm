import * as yup from "yup";

export const schema = yup
  .object()
  .shape({
    Name: yup.string().required(),
    Age: yup.number().positive().integer().min(18).required(),
    Email: yup.string().email().required(),
    Password: yup.string().min(8).required(),
    ConfirmPassword: yup
      .string()
      .oneOf([yup.ref("Password")], "Passwords Don't Match")
      .required(),
    Status: yup.string().required(),
    NbrChild: yup
      .number()
      .positive()
      .integer()
      .when("Status", (Status, schema) => {
        if (Status.toString() === "M") {
          return schema.required("Required 'M'");
        }
        return schema;
      }),
    Experience: yup
      .array()
      .of(
        yup.object().shape({
          Company: yup.string().required("required COMPANY"),
          Years: yup.string().required("required YEARS"),
        })
      )
      .min(1, "Expereince === 0 "),
  })
  .required();
