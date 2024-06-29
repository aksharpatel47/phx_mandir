import Link from "next/link";

export default async function Home() {
    return (
        <>

            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <Link href="/data">

                        <button
                            className="font-bold rounded-2xl text-black w-64 h-16 border-[4px] hover:border-amber-700 border-solid border-black">Click
                            me
                        </button>

                </Link>

            </div>

        </>
    );
}
