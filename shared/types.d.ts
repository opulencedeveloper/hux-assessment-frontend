type ChildrenProps = React.ReactNode;

export type FormInputOnchange = React.ChangeEvent<HTMLInputElement>;

export interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export interface ContextProviderProps {
  children: ChildrenProps;
}

export interface RequestConfigType {
  url: string;
  method?: string;
  body?: any;
  contentType?: string;
  token?: string | null;
}

export interface HttpResponseData {
  status: string;
  message: string;
  data: any;
}

export interface AuthContactForm {
  userName: string;
  password: string;
  confirmPassword?: string;
}

export interface AuthProps {
  isSignUp: boolean;
  isLoading: boolean;
  handleFormSubmit: (formData: AuthContactForm) => void;
}

export interface CardProps {
  _id?: string;
  title?: string;
  subTitle?: string;
  deleteContactIsLoading?: boolean;
  description?: string;
  handleCardClick?: (id?: string) => void;
  handleDeleteBtnClick?: (id?: string) => void;
}

export interface Contacts {
  _id?: string; 
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

export interface ContactFormProps {
  title: string;
  formDetails?: Contacts;
  isLoading: boolean;
  handleFormSubmit: (formData: ContactForm) => void;
}

export interface PageProps {
  params: {
    id: string;
  };
}

