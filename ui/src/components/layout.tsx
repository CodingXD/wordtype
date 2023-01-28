import { ReactNode } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

type Props = {
  title: string;
  children: ReactNode;
};

export default function Layout({ title, children }: Props) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <nav className="flex py-4 px-8 justify-between">
          <Link to="/" className="no-underline text-black outline-none">
            Word<strong>Type</strong>
          </Link>
        </nav>
        <main className="px-8">{children}</main>
      </div>
    </>
  );
}
