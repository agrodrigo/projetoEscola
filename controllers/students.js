const fs = require('fs')
const data = require('../data.json')
const { date, birthDate, schoolYear } = require('../utils')


exports.index = function(req, res) {

    let studentsData = {...data.students}

    const formatSchoolYear = function (dataStudent) {
        for (let i = 0; i < data.students.length; i++) {
            let f = schoolYear(studentsData[i].school_year)
            let y = {...data.students[i], school_year: f}
            studentsData[i] = y  
        }
        return dataStudent
    }

    const studentsFormated = Object.values(formatSchoolYear(studentsData))


    return res.render('students/index', {students: studentsFormated})
}

exports.create = function(req, res) {
    return res.render('students/create')
}

exports.post = function(req, res) {

    //Validação
    const keys = Object.keys(req.body)
    for(key of keys) {
        if(req.body[key] == ""){
            return res.send('Por favor, preencha todos os campos')
        }
    }
    
    //Organizando os dados para enviar ao banco de dados
    let {avatar_url, 
        name,
        email,
        birth,
        school_year, 
        study_load,
    } = req.body
    
    //Tratamento dos Dados
    birth = Date.parse(birth) //veio da req.body desconstructor    
    
    let id = 1
    const lastStudent = data.students[data.students.length - 1]
    if (lastStudent) {
        id = lastStudent.id +1
    }

    data.students.push({
        id,
        avatar_url,
        name,
        email,
        birth,
        school_year,
        study_load,
    })

    //envio o arquivo criado para a data.json
    fs.writeFile('data.json', JSON.stringify(data, null, 4), function(err){
        if (err) return res.send('Erro de gravação de dados')
        return res.redirect(`/students`)
    })
}

exports.show = function(req, res) {
    
    const {id} = req.params

    const foundStudent = data.students.find(function(student){
        return id == student.id 
    })

    if(!foundStudent) {
        return res.send("Professor não encontrado")  
    }
    
    const student = {
        ...foundStudent,
        age: birthDate(foundStudent.birth).birthDay,
        school_year: schoolYear(foundStudent.school_year),
        created_at: date(foundStudent.created_at),
    }

    return res.render('students/show', {student: student})
}

exports.edit = function(req, res) {
    const {id} = req.params

    const foundStudent = data.students.find(function(student) {
        return id == student.id
    })

    if(!foundStudent) {
        return res.send('Professor não encontrado')
    }

    const student = {
        ...foundStudent,
        birth: birthDate(foundStudent.birth).iso
    }

    return res.render('students/edit', {student: student})
}

exports.put = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundStudent = data.students.find(function(student, foundIndex) {
        if (id == student.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundStudent) return res.send('Professor não encontrado!')

    const student = {
        ...foundStudent,
        ...req.body,
        id: Number(req.body.id),
        birth: Date.parse(req.body.birth)
    }

    data.students[index] = student

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function(err) {
        if (err) return res.send('Erro de gravação')
        
        return res.redirect(`/students/${id}`)
    })


}

exports.delete = function(req, res) {
    const { id } = req.body
    
    const filteredStudents = data.students.filter(function(student){
        return student.id != id
    })

    data.students = filteredStudents

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err) {
        if (err) return res.send('Erro de Gravação')

        return res.redirect('/students')
    })
}