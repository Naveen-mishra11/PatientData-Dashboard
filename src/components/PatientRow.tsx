import { Patient } from '@/lib/types';
import Image from 'next/image';

interface PatientRowProps {
  patient: Patient;
}

// Helper function to get medical issue class
const getMedicalIssueClass = (issue: string) => {
  const normalized = issue.toLowerCase().replace(/\s+/g, '-');
  return `medical-issue-tag ${normalized}`;
};

export function PatientRow({ patient }: PatientRowProps) {
  const contact = patient.contact[0];

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">ID-{String(patient.patient_id).padStart(4, '0')}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {patient.photo_url ? (
            <Image
              src={patient.photo_url}
              alt={patient.patient_name}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-gray-600">
                {patient.patient_name.charAt(0)}
              </span>
            </div>
          )}
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{patient.patient_name}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.age}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={getMedicalIssueClass(patient.medical_issue)}>
          {patient.medical_issue}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        {contact.address ? (
          <span className="text-gray-500">{contact.address}</span>
        ) : (
          <span className="text-red-500 font-medium">N/A</span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        {contact.number ? (
          <span className="text-gray-500">{contact.number}</span>
        ) : (
          <span className="text-red-500 font-medium">N/A</span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        {contact.email ? (
          <span className="text-gray-500">{contact.email}</span>
        ) : (
          <span className="text-red-500 font-medium">N/A</span>
        )}
      </td>
    </tr>
  );
}
