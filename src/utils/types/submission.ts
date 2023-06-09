interface SubmissionType {
  id: number;
  to: {
    approver_position: string;
    approver_name: string;
  }[];
  cc: {
    cc_position: string;
    cc_name: string;
  }[];
  title: string;
  status: string;
  attachment: string;
  receive_date: string;
  opened: boolean;
  submission_type: {
    submission_name: string;
    submission_value: number[];
  }[];
}

export default SubmissionType;

export interface PostSubmissionTypes {
  to: [];
}

export interface to_cc_type {
  to: {
    approver_position: string;
    approver_id: string;
    approver_name: string;
  }[];
  cc: {
    cc_position: string;
    cc_name: string;
    cc_id: string;
  }[];
  requirement: string;
}
