import { useForm, Controller } from "react-hook-form";
import { Input, Button } from "antd";

const ExperienceForm = ({ append }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      company: "",
      years: "",
    },
  });

  function onSubmit(values) {
    console.log("OK", values);
    append(values);
    reset();
  }

  return (
    <>
      <div>
        <Controller
          name={`company`}
          control={control}
          render={({ field }) => (
            <Input {...field} style={{ width: "45%" }} placeholder="Company" />
          )}
          rules={{ required: "company required" }}
        />

        <Controller
          name={`years`}
          control={control}
          render={({ field }) => (
            <Input {...field} style={{ width: "45%" }} placeholder="Years" />
          )}
          rules={{ required: "years required" }}
        />

        <Button htmlType="button" onClick={handleSubmit(onSubmit)}>
          +
        </Button>
      </div>
      {errors?.company && <p role="alert">{errors.company.message}</p>}
      {errors?.years && <p role="alert">{errors.years.message}</p>}
    </>
  );
};

ExperienceForm.propTypes = {
  append: () => "",
};

export default ExperienceForm;
