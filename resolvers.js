
const resolvers = {
    
    Query: {
        getStudent: (_, {studentID }, { dataSources })=>{return  dataSources.student.getStudentDetails(studentID)},
        getStudents: (_, { }, { dataSources })=> { return dataSources.student.getAllStudents()},
        getmark:(_, { }, { dataSources })=> { return dataSources.student.getmarks()},
},

Mutation:{
createStudent: (root,{input1},{dataSources},{info} )=> { return dataSources.student.createStudent(input1.studentID,input1.name,input1.age,input1.phone)},
}
};

module.exports=resolvers