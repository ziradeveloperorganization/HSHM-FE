import React from "react";
import { IonContent } from "@ionic/react";
import { motion } from "framer-motion";
import '../../assets/css/pages/Home.css';
import ProductCard from "./Product/ProductCard";
import { products } from "./Product/products";

export default function Home() {
  return (
    <IonContent scrollY={true} className="ion-padding">
      <div className="container">
        <motion.h1
          className="mb-4 text-primary"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Featured Products
        </motion.h1>
        <div className="row">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </IonContent>
  );
}