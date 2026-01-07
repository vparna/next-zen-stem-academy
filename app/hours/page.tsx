import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Center Hours - NextGen Stem Academy',
  description: 'Visit us during our center hours. We are open Monday-Friday and Saturday with flexible scheduling options.',
};

export default function HoursPage() {
  const scheduleData = [
    { day: 'Sunday', hours: 'Closed', status: 'closed' },
    { day: 'Monday', hours: '3:15 PM - 6:00 PM PST', status: 'open' },
    { day: 'Tuesday', hours: '3:15 PM - 6:00 PM PST', status: 'open' },
    { day: 'Wednesday', hours: '3:15 PM - 6:00 PM PST', status: 'open' },
    { day: 'Thursday', hours: '3:15 PM - 6:00 PM PST', status: 'open' },
    { day: 'Friday', hours: '3:15 PM - 6:00 PM PST', status: 'open' },
    { day: 'Saturday', hours: '10:00 AM - 12:00 PM PST', status: 'open' },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Center Hours</h1>
            <p className="text-xl text-blue-100">
              Visit us during our operating hours
            </p>
          </div>
        </div>
      </section>

      {/* Hours Schedule Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-blue-600 text-white px-8 py-6">
              <h2 className="text-3xl font-bold text-center">Weekly Schedule</h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {scheduleData.map((schedule) => (
                <div
                  key={schedule.day}
                  className={`px-8 py-6 flex items-center justify-between ${
                    schedule.status === 'closed' ? 'bg-gray-50' : 'bg-white hover:bg-blue-50 transition'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-gray-900 w-32">
                      {schedule.day}
                    </span>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-xl font-semibold ${
                        schedule.status === 'closed'
                          ? 'text-red-600'
                          : 'text-green-600'
                      }`}
                    >
                      {schedule.hours}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <span className="text-2xl mr-2">📍</span>
                Location
              </h3>
              <p className="text-gray-700">
                21304 State Route 9 SE<br />
                Woodinville, WA 98072
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <span className="text-2xl mr-2">📞</span>
                Contact
              </h3>
              <p className="text-gray-700">
                Phone: (425) 374-1463<br />
                Email: info@nextgenstem.com
              </p>
            </div>
          </div>

          {/* Important Notes */}
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
              <span className="text-2xl mr-2">ℹ️</span>
              Important Information
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>All times are in Pacific Standard Time (PST)</li>
              <li>Hours may vary during holidays - please call ahead</li>
              <li>We recommend arriving 10 minutes early for your scheduled class</li>
              <li>For special scheduling needs, please contact us in advance</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
