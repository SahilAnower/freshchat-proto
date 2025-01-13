import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import useGoogleSignup from "../hooks/useGoogleSignup.js";
import useGoogleSignin from "../hooks/useGoogleLogin.js";

const Authpage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const { loading: googleSignupLoading, googleSignup } = useGoogleSignup();
  const { loading: googleSigninLoading, googleLoginFn } = useGoogleSignin();
  const [userType, setUserType] = useState("USER"); // "USER" or "ADMIN"

  const googleSignin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      if (isSignUp) {
        handleGoogleSignup(codeResponse);
      } else {
        handleGoogleLogin(codeResponse);
      }
    },
  });

  const handleGoogleLogin = async (codeResponse) => {
    // setInputs({...inputs, googleAccessToken: codeResponse?.access_token})
    const googleAccessToken = codeResponse?.access_token;
    await googleLoginFn(googleAccessToken);
  };

  const handleGoogleSignup = async (codeResponse) => {
    // setInputs({...inputs, googleAccessToken: codeResponse?.access_token})
    const googleAccessToken = codeResponse?.access_token;
    await googleSignup(googleAccessToken, userType);
  };

  return (
    <div>
      <div>
        <h1>{isSignUp ? "Sign Up" : "Sign In"}</h1>
        <div>
          <button onClick={() => setUserType("USER")}>User</button>
          <button onClick={() => setUserType("ADMIN")}>Admin</button>
        </div>

        <div>
          <button
            type="button"
            onClick={googleSignin}
            className="btn btn-block btn-sm mt-2"
            disabled={googleSignupLoading || googleSigninLoading}
          >
            <FcGoogle />
            {googleSignupLoading || googleSigninLoading ? (
              <span>Loading...</span>
            ) : isSignUp ? (
              "Sign up with Google"
            ) : (
              "Log in with Google"
            )}
          </button>
        </div>

        <p onClick={() => setIsSignUp((prev) => !prev)}>
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </p>
      </div>
    </div>
  );
};

export default Authpage;
