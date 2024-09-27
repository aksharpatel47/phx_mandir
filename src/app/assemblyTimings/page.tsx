export default function Page() {
  return (
    <>
      <div className="pt-10">
        <section>
          <div className="text-black text-2xl pt-10">
            <table className=" border-collapse mx-auto">
              <thead>
                <tr>
                  <th colSpan={2} className="p-4">
                    <h1 className="text-black text-4xl text-center pb-3 border-b-2 border-slate-500">
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
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
