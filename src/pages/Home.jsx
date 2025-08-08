import React from 'react';

export default function Home() {
  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-primary">Home Page</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="p-3 border bg-light">Column 1</div>
        </div>
        <div className="col-md-6">
          <div className="p-3 border bg-light">Column 2</div>
        </div>
      </div>
    </div>
  );
}