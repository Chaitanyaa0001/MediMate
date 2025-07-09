import React, { useState } from 'react';
import DashNavbar from '../../components/navbars/DashNavbar';
import { FiSearch } from 'react-icons/fi';
import { usefda } from '../../hooks/fda/FDA';


const FDA = () => {
  const {getfda,fdaData} = usefda();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
  if (searchTerm.trim()) {
    getfda(searchTerm.trim());
  }
};




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
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}/>
          </div>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md "
            onClick={handleSearch}>Search</button>
        </div>
        {/* Drug Cards */}
        {fdaData.length > 0 ? (
          <div className="flex flex-col gap-6">
            {fdaData.map((drug, index) => (
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
