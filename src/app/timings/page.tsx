export default function Page() {
  return (
    <>
      <div className="pt-10">
        <section>
          <div className="text-black text-2xl mx-auto w-2/4">
            <table className=" border-collapse mx-auto ">
              <thead>
                <tr>
                  <th colSpan={3} className="p-4">
                    <h1 className="text-black text-4xl text-center pb-3 border-b-2 border-slate-500">
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
      </div>
    </>
  );
}
