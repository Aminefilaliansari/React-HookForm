import { Input } from "antd";
import {Controller } from "react-hook-form";

export default function JobChild({control, errors}) {

  return (
    <>
      <label htmlFor="job">Job:</label>
      <Controller
        control={control}
        name="job"
        render={({ field }) => <Input {...field} />}
      />
      {console.log("ERROR JOB:",errors)}
      {errors.job && <p role="alert">{errors.job.message}</p>}
    </>
  );
}
