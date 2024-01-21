import getPSConnection from "@/components/database";


// Function to fetch all students from database
async function getAllStudents(connection) {
  const [rows] = await connection.query('SELECT * FROM students');
  return rows;
}

// Route handler
export async function GET(request) {
  try {
    const connection = await getPSConnection();
    const students = await getAllStudents(connection);


    // Return response with status 200 and data
    return new Response(JSON.stringify(students), { status: 200 });
  } catch (error) {
    return new Response(`Fetching data from the database failed: ${error.message}`, { status: 500 });
  }
}