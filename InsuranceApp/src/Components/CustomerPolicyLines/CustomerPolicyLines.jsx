import React, { useCallback } from "react";

const CustomerPolicyLines = ({ policyType, policyLines }) => {
  const autoRender = useCallback(() => {
    return (
      <div>
        <table className='table-auto w-full'>
          <thead>
            <tr>
              <th className='border border-cyan-500 px-4 py-2'>VIN</th>
              <th className='border border-cyan-500 px-4 py-2'>Year</th>
              <th className='border border-cyan-500 px-4 py-2'>Make</th>
              <th className='border border-cyan-500 px-4 py-2'>Model</th>
              <th className='border border-cyan-500 px-4 py-2'>Base Price</th>
            </tr>
          </thead>
          <tbody>
            {policyLines.map((line, index) => (
              <tr key={index}>
                <td className='border border-cyan-500 px-4 py-2'>{line.vin}</td>
                <td className='border border-cyan-500 px-4 py-2'>
                  {line.year}
                </td>
                <td className='border border-cyan-500 px-4 py-2'>
                  {line.Make}
                </td>
                <td className='border border-cyan-500 px-4 py-2'>
                  {line.Model}
                </td>
                <td className='border border-cyan-500 px-4 py-2'>
                  {line.BasePrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }, [JSON.stringify(policyLines)]);

  const homeRender = useCallback(() => {
    return (
      <div>
        <table className='table-auto w-full'>
          <thead>
            <tr>
              <th className='border border-cyan-500 px-4 py-2'>Address</th>
              <th className='border border-cyan-500 px-4 py-2'>City</th>
              <th className='border border-cyan-500 px-4 py-2'>State</th>
              <th className='border border-cyan-500 px-4 py-2'>Zip</th>
              <th className='border border-cyan-500 px-4 py-2'>Base Price</th>
            </tr>
          </thead>
          <tbody>
            {policyLines.map((line, index) => (
              <tr key={index}>
                <td className='border border-cyan-500 px-4 py-2'>
                  {line.Address}
                </td>
                <td className='border border-cyan-500 px-4 py-2'>
                  {line.City}
                </td>
                <td className='border border-cyan-500 px-4 py-2'>
                  {line.State}
                </td>
                <td className='border border-cyan-500 px-4 py-2'>{line.Zip}</td>
                <td className='border border-cyan-500 px-4 py-2'>
                  {line.BasePrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }, [JSON.stringify(policyLines)]);

  return (
    <div>
      <h5 className='mb-2 text-cyan-500'>Policy Lines</h5>
      {policyType === 1 ? autoRender() : policyType === 2 ? homeRender() : null}
    </div>
  );
};

export default CustomerPolicyLines;
