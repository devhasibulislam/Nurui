import apiSlice from "../api/apiSlice";

const token = localStorage.getItem("accessToken");

const tagApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all tags
    getAllTags: builder.query({
      query: () => ({
        url: "tags/all",
        method: "GET",
      }),
      providesTags: ["Tag"],
    }),

    // add new tag
    insertNewTag: builder.mutation({
      query: (data) => ({
        url: "tags/new",
        method: "POST",
        body: data,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Tag"],
    }),

    // get a tag
    getTag: builder.query({
      query: (id) => ({
        url: `tags/single/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Tag"],
    }),

    // update a tag
    updateTag: builder.mutation({
      query: (data) => ({
        url: `tags/update/${data._id}`,
        method: "PATCH",
        body: data,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Tag"],
    }),

    // delete a tag
    deleteTag: builder.mutation({
      query: (id) => ({
        url: `tags/delete/${id}`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Tag"],
    }),
  }),
});

export const {
  useInsertNewTagMutation,
  useGetAllTagsQuery,
  useGetTagQuery,
  useUpdateTagMutation,
  useDeleteTagMutation,
} = tagApi;
