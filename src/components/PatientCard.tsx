import { Patient } from '@/lib/types';
import Image from 'next/image';
import { MapPin, Phone, Mail } from 'lucide-react';

interface PatientCardProps {
  patient: Patient;
}

// Helper function to get medical issue class
const getMedicalIssueClass = (issue: string) => {
  const normalized = issue.toLowerCase().replace(/\s+/g, '-');
  return `medical-issue-tag ${normalized}`;
};

export function PatientCard({ patient }: PatientCardProps) {
  const contact = patient.contact[0];

  return (
    <div className="patient-card">
      {/* Header Section - Light Blue Background */}
      <div className="bg-[#CDDEF8] p-4 flex items-center justify-between">
        {/* Left Side - Avatar and Patient Info */}
        <div className="flex items-center space-x-3">
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
              <span className="text-lg font-bold text-gray-600">
                {patient.patient_name.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <h3 className="text-sm font-bold text-gray-900">{patient.patient_name}</h3>
            <p className="text-sm text-gray-700">ID-{String(patient.patient_id).padStart(4, '0')}</p>
          </div>
        </div>
        
        {/* Right Side - Age Badge */}
        <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm font-medium">
          Age: {patient.age}
        </div>
      </div>

      {/* Content Section - White Background */}
      <div className="p-4">
        {/* Medical Issue Tag */}
        <div className={`medical-issue-tag mb-3 ${getMedicalIssueClass(patient.medical_issue)}`}>
          {patient.medical_issue}
        </div>
        
        {/* Contact Information */}
        <div className="space-y-2">
          {contact.address && (
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-gray-500" />
              {contact.address}
            </div>
          )}
          {contact.number && (
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Phone className="w-4 h-4 text-gray-500" />
              {contact.number}
            </div>
          )}
          {contact.email && (
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Mail className="w-4 h-4 text-gray-500" />
              {contact.email}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
