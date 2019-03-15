var sql = require("mssql");

//give db credentials here
var config = {
        user: '',
        password: '',
        server: '', 
        database: '' 
    };

class Student  {

  async  getStudentDetails(studentID)
    {
        var student1= await this.getStudentdetails(studentID);
        var marks1= await this.getmarks(studentID);
        console.log(student1)
        console.log(marks1)
        return{
            ...student1,
            marks:marks1
        };
    }
   async getStudentdetails(studentID)
   {
       
    try {
        sql.close()
        let pool = await sql.connect(config)
        let result2 = await pool.request()
        .query(`select  * from tbl_students where studentID=${studentID}`)
        return result2.recordset[0]
        sql.close()
    } catch (err) {
       console.log(err)
    }

   }

   async getmarks(studentID)
   {
       try {
        sql.close()
        let pool = await sql.connect(config)
        let result2 = await pool.request()
        .query(`select   * from  tbl_student_marks where studentID=${studentID}`)
       
        return result2.recordset
        sql.close()
    } catch (err) {
       console.log(err)
    }
   }
    async getAllStudents () {
        try {
            sql.close()
            let pool = await sql.connect(config)
            let result1 = await pool.request()
            .query('select  * from tbl_students ')
            console.dir(result1.recordset);
        
             return  result1.recordset;
             sql.close()
        } catch (err) {
           console.log(err)
        }
    }
    async createStudent (studentID,name,age,phone) {   
        try {
            console.log(studentID,name,age,phone)
            sql.close()
            let pool = await sql.connect(config)
            var req= pool.request()
            req.input('studentID', sql.Int, studentID)
            req.input('name', sql.VarChar, name)
            req.input('age', sql.Int, age)
            req.input('phone', sql.VarChar, phone)
           await req.query('insert into   tbl_students   values(@studentID,@name,@age,@phone)', (err, result) => {
                console.dir(result)
                sql.close()
                return result.recordset;

            })

        } catch (err) {
           console.log(err)
        }
    }

}

const studentObj = new Student();

module.exports = () => ({
  student: studentObj
});
