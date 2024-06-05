import React from "react";
import AxiosPublic from "../../hooks/AxiosPublic";
import { TbTruckDelivery } from "react-icons/tb";
import { useQuery } from "@tanstack/react-query";
import { FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
const AllUsers = () => {
  const axiosPub = AxiosPublic();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPub.get("/allusers");
      return res.data;
    },
  });
  const makeDelivaryMan = (id) => {
    Swal.fire({
      title: "Are you sure Want To make A Delivary man",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPub.patch(`/makeDelivaryMan/${id}`).then((res) => {
          console.log(res.data);
          refetch();
        });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
    console.log(id);
  };
  const deleteUser = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPub.delete(`/user/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Category</th>
              <th>Make delivery Man</th>
              <th>Delete User</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {users.map((data, index) => (
              <tr key={data._id}>
                <th>{index + 1}</th>
                <td>{data.name}</td>
                <td>{data.category}</td>

                <td
                  onClick={() => makeDelivaryMan(data._id)}
                  className=" text-center btn items-center flex justify-center"
                >
                  <TbTruckDelivery></TbTruckDelivery>
                </td>
                <td onClick={() => deleteUser(data._id)}>
                  <FaRegTrashCan className="cursor-pointer" />
                </td>
              </tr>
            ))}
            {/* row 2 */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
