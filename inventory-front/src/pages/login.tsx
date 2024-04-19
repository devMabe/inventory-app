import { AdminIcon } from "../components/icons/AdminIcon";

export const Login = () => {
  return (
    <div className="container mx-auto min-h-screen flex flex-col justify-center items-center">
      <div className="shadow-xl w-full max-w-md rounded-lg bg-slate-100 p-8">
        <form className="flex flex-col space-y-4">
          <h1 className="text-black font-semibold text-3xl text-center capitalize flex justify-center gap-2">
            <AdminIcon />
            Admin panel
          </h1>
          <input
            className="block w-full p-3  font-semibold rounded-md border border-gray-500 focus:outline-none focus:ring-blue-500 focus:ring-opacity-50"
            type="email"
            name="email"
            id="email"
            placeholder="Correo electrónico"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Contraseña"
            className="block w-full p-3 font-semibold rounded-md border border-gray-500 focus:outline-none focus:ring-blue-500 focus:ring-opacity-50"
          />
          <button className="w-full  bg-black p-2 rounded-sm text-white font-bold  hover:bg-gray-900">
            Iniciar
          </button>
        </form>
      </div>
    </div>
  );
};
