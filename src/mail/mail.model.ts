export type sendMailOption = {
  to: string;
  subject: string;
  template: string;
  context: {
    name: string;
    url: string;
  };
};
