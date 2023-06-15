import React from 'react';
import './Loading.css';
 function Loading({isLoading}) {
  return (<>
    {isLoading && (
      <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>
    )}
  </>
  );
}
 export default Loading;