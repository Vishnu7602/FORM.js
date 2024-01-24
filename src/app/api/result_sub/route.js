import getPSConnection from "@/components/database";



async function getAllStudents(connection) {
  const [rows] = await connection.query('SELECT * FROM students');
  return rows;
}


export async function GET(request) {
  try {
    const connection = await getPSConnection();
    const students = await getAllStudents(connection);


    return new Response(JSON.stringify(students), { status: 200 });
  } catch (error) {
    return new Response(`Fetching data from the database failed: ${error.message}`, { status: 500 });
  }
}