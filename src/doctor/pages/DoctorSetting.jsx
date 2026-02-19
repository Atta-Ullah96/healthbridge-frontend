function DoctorSetting() {
  return (
    <div>
      <h2 className="text-xl font-bold">Settings</h2>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl">
          <h3 className="font-semibold">Account Security</h3>
          <div className="mt-3">
            <button className="px-4 py-2 border rounded-lg">Change password</button>
            <button className="px-4 py-2 border rounded-lg ml-2">Enable 2FA</button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl">
          <h3 className="font-semibold">Notifications</h3>
          <div className="mt-3 space-y-2 text-sm text-[#6B7280]">
            <div>Appointment reminders: Email, SMS, In-app</div>
            <div>New messages: In-app, Email</div>
            <div>Weekly summary: On</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorSetting