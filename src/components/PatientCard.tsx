import { Patient } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, MapPin, Calendar } from 'lucide-react';

interface PatientCardProps {
  patient: Patient;
}

export function PatientCard({ patient }: PatientCardProps) {
  const contact = patient.contact[0];

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {patient.photo_url ? (
              <img
                src={patient.photo_url}
                alt={patient.patient_name}
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-600">
                  {patient.patient_name.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <CardTitle className="text-lg">{patient.patient_name}</CardTitle>
              <CardDescription className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-1" />
                Age: {patient.age}
              </CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="text-sm">
            {patient.medical_issue}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {contact.address && (
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              {contact.address}
            </div>
          )}
          {contact.number && (
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="w-4 h-4 mr-2" />
              {contact.number}
            </div>
          )}
          {contact.email && (
            <div className="flex items-center text-sm text-gray-600">
              <Mail className="w-4 h-4 mr-2" />
              {contact.email}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}