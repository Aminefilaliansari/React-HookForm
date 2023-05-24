import { Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

export default function JobChild() {
  const control = useFormContext();
  const errors = useFormContext();

  //const {control , errors} = useFormContext()

  return (
    <>
      <label htmlFor="job">Job:</label>
      <Controller
        control={control}
        name="job"
        render={({ field }) => <Input {...field} />}
      />

      {errors.job && <p role="alert">{errors.job.message}</p>}
    </>
  );
}
