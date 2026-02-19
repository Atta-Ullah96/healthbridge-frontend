import AgoraRTC from "agora-rtc-sdk-ng";
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useGetUserQuery, useJoinVideoCallByDoctorMutation } from "../../../api/doctorApi";
import { useJoinVideoCallByPatientMutation } from "../../../api/patientApi";

export default function VideoCall() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [joinDoctorCall] = useJoinVideoCallByDoctorMutation();
  const [joinPatientCall] = useJoinVideoCallByPatientMutation();
  const location = useLocation();
  const role = location.state?.role;
  const clientRef = useRef(null);
  const localTracksRef = useRef({ camTrack: null, micTrack: null });
  const [remoteUsers, setRemoteUsers] = useState([]);

  useEffect(() => {
    const initCall = async () => {

      // 1️⃣ Get Agora credentials from backend
      let response;
      if (role === "doctor") {
        response = await joinDoctorCall(appointmentId).unwrap();
      } else {
        response = await joinPatientCall(appointmentId).unwrap();
      }

      const { appId, token, channelName, uid } = response;

      // 2️⃣ Create Agora client
      const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
      clientRef.current = client;

      // 3️⃣ Join channel
      await client.join(appId, channelName, token, uid);

      client.remoteUsers.forEach(async (user) => {
        await client.subscribe(user, "video");
        user.videoTrack?.play("remote-video");

        await client.subscribe(user, "audio");
        user.audioTrack?.play();
      });

      // 4️⃣ Create local tracks
      const [micTrack, camTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
      localTracksRef.current = { micTrack, camTrack };

      // Play local video
      camTrack.play("local-video");

      // Publish local tracks
      await client.publish([micTrack, camTrack]);

      // 5️⃣ Subscribe to remote users
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);


        if (mediaType === "video") {
          user.videoTrack.play("remote-video");
        }

        if (mediaType === "audio") {
          user.audioTrack.play();
        }
      });

      // Handle user leaving
      client.on("user-unpublished", (user) => {
        setRemoteUsers(prev => prev.filter(u => u.uid !== user.uid));
      });
    };

    initCall();

    // Cleanup on unmount
    return async () => {
      const { camTrack, micTrack } = localTracksRef.current;
      camTrack?.stop();
      camTrack?.close();
      micTrack?.stop();
      micTrack?.close();
      await clientRef.current?.leave();
    };
  }, [appointmentId, joinDoctorCall, joinPatientCall]);

  // Exit button handler
  const handleExit = async () => {
    const { camTrack, micTrack } = localTracksRef.current;
    camTrack?.stop();
    camTrack?.close();
    micTrack?.stop();
    micTrack?.close();
    await clientRef.current?.leave();
    navigate(-1); // go back to previous page (dashboard)
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-4">
        {/* Local video */}
        <div id="local-video" className="w-1/2 h-96 bg-black rounded-xl" />


        {/* Remote */}
        <div id="remote-video" className="w-1/2 h-96 bg-black rounded-xl" />
      </div>

      <div className="mt-4">
        <button
          onClick={handleExit}
          className="px-6 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"
        >
          Exit Call
        </button>
      </div>
    </div>
  );
}
