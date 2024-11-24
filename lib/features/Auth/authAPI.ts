interface Data {
  email: string;
  password: string;
}

interface UserData {
  name: string;
  email: string;
  password: string;
}

interface Response {
  token: string;
  role: string;
  id: string;
  Status: string;
}

const BASE_URL = "http://localhost:3000/api";

export const LoginUser = async (data: Data): Promise<Response> => {
  try {
    const response = await fetch(`${BASE_URL}/login/post`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result: Response = await response.json();
    console.log(result, "LOGIN RESULT")
    return result;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Login failed");
  }
};

export const RegisterUser = async (data: UserData): Promise<Response> => {
  try {
    const response = await fetch(`${BASE_URL}/register/post`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });


    const result: Response = await response.json();
    return result;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Registration failed");
  }
};
