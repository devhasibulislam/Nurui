import React, { useEffect, useState } from "react";
import AccountBanner from "../../components/account/AccountBanner";
import { Link, useNavigate } from "react-router-dom";
import Title from "../../components/shared/Title";
import AccountLogo from "../../components/account/AccountLogo";
import { useForm, useWatch } from "react-hook-form";
import { useSigninMutation } from "../../features/auth/authApi";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const Signin = () => {
  const { handleSubmit, register, control, reset } = useForm();
  const password = useWatch({ control, name: "password" });
  const confirmPassword = useWatch({ control, name: "confirmPassword" });
  const [disabled, setDisabled] = useState(true);
  const [postToCheckUserCredentials, { isLoading, isSuccess, isError }] =
    useSigninMutation();
  const navigate = useNavigate();
  const {
    error: authError,
    isError: isAuthError,
    isLoading: isAuthLoading,
    user: { email },
    error,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthLoading && email) {
      navigate("/");
    }
  }, [isAuthLoading, email, navigate]);

  useEffect(() => {
    if (isAuthError) {
      toast.error(authError, { id: "postToCheckUserCredentials" });
    }
  }, [isAuthError, authError]);

  useEffect(() => {
    if (isLoading) {
      toast.loading("Posting user", { id: "postToCheckUserCredentials" });
      window.location.reload();
    }
    if (isSuccess) {
      toast.success("Successfully post user", {
        id: "postToCheckUserCredentials",
      });
    }
    if (isError) {
      toast.error(error, {
        id: "postToCheckUserCredentials",
      });
    }
  }, [isError, isLoading, isSuccess, error]);

  useEffect(() => {
    if (password !== undefined && password !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, confirmPassword]);

  function onSubmit(data) {
    postToCheckUserCredentials(data);
    reset();
  }

  return (
    <section className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <Title>Sign in</Title>
      <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="w-fit mx-auto">
            <AccountLogo />
          </div>
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Sign in as existing
            </h1>
            <div className="w-full flex-1">
              <div className="mx-auto max-w-xs mt-8">
                <form
                  className="flex flex-col gap-y-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {/* email field */}
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    name="email"
                    placeholder="Email"
                    {...register("email")}
                    required
                  />

                  {/* password field */}
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="password"
                    name="password"
                    placeholder="Password"
                    {...register("password")}
                    required
                  />

                  {/* submit button */}
                  <button
                    type="submit"
                    className="font-bold text-white py-3 rounded-lg bg-primary w-full disabled:bg-gray-300 disabled:cursor-not-allowed"
                    disabled={disabled}
                  >
                    Sign in
                  </button>
                </form>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Forgot password?
                  <Link
                    to="/account/forgot-password"
                    className="border-b border-gray-500 border-dotted font-medium"
                  >
                    {" "}
                    Recover from here
                  </Link>
                </p>
                <p className="mt-2 text-xs text-gray-600 text-center">
                  Won't have an account?
                  <Link
                    to="/account/sign-up"
                    className="border-b border-gray-500 border-dotted font-medium"
                  >
                    {" "}
                    Create one
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <AccountBanner />
      </div>
    </section>
  );
};

export default Signin;
