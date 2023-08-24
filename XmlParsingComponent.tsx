import React, { useEffect, useState } from 'react';
import { parseString } from 'xml2js';

const XmlParsingComponent = () => {
  const [data, setData] = useState(null);

  const xml = `
    <!-- Your XML data here -->
  `;

  useEffect(() => {
    parseString(xml, (err, result) => {
      if (err) {
        console.error('Error parsing XML:', err);
        return;
      }
      setData(result);
    });
  }, [xml]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const masks = data.FixedIncomeSenario.ScenarioContext[0].Masks[0].Mask;

  return (
    <div>
      {masks.map((mask, index) => {
        const swapCurve = mask.SwapCurve[0];
        const futureChains = swapCurve.futurechain;
        const moneyMarketQuotes = swapCurve.MoneyMarketQuotes;
        const swapRates = swapCurve.SwapRates;

        return (
          <div key={index}>
            <h2>Mask #{index + 1}</h2>
            {futureChains && (
              <div>
                <h3>Future Chains:</h3>
                {futureChains[0].qoute.map((qoute, qouteIndex) => (
                  <div key={qouteIndex}>
                    <div>Contract: {futureChains[0].$.contract}</div>
                    <div>Date: {qoute.$.date}, Midrate: {qoute.$.midrate}</div>
                  </div>
                ))}
              </div>
            )}
            {moneyMarketQuotes && (
              <div>
                <h3>Money Market Quotes:</h3>
                {/* Render money market quotes attributes here */}
              </div>
            )}
            {swapRates && (
              <div>
                <h3>Swap Rates:</h3>
                {/* Render swap rates attributes here */}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default XmlParsingComponent;
