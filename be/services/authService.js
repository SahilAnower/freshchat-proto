import User from "../models/User.js";
import GoogleService from "./googleService.js";

class AuthService {
  #googleService;
  #allowedAdminEmails = ["sahilanower2@gmail.com"];
  constructor(accessToken) {
    this.#googleService = new GoogleService(accessToken);
  }

  async googleSignup(bodyData) {
    try {
      if (!bodyData.userType) {
        return {
          statusCode: 422,
          body: null,
          error: "User type not forwarded",
        };
      }
      const data = await this.#googleService.getUserDetails();
      const { email, name } = data;
      const user = await User.findOne({ email });
      if (user) {
        return {
          statusCode: 400,
          body: null,
          error: "User already exists",
        };
      }
      if (bodyData.userType === "ADMIN" && !this.#isAdminUser(email)) {
        return {
          statusCode: 403,
          body: null,
          error: "Unauthorized access",
        };
      }
      const newUser = new User({
        name,
        email,
        ...bodyData,
      });

      if (newUser) {
        await newUser.save();
        return {
          statusCode: 200,
          body: newUser,
          error: null,
        };
      } else {
        return {
          statusCode: 400,
          body: null,
          error: "Invalid user data",
        };
      }
    } catch (error) {
      console.error("Error in google signup service", error?.message);
      return {
        statusCode: 500,
        body: null,
        error: "Error in google signup service" + error?.message,
      };
    }
  }

  async googleSignIn() {
    try {
      const data = await this.#googleService.getUserDetails();
      const { email } = data;
      const user = await User.findOne({ email });
      if (!user) {
        return {
          statusCode: 400,
          body: null,
          error: "User does not exist",
        };
      }
      return {
        statusCode: 200,
        body: user,
        error: null,
      };
    } catch (error) {
      console.error("Error in google signin service", error?.message);
      return {
        statusCode: 500,
        body: null,
        error: "Error in google signup service" + error?.message,
      };
    }
  }

  #isAdminUser(email) {
    return this.#allowedAdminEmails.includes(email);
  }
}

export default AuthService;
