export default function Page() {
  return (
    <>
      <div className="pt-10">
        <section>
          <div className="text-white text-2xl">
            <table className=" border-collapse mx-auto bg-[#0000008a]">
              <thead>
                <tr>
                  <th colSpan={3} className="p-4">
                    <h1 className="text-white text-4xl text-center pb-3">
                      Mandir Visiting Timings
                    </h1>
                  </th>
                </tr>
                <tr>
                  <th className="p-4"></th>
                  <th className="p-4">Days</th>
                  <th className="p-4">Timings</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4">Darshan</td>
                  <td className="p-4">Monday to Sunday</td>
                  <td className="p-4">
                    8:00 AM - 12:00 PM, <br />
                    4:00 PM - 7:00 PM, <br />
                    (Darshan will be closed during Thaal for 30 min at 11 am and
                    6pm)
                  </td>
                </tr>
                <tr>
                  <td className="p-4">Arti</td>
                  <td className="p-4">Monday to Sunday</td>
                  <td className="p-4">6:30 PM</td>
                </tr>
                <tr>
                  <td className="p-4">Nilkanth Varni Abhishek</td>
                  <td className="p-4">Monday to Sunday</td>
                  <td className="p-4">
                    8:00 AM - 12:00 PM, <br />
                    4:00 PM - 7:00 PM,
                    <br />
                    (Darshan will be closed during Thaal for 30 min at 11 am and
                    6pm)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section>
          <div className="text-white text-2xl pt-10">
            <table className=" border-collapse mx-auto bg-[#0000008a]">
              <thead>
                <tr>
                  <th colSpan={2} className="p-4">
                    <h1 className="text-white text-4xl text-center pb-3">
                      Weekly Assemblies
                    </h1>
                  </th>
                </tr>
                <tr>
                  <th></th>
                  <th>Saturday</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4">Bal Sabha</td>
                  <td className="p-4">4:30 PM - 5:30 PM</td>
                </tr>
                <tr>
                  <td className="p-4">Balika Sabha</td>
                  <td className="p-4">4:30 PM - 5:30 PM</td>
                </tr>
                <tr>
                  <td className="p-4">Kishore Sabha</td>
                  <td className="p-4">2:00 PM - 3:30 PM</td>
                </tr>
                <tr>
                  <td className="p-4">Kishori Sabha</td>
                  <td className="p-4">4:30 PM - 5:30 PM</td>
                </tr>
                <tr>
                  <td className="p-4">Yuvak Sabha</td>
                  <td className="p-4">3:30 PM - 5:00 PM</td>
                </tr>
                <tr>
                  <td className="p-4">Yuvati Sabha</td>
                  <td className="p-4">3:30 PM - 4:30 PM</td>
                </tr>
                <tr>
                  <td className="p-4">Mahila Sabha</td>
                  <td className="p-4">2:30 PM - 3:30 PM</td>
                </tr>
                <tr>
                  <td className="p-4">Satsang Sabha</td>
                  <td className="p-4">4:00 PM - 6:00 PM</td>
                </tr>
                <tr>
                  <td className="p-4">Bal Gujarati Classes</td>
                  <td className="p-4">2:15 PM - 3:00 PM</td>
                </tr>
                <tr>
                  <td className="p-4">Balika Gujarati Classes</td>
                  <td className="p-4">2:15 PM - 3:00 PM</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
