import { MdOutlineEdit } from "react-icons/md";
import { useState, useRef , useEffect} from "react";
import axios from 'axios'
import { uploadOnCloudinary } from "../../utils/uploadOnCloudinary";
import { useLoginContext } from "../../Context/loginContext";
import { Navigate, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constant";
export function Account() {
    const navigate = useNavigate()
    const {loginState} = useLoginContext()

       
    const [editPhotoVisibility, setEditPhotoVisibility] = useState(false);
    const [userDetails , setUserDetails] = useState(null)
    const [userProfilePhoto , setUserProfilePhoto] = useState(null)
    const fileInputRef = useRef(null);
    const token = localStorage.getItem('token')

    useEffect(()=>{
        (async()=>{
            try{
                const response = await axios.get(`${BASE_URL}/profile`,{
                    params:{
                        token
                    }
                })
                if(response.data.success === true){
                  
                    setUserDetails(response.data.user)
                    setUserProfilePhoto(response.data.user.profileImage)
                }
             
            }catch(err){
                console.log("ERROR : ",err)
            }
        })()
    },[])

    useEffect(()=>{
        if(!token){
            navigate('/login')
        }
    },[token])

    function editPhotoHandler() {
        // Trigger the file input element
        fileInputRef.current.click();
    }

    async function handleFileInputChange(event) {
        const file = event.target.files[0];
        try{
            const uplaodPhotoResponse = await uploadOnCloudinary(file,"image","User")
          
            const photoUrl = uplaodPhotoResponse.data.url

            const response = await axios.post(`${BASE_URL}/profile/update/photo`,{
                token,
                photo : photoUrl
            })
         
            setUserProfilePhoto(photoUrl)
        }catch(err){
            
        }
        
    }
  
    return (
        <div className="main h-9/10 w-full relative">
            
            <div className="heading h-1/4 w-full flex items-center justify-center text-8xl text-white">
                PROFILE
            </div>
            {userDetails ?
            <div className="image-container-wrapper pt-5 xl:h-3/4 w-full flex flex-col xl:flex-row  gap-10 xl:gap-2 ">
                <div className="image-container h-full xl:w-1/2 xl:border-r-2 border-solid border-white flex items-center justify-center ">
                    <div
                        className="image-wrapper h-80 w-80 rounded-full border-2 border-solid border-white flex items-center  justify-center relative "
                        onMouseLeave={() => setEditPhotoVisibility(false)}
                        onMouseEnter={() => setEditPhotoVisibility(true)}
                    >
                        <div
                            className="image  h-full w-full bg-cover bg-center rounded-full"
                            style={{
                                backgroundImage:
                                    `url('${userProfilePhoto}')`,
                            }}
                        ></div>

                        <div
                            className={`${editPhotoVisibility ? "visible" : "hidden"
                                } hover:cursor-pointer h-full w-full edit-image absolute left=0 top-0 flex items-center  justify-center `}
                            onClick={editPhotoHandler}
                        >
                            <MdOutlineEdit className={` hover:cursor-pointer text-white  h-1/3 w-1/3 opacity-70`} />
                        </div>
                    </div>
                </div>
                 
                <div className="details-container h-9/10 xl:w-1/2 m-2 flex flex-col justify-center items-center text-white overflow-x-hidden overflow-y-auto xl:gap-0 gap-2 xl:px-0 px-2">
                    <div className="Name h-1/5 w-full flex flex-row items-center justify-between">
                        <span className=" ml-2 flex items-center text-2xl xl:text-3xl h-full w-1/2 overflow-x-auto">Name</span>
                        <span className=" mr-2 flex items-center h-full w-1/2 text-xl overflow-x-auto">{userDetails.firstName} {userDetails.lastName}</span>
                    </div>
                    <div className=" Username h-1/5 w-full flex flex-row items-center justify-between">
                        <span className=" ml-2 flex items-center text-2xl xl:text-3xl h-full w-1/2 overflow-x-auto">Username</span>
                        <span className=" mr-2 flex items-center h-full w-1/2 text-xl overflow-x-auto">{userDetails.username}</span>
                    </div>
                    <div className=" Email h-1/5 w-full flex flex-row items-center justify-between">
                        <span className=" ml-2 flex items-center text-2xl xl:text-3xl h-full w-1/2 overflow-x-auto">Email</span>
                        <span className=" mr-2 flex items-center text-xl overflow-x-auto h-full w-1/2">{userDetails.email} </span>
                    </div>
                    <div className=" SongsOwned h-1/5 w-full flex flex-row items-center justify-between">
                        <span className=" ml-2 flex items-center text-2xl xl:text-3xl h-full w-1/2 overflow-x-auto">SongsOwned</span>
                        <span className=" mr-2 flex items-center h-full w-1/2 text-xl overflow-x-auto">{userDetails.songsOwned.length}</span>
                    </div>
                    <div className=" AccountType h-1/5 w-full flex flex-row items-center justify-between">
                        <span className=" ml-2 flex items-center text-2xl xl:text-3xl h-full w-1/2 overflow-x-auto">Account Type</span>
                        <span className=" mr-2 flex items-center h-full w-1/2 text-xl overflow-x-auto">{userDetails.accountType } </span>
                    </div>
                  
                </div>
            </div>
            :
            <div className="flex justify-center mt-10 text-white text-xl">Loading...</div>
        }
            {/* Hidden input type file element */}
            <input
                type="file"
                id="upload-photo-input"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileInputChange}
                ref={fileInputRef}
            />
            
        </div>
    );
}
