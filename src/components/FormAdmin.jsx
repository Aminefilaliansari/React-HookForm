import { Button, Input, InputNumber, Radio, Select, Upload } from "antd";
import {
  useForm,
  Controller,
  useFieldArray,
  FormProvider,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../validators/schema";
import ExperienceForm from "./ExperienceForm";
import TextArea from "antd/lib/input/TextArea";
import { UploadOutlined } from "@ant-design/icons/lib/icons";
import JobParent from "./JobParent";

export default function FormAdmin() {
  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      age: undefined,
      password: "",
      confirmPassword: "",
      status: "",
      nbrChild: undefined,
      experience: [],
      activity: "",
      comment: "",
      job: "",
    },
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  const onSubmit = (data) => {
    console.log("data:", data);
    alert("Done");
    reset();
  };

  const { errors } = formState;

  return (
    <div id="formAdmin">
      <FormProvider control={control} formState={formState}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-wrapper">
            <Controller
              name="name"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Name" />}
            />
            <p role="alert">{errors.name?.message}</p>
          </div>

          <div className="input-wrapper">
            <Controller
              name="email"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Email" />}
            />
            <p role="alert">{errors.email?.message}</p>
          </div>

          <div className="input-wrapper">
            <Controller
              name="age"
              control={control}
              render={({ field }) => (
                <InputNumber
                  {...field}
                  placeholder="Age"
                  style={{ width: "100%" }}
                />
              )}
            />
            <p role="alert">{errors.age?.message}</p>
          </div>

          <div className="input-wrapper">
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password {...field} placeholder="Password" />
              )}
            />
            <p role="alert">{errors.password?.message}</p>
          </div>

          <div className="input-wrapper">
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input.Password {...field} placeholder="ConfirmPassword" />
              )}
            />
            <p role="alert">{errors.confirmPassword?.message}</p>
          </div>

          <div className="input-wrapper">
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Radio.Group {...field}>
                  <Radio value="C">C</Radio>
                  <Radio value="M">M</Radio>
                </Radio.Group>
              )}
            />
            <p role="alert">{errors.status?.message}</p>
          </div>

          <div className="input-wrapper">
            <Controller
              name="nbrChild"
              control={control}
              render={({ field }) => (
                <InputNumber
                  {...field}
                  placeholder="NbrChild"
                  style={{ width: "100%" }}
                />
              )}
            />
            <p role="alert">{errors.nbrChild?.message}</p>
          </div>

          <div id="sec-Experience" className="input-wrapper">
            <label>Experience : </label>
            <br />

            <ExperienceForm append={append} />

            <div className="lists-Experience">
              {fields.map((item, index) => (
                <div className="list" key={item.id}>
                  <span style={{ width: "45%" }}>
                    Company: {item.Company} |{" "}
                  </span>

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
              <p role="alert">{errors.experience.message}</p>
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
            <p role="alert">{errors.activity?.message}</p>
          </div>

          <div className="input-wrapper">
            <Controller
              name="Comment"
              control={control}
              render={({ field }) => (
                <TextArea {...field} placeholder="Comment" />
              )}
            />
            <p role="alert">{errors.comment?.message}</p>
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
                    if (info.fileList) {
                      onChange(info.fileList);
                    }
                  }}
                  fileList={value}
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              )}
            />
            {errors.picture && <p role="alert">{errors.picture.message}</p>}
          </div>

          <JobParent control={control} errors={errors} />

          <input type="submit" value="submit" />
        </form>
      </FormProvider>
    </div>
  );
}
