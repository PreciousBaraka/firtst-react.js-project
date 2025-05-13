import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../components/DataTable";
import { Trash2, Pencil, Eye } from "lucide-react";
import Modal from "../components/UI/Modal";
import { useNavigate } from "react-router";
import CustomFormItem from "../components/CustomFormItem";
import CustomButton from "../components/CustomButton";
import { toast } from "react-toastify";
import { listHospitalVisits } from "../redux/actions/hospitalVisitActions";
import { listUsers } from "../redux/actions/userActions";
import { createTreatmentRecord, listTreatmentRecords } from "../redux/actions/treatmentRecordAction";

function TreatmentRecord() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openTreatmentModal, setOpenTreatmentModal] = useState(false);
  const [selectedHospitalVisitId, setSelecetedVisitId] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [selectedDoctortId, setSelectedDoctorId] = useState("");

  const [treatmentData, setTreatmentData] = useState({
    vitals: "",
    treatmentPlan: "",
    painLevel: "",
    mobility: "",
    symptoms: "",
    temperature: "",
    status: "",
  });

  const { treatmentRecord, loading, success, error } = useSelector(
    (state) => state.treatmentRecord
  );

  const { hospitalVisits } = useSelector((state) => state.hospitalVisits);
  const { patients, doctors } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(listTreatmentRecords());
    dispatch(listHospitalVisits("hospitalVisits"));
    dispatch(listUsers("patients"));
    dispatch(listUsers("doctors"));
  }, [dispatch,]);

  const handleSearchTreatmentRecord = (searchKey) => {
    dispatch(listTreatmentRecords(searchKey));
  };

  const handleInputChange = (e) => {
    setTreatmentData({ ...treatmentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !selectedHospitalVisitId ||
      !selectedDoctortId ||
      !selectedPatientId ||
      !treatmentData.symptoms ||
      !treatmentData.treatmentPlan
    ) {
      toast.error("All fields are Required");
      return;
    }

    const newTreatmentRecord = {
      patientId: selectedPatientId,
      doctorId: selectedDoctortId,
      hospitalVisitId: selectedHospitalVisitId,
      symptoms: treatmentData.symptoms,
      treatmentPlan: treatmentData.treatmentPlan,
    };
    dispatch(createTreatmentRecord(newTreatmentRecord));
  };

  const columns = [
    {
      field: "hospitalVisitId",
      headerName: "Hospital Visit Id",
      width: 150,
      renderCell: (params) => (
        <h6 className="text-gray-600 my-auto">
          {params.row?.hospitalVisit?.hospitalVisits?.id}
        </h6>
      ),
    },
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
      field: "symptoms",
      headerName: "Symptoms",
      width: 200,
      renderCell: (params) => (
        <h6 className="text-gray-600 my-auto">{params.row?.symptoms}</h6>
      ),
    },
    {
      field: "painLevel",
      headerName: "Pain Level",
      width: 200,
      renderCell: (params) => (
        <h6 className="text-gray-600 my-auto">{params.row?.painLevel}</h6>
      ),
    },
    {
      field: "temperature",
      headerName: "Temperature",
      width: 200,
      renderCell: (params) => (
        <h6 className="text-gray-600 my-auto">{params.row?.temperature}</h6>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params) => (
        <h6 className="text-gray-600 my-auto">{params.row?.status}</h6>
      ),
    },
    {
      field: "mobility",
      headerName: "Mobility",
      width: 200,
      renderCell: (params) => (
        <h6 className="text-gray-600 my-auto">{params.row?.mobility}</h6>
      ),
    },
    {
      field: "treatmentPlan",
      headerName: "Treatment Plan",
      width: 200,
      renderCell: (params) => (
        <h6 className="text-gray-600 my-auto">{params.row?.treatmentPlan}</h6>
      ),
    },
    {
      field: "vitals",
      headerName: "Vitals",
      width: 200,
      renderCell: (params) => (
        <h6 className="text-gray-600 my-auto">
          {
            params.row?.vitals[
              [[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]
            ]
          }
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
      setSelecetedVisitId("");
      setSelectedDoctorId("");
      setSelectedPatientId("");
      setTreatmentData({
        vitals: "",
        treatmentPlan: "",
        painLevel: "",
        mobility: "",
        temperature: "",
        status: "",
      });
      setOpenTreatmentModal(false);
    }
  }, [success]);

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-magenta">Hospital Visits</h1>
      </div>
      <DataTable
        columns={columns}
        data={treatmentRecord}
        dataLabel="treatment Records"
        placeholder="Search Treatment Record"
        onAddNew={() => setOpenTreatmentModal(true)}
        onSearch={handleSearchTreatmentRecord}
        isLoading={loading}
      />

      <Modal
        title="Add New Treatment Record"
        openModal={openTreatmentModal}
        setIsOpenModal={() => setOpenTreatmentModal(false)}
      >
        <form onSubmit={handleSubmit} className="mt-3">
          {error && <p className="text-red-700">{error}</p>}
          <CustomFormItem
            label="Select Hospital Visit"
            name="hospitalVisitId"
            type="select"
            options={hospitalVisits?.map((hospitalVisit) => ({
              value: hospitalVisit.id,
              label: hospitalVisit.hospitalVisits?.fullName,
            }))}
            value={selectedPatientId}
            onChange={(e) => setSelecetedVisitId(e.target.value)}
            placeholder="Select Hospital Visit"
          />
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
            label="Select Doctor"
            name="doctorId"
            type="select"
            options={doctors?.map((doctor) => ({
              value: doctor.id,
              label: doctor.user?.fullName,
            }))}
            value={selectedDoctortId}
            onChange={(e) => setSelectedDoctorId(e.target.value)}
            placeholder="Select Doctor"
          />
          <CustomFormItem
            label="Symptoms"
            name="symptoms"
            value={treatmentData.symptoms}
            onChange={handleInputChange}
            placeholder="Enter Reason"
          />
          <CustomFormItem
            label="Temperature"
            name="temperaure"
            value={treatmentData.temperature}
            onChange={handleInputChange}
            placeholder="Enter Temperature"
          />
          <CustomFormItem
            label="Temperature"
            name="temperaure"
            value={treatmentData.temperature}
            onChange={handleInputChange}
            placeholder="Enter Temperature"
          />
          <CustomFormItem
            label="Vitals"
            name="vitals"
            value={treatmentData.vitals}
            onChange={handleInputChange}
            placeholder="Enter Vitals"
          />
          <CustomFormItem
            label="Treatment Plan"
            name="treatmentPlan"
            value={treatmentData.treatmentPlan}
            onChange={handleInputChange}
            placeholder="Input Treatment Plan"
          />
          <CustomFormItem
            label="Pain Level"
            name="painLevel"
            value={treatmentData.painLevel}
            onChange={handleInputChange}
            placeholder="Input Pain Level"
          />
          <CustomFormItem
            label="Mobility"
            name="mobility"
            value={treatmentData.mobility}
            onChange={handleInputChange}
            placeholder="Input Mobility"
          />
          <CustomFormItem
            label="Status"
            name="status"
            value={treatmentData.status}
            onChange={handleInputChange}
            placeholder="Input Status
            
            "
          />

          <CustomButton type="submit" title="Add Visit" isLoading={loading} />
        </form>
      </Modal>
    </div>
  );
}

export default TreatmentRecord;
