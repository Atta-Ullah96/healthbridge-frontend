export function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">FAQ</h1>
      <div className="space-y-4 text-gray-700">
        <p><strong>How do I book an appointment?</strong> Select a doctor, choose an available slot, and confirm your booking.</p>
        <p><strong>Can I cancel an appointment?</strong> Yes, appointments can be cancelled before the scheduled time.</p>
        <p><strong>Is my data secure?</strong> HealthBridge uses secure authentication and protected data handling practices.</p>
      </div>
    </div>
  );
}