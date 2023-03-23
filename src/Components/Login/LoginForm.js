// import Welcome from "../Renders/Welcome";
// import { Button } from "@mui/material";
// import { useEffect } from "react";
// const LoginForm = props => {
//   const { handleLoad } = props;

//   const handleLogin = async () => {
//     handleLoad(1);
//   };

//   const handleRegister = async () => {
//     handleLoad(3);
//   };

//   useEffect(() => {
  
//   }, [handleLoad]);
  
//     if (user !== null) {
//       navigate("/");
//     }
//   }, [user, navigate];

//   const onSubmit = async ({ username, password }) => {
//      setLoading(true);
//      const [error, userResponse] = await submitUser(username, password);
//      if (error !== null) {
//        setApiError(error);
//      }

//      if (userResponse !== null) {
//      storageSave("logged-user", userResponse);
//      setUser(userResponse);
//     }
//     setLoading(false);
//   };


//   return (
//     <>
//       {/* <h1>Log in:</h1>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <fieldset>
//            <label htmlFor="username">Username:</label>
//           <input type="text" placeholder="username" {...register("username", usernameConfig)} />

//           <label htmlFor="password">Password:</label>
//           <input type="text" placeholder="password" {...register("password", usernameConfig)} />  */}
//           {!isLoggedIn && ( 
//           <div>
//             <Welcome />
//             <Button variant="contained" color="success" onClick={handleLogin}>
//               {" "}
//               Login
//             </Button>
//             <Button variant="contained" color="warning" onClick={handleRegister}>
//               {" "}
//               Register
//             </Button>
//           </div>
//         </fieldset>
//           )};
//         </fieldset>

//         <button type="submit" disabled={loading}>
//           Log in
//         </button>
//         {loading && <p>Logging in...</p>}
//         {apiError && <p>{apiError}</p>}
//       </form>
  
//   );
// };

// </>
//   )
// export default LoginForm;
