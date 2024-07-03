import Link from "next/link";

export default async function Home() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-[#0000008a]">
          <h1 className="text-white text-4xl text-center pb-3">
            Mandir Timings
          </h1>
          <div className="text-white text-2xl">
            <table className=" border-collapse">
              <thead>
                <tr>
                  <th className="p-4">Days</th>
                  <th className="p-4">Timings</th>
                </tr>
                <tr>
                  <td className="p-4">Monday to Friday</td>
                  <td className="p-4">
                    9:00 AM - 11:00 AM, <br />
                    4:00 PM - 7:00 PM
                  </td>
                </tr>
                <tr>
                  <td className="p-4">Saturday</td>
                  <td className="p-4">11:00 AM - 7:00 PM</td>
                </tr>
                <tr>
                  <td className="p-4">Sunday</td>
                  <td className="p-4">
                    9:00 AM - 11:00 AM, <br />
                    4:00 PM - 7:00 PM
                  </td>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
