import React, { useState } from 'react'
import { AuthInput } from './utils/reusables/input'
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMyMutation } from './utils/query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faVideo } from '@fortawesome/free-solid-svg-icons';
import ReactPlayer from 'react-player';
import axios from 'axios';
import * as cloud from './utils/axios';
import { useNavigate } from 'react-router-dom';

const AddProject = (): React.JSX.Element => {
    const navigate = useNavigate();


    const { mutate, isPending } = useMyMutation("/admin/add-project", "addProject");

    type ProjectType = {
        title: string,
        image: string,
        lDescription: string,
        bDescription: string,
        video: string,
        link: string,
        category: string

    };
    const [preview, setPreview] = useState<{
        imagePreview: string | null;
        videoPreview: string | null;
    }>({ imagePreview: null, videoPreview: null })
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview({ ...preview, imagePreview: reader.result as string })
                    // setImagePreview(reader.result as string); // Set image preview URL
                };
                reader.readAsDataURL(file);
            } else {
                alert('Please upload a valid image file.');
                event.target.value = ''; // Reset input
            }
        }
    };

    const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.type.startsWith('video/')) {
                if (file.size > 1000 * 1024 * 100) { // Limit to 10MB
                    alert('Video size should not exceed 100MB.');
                    event.target.value = ''; // Clear the input
                    return;
                }
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview({ ...preview, videoPreview: reader.result as string }); // Set image preview URL
                };
                reader.readAsDataURL(file);
            } else {
                alert('Please upload a valid video file.');
                event.target.value = ''; // Reset input
            }
        }


    };

    const { formState: { errors, }, register, handleSubmit, } = useForm<ProjectType>();
    const submitHandler: SubmitHandler<ProjectType> = async (formFields) => {
        console.log("Handling");
        const { bDescription, category, lDescription, title, link } = formFields;
        const formData = new FormData();
        formData.append('upload_preset', cloud.cloudUploadPreset);
        formData.append('folder', cloud.cloudUploadFolder);


        const uploadVideo = async () => {
            try {
                if (!preview.videoPreview) {
                    throw new Error("No video selected");
                }
                formData.append('file', preview.videoPreview);
                const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloud.cloudName}/video/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / (progressEvent.total as number)
                        );
                        console.log(`Upload Video progress: ${percentCompleted}%`);
                    },
                })
                console.log(res.data.url);
                // setVideoUrl(res.data.url);
                return res.data.url;
            } catch (error) {
                console.log(error)
            }

        }
        const uploadImage = async () => {
            try {
                if (!preview.imagePreview) {
                    throw new Error("No image selected");
                }
                formData.append('file', preview.imagePreview);
                const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloud.cloudName}/image/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / (progressEvent.total as number)
                        );
                        console.log(`Upload Image progress: ${percentCompleted}%`);
                    },
                })
                // setImageUrl(res.data.url);
                console.log(res.data.url);
                return res.data.url;
            } catch (error) {
                console.log(error);
            }

        }
        try {
            const uploadedVideoUrl = await uploadVideo();
            console.log('Uploaded Video URL:', uploadedVideoUrl);

            const uploadedImageUrl = await uploadImage();
            console.log('Uploaded Image URL:', uploadedImageUrl);
            // title, image, video, lDescription, bDescription, category, link
            const data = await { image: uploadedImageUrl, video: uploadedVideoUrl, title, lDescription, bDescription, category, link };

            mutate(
                data, {
                onSuccess: (response) => {
                    console.log("Success:", response);
                    navigate("/admin/projects");
                },
                onError: (error) => {
                    throw new Error(`Error ${error}`);
                },
            });
        } catch (error) {
            throw new Error(error as string);
        }


    }
    return (
        <main>
            <h3>Add Project</h3>
            <form onSubmit={handleSubmit(submitHandler)}
                className='df-flDc gap-2'>
                <AuthInput register={{
                    ...register("title", {
                        required: "Enter the title of the project", minLength: {
                            value: 4, message: "Title length must not be less than 4"
                        }, maxLength: {
                            value: 20, message: "Title length must not be greater than 20"
                        }
                    })
                }} placeholder='Title' fieldError={errors.title} />
                <div>

                    <textarea className='h-40 w-[40rem] resize-none text-black rounded-md p-1' {
                        ...register("lDescription", {
                            required: "Enter a short description", minLength: {
                                value: 30, message: "Short Description length must not be less than "
                            }, maxLength: {
                                value: 200, message: "Short Description length must not be greater than 200"
                            }
                        })
                    } placeholder='Short Description' />
                    <p className='text-[red] text-base py-1'>{errors.lDescription?.message?.toString()}</p>
                </div>
                <div>
                    <textarea className='h-64 w-[40rem] px-2 py-1 rounded-md text-black' {
                        ...register("bDescription", {
                            required: "Enter a long description", minLength: {
                                value: 300, message: "Long Description length must not be less than 200"
                            }, maxLength: {
                                value: 900, message: "Long Description length must not be greater than 800"
                            }
                        })
                    } placeholder='Long Description' />
                    <p className='text-[red] text-base py-1'>{errors.bDescription?.message?.toString()}</p>
                </div>
                <div>

                    <input type="file" id='imageInput' placeholder='Image' accept="image/*"  {...register('image', { required: 'Image is required' })}
                        onChange={handleImageChange}
                        className='formInput invisible' />
                    <label htmlFor="imageInput" className='w-[40rem] h-80 bg-white dfAc rounded-md overflow-hidden'>
                        {preview.imagePreview ?
                            (
                                <img src={preview.imagePreview} alt="Selected preview" className='h-[inherit] w-[inherit]' />
                            ) : (

                                <label className='text-gray-600' htmlFor="imageInput">No image uploaded</label>
                            )
                        }
                    </label>
                    <label htmlFor="imageInput">
                        <p>    Upload image <FontAwesomeIcon icon={faImage} /></p>
                    </label>

                    <p className='text-[red] text-base py-1'>
                        {errors.image?.message?.toString()}
                    </p >
                </div>
                <div>

                    <input id='videoInput'
                        type="file"
                        accept="video/*" {...register('video', { required: 'Video is required' })}
                        onChange={handleVideoChange}
                        className="formInput invisible"
                    // Handle video selection
                    />
                    {/* */}
                    {/* Show video preview */}
                    <label htmlFor="videoInput" className='w-[40rem] h-80 bg-white dfAc rounded-md'>
                        {preview.videoPreview ? (
                            <ReactPlayer
                                url={preview.videoPreview}
                                controls
                                width="100%"
                                height="100%"

                            />
                        ) : (
                            <p className='text-gray-600' >No video uploaded</p>
                        )}
                    </label>
                    <label htmlFor="videoInput">
                        <p>Upload Video <FontAwesomeIcon icon={faVideo} /></p>
                    </label>
                    <p className='text-[red] text-base py-1'>{errors.video?.message?.toString()}</p>
                </div>

                <AuthInput register={{
                    ...register("category", {
                        required: "Enter the category",
                        validate: (value) => {
                            if ((value != "web") && (value != "mobile") && (value != "backend"))
                                return "Put the correct category"
                        }
                    })
                }} placeholder='Category' fieldError={errors.category} />

                <AuthInput register={{
                    ...register("link", {
                        required: "Input the link to the project", minLength: {
                            value: 10, message: "Link length must not be less than 10"
                        }, maxLength: {
                            value: 80, message: "Link length must not be greater than 80"
                        }
                    })
                }} placeholder='Link' fieldError={errors.link} />
                {!isPending ? <button >Submit</button> : (
                    <></>
                )}

            </form>

        </main>
    )
}

export default AddProject