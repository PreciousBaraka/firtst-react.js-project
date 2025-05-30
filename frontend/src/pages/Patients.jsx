import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../components/DataTable";
import { Trash2, Pencil, Eye } from "lucide-react";
import { formatDate, toCapitalize } from "../lib/utils";
import { Link, useNavigate } from "react-router";
import { listUsers, createUser } from "../redux/actions/userActions";
import Modal from "../components/UI/Modal";
import CustomFormItem from "../components/CustomFormItem";
import CustomButton from "../components/CustomButton";
import { toast } from "react-toastify";

function Patients() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openPatientsModal, setOpenPatientsModal] = useState(false);
  const [patientData, setPatientData] = useState({
    fullName: "",
    nationalIdNo: "",
    email: "",
    phoneNumber: "",
    gender: "",
    address: "",
    password: "12345678",
    dateOfBirth: "",
  });

  const { patients, loading, success, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(listUsers("patients"));
  }, [dispatch]);

  const handleSearchPatients = (searchKey) => {
    dispatch(listUsers("patients", searchKey));
  };

  const handleInputChange = (e) => {
    setPatientData({ ...patientData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patientData.fullName || !patientData.nationalIdNo) {
      toast.error("Full name and National ID are required");
      return;
    }
    dispatch(createUser("patient", patientData));
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
      field: "address",
      headerName: "Address",
      width: 130,
      renderCell: (params) => (
        <h6 className="text-gray-600 my-auto">{params.row?.location}</h6>
      ),
    },
    {
      field: "age",
      headerName: "Age",
      width: 130,
      renderCell: (params) => {
        const birthYear = new Date(params.row?.dateOfBirth).getFullYear();
        const currentYear = new Date().getFullYear();
        const age = currentYear - birthYear;
        return (
          <h6 className="text-gray-600 my-auto">{isNaN(age) ? "N/A" : age}</h6>
        );
      },
    },
    {
      field: "dateOfBirth",
      headerName: "Date of Birth",
      width: 130,
      renderCell: (params) => (
        <h6 className="text-gray-600 my-auto">
          {formatDate(params.row?.dateOfBirth)}
        </h6>
      ),
    },
    {
      field: "isActive",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
        <>
          {params.row?.user?.isActive ? (
            <span className="bg-green-100 text-green-400 my-auto rounded-md px-2 py-0.5">
              Active
            </span>
          ) : (
            <span className="bg-red-100 text-red-400 my-auto rounded-md px-2 py-0.5">
              Inactive
            </span>
          )}
        </>
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
          <Link to={`/patients/${params.row.id}`} className="border text-green-400 cursor-pointer p-2 rounded">
            <Eye  />
          </Link>
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
    if (success) {
      setPatientData({
        fullName: "",
        nationalIdNo: "",
        email: "",
        phoneNumber: "",
        address: "",
        gender: "",
        dateOfBirth: "",
        password: "12345678"
      });
      setOpenPatientsModal(false);
    }
  }, [success]);

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-magenta"></h1>
      </div>
      <DataTable
        columns={columns}
        data={patients}
        dataLabel="Patients"
        placeholder="Search Patients"
        onAddNew={() => setOpenPatientsModal(true)}
        onSearch={handleSearchPatients}
        isLoading={loading}
      />

      <Modal
        title="Add New Patient"
        openModal={openPatientsModal}
        setIsOpenModal={() => setOpenPatientsModal(false)}
      >
        <form onSubmit={handleSubmit} className="mt-3">
          {error && <p className="text-red-700">{error}</p>}
          <CustomFormItem
            label="Full Name"
            name="fullName"
            value={patientData.fullName}
            onChange={handleInputChange}
            placeholder="Enter full name"
          />
          <CustomFormItem
            label="National ID"
            name="nationalIdNo"
            value={patientData.nationalIdNo}
            onChange={handleInputChange}
            placeholder="Enter National ID"
          />
          <CustomFormItem
            label="Email"
            name="email"
            value={patientData.email}
            onChange={handleInputChange}
            placeholder="Enter email"
          />
          <CustomFormItem
            label="Phone Number"
            name="phoneNumber"
            value={patientData.phoneNumber}
            onChange={handleInputChange}
            placeholder="Enter phone number"
          />
          <CustomFormItem
            label="Address"
            name="address"
            value={patientData.address}
            onChange={handleInputChange}
            placeholder="Enter Address"
          />
          <CustomFormItem
            label="Gender"
            name="gender"
            value={patientData.gender}
            onChange={handleInputChange}
            placeholder="Enter Gender"
          />
          <CustomFormItem
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={patientData.dateOfBirth}
            onChange={handleInputChange}
          />
          <CustomButton type="submit" title="Add Patient" isLoading={loading} />
        </form>
      </Modal>
    </div>
  );
}

export default Patients;
