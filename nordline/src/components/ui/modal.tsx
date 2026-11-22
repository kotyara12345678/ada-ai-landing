"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
  closeLabel?: string;
};

export function Modal({ open, onClose, labelledBy, children, closeLabel = "Закрыть" }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (open && !node.open) {
      node.showModal();
      document.body.style.overflow = "hidden";
    }

    if (!open) {
      if (node.open) node.close();
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleClose = () => onClose();
    node.addEventListener("close", handleClose);
    return () => node.removeEventListener("close", handleClose);
  }, [onClose]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
      className="m-auto max-h-[88dvh] w-[min(92vw,58rem)] overflow-y-auto bg-paper p-0 text-graphite backdrop:bg-graphite/75 backdrop:backdrop-blur-[2px]"
    >
      <div className="relative">
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center border border-graphite/15 bg-paper/90 text-graphite transition-colors hover:bg-graphite hover:text-paper"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
        {children}
      </div>
    </dialog>
  );
}
