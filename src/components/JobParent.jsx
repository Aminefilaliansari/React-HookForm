import JobChild from "./JobChild";

export default function JobParent({control, errors}) {
  return <JobChild control={control} errors={errors} />;
}
