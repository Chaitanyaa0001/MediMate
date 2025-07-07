const axios = require('axios');

const searchdrugs = async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    // Try search by brand name
    let response;
    try {
      response = await axios.get('https://api.fda.gov/drug/label.json', {
        params: {
          search: `openfda.brand_name:"${query}"`,
          limit: 1,
        },
      });
    } catch (err) {
      if (err?.response?.data?.error?.code !== 'NOT_FOUND') throw err;
    }

    // If no result, try generic name
    if (!response || !response.data.results?.length) {
      try {
        response = await axios.get('https://api.fda.gov/drug/label.json', {
          params: {
            search: `openfda.generic_name:"${query}"`,
            limit: 1,
          },
        });
      } catch (err) {
        if (err?.response?.data?.error?.code !== 'NOT_FOUND') throw err;
      }
    }

    // If still no result, try symptom/condition (indications_and_usage)
    if (!response || !response.data.results?.length) {
      response = await axios.get('https://api.fda.gov/drug/label.json', {
        params: {
          search: `indications_and_usage:"${query}"`,
          limit: 1,
        },
      });
    }

    const result = response.data.results?.[0];
    if (!result || !result.openfda) {
      return res.status(404).json({ message: "No drug found for the given query." });
    }

    // Custom output for frontend format
    const data = {
      openfda: {
        brand_name: result.openfda.brand_name || [],
        generic_name: result.openfda.generic_name || [],
        manufacturer_name: result.openfda.manufacturer_name || [],
      },
      purpose: result.purpose || [],
      indications_and_usage: result.indications_and_usage || [],
      dosage_and_administration: result.dosage_and_administration || [],
      warnings: result.warnings || [],
      do_not_use: result.do_not_use || [],
      adverse_reactions: result.adverse_reactions || [],
      storage_and_handling: result.storage_and_handling || [],
    };

    return res.status(200).json(data);
  } catch (err) {
    console.error("Open FDA error", err?.response?.data || err);
    return res.status(500).json({ message: "Internal Server Error: FDA API failure" });
  }
};

module.exports = { searchdrugs };
