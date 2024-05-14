import { Header } from "../header/header";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export function Layout(props: Props) {
  return (
    <div>
      <Header />
      <div className="content">{props.children}</div>
    </div>
  );
}
