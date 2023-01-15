export interface User {
  avatarUrl: string;
  email: string;
  id: number;
  lastLogin: string;
  name: string;
  role: string;
  status: string;
}

export interface UserRowProps {
  user: User;
  handleEdit: (user: User) => void;
}

export interface ModalProps {
  user: User;
  isOpen: boolean;
  handleClose: () => void;
}
