import getPSConnection from "@/components/database";


export async function POST(req) {
  
  const row = await req.json();
  console.log('Request body:', row);

  try {
    const conn = await getPSConnection();

    const values = [row.name, row.age, row.gender, row.college];
    
    const insertQuery = `
      INSERT INTO students(name, age, gender, college)
      VALUES (?, ?, ?, ?)
    `;

    
    await conn.query(insertQuery, values);

    
    await conn.end();
    
    
    return new Response(JSON.stringify({ message: 'Data inserted successfully' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Error inserting data' }), { status: 500 });
  }
}