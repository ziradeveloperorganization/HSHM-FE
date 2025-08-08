import React from "react";
import { IonContent } from "@ionic/react";

export default function Home() {
  return (
    <IonContent scrollY={true} className="ion-padding">
      <div className="container mt-4">
      <h1 className="mb-4 text-primary">Home Page</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="p-3 border bg-light mb-3">Column 1</div>
        </div>
        <div className="col-md-6">
          <div className="p-3 border bg-light mb-3">Column 2</div>
        </div>
        {Array.from({ length: 20 }).map((_, i) => (
          <div className="col-12 mb-3" key={i}>
            <div className="p-3 border bg-light">Item {i + 1}</div>
          </div>
        ))}
      </div>
    </div>
    </IonContent>
  );
}
