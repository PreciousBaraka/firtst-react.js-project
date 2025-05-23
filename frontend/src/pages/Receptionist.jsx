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

import {
  createUser,
  listRoles,
  listUsers,
} from "../redux/actions/userActions";
import { resetUserState } from "../redux/slices/userSlices";

const Receptionist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { receptionists, loading, roles, success, error } = useSelector(
    (state) => state.user
  );

  const [openReceptionistModal, setOpenReceptionistModal] = useState(false);
  const [receptionistData, setReceptionistData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "12345678",
    nationalIdNo: "",
  });
  const [selectedRole, setSelectedRole] = useState("");

  const handleReceptionistChange = (e) => {
    setReceptionistData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { fullName, email, phoneNumber, nationalIdNo } = receptionistData;

    if (!fullName || !email || !phoneNumber || !nationalIdNo) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!selectedRole) {
      toast.error("Please select a role");
      return;
    }

    dispatch(
      createUser("receptionist", {
        ...receptionistData,
        roleId: selectedRole,
      })
    );
  };

  const handleSearchReceptionists = (searchKey) => {
    dispatch(listUsers("receptionists", searchKey));
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
        <h6 className="text-gray-600 my-auto">
          {params.row?.nationalIdNo}
        </h6>
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
          <div className="border text-blue-300 cursor-pointer p-2 rounded">
            <Pencil onClick={() => {}} />
          </div>
          <div className="border text-green-400 cursor-pointer p-2 rounded">
            <Eye onClick={() => navigate(`/hospital-visits/${params.row.id}`)} />
          </div>
          <div
            className="border text-red-400 cursor-pointer p-2 rounded"
            onClick={() => {}}
          >
            <Trash2 />
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(listUsers("receptionists"));
    dispatch(listRoles());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setReceptionistData({
        fullName: "",
        nationalIdNo: "",
        email: "",
        phoneNumber: "",
        password: "12345678",
      });
      setOpenReceptionistModal(false);
    }
  }, [success]);

  useEffect(() => {
    return () => dispatch(resetUserState());
  }, [dispatch]);

  return (
    <section>
      <DataTable
        columns={columns}
        data={receptionists}
        dataLabel="receptionists"
        placeholder="Search Receptionist by Name"
        onAddNew={() => setOpenReceptionistModal(true)}
        onSearch={handleSearchReceptionists}
        isLoading={loading}
      />

      <Modal
        title="Add New Receptionist"
        openModal={openReceptionistModal}
        setIsOpenModal={() => setOpenReceptionistModal(false)}
      >
        <form onSubmit={handleSubmit} className="mt-2">
          {error && <p className="text-red-700">{error}</p>}

          <CustomFormItem
            label="Full Name"
            name="fullName"
            value={receptionistData.fullName}
            onChange={handleReceptionistChange}
            placeholder="Enter Receptionist Full Name"
          />
          <CustomFormItem
            label="Email"
            name="email"
            value={receptionistData.email}
            onChange={handleReceptionistChange}
            placeholder="Enter Receptionist Email"
          />
          <CustomFormItem
            label="Phone Number"
            name="phoneNumber"
            value={receptionistData.phoneNumber}
            onChange={handleReceptionistChange}
            placeholder="Enter Receptionist Phone Number"
          />
          <CustomFormItem
            label="National ID No"
            name="nationalIdNo"
            value={receptionistData.nationalIdNo}
            onChange={handleReceptionistChange}
            placeholder="Enter Receptionist National ID No"
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
            placeholder="Select Receptionist Role"
            className="w-full"
          />
          <CustomButton title="Submit" isLoading={loading} type="submit" />
        </form>
      </Modal>
    </section>
  );
};

export default Receptionist;
