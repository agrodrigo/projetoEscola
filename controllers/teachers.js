const fs = require('fs')
const data = require('../data.json')
const { age, date, graduation, birthDate } = require('../utils')


exports.index = function(req, res) {

    let teachersData = {...data.teachers}

    const formatServices = function (dataTeacher){
        for (let i = 0; i < data.teachers.length; i++) {
            let f = {...data.teachers[i], services: teachersData[i].services.toString().split(',')}
            teachersData[i] = f
        }
        return dataTeacher
    }

    const servicesFormated = Object.values(formatServices(teachersData))
    
    return res.render('teachers/index', {teachers: servicesFormated})
}

exports.create = function(req, res) {
    return res.render('teachers/create')
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
    let {avatar_url, name, birth, educational_level, type_class, services} = req.body
    
    //Tratamento dos Dados
    birth = Date.parse(birth) //veio da req.body desconstructor
    const created_at = Date.now()   //criou a variável created_at com a data
    
    let id = 1
    const lastTeacher = data.teachers[data.teachers.length - 1]
    if (lastTeacher) {
        id = lastTeacher.id + 1
    } //criou a variável id

    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        educational_level,
        type_class,
        services,
        created_at,
    })

    //envio o arquivo criado para a data.json
    fs.writeFile('data.json', JSON.stringify(data, null, 4), function(err){
        if (err) return res.send('Erro de gravação de dados')
        return res.redirect('/teachers') 
    })
}

exports.show = function(req, res) {
    
    const {id} = req.params

    const foundTeacher = data.teachers.find(function(teacher){
        return id == teacher.id 
    })

    if(!foundTeacher) {
        return res.send("Professor não encontrado")  
    }
    
    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        educational_level: graduation(foundTeacher.educational_level),
        services: foundTeacher.services.toString().split(","),
        created_at: date(foundTeacher.created_at),
    }
    
    return res.render('teachers/show', {teacher: teacher})
}

exports.edit = function(req, res) {
    const {id} = req.params

    const foundTeacher = data.teachers.find(function(teacher) {
        return id == teacher.id
    })

    if(!foundTeacher) {
        return res.send('Professor não encontrado')
    }

    const teacher = {
        ...foundTeacher,
        birth: birthDate(foundTeacher.birth).iso
    }

    return res.render('teachers/edit', {teacher: teacher})
}

exports.put = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundTeacher = data.teachers.find(function(teacher, foundIndex) {
        if (id == teacher.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundTeacher) return res.send('Professor não encontrado!')

    const teacher = {
        ...foundTeacher,
        ...req.body,
        id: Number(req.body.id),
        birth: Date.parse(req.body.birth)
    }

    data.teachers[index] = teacher

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function(err) {
        if (err) return res.send('Erro de gravação')
        
        return res.redirect(`/teachers/${id}`)
    })


}

exports.delete = function(req, res) {
    const { id } = req.body
    
    const filteredTeachers = data.teachers.filter(function(teacher){
        return teacher.id != id
    })

    data.teachers = filteredTeachers

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err) {
        if (err) return res.send('Erro de Gravação')

        return res.redirect('/teachers')
    })
}