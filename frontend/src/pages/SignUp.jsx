import React, { useState } from "react";
import loginIcons from "../assets/signin.gif";
import { json, Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import imageToBase64 from "../helpers/imageTobase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const Login = () => {
  const [showpassword, setshowpassword] = useState(false);
  const [showconfirmpassword, setshowconfirmpassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmpassword: "",
    name: "",
    profilepic: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmpassword) {
      const dataResponse = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      }
      if (dataApi.error) {
        toast.error(dataApi.message);
      }

      console.log("data", dataApi);
    } else {
      console.log("Please Check password and confirmpassword");
    }
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];

    const imagePic = await imageToBase64(file);
    setData((preve) => {
      return {
        ...preve,
        profilepic: imagePic,
      };
    });
  };

  // console.log("data login", data);
  return (
    <section id="sign-up">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilepic || loginIcons} alt="login icons" />
            </div>
            <form>
              <label>
                <div className="text-xs bg-slate-200 py-4 text-center absolute bottom-0 w-full bg-opacity-80 cursor-pointer">
                  Upload photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>

          <form className="pt-6 flex flex-col gap-2" onSubmit={handlesubmit}>
            <div className="grid">
              <label>Name : </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="enter name"
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="grid">
              <label>Email : </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="enter email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div>
              <label>Password : </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showpassword ? "text" : "password"}
                  placeholder="enter password"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setshowpassword((preve) => !preve)}
                >
                  <span>{showpassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>

            <div>
              <label>Confirm Password : </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showconfirmpassword ? "text" : "password"}
                  placeholder="enter confirm password"
                  name="confirmpassword"
                  value={data.confirmpassword}
                  required
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setshowconfirmpassword((preve) => !preve)}
                >
                  <span>
                    {showconfirmpassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>

            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              Sign Up
            </button>
          </form>

          <p className="my-5">
            Already have account ?{" "}
            <Link
              to={"/login"}
              className=" text-red-600 hover:text-red-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
