import { NextResponse } from "next/server"
import { sql } from "@/lib/database"

export async function GET() {
  try {
    const products = await sql`
      SELECT
        p.*,
        c.name AS category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.created_at DESC;
    `

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json(
      { error: "Failed to fetch products", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      name,
      description,
      price,
      image_url,
      category_id,
      is_available,
      is_featured,
      is_new,
      new_until_date,
      features,
      specifications_text,
      warranty_months,
      brand,
      model,
      condition_type,
      warranty_period,
      storage_capacity,
      color,
      stock_quantity,
      sku,
    } = body

    // Ensure new_until_date is null if empty string or falsy
    const safeNewUntilDate = new_until_date ? new_until_date : null;

    const [product] = await sql`
      INSERT INTO products (
        name, description, price, image_url, category_id,
        is_available, is_featured, is_new, new_until_date, features, specifications_text,
        warranty_months, brand, model, condition_type, warranty_period,
        storage_capacity, color, stock_quantity, sku
      ) VALUES (
        ${name}, ${description}, ${price}, ${image_url}, ${category_id},
        ${is_available}, ${is_featured}, ${is_new}, ${safeNewUntilDate}, ${features}, ${specifications_text},
        ${warranty_months}, ${brand}, ${model}, ${condition_type}, ${warranty_period},
        ${storage_capacity}, ${color}, ${stock_quantity}, ${sku}
      )
      RETURNING *;
    `

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json(
      { error: "Failed to create product", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
} 