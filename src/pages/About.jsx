import React from 'react'

const About = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding bg-gray-50">
        <div className="max-w-4xl mx-auto py-8">
          <IonCard className="shadow-lg border-0">
            <IonCardHeader>
              <IonCardTitle className="text-2xl font-bold text-center text-gray-800">
                About This Project
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <div className="space-y-4 text-gray-700">
                <p>
                  This is a modern web application built with:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>React 18 with TypeScript</li>
                  <li>Ionic Framework 8 for UI components</li>
                  <li>Tailwind CSS v4 for styling</li>
                  <li>Vite for fast development builds</li>
                  <li>React Router v6 for navigation</li>
                </ul>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default About