import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-center sm:text-left">
          <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Bienvenido a Gasolineras APP
          </h1>
          <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 text-gray-700 p-3 rounded-lg mb-3 text-sm">
            <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p>
              <span className="text-red-500 font-bold">* </span>Ten en cuenta que los datos ofrecios por esta web provienen de{" "}
              <span className="font-semibold">Minetur</span> (Ministerio de Industria, Energía y Turismo de España).
            </p>
          </div>          
          <InicioButton/>
        </div>
      </main>
    </div>
  );
}

function InicioButton() {
  return (
      <a
      href="./gasolinera"
      className="
        rounded-xl bg-indigo-600 px-6 py-3
        font-semibold text-white shadow-lg
        transition-all duration-300
        hover:scale-105 hover:bg-indigo-700
        active:scale-95
        focus:outline-none focus:ring-4
        focus:ring-indigo-300
      "
    >
      Acceder
    </a>
  );
}
