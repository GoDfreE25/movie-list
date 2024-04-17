import { Typography } from "@mui/material";
import "./label.scss";

export type Props = {
  children: React.ReactNode;
  labelStyle?: string;
};

export default function Label({ children, labelStyle }: Props) {
  return (
    <div className="label">
      <Typography
        className={`${labelStyle}`}
        fontWeight={500}
        variant="body1"
      >
        {children}
      </Typography>
    </div>
  );
}
