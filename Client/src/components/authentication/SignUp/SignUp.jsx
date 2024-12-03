// /* eslint-disable no-undef */
// "./signUp.css";
// import {
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   InputGroup,
//   InputRightElement,
//   // position,
//   useToast,
//   VStack,
// } from "@chakra-ui/react";
// import { useState } from "react";
// import axios from "axios"

// const SignUp = () => {

//   const [show, setShow]= useState(false)
//   const [name, setName] = useState();
//   const [email, setEmail] = useState();
//   const [password, setPassword] = useState();
//   const [confirmPassword, setConfirmPassword] = useState();
//   const [pic, setPic] = useState();
//   const [loading, setLoading] = useState();
//   const toast = useToast;

//   const handleClick = ()=>{
//     return setShow(!show)
//   }

// const postDetails = (pics)=>{
// setLoading(true);
// if (pic === undefined) {
//   toast({
//     title: "Please Select an Image!",
//     status: "warning",
//     duration: 5000,
//     isClosable: true,
//     position: "bottom"
//   });
//   return;
// }
// if(pics.type === "image/jpeg" || pics.image === "image/png"){
// const  data = new FormData();
// data.append("file", pics);
// data.append("upload_preset", "chat-app");
// data.append("cloud_name", dsj8y9cab);
// fetch("CLOUDINARY_URL=cloudinary://366714235963484:UAlFPW94zC6MUk4iVzEMP2w5IqE@dsj8y9cab",{
//   method: "post",
//   body: data
// })
// .then((res) =>res.json())
// .then(data=>{
//   setPic(data.url.toString());
//   setLoading()
// })

// }else{
//   toast({
//     title: "Please Select an Image!",
//     status: "warning",
//     duration: 5000,
//     isClosable: true,
//     position: "bottom"
//   });
//   setLoading(false)
//   return;
// }

//   }

//   const submitHandler = async ()=>{
//     setLoading();
//     if(!name || !email || !password || !confirmPassword){
//       toast({
//         title: "Please fill all the feilds!",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom"
//       });
//       setLoading(false)
//       return false
//     }
//     if(password != confirmPassword){
//       toast({
//         title: "password is not match with confirmPassword!",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom"
//       });
//       setLoading(false)
//       return false
//     }

//     try{
//       const config ={
//         headers:{
//           "Content-type": "application/json"
//         }
//       }
//       const {data} = await axios.post("/api/user", {name,email,password,pic},config);
//       toast({
//         title: "Registration Successful",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom"
//       })
//       localStorage.setItem('userInfo',JOSN.stringify(data))
//       // history.push("/chats")
//     }
//     catch(err){
//       toast({
//         title: "Error Occured!",
//         description: error.response.data.message,
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom"
//       });
//       setLoading(false)
//     }

//   }

//   return (
//     <VStack spacing="5px">
//       <FormControl id="first-name" isRequired>
//         <FormLabel>Name</FormLabel>
//         <Input
//           placeholder="Enter Your Name"
//           onChange={(e) => setName(e.target.value)}
//         />
//       </FormControl>
//       <FormControl id="email" isRequired>
//         <FormLabel>Email</FormLabel>
//         <Input
//           placeholder="Enter Your Email"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </FormControl>
//       <FormControl id="password" isRequired>
//         <FormLabel>Password</FormLabel>
//         <InputGroup>
//           <Input
//             type={show ? "text" : "password"}
//             placeholder="Enter Your Password"
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <InputRightElement width="4.5rem">
//             <Button h="1.75rem" size="sm" onClick={handleClick}>
//               {show ? "Hide" : "Show"}
//             </Button>
//           </InputRightElement>
//         </InputGroup>
//       </FormControl>
//       <FormControl id="confirmPassword" isRequired>
//         <FormLabel>Confirm Password</FormLabel>
//         <InputGroup>
//           <Input
//             type={show ? "text" : "password"}
//             placeholder="Enter Your Password"
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />

//           <InputRightElement width="4.5rem">
//             <Button h="1.75rem" size="sm" onClick={handleClick}>
//               {show ? "Hide" : "Show"}
//             </Button>
//           </InputRightElement>
//         </InputGroup>
//       </FormControl>
//       {/* <FormControl id="pic">
//             <FormLabel>Upload your Picture</FormLabel>
//                 <Input
//                 type="file"
//                 p={1.5}
//                 accept="image/*"
//                 placeholder="Enter Your Email"
//                 onChange={(e)=>postDetails(e.target.value[0])}
//                 />
//       </FormControl> */}
//       <Button
//       colorScheme="blue"
//       width="100%"
//       style={{marginTop: 15}}
//       onClick={submitHandler()}
//       loading={loading}
//       >
//      Sign Up
//       </Button>
//     </VStack>
//   );
// };

// export default SignUp;

import "./signUp.css";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [loading, setLoading] = useState(false);
  // const history = useHistory();
  const navigate = useNavigate();

  const toast = useToast();

  const postDetails = () => {};

  const handleClick = () => {
    return setShow(!show);
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: "5000",
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Password Do Not Match",
        status: "warning",
        duration: "5000",
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        { name, email, password },
        config
      );
      toast({
        title: "Registration Successful",
        status: "success",
        duration: "5000",
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      // history.push("/chats");
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "warning",
        duration: "5000",
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="email" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          placeholder="Enter Your Password"
          onChange={(e) => postDetails(e.target.value[0])}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        SingUp
      </Button>
      {/* <Button 
      variant="solid"
      colorScheme="red" 
      width="100%" 
      
      >
      Get Guest User Credentials
      </Button> */}
    </VStack>
  );
};

export default SignUp;
