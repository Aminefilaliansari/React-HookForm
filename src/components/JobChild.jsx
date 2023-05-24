import { Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

export default function JobChild() {
  const { control, formState } = useFormContext();
  console.log(control, formState.errors);

  return (
    <>
      <label htmlFor="job">Job:</label>
      <Controller
        control={control}
        name="job"
        render={({ field }) => <Input {...field} />}
      />

      {formState.errors.job && (
        <p role="alert">{formState.errors.job.message}</p>
      )}
    </>
  );
}
