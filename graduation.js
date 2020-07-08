const dados = {
    "teachers" : [
        {
            "id": 1,
            "educational_level": "superior"
        },
        {
            "id": 2,
            "educational_level": "medio"
        },
        {
            "id": 3,
            "educational_level": "pos"
        },
        {
            "id": 4,
            "educational_level": "superior"
        },

    ]
}

// function graduation (graduation) {
    const educational_level = {
        medio: 'Ensino médio',
        superior: 'Ensino Superior Completo',
        pos: 'Mestrado e Doutorado'
    }

    let id = 2
    const teacherSelect = dados.teachers.find(function(teacher){
        return id == teacher.id
    })
    console.log(teacherSelect.educational_level)
    
    let nomeLevel = ""
    for (let level in educational_level) {        
        if (level == teacherSelect.educational_level){
            nomeLevel = level
        }        
    }
    console.log(`nomeLevel = ${nomeLevel.toString()}`)
    console.log(`educational_level = ${educational_level.(nomeLevel.toString())}`)
    
    // console.log(educational_level.medio)
    
// }


// console.log(teacherSelect)
// console.log(teacherSelect.educational_level)

// const teacherLevel = graduation(teacherSelect)
// console.log(teacherLevel)