"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

type AlertDialogConfig = {
  title: string;
  description?: ReactNode;
  cancelLabel: string;
  actionLabel: string;
  onCancel?: () => void;
  onAction: () => void;
};

type AlertDialogContext = {
  openDialog: (config: AlertDialogConfig) => void;
  closeDialog: () => void;
};

const AlertDialogContext = createContext<AlertDialogContext | undefined>(
  undefined,
);

export function AlertDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const [dialogConfig, setDialogConfig] = useState<AlertDialogConfig>({
    title: "Alert Dialog",
    description: "Are you sure?",
    cancelLabel: "Cancel",
    actionLabel: "Confirm",
    onCancel: () => {},
    onAction: () => {},
  });

  const openDialog = useCallback((config: AlertDialogConfig) => {
    setDialogConfig(config);
    setOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <AlertDialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      {open && (
        <AlertDialog open={open}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{dialogConfig.title}</AlertDialogTitle>
              {dialogConfig.description && (
                <AlertDialogDescription>
                  {dialogConfig.description}
                </AlertDialogDescription>
              )}
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  if (dialogConfig.onCancel) {
                    dialogConfig.onCancel();
                  }
                  closeDialog();
                }}
              >
                {dialogConfig.cancelLabel}
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  dialogConfig.onAction();
                  closeDialog();
                }}
              >
                {dialogConfig.actionLabel}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </AlertDialogContext.Provider>
  );
}

export function useAlertDialog() {
  const context = useContext(AlertDialogContext);
  if (context === undefined) {
    throw new Error(
      "useAlertDialog must be used within an AlertDialogProvider",
    );
  }
  return context;
}
