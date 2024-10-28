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
                      Gujarati Class Timings
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
