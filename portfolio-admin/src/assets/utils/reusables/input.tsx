import { UseFormRegisterReturn, FieldError } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
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
            <div className='relative h-full df-ac justify-end'>
                <input type={!props.showPassword ? "password" : "text"} {...props.register} id={props.id} className='formInput  bg-white ' autoComplete='true' placeholder={props.placeholder} />
                <label htmlFor={props.id} className='absolute w-12 cursor-pointer bg-white text-xl h-[inherit] dfAc rounded-r-md' onClick={() => props.setShowPassword(!props.showPassword)} >
                    <FontAwesomeIcon icon={!props.showPassword ? faEyeSlash : faEye} className="text-black"/>
                </label>

            </div>
            <p className='text-[red] text-base '>
                {props.passwordError?.message?.toString()}
            </p >
        </div>)
}
const AuthInput = (props: AuthInputType) => {
    return (<div>

        <input type="text" {...props.register} placeholder={props.placeholder} className='formInput' />

        <p className='text-[red] text-base py-1'>
            {props.fieldError?.message?.toString()}
        </p >
    </div>
    )
}
export { AuthInput, InputPassword }