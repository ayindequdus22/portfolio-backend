import React, { useState } from 'react'
import { AuthInput } from './assets/utils/reusables/input'
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMyMutation } from './assets/utils/query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faVideo } from '@fortawesome/free-solid-svg-icons';
import ReactPlayer from 'react-player';
import axios from 'axios';
import * as cloud from './assets/utils/axios';

const AddProject = (): React.JSX.Element => {

    const { mutate,isPending } = useMyMutation("/admin/add-project", "addProject");
   
    type ProjectType = {
        title: string,
        image: string,
        lDescription: string,
        bDescription: string,
        video: string,
        link: string,
        category: string

    };
    const [imagePreview, setImagePreview] = useState<string | null>(null); // For image preview
    const [videoPreview, setVideoPreview] = useState<string | null>(null);
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result as string); // Set image preview URL
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
                const reader = new FileReader();
                reader.onloadend = () => {
                    setVideoPreview(reader.result as string); // Set image preview URL
                };
                reader.readAsDataURL(file);
            } else {
                alert('Please upload a valid video file.');
                event.target.value = ''; // Reset input
            }
        }
        // // Validation checks
        // if (!file || videoPreview) {
        //     alert('No file selected.');
        //     return;
        // }
        // if (!file.type.startsWith('video/')) {
        //     alert('Please upload a valid video file.');
        //     event.target.value = ''; // Clear the input
        //     return;
        // }
        // if (file.size > 1000 * 1024 * 1024) { // Limit to 10MB
        //     alert('Video size should not exceed 1000MB.');
        //     event.target.value = ''; // Clear the input
        //     return;
        // }

        // Set preview
        // setVideoPreview(URL.createObjectURL(file));

    };

    const { formState: { errors, }, register, handleSubmit, watch, } = useForm<ProjectType>();
    // const img = watch("image");
    // console.log(img) // mutate(data, {
        //     onSuccess: (response) => {
        //         console.log("Success:", response);
        //     },
        //     onError: (error) => {
        //         console.error("Error:", error);
        //     },
        // });
        // console.log("Sending equest")
        // try {
        //     const res = await axios.post(`http://localhost:7000/api/v1/admin/add-project`,
        //     {image:imagePreview,video:videoPreview},
        //     {timeout:3000000,
        //         headers: {
        //           'Content-Type': 'multipart/form-data',
        //         }},)      
        //     console.log(res.data)
        // } catch (error) {
        //     console.log(error)
        // }

        //         const file = [imagePreview, videoPreview]
        //         const promises = file.map((f) => {
        //         const formData = new FormData();
        //         formData.append('file', f);
        //         console.log(f);
        //         formData.append('upload_preset', cloud.cloudUploadPreset);
        //         formData.append('folder', cloud.cloudUploadFolder);
        //     const res =    axios.post(`https://api.cloudinary.com/v1_1/${cloud.cloudName}/video/upload`, formData,   {
        //         headers: {
        //           'Content-Type': 'multipart/form-data',
        //         },
        //         onUploadProgress: (progressEvent) => {
        //           const percentCompleted = Math.round(
        //             (progressEvent.loaded * 100) / progressEvent.total
        //           );
        //           console.log(`Upload progress: ${percentCompleted}%`);
        //         },
        //       })
        //       console.log(res)
        // return res;    
        // }    
        //     )

        //     try {
        //         const responses = await Promise.all(promises);
        //         responses.forEach((res) => console.log('Uploaded file:', res));
        //       } catch (error) {
        //         console.error('Error uploading files:', error);
        //       }
        // }
    const submitHandler: SubmitHandler<ProjectType> = async (formFields) => {
       const {bDescription,category,lDescription,title,link} =  formFields;
        const formData = new FormData();
        formData.append('upload_preset', cloud.cloudUploadPreset);
        formData.append('folder', cloud.cloudUploadFolder);


        const uploadVideo = async () => {
            try {
                formData.append('file', videoPreview);
                const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloud.cloudName}/video/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
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
                formData.append('file', imagePreview);
                const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloud.cloudName}/image/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
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
const data = {image:uploadedImageUrl,video:uploadedVideoUrl,title, lDescription, bDescription, category, link};

mutate(
data, {
        onSuccess: (response) => {
            console.log("Success:", response);
        },
        onError: (error) => {
            console.error("Error:", error);
        },
    });  
        } catch (error) {
         console.log(error)   
        }
       

    }
    return (
        <main>
            <h3>Add Project</h3>
            <form onSubmit={handleSubmit(submitHandler

            )}
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

                    <textarea className='h-80 w-80 text-black' {
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
                    <textarea className='h-80 w-80 text-black' {
                        ...register("bDescription", {
                            required: "Enter a long description", minLength: {
                                value: 300, message: "Long Description length must not be less than 200"
                            }, maxLength: {
                                value: 800, message: "Long Description length must not be greater than 800"
                            }
                        })
                    } placeholder='Long Description' />
                    <p className='text-[red] text-base py-1'>{errors.bDescription?.message?.toString()}</p>
                </div>
                <div>

                    <input type="file" id='imageInput' placeholder='Image' accept="image/*" onChange={handleImageChange}
                        //   {...register('image', { required: 'Image is required' })} 
                        className='formInput invisible' />
                    <label htmlFor="imageInput" className='w-[40rem] h-80 bg-white dfAc rounded-md'>
                        {imagePreview ?
                            (
                                <img src={imagePreview} alt="Selected preview" style={{ maxWidth: '200px', marginTop: '10px' }} />
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
                        accept="video/*"
                        onChange={handleVideoChange}
                        className="formInput invisible"
                    // Handle video selection
                    />
                    {/* {...register('video', { required: 'Video is required' })} */}
                    {/* Show video preview */}
                    <label htmlFor="videoInput" className='w-[40rem] h-80 bg-white dfAc rounded-md'>
                        {videoPreview ? (
                            <ReactPlayer
                                url={videoPreview}
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
                            value: 40, message: "Link length must not be greater than 40"
                        }
                    })
                }} placeholder='Link' fieldError={errors.link} />
                {!isPending && <button type='submit'>Submit</button>}
                
            </form>

        </main>
    )
}

export default AddProject