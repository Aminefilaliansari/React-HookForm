import { useForm, Controller } from "react-hook-form";
import { Input, Button } from 'antd';

const ExperienceForm = ({append}) => {
    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            Company: '',
            Years: '',

        }
    });

    function onSubmit(values) {
        console.log('OK', values);
        append(values);
        reset();
    }

    return (
        <>
            <div>
                <Controller
                name={`Company`}
                control={control}
                render={({ field }) => (
                    <Input
                    {...field}
                    style={{ width: "45%" }}
                    placeholder="Company"
                    />
                )}
                rules={{ required: 'company required' }}
                />

                <Controller
                name={`Years`}
                control={control}
                render={({ field }) => (
                    <Input
                    {...field}
                    style={{ width: "45%" }}
                    placeholder="Years"
                    />
                )}
                rules={{ required: 'years required' }}
                />

                <Button htmlType="button" onClick={handleSubmit(onSubmit)}>+</Button>
            </div>
            {errors?.Company && <p role="alert">{errors.Company.message}</p>}
            {errors?.Years && <p role="alert">{errors.Years.message}</p>}
        </>
    )
}


ExperienceForm.propTypes = {
    append: () => '',
  };

export default ExperienceForm;
