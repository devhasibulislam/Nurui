import apiSlice from "../api/apiSlice";
import { loginUser } from "./authSlice";

const token = localStorage.getItem("accessToken");

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // signup an user
    signup: builder.mutation({
      query: (data) => ({
        url: "user/sign-up",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // signin an user
    signin: builder.mutation({
      query: (data) => ({
        url: "user/sign-in",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const user = await queryFulfilled;
          const email = data.email;
          const token = user.data.accessToken;
          dispatch(loginUser({ email, token }));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    // forgot user user
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "user/reset-password",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // find myself
    findMyself: builder.query({
      query: () => ({
        url: "user/myself",
        method: "GET",
        headers: {
          authorization: `Bear ${token}`,
        },
      }),
      providesTags: ["User"],
    }),

    // find all users
    getAllUsers: builder.query({
      query: () => ({
        url: "user/all-users",
        method: "GET",
        headers: {
          authorization: `Bear ${token}`,
        },
      }),
      providesTags: ["User"],
    }),

    // find by email
    findByEmail: builder.query({
      query: (email) => ({
        url: `user/${email}`,
        method: "GET",
      }),
      invalidatesTags: ["User"],
    }),

    // update user info
    updateUserInfo: builder.mutation({
      query: (data) => ({
        url: `user/update-user?email=${data.email}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // delete user info
    removeUserInfo: builder.mutation({
      query: (id) => ({
        url: `user/remove-user?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useForgotPasswordMutation,
  useFindMyselfQuery,
  useFindByEmailQuery,
  useUpdateUserInfoMutation,
  useRemoveUserInfoMutation,
  useGetAllUsersQuery,
} = authApi;
