export default function Home() {
  return (
    <>
      <div className="relative min-h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center brightness-50"
          style={{ backgroundImage: "url(../../public/img/bg-home.png)" }}
        ></div>
        <div className="relative flex items-center justify-center min-h-screen">
          <h1 className="text-amber-500 text-6xl font-bold z-10 text-center">
            Toko Kelontong Nuryati
          </h1>
        </div>
      </div>
      <footer className="bg-gray-800 text-amber-500 py-4 font-bold">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Toko Kelontong Nuryati. All rights
            reserved. 🏪
          </p>
        </div>
      </footer>
    </>
  );
}
