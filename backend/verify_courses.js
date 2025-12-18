
async function testCourses() {
    const baseUrl = 'http://localhost:5000/api';
    const teacherUser = `teacher_${Date.now()}`;
    let teacherToken = '';

    console.log('--- 1. Register Teacher ---');
    try {
        const regRes = await fetch(`${baseUrl}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: teacherUser,
                password: 'password123',
                full_name: 'Test Teacher',
                role_id: 3, // Teacher Role
                email: `${teacherUser}@school.com`,
                phone: '555123456'
            })
        });
        const regData = await regRes.json();
        console.log('Register:', regRes.status, regData);

        console.log('\n--- 2. Login Teacher ---');
        const loginRes = await fetch(`${baseUrl}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: teacherUser,
                password: 'password123'
            })
        });
        const loginData = await loginRes.json();
        teacherToken = loginData.token;
        console.log('Login:', loginRes.status, 'Token:', !!teacherToken);

        if (teacherToken) {
            console.log('\n--- 3. Create Course ---');
            const courseRes = await fetch(`${baseUrl}/courses`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${teacherToken}`
                },
                body: JSON.stringify({
                    title: 'Introduction to Physics',
                    description: 'A complete physics course for high school',
                    level: '10th Grade',
                    price: 199.99
                })
            });
            const courseData = await courseRes.json();
            console.log('Create Course:', courseRes.status, courseData);

            console.log('\n--- 4. Get All Courses (Public) ---');
            const getRes = await fetch(`${baseUrl}/courses`);
            const getData = await getRes.json();
            console.log('Get Courses:', getRes.status, 'Count:', getData.length);
            console.log('First Course:', getData[0]?.title);
        }
    } catch (err) {
        console.error("Test failed checking fetch:", err);
    }
}

testCourses();
