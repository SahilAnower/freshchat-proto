class GoogleService {
  #accessToken;
  constructor(accessToken) {
    this.#accessToken = accessToken;
  }

  async getUserDetails() {
    try {
      const res = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${
          this.#accessToken
        }`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${this.#accessToken}`,
          },
        }
      );
      const data = await res.json();
      if (data.error || !data) {
        return;
      }
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default GoogleService;
