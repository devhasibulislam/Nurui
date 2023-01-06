import React, { useEffect } from "react";
import {
  useGetAllUsersQuery,
  useRemoveUserInfoMutation,
  useUpdateUserInfoMutation,
} from "../../features/auth/authApi";
import Loading from "../../components/shared/Loading";
import { AiOutlineUserDelete, AiOutlineUserSwitch } from "react-icons/ai";
import { toast } from "react-hot-toast";

const UserList = () => {
  const { data, isLoading: isFaching } = useGetAllUsersQuery();
  const users = data?.data || {};
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
      toast.loading("Loading...", { id: "updateOrDeleteUserInformation" });
    }
    if (isSuccess || isRemoveSuccess) {
      toast.success("Successfully!!!", {
        id: "updateOrDeleteUserInformation",
      });
    }
    if (isError || isRemoveError) {
      toast.error("An error occurred :(", {
        id: "updateOrDeleteUserInformation",
      });
    }
  }, [
    isError,
    isLoading,
    isSuccess,
    isRemoveLoading,
    isRemoveError,
    isRemoveSuccess,
  ]);

  return (
    <>
      {isFaching ? (
        <Loading />
      ) : (
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 ">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50  ">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Avatar
                </th>
                <th scope="col" class="px-6 py-3">
                  Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Email
                </th>
                <th scope="col" class="px-6 py-3">
                  Total Posts
                </th>
                <th scope="col" class="px-6 py-3">
                  Total Tags
                </th>
                <th scope="col" class="px-6 py-3">
                  Role
                </th>
                <th scope="col" class="px-6 py-3">
                  Membership
                </th>
                <th scope="col" class="px-6 py-3">
                  Status
                </th>
                <th scope="col" class="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users?.map(
                ({
                  _id,
                  avatar,
                  name,
                  email,
                  posts,
                  tags,
                  role,
                  membership,
                  status,
                }) => (
                  <tr key={_id} class="bg-white border-b hover:bg-gray-50">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      <img
                        src={avatar?.url}
                        alt={avatar?.public_id}
                        loading="lazy"
                        className="h-10 w-10 object-cover object-center rounded-full shadow"
                      />
                    </th>
                    <td class="px-6 py-4 whitespace-nowrap">{name}</td>
                    <td class="px-6 py-4">{email}</td>
                    <td class="px-6 py-4">{posts?.length}</td>
                    <td class="px-6 py-4">{tags?.length}</td>
                    <td class="px-6 py-4">{role}</td>
                    <td class="px-6 py-4">{membership}</td>
                    <td class="px-6 py-4">{status}</td>
                    <td class="px-6 py-4">
                      {role !== "admin" ? (
                        <span className="flex gap-x-2">
                          <span
                            onClick={() =>
                              updateUserInformation({ email, role: "admin" })
                            }
                            className="bg-green-500 rounded-full text-2xl text-white p-1 hover:bg-slate-500 transition-all cursor-pointer"
                          >
                            <AiOutlineUserSwitch />
                          </span>
                          <span
                            onClick={() => removeUserInformation(_id)}
                            className="bg-red-500 rounded-full text-2xl text-white p-1 hover:bg-slate-500 transition-all cursor-pointer"
                          >
                            <AiOutlineUserDelete />
                          </span>
                        </span>
                      ) : (
                        "N/A"
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default UserList;
