import { Button, Input, InputNumber, Radio } from "antd";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../validators/schema";
import ExperienceForm from "./ExperienceForm";

export default function FormAdmin() {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      Name: "A",
      Email: "A@test.com",
      Age: 20,
      Password: "123456789",
      ConfirmPassword: "123456789",
      Status: "M",
      NbrChild: 1,
      Experience: [],
    },
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "Experience",
  });

  const onSubmit = (formData) => {
    console.log("formData", formData);
    //reset();
  };

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

        <div id="Sec-Experience" className="input-wrapper">
          <label>EXPERIENCE : </label>
          <br />

          <ExperienceForm append={append}/>

          <div className="Lists-Experience">
            {fields.map((item, index) => (
              <div className="list" key={item.id}>
                <span style={{ width: "45%" }}>Company: {item.Company} | </span>

                <span style={{ width: "45%" }}>Years: {item.Years} | </span>

                <Button
                  style={{ width: "10%" }}
                  type="button"
                  id={index}
                  onClick={() => remove(index)}
                >
                  -
                </Button>
              </div>
            ))}
          </div>
        </div>

        <br />
        <input type="submit" value="submit" />

        {console.log("errors:", errors)}
      </form>
    </div>
  );
}
