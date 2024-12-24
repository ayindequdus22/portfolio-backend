import { UseFormRegisterReturn, FieldError } from "react-hook-form";

type AuthInputType = {
    register: UseFormRegisterReturn; fieldError: FieldError | undefined;
    placeholder: string

};
type InputPasswordProps = {
    register: UseFormRegisterReturn; passwordError: FieldError | undefined; showPassword: boolean;
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
    placeholder: string, id: string

}
const InputPassword = (props: InputPasswordProps) => {
    return (
        <div className="">
            <div className='relative h-full df-ac justify-end my-2'>
                <input type={!props.showPassword ? "password" : "text"} {...props.register} id={props.id} className='formInput' autoComplete='true' placeholder={props.placeholder} />
                <label htmlFor={props.id} className='absolute pr-4 cursor-pointer bg-white text-xl' onClick={() => props.setShowPassword(!props.showPassword)} >
                    {/* <FontAwesomeIcon icon={!props.showPassword ? faEyeSlash : faEye} /> */}
                </label>

            </div>
            {props.passwordError && <p className='text-[red] text-base '>
                {props.passwordError.message?.toString()}
            </p >}
        </div>)
}
const AuthInput = (props: AuthInputType) => {
    return (<div>

        <input type="text" {...props.register} placeholder={props.placeholder} className='formInput' />

        {props.fieldError && <p className='text-[red] text-base py-1'>
            {props.fieldError.message?.toString()}
        </p >}
    </div>
    )
}
export {AuthInput,InputPassword}