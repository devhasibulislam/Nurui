import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Title from "../../components/shared/Title";
import {
  useRemoveUserInfoMutation,
  useUpdateUserInfoMutation,
} from "../../features/auth/authApi";
import { logout } from "../../features/auth/authSlice";

const MyProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    userCredentials: {
      _id,
      about,
      avatar: userAvatar,
      email,
      membership,
      name,
      role,
      status,
    },
  } = useSelector((state) => state.auth);
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      email,
      name,
      role,
      membership,
      portfolio: about?.portfolio,
      facebook: about?.social.facebook,
      twitter: about?.social.twitter,
      status,
      maritalStatus: about?.maritalStatus,
    },
  });
  const [avatar, setAvatar] = useState({});
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [updateUserInformation, { isLoading, isSuccess, isError }] =
    useUpdateUserInfoMutation();
  const [
    removeUserInformation,
    {
      isLoading: isRemoveLoading,
      isSuccess: isRemoveSuccess,
      isError: isRemoveError,
    },
  ] = useRemoveUserInfoMutation();

  useEffect(() => {
    if (isLoading || isRemoveLoading) {
      toast.loading("Posting user", { id: "updateOrDeleteUserInformation" });
    }
    if (isSuccess || isRemoveSuccess) {
      toast.success("Successfully post user", {
        id: "updateOrDeleteUserInformation",
      });
    }
    if (isError || isRemoveError) {
      toast.error("An error occurred", { id: "updateOrDeleteUserInformation" });
    }
  }, [
    isError,
    isLoading,
    isSuccess,
    isRemoveLoading,
    isRemoveError,
    isRemoveSuccess,
  ]);

  function onSubmit(data) {
    const usrAvatar = Object.keys(avatar).length === 0 ? userAvatar : avatar;
    const {
      email,
      membership,
      name,
      role,
      status,
      facebook,
      maritalStatus,
      portfolio,
      twitter,
    } = data;
    const userInfo = {
      email,
      usrAvatar,
      membership,
      name,
      role,
      status,
      about: { maritalStatus, portfolio, social: { facebook, twitter } },
    };
    updateUserInformation(userInfo);
    reset();
  }

  function handleUpdateUserAvatar(event) {
    const formData = new FormData();
    formData.append("avatar", event.target.files[0]);

    const updateAvatar = async () => {
      setAvatarLoading(true);
      const request = await fetch(
        `${process.env.REACT_APP_BASE_URL}user/avatar?public_id=${userAvatar?.public_id}`,
        {
          method: "PATCH",
          body: formData,
        }
      );
      const response = await request.json();
      if (response.acknowledgement) {
        setAvatarLoading(false);
        setAvatar({
          url: response.data.path,
          public_id: response.data.filename,
        });
        console.log(response.description);
      } else {
        setAvatarLoading(false);
        console.log(response.description);
      }
    };
    updateAvatar();
  }

  return (
    <section className="flex justify-center items-center h-full w-full">
      <Title>My Profile - Dashboard</Title>
      <form
        className="shadow-lg md:p-10 p-4 rounded-lg flex flex-wrap gap-y-6 max-w-3xl justify-between bg-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* name field */}
        <input
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          type="text"
          name="name"
          placeholder="Full Name"
          {...register("name", {
            required: true,
            minLength: 3,
            maxLength: 100,
          })}
        />

        {/* email field */}
        <input
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white cursor-not-allowed"
          type="email"
          name="email"
          placeholder="Email"
          {...register("email")}
          required
          disabled
        />

        {/* avatar upload field */}
        {avatarLoading ? (
          "Uploading..."
        ) : Object.keys(avatar).length === 0 ? (
          <div className="flex lg:flex-row md:flex-row flex-col items-center justify-center lg:gap-x-4 md:gap-x-4 gap-y-4 w-full">
            <img
              src={userAvatar?.url}
              alt={userAvatar?.public_id}
              loading="lazy"
              className="h-12 w-12 object-cover object-center rounded-full cursor-not-allowed shadow"
            />
            <input
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-3"
              id="file_input"
              name="avatar"
              type="file"
              onChange={handleUpdateUserAvatar}
            />
          </div>
        ) : (
          "Avatar updated!"
        )}

        <div className="w-full flex lg:flex-row md:flex-row flex-col justify-between lg:gap-x-4 md:gap-x-4 gap-y-4">
          {/* marital marital status */}
          <div className="w-full">
            <select
              id="status"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              {...register("maritalStatus")}
            >
              <option value="married">Married</option>
              <option value="unmarried">Unmarried</option>
            </select>
          </div>
          {/* user status */}
          <div className="w-full">
            <select
              id="status"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              {...register("status")}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* portfolio field */}
        <input
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          type="text"
          name="portfolio"
          placeholder="Portfolio link"
          {...register("portfolio", {
            required: true,
          })}
        />

        {/* facebook field */}
        <input
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          type="text"
          name="facebook"
          placeholder="Facebook profile link"
          {...register("facebook", {
            required: true,
          })}
        />

        {/* twitter field */}
        <input
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          type="text"
          name="twitter"
          placeholder="Twitter profile link"
          {...register("twitter", {
            required: true,
          })}
        />

        {/* role field */}
        <input
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white cursor-not-allowed capitalize"
          type="text"
          name="role"
          placeholder="Your Role"
          {...register("role")}
          disabled
        />

        {/* membership field */}
        <input
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white cursor-not-allowed capitalize"
          type="text"
          name="membership"
          placeholder="Your Membership"
          {...register("membership")}
          disabled
        />

        {/* submit button */}
        <div className="w-full flex lg:flex-row md:flex-row flex-col justify-between lg:gap-x-4 md:gap-x-4 gap-y-4">
          <button
            type="submit"
            className="font-bold text-white py-3 rounded-lg bg-primary w-full disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Update Profile
          </button>
          {role !== "admin" && (
            <button
              onClick={() => {
                removeUserInformation(_id);
                navigate("/");
                dispatch(logout());
              }}
              type="submit"
              className="font-bold text-white py-3 rounded-lg bg-red-600 w-full disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Delete Account
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default MyProfile;
