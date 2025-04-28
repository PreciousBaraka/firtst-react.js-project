import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Trash2, Pencil, Eye } from "lucide-react";
import { toast } from "react-toastify";

import DataTable from "../components/DataTable";
import Modal from "../components/UI/Modal";
import CustomFormItem from "../components/CustomFormItem";
import CustomButton from "../components/CustomButton";
import { formatDate, toCapitalize } from "../lib/utils";

import { createUser, listRoles, listUsers } from "../redux/actions/userActions";
import { resetUserState } from "../redux/slices/userSlices";

const Doctor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { doctors, loading, roles, success, error } = useSelector(
    (state) => state.user
  );

  const [openDoctorModal, setOpenDoctorModal] = useState(false);
  const [doctorData, setDoctorData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "12345678",
    specialization: "",
    nationalIdNo: "",
  });
  const [selectedRole, setSelectedRole] = useState("");

  const handleDoctorChange = (e) => {
    setDoctorData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const columns = [
    {
      field: "fullName",
      headerName: "Full Name",
      width: 130,
      renderCell: (params) => (
        <h6 className="text-gray-600 my-auto">
          {toCapitalize(params.row?.user?.fullName)}
        </h6>
      ),
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 130,
      renderCell: (params) => (
        <h6 className="text-gray-600 my-auto">
          {params.row?.user?.phoneNumber}
        </h6>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      renderCell: (params) => (
        <h6 className="text-gray-600 my-auto">{params.row?.user?.email}</h6>
      ),
    },
    {
      field: "nationalIdNo",
      headerName: "National ID No",
      width: 130,
      renderCell: (params) => (
        <h6 className="text-gray-600 my-auto">{params.row?.nationalIdNo}</h6>
      ),
    },
    {
      field: "specialization",
      headerName: "Specialization",
      width: 130,
      renderCell: (params) => (
        <h6 className="text-gray-600 my-auto">{params.row?.specialization}</h6>
      ),
    },
    {
      field: "role",
      headerName: "Role",
      width: 130,
      renderCell: (params) => {
        const role = params.row?.role?.name;
        return role === "MANAGER" ? (
          <span className="bg-amber-100 text-amber-400 my-auto px-2 py-0.5 rounded-md">
            {role}
          </span>
        ) : role === "NORMAL" ? (
          <span className="bg-blue-100 text-blue-400 my-auto px-2 py-0.5 rounded-md">
            {role}
          </span>
        ) : null;
      },
    },
    {
      field: "isActive",
      headerName: "Status",
      width: 130,
      renderCell: (params) =>
        params.row?.user?.isActive ? (
          <span className="bg-green-100 text-green-400 my-auto rounded-md px-2 py-0.5">
            Active
          </span>
        ) : (
          <span className="bg-red-100 text-red-400 my-auto rounded-md px-2 py-0.5">
            Inactive
          </span>
        ),
    },
    {
      field: "createdAt",
      headerName: "Date",
      width: 150,
      renderCell: (params) => (
        <h6 className="mx-auto px-2 text-blue-300 my-auto">
          {formatDate(params.row?.user?.createdAt)}
        </h6>
      ),
    },
    {
      field: "action",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => (
        <div className="w-full flex justify-center gap-3">
          {/* Edit */}
          <div
            className="border text-blue-300 cursor-pointer p-2 rounded"
            onClick={() => console.log("Edit", params.row.id)}
          >
            <Pencil />
          </div>

          {/* View */}
          <div
            className="border text-green-400 cursor-pointer p-2 rounded"
            onClick={() => navigate(`/hospital-visits/${params.row.id}`)}
          >
            <Eye />
          </div>

          {/* Delete */}
          <div
            className="border text-red-400 cursor-pointer p-2 rounded"
            onClick={() => console.log("Delete", params.row.id)}
          >
            <Trash2 />
          </div>
        </div>
      ),
    },
  ];

  const handleSearchDoctors = (searchKey) => {
    dispatch(listUsers("doctors", searchKey));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedRole) {
      toast.error("Please select a role");
      return;
    }

    const { fullName, email, phoneNumber, specialization, nationalIdNo } =
      doctorData;

    if (
      !fullName ||
      !email ||
      !phoneNumber ||
      !specialization ||
      !nationalIdNo
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    dispatch(createUser("doctor", { ...doctorData, roleId: selectedRole }));
  };

  useEffect(() => {
    dispatch(listUsers("doctors"));
    dispatch(listRoles());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setDoctorData({
        fullName: "",
        nationalIdNo: "",
        email: "",
        phoneNumber: "",
        specialization: "",
      });
      setOpenDoctorModal(false);
    }
  }, [error, success]);

  useEffect(() => {
    return () => dispatch(resetUserState());
  }, [dispatch]);

  return (
    <section>
      <DataTable
        columns={columns}
        data={doctors}
        dataLabel="doctors"
        placeholder="Search Doctor by Name, Phone Number or Email"
        onAddNew={() => setOpenDoctorModal(true)}
        onSearch={handleSearchDoctors}
        isLoading={loading}
      />
      <Modal
        title="Add New Doctor"
        openModal={openDoctorModal}
        setIsOpenModal={() => setOpenDoctorModal(false)}
      >
        <form onSubmit={handleSubmit} className="mt-2">
          <CustomFormItem
            label="Full Name"
            name="fullName"
            value={doctorData.fullName}
            onChange={handleDoctorChange}
            placeholder="Enter Doctor Full Name"
          />
          <CustomFormItem
            label="Email"
            name="email"
            value={doctorData.email}
            onChange={handleDoctorChange}
            placeholder="Enter Doctor Email"
          />
          <CustomFormItem
            label="Phone Number"
            name="phoneNumber"
            value={doctorData.phoneNumber}
            onChange={handleDoctorChange}
            placeholder="Enter Doctor Phone Number"
          />
          <CustomFormItem
            label="Specialization"
            name="specialization"
            value={doctorData.specialization}
            onChange={handleDoctorChange}
            placeholder="Enter Doctor Specialization"
          />
          <CustomFormItem
            label="National ID No"
            name="nationalIdNo"
            value={doctorData.nationalIdNo}
            onChange={handleDoctorChange}
            placeholder="Enter Doctor National ID No"
          />
          <CustomFormItem
            label="Role"
            type="select"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            options={
              roles?.map((role) => ({
                label: role.name,
                value: role.id,
              })) || []
            }
            placeholder="Select Doctor Role"
            className="w-full"
          />
          <CustomButton title="Submit" isLoading={loading} type="submit" />
        </form>
      </Modal>
    </section>
  );
};

export default Doctor;
