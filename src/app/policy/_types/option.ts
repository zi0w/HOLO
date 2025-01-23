export type Option = {
  id: string | number;
  code: string;
  name: string;
};

export type CustomSelectProps = {
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
  placeholder: string;
};
