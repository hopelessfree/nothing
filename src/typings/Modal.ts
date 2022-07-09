export interface ModalProps {
  title?: string;
  visible: boolean;

  onCancel?: () => void;
  onOk?: () => void;
}
