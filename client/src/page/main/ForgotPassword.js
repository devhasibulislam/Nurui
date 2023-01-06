import React, { useEffect, useState } from "react";
import AccountBanner from "../../components/account/AccountBanner";
import { Link } from "react-router-dom";
import Title from "../../components/shared/Title";
import AccountLogo from "../../components/account/AccountLogo";
import { useForm, useWatch } from "react-hook-form";
import { useForgotPasswordMutation } from "../../features/auth/authApi";
import { toast } from "react-hot-toast";

const ForgotPassword = () => {
  const { handleSubmit, register, control, reset } = useForm();
  const password = useWatch({ control, name: "password" });
  const confirmPassword = useWatch({ control, name: "confirmPassword" });
  const [disabled, setDisabled] = useState(true);
  const [forgotPasswordCredentials, { isLoading, isSuccess, isError }] =
    useForgotPasswordMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("Posting user", { id: "forgotPasswordCredentials" });
    }
    if (isSuccess) {
      toast.success("Successfully post user", {
        id: "forgotPasswordCredentials",
      });
    }
    if (isError) {
      toast.error("An error occurred", { id: "forgotPasswordCredentials" });
    }
  }, [isError, isLoading, isSuccess]);

  useEffect(() => {
    if (password !== undefined && password !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, confirmPassword]);

  function onSubmit(data) {
    forgotPasswordCredentials(data);
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
              Forgot your password
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
                    title="Min 8, Max 30 & At least 1 Upper, 1 Lower, 1 Number & 1 Special"
                    placeholder="i.e.: Jessica@123 or olsEn!9$K"
                    {...register("password", {
                      pattern:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/gi,
                    })}
                    required
                  />

                  {/* submit button */}
                  <button
                    type="submit"
                    className="font-bold text-white py-3 rounded-lg bg-primary w-full disabled:bg-gray-300 disabled:cursor-not-allowed"
                    disabled={disabled}
                  >
                    Forgot Password
                  </button>
                </form>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Remember your account?
                  <Link
                    to="/account/sign-in"
                    className="border-b border-gray-500 border-dotted font-medium"
                  >
                    {" "}
                    Sign in here
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

export default ForgotPassword;
