import React, { useState } from 'react';
import DashNavbar from '../../components/navbars/DashNavbar';
import { FiSearch } from 'react-icons/fi';

const FDA = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // 💊 MOCK DATA for design/testing
  const [drugs, setDrugs] = useState([
    {
      openfda: {
        brand_name: ['Advil'],
        generic_name: ['Ibuprofen'],
        manufacturer_name: ['Pfizer'],
      },
      purpose: ['Pain reliever/fever reducer'],
      indications_and_usage: ['For the temporary relief of minor aches and pains due to headache, toothache, backache, menstrual cramps.'],
      dosage_and_administration: ['Take 1 tablet every 4 to 6 hours while symptoms persist.'],
      warnings: ['Reye’s syndrome: Children who have or are recovering from chickenpox or flu-like symptoms should not use this product.'],
      do_not_use: ['If you have ever had an allergic reaction to any other pain reliever/fever reducer.'],
      adverse_reactions: ['Nausea, dizziness, rash, or stomach upset may occur.'],
      storage_and_handling: ['Store at 20°-25°C (68°-77°F) in a dry place away from sunlight.'],
    },
    {
      openfda: {
        brand_name: ['Dolo 650'],
        generic_name: ['Paracetamol'],
        manufacturer_name: ['Micro Labs'],
      },
      purpose: ['Pain and fever reduction'],
      indications_and_usage: ['Used to relieve mild to moderate pain such as headache, muscle ache, arthritis, and fever.'],
      dosage_and_administration: ['1 tablet every 6 hours. Do not exceed 4g per day.'],
      warnings: ['Liver warning: This product contains paracetamol. Severe liver damage may occur if taken in excess.'],
      do_not_use: ['If you have liver disease or consume 3+ alcoholic drinks daily.'],
      adverse_reactions: ['Rare: Skin rash, liver dysfunction.'],
      storage_and_handling: ['Keep below 25°C and away from moisture.'],
    },
    {
      openfda: {
        brand_name: ['Crocin Advance'],
        generic_name: ['Acetaminophen'],
        manufacturer_name: ['GSK India'],
      },
      purpose: ['Relieves pain and reduces fever'],
      indications_and_usage: ['Effective against fever, cold, flu, and pain like headaches or body ache.'],
      dosage_and_administration: ['500 mg to 1000 mg every 4–6 hours. Max 4000 mg per day.'],
      warnings: ['Overdose can lead to liver failure.'],
      do_not_use: ['With other acetaminophen-containing drugs.'],
      adverse_reactions: ['Allergic reactions like swelling or breathing trouble.'],
      storage_and_handling: ['Store at room temperature away from light.'],
    },
  ]);

  return (
    <div>
      <DashNavbar />
      <div className="w-[90%] mx-auto lg:w-[85%] my-8">
        <h1 className="text-3xl font-bold text-red-600 mb-3">Drug Information (FDA)</h1>
        <p className="opacity-70 mb-6 text-lg italic">Search for medication details powered by OpenFDA.</p>

        {/* Search Bar (inactive for mock) */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex items-center border-2 border-red-600 bg-white px-3 py-2 rounded-md w-full shadow-sm">
            <FiSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Enter drug name (e.g., ibuprofen)"
              className="outline-none w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
                
            />
          </div>
          <button
            className="px-4 py-2 bg-red-400 text-white rounded-md cursor-not-allowed"
           
          >
            Search
          </button>
        </div>

        {/* Drug Cards */}
        {drugs.length > 0 ? (
          <div className="flex flex-col gap-6">
            {drugs.map((drug, index) => (
              <div key={index} className="bg-white border-2 border-red-600 p-4 rounded-md shadow-md">
                <h2 className="text-xl font-bold text-red-700">{drug.openfda?.brand_name?.join(', ') || 'Unknown Brand'}</h2>
                <p className="text-sm italic mb-1">
                  Generic Name: <span className="font-medium">{drug.openfda?.generic_name?.join(', ') || 'N/A'}</span>
                </p>
                <p><strong>Purpose:</strong> {drug.purpose?.join(' ') || 'N/A'}</p>
                <p><strong>Indications & Usage:</strong> {drug.indications_and_usage?.join(' ') || 'N/A'}</p>
                <p><strong>Dosage:</strong> {drug.dosage_and_administration?.join(' ') || 'N/A'}</p>
                <p><strong>Warnings:</strong> {drug.warnings?.join(' ') || 'N/A'}</p>
                <p><strong>Do not use if:</strong> {drug.do_not_use?.join(' ') || 'N/A'}</p>
                <p><strong>Side Effects:</strong> {drug.adverse_reactions?.join(' ') || 'N/A'}</p>
                <p><strong>Storage:</strong> {drug.storage_and_handling?.join(' ') || 'N/A'}</p>
                <p className="text-sm mt-2 text-gray-600 italic">
                  Manufacturer: {drug.openfda?.manufacturer_name?.join(', ') || 'Unknown'}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic mt-4">No results found. Try searching for another drug name.</p>
        )}
      </div>
    </div>
  );
};

export default FDA;
