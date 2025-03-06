
import React from "react";
import { DoctorCreationResult } from "@/services/doctorService";

interface DoctorCreationResultsProps {
  results: DoctorCreationResult[];
}

export const DoctorCreationResults: React.FC<DoctorCreationResultsProps> = ({ results }) => {
  if (results.length === 0) return null;
  
  return (
    <div className="mt-4 space-y-2">
      <h3 className="text-sm font-medium">Results:</h3>
      <div className="max-h-60 overflow-y-auto rounded border p-2">
        {results.map((result, index) => (
          <div 
            key={index} 
            className={`mb-1 text-xs ${result.success ? 'text-green-600' : 'text-red-600'}`}
          >
            {result.email}: {result.message}
          </div>
        ))}
      </div>
    </div>
  );
};
