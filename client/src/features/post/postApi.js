import apiSlice from "../api/apiSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all post
    getAllPosts: builder.query({
      query: () => ({
        url: "post/all",
        method: "GET",
      }),
      providesTags: ["Post"],
    }),

    // add new post
    insertNewPost: builder.mutation({
      query: (data) => ({
        url: "post/new",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),

    // get a post
    getPost: builder.query({
      query: (id) => ({
        url: `post/single/${id}`,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),

    // update a post
    updatePost: builder.mutation({
      query: (data) => ({
        url: `post/update/${data._id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),

    // delete a post
    deletePost: builder.mutation({
      query: (id) => ({
        url: `post/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useInsertNewPostMutation,
  useGetAllPostsQuery,
  useGetPostQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} = authApi;
