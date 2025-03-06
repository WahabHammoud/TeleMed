
import React from "react";
import { Doctor, useDoctors } from "@/hooks/useDoctors";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export const DoctorList: React.FC = () => {
  const { doctors, loading } = useDoctors();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">No doctors found in the system.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Doctors in the System ({doctors.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const DoctorCard: React.FC<{ doctor: Doctor }> = ({ doctor }) => {
  return (
    <div className="border rounded-md p-4 bg-white shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">
            {doctor.first_name} {doctor.last_name}
          </h3>
          <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">{doctor.consultation_fee ? `${doctor.consultation_fee}€` : 'Fee not set'}</p>
          <p className="text-xs text-muted-foreground">
            {doctor.years_of_experience} {doctor.years_of_experience === 1 ? 'year' : 'years'} exp.
          </p>
        </div>
      </div>
      
      {doctor.bio && (
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{doctor.bio}</p>
      )}
      
      {doctor.languages && doctor.languages.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {doctor.languages.map((language, idx) => (
            <span key={idx} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">
              {language}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
