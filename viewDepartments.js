async function viewDepartments() {
    try {
        const departments = await connection.query("SELECT * FROM department", function (err, results) {
            console.table(results);
            start();

        });


    } catch (err) {
        console.log(err);
    }

}
