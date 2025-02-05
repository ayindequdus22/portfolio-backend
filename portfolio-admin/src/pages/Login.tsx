import React, { useState } from 'react'
import { useMyMutation } from '../utils/query'
import { AuthInput, InputPassword } from '../utils/reusables/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../utils/reusables/button';
import { QueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const Login = (): React.JSX.Element => {
  const { mutate } = useMyMutation("/admin/login", "authUser");
const navigate = useNavigate();
  type FormType = {
    username: string,
    email: string,
    role: string
    password: string,

  };
  const { formState: { errors }, register, handleSubmit } = useForm<FormType>();
  const submitHandler: SubmitHandler<FormType> = async (data) => {
    mutate(data, {
      onSuccess: (response) => {
        console.log("Success:", response);
        const query = new QueryClient();
        navigate("/admin/projects");
        query.invalidateQueries({queryKey:"auth-user"});
      },
      onError: (error) => {
        console.error("Error:", error);
      },
    });
  }
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>

      <div className='bg-black h-screen w-screen dfAc'>
        <form onSubmit={handleSubmit(submitHandler)} className='df-flDc gap-2 bg-zinc-900 p-2 rounded-md shadow-[0_0_4px_rgba(255,255,255,.4)]'>
          <p>Login</p>
          <AuthInput register={{
            ...register("username", {
              required: "Enter your username",
              minLength: {
                value: 6, message: "Username length must equal to 6"
              }, maxLength: {
                value: 6, message: "Username length must equal to 6"
              },
            })
          }} placeholder='Username' fieldError={errors.username} />
          <AuthInput register={{
            ...register("email", {
              required: "Please enter your email address", pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid email address',
              },
              validate: (value) => {
                if (!value.endsWith(".com")) {
                  return "Invalid email address"
                }
              }
            })
          }} fieldError={errors.email} placeholder={'Email'} />
          <AuthInput register={{
            ...register("role", {
              required: "Enter your role",
              minLength: {
                value: 5, message: "Role length must equal to 5"
              }, maxLength: {
                value: 5, message: "Role length must equal to 5"
              },
            })
          }} placeholder='Role' fieldError={errors.role} />
          <InputPassword id='password' placeholder='Password' passwordError={errors.password} register={{
            ...register("password", {
              required: "Please enter your password.", maxLength: {
                value: 30, message: "Password must have atleast 8-30 characters"
              }, minLength: {
                value: 2, message: "Password must have atleast 8-30 characters"
              }
            })
          }} showPassword={showPassword} setShowPassword={setShowPassword} />
          <Button children={'Login'} className='bg-primary w-60' onClick={handleSubmit(submitHandler)} />

        </form>
      </div>

    </>
  )
}

export default Login