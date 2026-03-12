import { NextRequest, NextResponse } from 'next/server';
import { Patient, ApiResponse, ApiParams } from '@/lib/types';

// Import the data from the JSON file
import patientsData from '@/../../data.json';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'patient_name';
    const sortOrder = (searchParams.get('sortOrder') || 'asc') as 'asc' | 'desc';
    const filterBy = searchParams.get('filterBy') || '';
    const filterValue = searchParams.get('filterValue') || '';

    // Filter patients based on search and filter criteria
    let filteredPatients = patientsData;

    // Apply search filter (search in patient_name and medical_issue)
    if (search) {
      filteredPatients = filteredPatients.filter(patient =>
        patient.patient_name.toLowerCase().includes(search.toLowerCase()) ||
        patient.medical_issue.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply additional filter
    if (filterBy && filterValue) {
      filteredPatients = filteredPatients.filter(patient => {
        switch (filterBy) {
          case 'medical_issue':
            return patient.medical_issue.toLowerCase() === filterValue.toLowerCase();
          case 'age_range':
            const age = patient.age;
            if (filterValue === 'young') return age < 30;
            if (filterValue === 'adult') return age >= 30 && age < 60;
            if (filterValue === 'senior') return age >= 60;
            return false;
          default:
            return true;
        }
      });
    }

    // Sort patients
    filteredPatients.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortBy) {
        case 'patient_name':
          aValue = a.patient_name.toLowerCase();
          bValue = b.patient_name.toLowerCase();
          break;
        case 'age':
          aValue = a.age;
          bValue = b.age;
          break;
        case 'medical_issue':
          aValue = a.medical_issue.toLowerCase();
          bValue = b.medical_issue.toLowerCase();
          break;
        default:
          aValue = a.patient_name.toLowerCase();
          bValue = b.patient_name.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    // Calculate pagination
    const total = filteredPatients.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const patients = filteredPatients.slice(startIndex, endIndex);

    const response: ApiResponse = {
      patients,
      total,
      page,
      limit
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching patients:', error);
    return NextResponse.json(
      { error: 'Failed to fetch patients' },
      { status: 500 }
    );
  }
}