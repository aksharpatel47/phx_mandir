export default function Page() {
  return (
    <>
      <div className="pt-10  ">
        <section>
          <div className="text-black text-2xl pt-10 mx-auto w-2/4">
            <table className=" border-collapse mx-auto">
              <thead>
                <tr>
                  <th colSpan={2} className="p-4">
                    <h1 className="text-black text-4xl text-center pb-3 border-b-2 border-slate-500">
                      Keyboard Class Timings
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
                  <td className="p-4">
                    balika/kishori/premvati keyboard Classes
                  </td>
                  <td className="p-4">1:15 PM - 2:30 PM</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
