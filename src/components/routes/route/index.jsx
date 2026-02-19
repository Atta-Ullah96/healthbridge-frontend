import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../pages/MainLayout";
import DoctorDashboard from "../../../doctor/pages/Dashboard";
import DoctorAppointments from "../../../doctor/pages/DoctorAppointments";
import DoctorPatient from "../../../doctor/pages/DoctorPatient";

import DoctorEarning from "../../../doctor/pages/DoctorEarning";
import DoctorMessages from "../../../doctor/pages/DoctorMessages";
import DoctorSetting from "../../../doctor/pages/DoctorSetting";

import DoctorConfirmedAppointments from "../../../doctor/pages/DoctorConfirmedAppointments";

import AvailabilityForm from "../../../doctor/pages/AvailabilityForm";
import { Loader } from "../../atoms/loader";
import DoctorBankDetails from "../../../doctor/pages/BankDetails";
import PatientLayout from "../../../patient/components/Layout";

import PatientMessages from "../../../patient/pages/Messages";
import PaymentsPage from "../../../patient/pages/Payment";
import ProfilePage from "../../../doctor/pages/ProfilePage";
import BookAppointment from "../../pages/BookAppointment";
import AppointmentSuccess from "../../pages/successfullAppointment";
import VideoCall from "../../pages/canJoinACall";


const DoctorVerificationPending = lazy(() => import("../../../doctor/pages/DoctorVerificationPending"));

const Laboratories = lazy(() => import("../../pages/laboratories"))
const Appointment = lazy(() => import("../../../patient/pages/Appointment"));
const DoctorList = lazy(() => import("../../../doctor/components/doctorList"));
const DoctorProfile = lazy(() => import("../../../doctor/profile"));
const Overview = lazy(() => import("../../../patient/pages/Overview"));
const PatientLogin = lazy(() => import("../../pages/PatientLogin"));
const PatientSignup = lazy(() => import("../../pages/patientRegister"));
const DoctorLayout = lazy(() => import("../../../doctor/dashboardLayout"));
const Home = lazy(() => import("../../pages/Home"));
const JoinAsaDoctor = lazy(() => import("../../pages/DoctorLogin"));
const RegisterDoctor = lazy(() => import("../../pages/DoctorRegister"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <MainLayout />
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader size={100} />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "join-doctor",
        element: (
          <Suspense fallback={<Loader size={100} />}>
            <JoinAsaDoctor />
          </Suspense>
        ),
      },
      {
        path: "doctors",
        element: (
          <Suspense fallback={<Loader size={100} />}>
            <DoctorList />
          </Suspense>
        ),
      },
      {
        path: "register-doctor",
        element: (
          <Suspense fallback={<Loader size={100} />}>
            <RegisterDoctor />
          </Suspense>
        ),
      },
      {
        path: "verify-doctor",
        element: (
          <Suspense fallback={<Loader size={100} />}>
            <DoctorVerificationPending />
          </Suspense>
        ),
      },
      {
        path: "/doctor",
        element: (
          <Suspense fallback={<Loader size={100} />}>
            <DoctorLayout />
          </Suspense>
        ),

        children: [

          {
            path: 'dashboard',
            element: <DoctorDashboard />
          },
          {
            path: 'appointments',
            element: <DoctorAppointments />
          },
          {
            path: 'cappointments',
            element: <DoctorConfirmedAppointments />
          },
          {
            path: "patient",
            element: <DoctorPatient />
          },
          
          {
            path: "earning",
            element: <DoctorEarning />
          },
          {
            path: "message",
            element: <DoctorMessages />
          },
          {
            path: "setting",
            element: <DoctorSetting />
          },

          {
            path: "availability",
            element: <AvailabilityForm />
          },
          {
            path: "bank",
            element: <DoctorBankDetails />
          },
          {
            path: "profile",
            element: <ProfilePage />
          }
        ]
      },
      {
        path: "/profile/:id",
        element: (
          <Suspense fallback={<div>Loading Join Page...</div>}>
            <DoctorProfile />
          </Suspense>
        ),
      },
      {
        path: "/register-patient",
        element: (
          <Suspense fallback={<div>Loading Join Page...</div>}>
            <PatientSignup />
          </Suspense>
        ),
      },
      {
        path: "/patient/dashboard",
        element: (
          <Suspense fallback={<div>Loading Join Page...</div>}>
            <PatientLayout />
          </Suspense>

        ),
        children: [

          {
            path: "overview",
            element: (
              <Suspense fallback={<div>Loading Join Page...</div>}>
                <Overview />
              </Suspense>
            ),
          },
          {
            path: "appointment",
            element: (
              <Suspense fallback={<div>Loading Join Page...</div>}>
                <Appointment />
              </Suspense>
            ),
          },{
            path: "message",
            element: (
              <Suspense fallback={<div>Loading Join Page...</div>}>
                <PatientMessages />
              </Suspense>
            ),
          },
          {
            path: "payment",
            element: (
              <Suspense fallback={<div>Loading Join Page...</div>}>
                <PaymentsPage />
              </Suspense>
            ),
          },
        ]
      },

      {
        path: "/laboratories",
        element: (
          <Suspense fallback={<div>Loading Join Page...</div>}>
            <Laboratories />
          </Suspense>
        ),
      },
      {
        path: "/book/appointment/:id",
        element: (
          <Suspense fallback={<div>Loading Join Page...</div>}>
            <BookAppointment />
          </Suspense>
        ),
      },
      {
        path: "/appointment/success",
        element: (
          <Suspense fallback={<div>Loading Join Page...</div>}>
            <AppointmentSuccess />
          </Suspense>
        ),
      },
      {
        path: "/video-call/:appointmentId",
        element: (
          <Suspense fallback={<div>Loading Join Page...</div>}>
            <VideoCall />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
