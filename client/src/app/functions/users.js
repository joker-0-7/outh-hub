import axios from "axios";
import Swal from "sweetalert2";

export const getUsers = async () => {
  try {
    const data = await axios.get(`${process.env.NEXT_PUBLIC_API}/users`);
    return data.data;
  } catch (err) {
    console.log(err);
  }
};

export const loginLogic = async (email, password, page = "user") => {
  try {
    const data = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/${
        page === "admin" ? "admin" : "users"
      }/login`,
      {
        email,
        password,
      }
    );
    window.localStorage.setItem("auth", JSON.stringify(data.data));
    return { status: "success", data: data.data };
  } catch (err) {
    console.log(err);
    const errMsg = String(err.response.data.msg);
    if (errMsg === "Your Account Is Not Activated Yet!") return err;
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: errMsg,
      footer: "Try Again, And  If The Problem Persists Contact Support!",
    });
  }
};
export const register = async (d) => {
  try {
    const data = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/users/regester`,
      d
    );
    window.localStorage.setItem("auth", JSON.stringify(data.data));
    return { status: "success", data: data.data };
  } catch (err) {
    const errMsg = String(err.response.data.msg);
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: errMsg,
      footer: "Try Again, And  If The Problem Persists Contact Support!",
    });
  }
};
export async function getSubjects() {
  try {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/users/subjects`
    );
    return data.data;
  } catch (err) {
    console.log(err);
  }
}
export const addSubject = async (subject) => {
  try {
    const data = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/admin/add-subject`,
      { subject }
    );
    return { status: "success" };
  } catch (error) {
    console.log(error);
    return { status: "fiald" };
  }
};
export const changeStatusUser = async (userId, status) => {
  try {
    const data = await axios.put(
      `${process.env.NEXT_PUBLIC_API}/users/change-status/${userId}`,
      { status }
    );
    return { status: "success" };
  } catch (error) {
    console.log(error);
    return { status: "fiald" };
  }
};

export const deleteUserById = async (userId) => {
  try {
    const data = await axios.delete(
      `${process.env.NEXT_PUBLIC_API}/users/${userId}`
    );
    return { status: "success" };
  } catch (error) {
    console.log(error);
    return { status: "fiald" };
  }
};

export const getSources = async () => {
  try {
    const sources = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/users/sources`
    );
    return sources.data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePassword = async (password, userId) => {
  try {
    const data = await axios.put(
      `${process.env.NEXT_PUBLIC_API}/users/update-password/${userId}`,
      { password }
    );
    return { status: "success" };
  } catch (error) {
    console.log(error);
    return { status: "faild" };
  }
};

export const resetInformation = async (userId) => {
  try {
    const data = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/users/reset-information/${userId}`
    );
    return { status: "success" };
  } catch (error) {
    console.log(error);
    return { status: "faild" };
  }
};

export const deleteSubjectById = async (id) => {
  try {
    const data = await axios.delete(
      `${process.env.NEXT_PUBLIC_API}/admin/subject/${id}`
    );
    return { status: "success" };
  } catch (error) {
    console.log(error);
    return { status: "fiald" };
  }
};

export const getSubject = async (id) => {
  try {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/admin/subject/${id}`
    );
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateSubject = async (id, subject) => {
  try {
    const data = await axios.put(
      `${process.env.NEXT_PUBLIC_API}/admin/subject/${id}`,
      { subject }
    );
    return { status: "success" };
  } catch (error) {
    console.log(error);
  }
};
export const addSource = async (source) => {
  try {
    const data = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/admin/add-source`,
      { source }
    );
    return { status: "success" };
  } catch (error) {
    console.log(error);
    return { status: "fiald" };
  }
};

export const deleteSourceById = async (id) => {
  try {
    const data = await axios.delete(
      `${process.env.NEXT_PUBLIC_API}/admin/source/${id}`
    );
    return { status: "success" };
  } catch (error) {
    console.log(error);
    return { status: "fiald" };
  }
};
export const endDateUser = async (id, date) => {
  const rus = await axios.patch(
    `${process.env.NEXT_PUBLIC_API}/admin/user/${id}`,
    { date }
  );
  return rus.data;
};
