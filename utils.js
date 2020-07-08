const Intl = require('intl')

module.exports = {
    age: function(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)
    
        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()
    
        if(month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
            age = age - 1
        }
    
        return age
    },
    date: function (datestamp) {
        const formatter = new Intl.DateTimeFormat('pt-BR')
        return formatter.format(datestamp)
    },
    graduation: function(key) {
        const level = {
        medio: 'Ensino médio',
        superior: 'Ensino superior completo',
        pos: 'Mestrado e Doutorado'
        }
        
        const formatedValue  = level[key]
        return formatedValue
    },
    birthDate: function (datestamp){
        const date = new Date(datestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`
        }
    },
    schoolYear: function(key) {
        const level = {
            f5: '5º Ano - Ensino Fundamental',
            f6: '6º Ano - Ensino Fundamental',
            f7: '7º Ano - Ensino Fundamental',
            f8: '8º Ano - Ensino Fundamental',
            f9: '9º Ano - Ensino Fundamental',
            m1: '1º ano - Ensino Médio',
            m2: '2º ano - Ensino Médio',
            m3: '3º ano - Ensino Médio'
        }

        const formatedValue = level[key]
        return formatedValue
    }
}
