import { Button, Input, InputNumber, Radio } from "antd";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
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
    //Experience : yup.string().required(),  
    Experience : yup.array().of(
        yup.object().shape({
          Company: yup.string().required("required COMPANY"),
          Years: yup.string().required("required YEARS"),
        })

    )
    //Compagny : yup.string().required(),  
  })
  .required();

export default function FormAdmin() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      Name: "",
      Experience: [{ Company: "", Years: "" }],
    },
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    name: "Experience",
    control,
  });

  const onSubmit = (data) => console.log(data);

  return (
    <div id="FormAdmin">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrapper">
          <Controller
            name="Name"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Name" />}
          />
          <p role="alert">{errors.Name?.message}</p>
        </div>

        <div className="input-wrapper">
          <Controller
            name="Email"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Email" />}
          />
          <p role="alert">{errors.Email?.message}</p>
        </div>

        <div className="input-wrapper">
          <Controller
            name="Age"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                placeholder="Age"
                style={{ width: "100%" }}
              />
            )}
          />
          <p role="alert">{errors.Age?.message}</p>
        </div>

        <div className="input-wrapper">
          <Controller
            name="Password"
            control={control}
            render={({ field }) => (
              <Input.Password {...field} placeholder="Password" />
            )}
          />
          <p role="alert">{errors.Password?.message}</p>
        </div>

        <div className="input-wrapper">
          <Controller
            name="ConfirmPassword"
            control={control}
            render={({ field }) => (
              <Input.Password {...field} placeholder="ConfirmPassword" />
            )}
          />
          <p role="alert">{errors.ConfirmPassword?.message}</p>
        </div>

        <div className="input-wrapper">
          <Controller
            name="Status"
            control={control}
            render={({ field }) => (
              <Radio.Group {...field}>
                <Radio value={"C"}>C</Radio>
                <Radio value={"M"}>M</Radio>
              </Radio.Group>
            )}
          />
          <p role="alert">{errors.Status?.message}</p>
        </div>

        <div className="input-wrapper">
          <Controller
            name="NbrChild"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                placeholder="NbrChild"
                style={{ width: "100%" }}
              />
            )}
          />
          <p role="alert">{errors.NbrChild?.message}</p>
        </div>

        <div id="Experience" className="input-wrapper">
          <label>EXPERIENCE : </label>
          <br />

          <Controller
          control={control}
          name={Experience.Company}
          render={({ field }) => (
            <Input {...field} style={{ width: "50%" }} placeholder="Company" />
          )}    
              />

        
          <p role="alert">{errors.Experience?.message}</p>
          <p role="alert">{errors.Company?.message}</p>
        </div>

        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <span style={{ width: "45%" }}>Company: {index} | </span>

              <span style={{ width: "45%" }}>Years: {index} | </span>

              <Button
                style={{ width: "10%" }}
                type="button"
                onClick={() => remove(index)}
              >
                -
              </Button>
            </div>
          );
        })}

        <br />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}
