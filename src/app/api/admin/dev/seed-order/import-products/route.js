import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Product from "@/models/Product";
import { requireAdmin } from "../../_utils";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// We import your existing catalog + pricing directly
const CATALOG_MODULE = '@/data/products';
const PRICING_MODULE = '@/utils/pricing';

function parseSizeOz(v) {
  const n = Number(String(v ?? '').replace(/[^0-9.]/g, ''));
  return Number.isFinite(n) ? n : undefined;
}

function slugify(s) {
  return String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
}

export async function POST() {
  if (!requireAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await dbConnect();

  // Load catalog + pricing from your codebase
  let productsMod, pricingMod;
  try {
    productsMod = await import(CATALOG_MODULE);
    pricingMod = await import(PRICING_MODULE);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to import catalog/pricing modules', details: String(e) }, { status: 400 });
  }

  const catalog = (productsMod.products || productsMod.default || []);
  const priceTable = pricingMod.pricing || {};

  if (!Array.isArray(catalog) || catalog.length === 0) {
    return NextResponse.json({ error: 'No products found in src/data/products.js' }, { status: 400 });
  }

  let upserts = 0;
  for (const raw of catalog) {
    const name = raw.name || raw.title || '';
    const slug = slugify(raw.slug || raw.key || name);
    const sizeOz = parseSizeOz(raw.size);
    const qtyCase = Number(raw.qtyCase || 1000);
    const priceCase = raw.priceCase != null ? Number(raw.priceCase) : undefined;

    const priceRow = priceTable[slug] || {};
    const pricePerCupPlain = priceRow.plain != null
      ? Number(priceRow.plain)
      : (priceCase && qtyCase ? priceCase / qtyCase : undefined);
    const pricePerCupCustom = priceRow.custom != null ? Number(priceRow.custom) : undefined;

    const doc = {
      name,
      slug,
      category: 'cups',
      description: raw.desc || raw.description || '',
      imageUrl: raw.image || raw.imageUrl || '',
      isCustomizable: pricePerCupCustom != null,
      active: true,
      variants: [{ sizeOz, qtyCase, priceCase, pricePerCupPlain, pricePerCupCustom }].filter(v=>v.sizeOz),
    };

    await Product.findOneAndUpdate(
      { slug },
      { $set: doc },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    upserts++;
  }

  return NextResponse.json({ ok: true, count: upserts });
}