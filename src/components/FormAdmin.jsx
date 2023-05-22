import { Button, Input, InputNumber, Radio, Select, Upload } from "antd";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../validators/schema";
import ExperienceForm from "./ExperienceForm";
import TextArea from "antd/lib/input/TextArea";
import { UploadOutlined } from "@ant-design/icons/lib/icons";

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
      Experience: [{ Company: "Stc", Years: "2023" }],
      Activity: "IT",
      Comment: "Message",
    },
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "Experience",
  });

  const onSubmit = (data) => {
    console.log("data:", data);
    reset();
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
          <label>Experience : </label>
          <br />

          <ExperienceForm append={append} />

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
          {errors?.Experience && (
            <p role="alert">{errors.Experience.message}</p>
          )}
        </div>

        <div className="input-wrapper">
          <label> Activity :</label>
          <br />
          <Controller
            name="Activity"
            control={control}
            render={({ field }) => (
              <Select
                defaultValue=""
                {...field}
                options={[
                  { value: "IT" },
                  { value: "Ecommerce" },
                  { value: "Designer" },
                  { value: "Marketing" },
                ]}
                style={{ width: "100%" }}
              />
            )}
          />
          <p role="alert">{errors.Activity?.message}</p>
        </div>

        <div className="input-wrapper">
          <Controller
            name="Comment"
            control={control}
            render={({ field }) => (
              <TextArea {...field} placeholder="Comment" />
            )}
          />
          <p role="alert">{errors.Comment?.message}</p>
        </div>

        <div className="input-wrapp">
          <Controller
            name="picture"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Upload
                beforeUpload={() => false}
                accept=".jpg,.png"
                maxCount={1}
                onChange={(info) => {
                    onChange(info.fileList);
                  }
                }
                fileList={value}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            )}
          />
          {errors.picture && <p role="alert">{errors.picture.message}</p>}
        </div>

        <br />
        <input type="submit" value="submit" />

        {console.log("errors:", errors)}
      </form>
    </div>
  );
}
