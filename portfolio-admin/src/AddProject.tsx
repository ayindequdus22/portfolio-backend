import React, { useState } from 'react'
import { AuthInput } from './assets/utils/reusables/input'
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMyMutation } from './assets/utils/query';

const AddProject = (): React.JSX.Element => {

    const { mutate, error } = useMyMutation("/admin/add-project", "addProject");

    type ProjectType = {
        title: string,
        image: string,
        lDescription: string,
        bDescription: string,
        video: string,
        link: string,
        category: string

    };
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          setSelectedFile(file.name); // Set the file name in state
        }
      };
    const { formState: { errors }, register, handleSubmit } = useForm<ProjectType>();
    const submitHandler: SubmitHandler<ProjectType> = async (data) => {
        mutate(data, {
            onSuccess: (response) => {
                console.log("Success:", response);
            },
            onError: (error) => {
                console.error("Error:", error);
            },
        });
    }
    return (
        <main>
            <h3>Add Project</h3>
            <form onSubmit={handleSubmit((v) => {
                console.log(v)
            })} className='df-flDc gap-2'>
                <AuthInput register={{
                    ...register("title", {
                        required: "Enter the title of the project", minLength: {
                            value: 4, message: "Title length must not be less than 4"
                        }, maxLength: {
                            value: 20, message: "Title length must not be greater than 20"
                        }
                    })
                }} placeholder='Title' fieldError={errors.title} />
                <AuthInput register={{
                    ...register("lDescription", {
                        required: "Enter a short description", minLength: {
                            value: 0, message: "Short Description length must not be less than "
                        }, maxLength: {
                            value: 30, message: "Short Description length must not be greater than 200"
                        }
                    })
                }} placeholder='Long Description' fieldError={errors.lDescription} />
                <AuthInput register={{
                    ...register("bDescription", {
                        required: "Enter a short description", minLength: {
                            value: 0, message: "Long Description length must not be less than 200"
                        }, maxLength: {
                            value: 30, message: "Long Description length must not be greater than 800"
                        }
                    })
                }} placeholder='Short Description' fieldError={errors.bDescription} />
                <div>
{selectedFile}
                    <input type="file" placeholder='Image' accept="image/*"    {...register('image', { required: 'Image is required' })}  className='formInput'       onChange={handleFileChange} />

                    {errors.image && <p className='text-[red] text-base py-1'>
                        {errors.image.message?.toString()}
                    </p >}
                </div>

                {/* <AuthInput register={{
                    ...register("video", {
                        required: "",
                    })
                }} placeholder='Video' fieldError={errors.video} /> */}
                <AuthInput register={{
                    ...register("category", {
                        required: "Enter the category",
                        //  validate: (value) => {
                        //     return "Hello"
                        // }
                    })
                }} placeholder='Category' fieldError={errors.category} />

                <AuthInput register={{
                    ...register("link", {
                        required: "", minLength: {
                            value: 10, message: "Link length must not be less than 10"
                        }, maxLength: {
                            value: 40, message: "Link length must not be greater than 40"
                        }
                    })
                }} placeholder='Link' fieldError={errors.link} />
                <button type='submit'>Submit</button>
            </form>

        </main>
    )
}

export default AddProject