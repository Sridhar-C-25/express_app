import { Link } from "react-router-dom";

function RootLayout({ children }) {
  return (
    <>
      {/* <nav>
        <Link to="/signup">Join</Link>
      </nav> */}
      <main className="max-w-5xl mx-auto">{children}</main>
      {/* <footer className="text-white text-center bg-slate-600 py-2 mt-3">
        All CopyRight Reserved
      </footer> */}
    </>
  );
}

export default RootLayout;
