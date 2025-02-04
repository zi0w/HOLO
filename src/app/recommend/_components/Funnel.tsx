import type { ReactElement, ReactNode } from "react";

export type StepProps = {
  name: string;
  children: ReactNode;
};

type FunnelProps = {
  children: Array<ReactElement<StepProps>>;
  currentStep: string;
};

export const Funnel = ({ children, currentStep }: FunnelProps) => {
  const steps = children.filter((child) => child.type === Step);
  const activeStep = steps.find((child) => child.props.name === currentStep);
  return activeStep || null;
};

export const Step = ({ children }: StepProps): ReactElement => {
  return <>{children}</>;
};
