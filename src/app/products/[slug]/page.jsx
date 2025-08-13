"use client";

import { pricing } from "../../../utils/pricing";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../../context/CartContext";
import { getProductBySlug, products } from "../../../data/products";
import Cup3DPreview from "../../../components/Cup3DPreview";

// Match CupCard's behavior for case pricing overrides
const DEFAULT_DESCRIPTOR = "Blank Single-Walled Paper Cup";
const CASE_PRICE_BY_SIZE = {
  "10 oz": 92,
  "12 oz": 94,
  "16 oz": 96,
  "22 oz": 88,
  "32 oz": 90,
};

// Robust size extraction: prefer entity.size, else parse name, else slug
function getSizeText(entity) {
  if (entity?.size) {
    return /oz/i.test(entity.size) ? entity.size : `${entity.size} oz`;
  }
  const fromName = entity?.name?.match(/(\d+)\s*oz/i);
  if (fromName?.[1]) return `${fromName[1]} oz`;
  const fromSlug = entity?.slug?.match(/(\d+)/);
  if (fromSlug?.[1]) return `${fromSlug[1]} oz`;
  return "";
}

function buildTitle(entity) {
  const sizeText = getSizeText(entity);
  const qtyPerCase = entity?.qtyCase || 1000;
  return `${qtyPerCase} cups | ${sizeText} ${DEFAULT_DESCRIPTOR}`.replace("  ", " ");
}

export default function ProductPage({ params: { slug } }) {
  // 1) Lookup product
  const product = getProductBySlug(slug);
  if (!product) return <div className="p-4">Product not found.</div>;

  // Cups per case
  const caseQty = product.qtyCase || 1000;

  // 2) Cart & UI state
  const { addItem, openCart, isOpen } = useCart();
  const [designType, setDesignType] = useState("Plain White");
  const [designFile, setDesignFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  // qty stores number of cups; default to one full case so Add to Cart is clickable immediately
  const [qty, setQty] = useState(caseQty);

  // 3) Pricing & texture/model URLs
  const { plain, custom } = pricing[slug];
  const pricePerCup = designType === "Plain White" ? plain : custom;
  const subtotal = qty ? (pricePerCup * Number(qty)).toFixed(2) : "0.00";
}
