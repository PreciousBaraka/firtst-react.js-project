import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../components/DataTable";
import { Trash2, Pencil, Eye } from "lucide-react";
import { useNavigate } from "react-router";
import {
  listHospitalVisits,
  createHospitalVisit,
} from "../redux/actions/hospitalVisitActions";
import Modal from "../components/UI/Modal";
import CustomFormItem from "../components/CustomFormItem";
import CustomButton from "../components/CustomButton";
import { toast } from "react-toastify";
import { listUsers } from "../redux/actions/userActions";

function HospitalVisits() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openVisitModal, setOpenVisitModal] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [selectedReceptionistId, setSelectedReceptionistId] = useState("");
  const [visitData, setVisitData] = useState({
    reason: "",
  });

  const { hospitalVisits, loading, success, error } = useSelector(
    (state) => state.hospitalVisit
  );
  
  const { receptionists, patients } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(listHospitalVisits());
    dispatch(listUsers("patients"));
    dispatch(listUsers("receptionists"));
  }, [dispatch]);

  const handleSearchVisits = (searchKey) => {
    dispatch(listHospitalVisits(searchKey));
  };

  const handleInputChange = (e) => {
    setVisitData({ ...visitData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !selectedPatientId ||
      !selectedReceptionistId ||
      !visitData.reason
    ) {
      toast.error("All fields are Required");
      return;
    }

    const newVisit = {
      patientId: selectedPatientId,
      receptionistId: selectedReceptionistId,
      reason: visitData.reason,
    };
    dispatch(createHospitalVisit(newVisit));
  };

  const columns = [
    {
      field: "patientName",
      headerName: "Patient",
      width: 150,
      renderCell: (params) => (
        <h6 className="text-gray-600 my-auto">
          {params.row?.patient?.user?.fullName}
        </h6>
      ),
    },
    {
      field: "receptionistName",
      headerName: "Receptionist",
      width: 150,
      renderCell: (params) => (
        <h6 className="text-gray-600 my-auto">
          {params.row?.receptionist?.user?.fullName}
        </h6>
      ),
    },
    {
      field: "reason",
      headerName: "Reason",
      width: 200,
      renderCell: (params) => (
        <h6 className="text-gray-600 my-auto">{params.row?.reason}</h6>
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
            <Eye
              onClick={() => navigate(`/hospital-visits/${params.row.id}`)}
            />
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
    if (success) {
      setSelectedPatientId("");
      setSelectedReceptionistId("");
      setVisitData({
        reason: ""
      });
      setOpenVisitModal(false);
    }
  }, [success]);

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-magenta">Hospital Visits</h1>
      </div>
      <DataTable
        columns={columns}
        data={hospitalVisits}
        dataLabel="Hospital Visits"
        placeholder="Search Hospital Visits"
        onAddNew={() => setOpenVisitModal(true)}
        onSearch={handleSearchVisits}
        isLoading={loading}
      />

      <Modal
        title="Add New Hospital Visit"
        openModal={openVisitModal}
        setIsOpenModal={() => setOpenVisitModal(false)}
      >
        <form onSubmit={handleSubmit} className="mt-3">
          {error && <p className="text-red-700">{error}</p>}
          <CustomFormItem
            label="Select Patient"
            name="patientId"
            type="select"
            options={patients?.map((patient) => ({
              value: patient.id,
              label: patient.user?.fullName,
            }))}
            value={selectedPatientId}
            onChange={(e) => setSelectedPatientId(e.target.value)}
            placeholder="Select Patient"
          />
          <CustomFormItem
            label="Select Receptionist"
            name="receptionistId"
            type="select"
            options={receptionists?.map((receptionist) => ({
              value: receptionist.id,
              label: receptionist.user?.fullName,
            }))}
            value={selectedReceptionistId}
            onChange={(e) => setSelectedReceptionistId(e.target.value)}
            placeholder="Select Receptionist"
          />
          <CustomFormItem
            label="Reason for Visit"
            name="reason"
            value={visitData.reason}
            onChange={handleInputChange}
            placeholder="Enter Reason"
          />
          <CustomButton type="submit" title="Add Visit" isLoading={loading} />
        </form>
      </Modal>
    </div>
  );
}

export default HospitalVisits;
