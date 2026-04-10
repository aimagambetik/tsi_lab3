import type { ReactNode } from "react";

interface Props {
  isOpen: boolean;
  children: ReactNode;

}

export const Modal = ({isOpen, children}:Props) => {
    if (!isOpen)
        return null;
    return <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-12 border bg-slate-500">
        {children}
    </div>
}